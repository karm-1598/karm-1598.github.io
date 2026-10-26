"use client";

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import {
  AdditiveBlending,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  CylinderGeometry,
  DoubleSide,
  Fog,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  Line as ThreeLine,
  LineBasicMaterial,
  Mesh,
  Object3D,
  PlaneGeometry,
  PointLight,
  Vector2,
  Vector3,
} from "three";

import {
  scrollSnapshot,
  setPageProgress,
  setZoneProgress,
  zoneIds,
} from "@/lib/scroll-store";

type DeviceProfile = {
  dpr: number;
  particleCount: number;
  highQuality: boolean;
  reducedMotion: boolean;
};

const pathPoints = [
  new Vector3(0.3, 16, 0),
  new Vector3(-0.8, 10, 0.2),
  new Vector3(0.8, 4, 0),
  new Vector3(-0.7, -2, 0.2),
  new Vector3(0.7, -8, 0),
  new Vector3(0, -14, 0),
];

const packetPath = new CatmullRomCurve3(pathPoints, false, "catmullrom", 0.35);
const worldColors = [
  new Color("#080b0e"),
  new Color("#0d141b"),
  new Color("#10171b"),
  new Color("#0d1218"),
  new Color("#101419"),
  new Color("#111a1b"),
];
const cameraTarget = new Vector3();
const cameraLook = new Vector3();
const mouse = new Vector2();
const transform = new Object3D();
const sceneTransitionColor = new Color();

gsap.registerPlugin(ScrollTrigger);

const WorldEffects = lazy(() => import("./WorldEffects"));

function getDeviceProfile(): DeviceProfile {
  const device = navigator as Navigator & { deviceMemory?: number };
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;
  const lowMemory = (device.deviceMemory ?? 8) <= 4;
  const fewCores = device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const highQuality = !smallScreen && !lowMemory && !fewCores;

  return {
    dpr: smallScreen ? 1 : highQuality ? 1.5 : 1.25,
    particleCount: highQuality ? 360 : 120,
    highQuality,
    reducedMotion,
  };
}

function useDeviceProfile() {
  const [profile, setProfile] = useState<DeviceProfile>({
    dpr: 1,
    particleCount: 120,
    highQuality: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const reducedMotionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const update = () => setProfile(getDeviceProfile());
    update();
    window.addEventListener("resize", update);
    reducedMotionPreference.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      reducedMotionPreference.removeEventListener("change", update);
    };
  }, []);

  return profile;
}

function sample(index: number, multiplier: number) {
  const value = Math.sin((index + 1) * multiplier) * 43_758.5453;
  return value - Math.floor(value);
}

function makeCrystalGeometry() {
  const positions = [
    0, 1.05, 0,
    0.62, 0.18, 0.62,
    -0.62, 0.18, 0.62,
    -0.62, 0.18, -0.62,
    0.62, 0.18, -0.62,
    0.38, -0.45, 0.38,
    -0.38, -0.45, 0.38,
    -0.38, -0.45, -0.38,
    0.38, -0.45, -0.38,
    0, -0.95, 0,
  ];
  const indices: number[] = [];

  for (let side = 0; side < 4; side += 1) {
    const next = (side + 1) % 4;
    const upper = side + 1;
    const nextUpper = next + 1;
    const lower = side + 5;
    const nextLower = next + 5;
    indices.push(0, upper, nextUpper);
    indices.push(upper, lower, nextLower, upper, nextLower, nextUpper);
    indices.push(9, nextLower, lower);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

function AmbientParticles({ count }: { count: number }) {
  const meshRef = useRef<InstancedMesh>(null);
  const positions = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      x: (sample(index, 12.9898) - 0.5) * 22,
      y: sample(index, 78.233) * 34 - 17,
      z: (sample(index, 39.425) - 0.5) * 11 - 2,
      scale: 0.012 + sample(index, 5.327) * 0.035,
    }));
  }, [count]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    positions.forEach((particle, index) => {
      transform.position.set(particle.x, particle.y, particle.z);
      transform.scale.setScalar(particle.scale);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh args={[undefined, undefined, count]} ref={meshRef}>
      <sphereGeometry args={[1, 5, 4]} />
      <meshBasicMaterial
        color="#a9d9d5"
        opacity={0.43}
        transparent
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function PacketTrail({ reducedMotion }: { reducedMotion: boolean }) {
  const trailRef = useRef<InstancedMesh>(null);
  const trailCount = reducedMotion ? 1 : 18;

  useFrame(() => {
    const mesh = trailRef.current;
    if (!mesh) return;

    const progress = scrollSnapshot.progress;
    for (let index = 0; index < trailCount; index += 1) {
      const trailProgress = Math.max(0, progress - index * 0.008);
      const position = packetPath.getPointAt(trailProgress);
      const scale =
        (1 - index / trailCount) *
        (reducedMotion ? 0.04 : 0.11) *
        Math.max(0, 1 - progress * 0.3);

      transform.position.copy(position);
      transform.position.y += index * 0.11;
      transform.scale.setScalar(scale);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh args={[undefined, undefined, trailCount]} ref={trailRef}>
      <sphereGeometry args={[1, 6, 5]} />
      <meshBasicMaterial
        color="#8ce4d1"
        transparent
        opacity={0.25}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function ReleaseBurst() {
  const burstRef = useRef<InstancedMesh>(null);
  const transforms = useMemo(() => {
    return Array.from({ length: 48 }, (_, index) => ({
      direction: new Vector3(
        sample(index, 28.491) * 2 - 1,
        sample(index, 17.241) * 2 - 1,
        sample(index, 11.137) * 2 - 1,
      ).normalize(),
      scale: 0.018 + sample(index, 37.983) * 0.045,
    }));
  }, []);

  useFrame(() => {
    const mesh = burstRef.current;
    if (!mesh) return;

    const progress = scrollSnapshot.progress;
    const intensity = Math.max(0, 1 - Math.abs(progress - 0.985) / 0.05);
    const origin = packetPath.getPoint(0.985);

    transforms.forEach((particle, index) => {
      transform.position.copy(origin).addScaledVector(
        particle.direction,
        intensity * (0.25 + (index % 12) * 0.075),
      );
      transform.scale.setScalar(particle.scale * intensity);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh args={[undefined, undefined, transforms.length]} ref={burstRef}>
      <sphereGeometry args={[1, 5, 4]} />
      <meshBasicMaterial
        color="#c1fff0"
        transparent
        opacity={0.86}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function Packet({
  reducedMotion,
  highQuality,
}: {
  reducedMotion: boolean;
  highQuality: boolean;
}) {
  const packetRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const lightRef = useRef<PointLight>(null);
  const elapsedTime = useRef(0);
  const geometry = useMemo(() => makeCrystalGeometry(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_state, delta) => {
    const packet = packetRef.current;
    if (!packet) return;

    const progress = reducedMotion ? 0.04 : scrollSnapshot.progress;
    const position = packetPath.getPointAt(progress);
    elapsedTime.current += delta;
    const time = elapsedTime.current;
    const wobble = reducedMotion ? 0 : Math.sin(time * 1.6) * 0.035;

    packet.position.set(
      position.x + mouse.x * 0.28,
      position.y + wobble + mouse.y * 0.18,
      position.z,
    );
    packet.rotation.set(
      reducedMotion ? 0 : Math.sin(time * 0.5) * 0.08 + mouse.y * 0.08,
      reducedMotion ? 0 : time * 0.17 + mouse.x * 0.12,
      reducedMotion ? 0 : Math.sin(time * 0.3) * 0.07,
    );

    const landing = Math.max(0, 1 - Math.abs(progress - 0.985) / 0.025);
    const packetScale = 1 + landing * 0.28;
    packet.scale.setScalar(packetScale);

    if (glowRef.current) {
      glowRef.current.position.copy(packet.position);
      glowRef.current.scale.setScalar(1.3 + landing * 0.8);
    }
    if (lightRef.current) {
      lightRef.current.position.copy(packet.position);
      lightRef.current.intensity = 2.1 + landing * 4;
    }
  });

  return (
    <>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.65, 12, 10]} />
        <meshBasicMaterial
          color="#8ce4d1"
          transparent
          opacity={0.1}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geometry} ref={packetRef}>
        {highQuality ? (
          <meshStandardMaterial
            color="#d7fff5"
            emissive="#53cdb6"
            emissiveIntensity={2.5}
            metalness={0.15}
            roughness={0.16}
            flatShading
          />
        ) : (
          <meshBasicMaterial color="#8ce4d1" />
        )}
      </mesh>
      <pointLight color="#8ce4d1" distance={8} intensity={2.1} ref={lightRef} />
    </>
  );
}

function PhonePanels({ highQuality }: { highQuality: boolean }) {
  return (
    <group position={[0, 10, -1.8]}>
      {[-3.4, 0, 3.4].map((x, index) => (
        <group key={x} position={[x, index === 1 ? 0 : 0.6, index === 1 ? 0 : -0.6]}>
          <mesh rotation={[0, index === 0 ? 0.12 : index === 2 ? -0.12 : 0, 0]}>
            <boxGeometry args={[1.85, 3.6, 0.11]} />
            {highQuality ? (
              <meshStandardMaterial
                color="#172127"
                emissive="#21363a"
                emissiveIntensity={0.18}
                roughness={0.42}
                metalness={0.18}
                transparent
                opacity={0.73}
              />
            ) : (
              <meshBasicMaterial
                color="#172127"
                transparent
                opacity={0.73}
              />
            )}
          </mesh>
          <mesh position={[0, 0.72, 0.065]}>
            <planeGeometry args={[1.42, 0.035]} />
            <meshBasicMaterial color="#8ce4d1" transparent opacity={0.72} />
          </mesh>
          {[0, 1, 2, 3].map((row) => (
            <mesh key={row} position={[0, 0.32 - row * 0.43, 0.065]}>
              <planeGeometry args={[1.2 - (row % 2) * 0.24, 0.055]} />
              <meshBasicMaterial color="#a7b5bb" transparent opacity={0.2} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function ApiNetwork({ highQuality }: { highQuality: boolean }) {
  const nodes = [
    new Vector3(-3.2, 4.2, -1.8),
    new Vector3(-1.3, 5.15, -1.4),
    new Vector3(1, 3.15, -1.5),
    new Vector3(3.15, 4.5, -1.7),
    new Vector3(0.1, 5.4, -2.2),
    new Vector3(-2.2, 2.65, -2),
    new Vector3(2.2, 2.5, -2.1),
  ];
  const links = [
    [0, 1],
    [1, 4],
    [4, 3],
    [0, 5],
    [5, 2],
    [2, 6],
    [6, 3],
    [1, 2],
    [2, 4],
  ];

  return (
    <group>
      {links.map(([from, to]) => (
        <ApiLink
          key={`${from}-${to}`}
          from={nodes[from]}
          to={nodes[to]}
        />
      ))}
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <icosahedronGeometry args={[index === 4 ? 0.23 : 0.16, 0]} />
          {highQuality ? (
            <meshStandardMaterial
              color="#a5fff0"
              emissive="#60d9c5"
              emissiveIntensity={1.2}
              roughness={0.3}
            />
          ) : (
            <meshBasicMaterial color="#8ce4d1" />
          )}
        </mesh>
      ))}
    </group>
  );
}

function ApiLink({ from, to }: { from: Vector3; to: Vector3 }) {
  const line = useMemo(() => {
    const geometry = new BufferGeometry().setFromPoints([from, to]);
    const material = new LineBasicMaterial({
      color: "#75d9c5",
      transparent: true,
      opacity: 0.32,
    });
    return new ThreeLine(geometry, material);
  }, [from, to]);

  useEffect(
    () => () => {
      line.geometry.dispose();
      line.material.dispose();
    },
    [line],
  );

  return <primitive object={line} />;
}

function BackendGrid({
  reducedMotion,
  highQuality,
}: {
  reducedMotion: boolean;
  highQuality: boolean;
}) {
  const plane = useMemo(() => new PlaneGeometry(18, 12, 18, 12), []);

  useEffect(() => () => plane.dispose(), [plane]);

  return (
    <group position={[0, -2, -2]}>
      <mesh geometry={plane} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <meshBasicMaterial
          color="#8298ff"
          wireframe
          transparent
          opacity={0.12}
          side={DoubleSide}
        />
      </mesh>
      {[-4.4, -2.2, 0, 2.2, 4.4].map((x, index) => (
        <group key={x} position={[x, 0, -1.2]}>
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[1.35, 2.8, 0.72]} />
            {highQuality ? (
              <meshStandardMaterial
                color="#1b222d"
                emissive="#5266bb"
                emissiveIntensity={0.14}
                roughness={0.55}
                metalness={0.3}
              />
            ) : (
              <meshBasicMaterial color="#1b222d" />
            )}
          </mesh>
          {[-0.15, 0.45, 1.05].map((y, slot) => (
            <mesh key={slot} position={[0, y, 0.37]}>
              <boxGeometry args={[0.9, 0.045, 0.025]} />
              <meshBasicMaterial
                color={index % 2 ? "#8298ff" : "#8ce4d1"}
                transparent
                opacity={0.45 + slot * 0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
      <DataStreams reducedMotion={reducedMotion} />
    </group>
  );
}

function DataStreams({ reducedMotion }: { reducedMotion: boolean }) {
  const streamRef = useRef<InstancedMesh>(null);
  const elapsedTime = useRef(0);
  const streamCount = 42;
  const streams = useMemo(
    () =>
      Array.from({ length: streamCount }, (_, index) => ({
        x: ((index % 14) - 6.5) * 0.72,
        y: ((index * 7) % 19) * 0.21 - 1.3,
        z: -0.1 - (index % 3) * 0.16,
        scale: 0.035 + (index % 4) * 0.014,
      })),
    [],
  );

  useFrame((_state, delta) => {
    const mesh = streamRef.current;
    if (!mesh) return;
    elapsedTime.current += reducedMotion ? 0 : delta;
    streams.forEach((stream, index) => {
      const time = elapsedTime.current * (0.18 + (index % 4) * 0.06);
      const y = ((stream.y + time) % 3.8) - 1.5;
      transform.position.set(stream.x, y, stream.z);
      transform.scale.set(stream.scale * 0.45, stream.scale * 4, stream.scale * 0.45);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh args={[undefined, undefined, streamCount]} ref={streamRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color="#8298ff"
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function DatabaseDiscs({ highQuality }: { highQuality: boolean }) {
  const geometry = useMemo(() => new CylinderGeometry(3.1, 3.1, 0.12, 12), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group position={[0, -8, 0]}>
      {[-1.15, -0.4, 0.35, 1.1].map((y, index) => (
        <mesh
          geometry={geometry}
          key={y}
          position={[0, y, 0]}
          rotation={[0, index % 2 ? 0.08 : -0.08, 0]}
        >
          {highQuality ? (
            <meshStandardMaterial
              color={index % 2 ? "#223b3b" : "#26313a"}
              emissive={index % 2 ? "#4b9687" : "#344e72"}
              emissiveIntensity={0.18}
              transparent
              opacity={0.35}
              roughness={0.28}
              metalness={0.3}
              side={DoubleSide}
            />
          ) : (
            <meshBasicMaterial
              color={index % 2 ? "#223b3b" : "#26313a"}
              transparent
              opacity={0.35}
              side={DoubleSide}
            />
          )}
        </mesh>
      ))}
      <mesh position={[0, 0, -0.25]}>
        <cylinderGeometry args={[2.1, 2.1, 3.5, 8, 1, true]} />
        <meshBasicMaterial
          color="#8ce4d1"
          wireframe
          transparent
          opacity={0.09}
        />
      </mesh>
    </group>
  );
}

function ReleaseZone() {
  return (
    <group position={[0, -14, 0]}>
      <mesh position={[0, -1.1, 0]}>
        <torusGeometry args={[2.2, 0.018, 4, 40]} />
        <meshBasicMaterial
          color="#8ce4d1"
          transparent
          opacity={0.55}
          blending={AdditiveBlending}
        />
      </mesh>
      <pointLight color="#8ce4d1" position={[0, -0.2, 0]} intensity={0.6} distance={9} />
      <ReleaseBurst />
    </group>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  const packetPosition = useMemo(() => new Vector3(), []);

  useFrame((_state, delta) => {
    const progress = reducedMotion ? 0.04 : scrollSnapshot.progress;
    packetPath.getPointAt(progress, packetPosition);
    const nextPosition = packetPath.getPointAt(Math.min(1, progress + 0.035));
    const zoneIndex = Math.min(zoneIds.length - 1, Math.floor(progress * zoneIds.length));
    const zoneProgress = scrollSnapshot.zones[zoneIds[zoneIndex]];
    const roll = reducedMotion ? 0 : Math.sin(zoneProgress * Math.PI) * 0.025;

    cameraTarget.set(
      packetPosition.x * 0.16 + mouse.x * 0.22,
      packetPosition.y + 1.4 + mouse.y * 0.12,
      16,
    );
    cameraRef.current.position.lerp(cameraTarget, 1 - Math.exp(-delta * 3.2));

    cameraLook.set(
      nextPosition.x * 0.2,
      packetPosition.y - 0.4,
      0,
    );
    cameraRef.current.lookAt(cameraLook);
    cameraRef.current.rotation.z = roll;
  });

  return null;
}

function ZoneProgressTriggers() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = zoneIds.map((id) =>
      document.querySelector<HTMLElement>(`[data-scroll-zone="${id}"]`),
    );
    if (sections.some((section) => !section)) return;

    const triggers = sections.map((section, index) => {
      const zone = zoneIds[index];
      if (!section || !zone) return null;

      return ScrollTrigger.create({
        trigger: section,
        start: index === 0 ? "top top" : "top top+=72",
        end: zone === "contact" ? "bottom bottom" : "bottom top+=72",
        onUpdate: (trigger) => {
          setZoneProgress(zone, trigger.progress);
        },
        onEnter: () => setZoneProgress(zone, 0),
        onLeave: () => setZoneProgress(zone, 1),
        onLeaveBack: () => setZoneProgress(zone, 0),
      });
    });
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: () => {
        const contact = document.querySelector<HTMLElement>(
          '[data-scroll-zone="contact"]',
        );
        if (!contact) return "max";

        const contactEnd =
          contact.getBoundingClientRect().bottom + window.scrollY;
        return Math.max(1, contactEnd - window.innerHeight);
      },
      onUpdate: (trigger) => setPageProgress(trigger.progress),
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
      progressTrigger.kill();
      setPageProgress(0);
      zoneIds.forEach((id) => setZoneProgress(id, 0));
    };
  }, [pathname]);

  return null;
}

function World({ profile }: { profile: DeviceProfile }) {
  const sceneRef = useRef<Group>(null);
  const elapsedTime = useRef(0);
  const backgroundRef = useRef<Color>(null);
  const fogRef = useRef<Fog>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };
    const handlePointerLeave = () => mouse.set(0, 0);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  useFrame((_state, delta) => {
    const progress = profile.reducedMotion ? 0.04 : scrollSnapshot.progress;
    const zonePosition = progress * zoneIds.length;
    const zone = Math.min(zoneIds.length - 1, Math.floor(zonePosition));
    const transition =
      zone === zoneIds.length - 1 ? 0 : zonePosition - zone;
    sceneTransitionColor.copy(worldColors[zone]).lerp(
      worldColors[Math.min(worldColors.length - 1, zone + 1)],
      Math.min(1, transition),
    );

    backgroundRef.current?.copy(sceneTransitionColor);
    if (fogRef.current) fogRef.current.color.copy(sceneTransitionColor);

    const sceneGroup = sceneRef.current;
    if (sceneGroup) {
      elapsedTime.current += profile.reducedMotion ? 0 : delta;
      const target = profile.reducedMotion
        ? 0
        : Math.sin(elapsedTime.current * 0.16) * 0.03;
      sceneGroup.rotation.z += (target - sceneGroup.rotation.z) * delta * 0.45;
    }
  });

  return (
    <>
      <color attach="background" args={["#080b0e"]} ref={backgroundRef} />
      <fog attach="fog" args={["#080b0e", 19, 39]} ref={fogRef} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#b5d8d5", "#080b0e", 0.5]} />
      <directionalLight color="#d2f8ef" position={[4, 8, 8]} intensity={0.65} />
      <CameraRig reducedMotion={profile.reducedMotion} />
      <ZoneProgressTriggers />
      <group ref={sceneRef}>
        <AmbientParticles count={profile.particleCount} />
        <PacketTrail reducedMotion={profile.reducedMotion} />
        <Packet
          highQuality={profile.highQuality}
          reducedMotion={profile.reducedMotion}
        />
        <PhonePanels highQuality={profile.highQuality} />
        <ApiNetwork highQuality={profile.highQuality} />
        <BackendGrid
          highQuality={profile.highQuality}
          reducedMotion={profile.reducedMotion}
        />
        <DatabaseDiscs highQuality={profile.highQuality} />
        <ReleaseZone />
      </group>
      {profile.highQuality && !profile.reducedMotion ? (
        <Suspense fallback={null}>
          <WorldEffects />
        </Suspense>
      ) : null}
    </>
  );
}

function SceneContent({ profile }: { profile: DeviceProfile }) {
  return (
    <Suspense fallback={null}>
      <World profile={profile} />
    </Suspense>
  );
}

function WorldCanvas() {
  const profile = useDeviceProfile();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.4, 16], fov: 38, near: 0.1, far: 70 }}
      dpr={profile.dpr}
      frameloop={
        !visible ? "never" : profile.reducedMotion ? "demand" : "always"
      }
      gl={{
        alpha: true,
        antialias: profile.highQuality,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#080b0e", 1);
        gl.outputColorSpace = "srgb";
      }}
      onPointerMissed={() => mouse.set(0, 0)}
    >
      <SceneContent profile={profile} />
    </Canvas>
  );
}

export default WorldCanvas;
