"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function Node({
  position,
  color,
  label,
  description,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  description: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      <mesh scale={1.2}>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>

      <Text
        position={[0, -0.75, 0]}
        fontSize={0.16}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      <Text
        position={[0, -0.98, 0]}
        fontSize={0.08}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        {description}
      </Text>
    </group>
  );
}

function DataPacket({
  start,
  end,
  delay,
  speed,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  delay: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(delay);

  useFrame((_, delta) => {
    if (!ref.current) return;

    progress.current += delta * speed;

    if (progress.current > 1) {
      progress.current = 0;
    }

    ref.current.position.lerpVectors(
      start,
      end,
      progress.current,
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 12, 12]} />

      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function Architecture() {
  const { pointer } = useThree();
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const flutter = useMemo(
    () => new THREE.Vector3(-1.8, 0, 0),
    [],
  );

  const api = useMemo(
    () => new THREE.Vector3(0, 0, 0),
    [],
  );

  const backend = useMemo(
    () => new THREE.Vector3(1.8, 0, 0),
    [],
  );

  useFrame((state) => {
    if (!group.current || reducedMotion) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.18,
      0.04,
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.12,
      0.04,
    );

    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <group ref={group}>
      <Node
        position={[-1.8, 0, 0]}
        color="#7c5cff"
        label="FLUTTER"
        description="MOBILE APP"
      />

      <Node
        position={[0, 0, 0]}
        color="#ffffff"
        label="REST API"
        description="DATA LAYER"
      />

      <Node
        position={[1.8, 0, 0]}
        color="#00d9ff"
        label=".NET"
        description="BACKEND"
      />

      <Line
        points={[flutter, api, backend]}
        color="#ffffff"
        transparent
        opacity={0.15}
        lineWidth={1}
      />

      <Line
        points={[
          new THREE.Vector3(-1.8, 0.12, 0),
          new THREE.Vector3(0, 0.12, 0),
          new THREE.Vector3(1.8, 0.12, 0),
        ]}
        color="#ffffff"
        transparent
        opacity={0.25}
        lineWidth={1}
        dashed
        dashSize={0.08}
        gapSize={0.08}
      />

      <DataPacket
        start={flutter}
        end={api}
        delay={0}
        speed={0.35}
      />

      <DataPacket
        start={flutter}
        end={api}
        delay={0.5}
        speed={0.35}
      />

      <DataPacket
        start={api}
        end={backend}
        delay={0.25}
        speed={0.32}
      />

      <DataPacket
        start={api}
        end={backend}
        delay={0.75}
        speed={0.32}
      />
    </group>
  );
}

export default function ArchitectureScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.2} />

        <pointLight
          position={[0, 2, 3]}
          intensity={2}
        />

        <Architecture />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}