"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type ProjectVisualProps = {
  type: "healthcare" | "quiz" | "wire2wifi" | "lca" | "lps";
};

export default function ProjectVisual({ type }: ProjectVisualProps) {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visualRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".project-orbit", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".project-glow", {
        scale: 1.15,
        opacity: 0.7,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".project-particle", {
        y: -18,
        duration: 2,
        stagger: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, visualRef);

    return () => ctx.revert();
  }, []);

  const labels = {
    healthcare: ["FLUTTER", "REST API", "PAYMENTS"],
    quiz: ["FLUTTER", "FIREBASE", "REAL-TIME"],
    wire2wifi: ["FLUTTER", "NETWORK", "MONITORING"],
    lca: ["FLUTTER", ".NET", "API"],
    lps: ["FLUTTER", ".NET", "COMMUNITY"],
  };

  return (
    <div
      ref={visualRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient glow */}
      <div className="project-glow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

      {/* Orbit */}
      <div className="project-orbit absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10">
        <span className="absolute -left-1 top-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />
        <span className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_20px_#a78bfa]" />
      </div>

      {/* Main device */}
      <div className="absolute left-1/2 top-1/2 w-[42%] min-w-[180px] max-w-[270px] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg]">
        <div className="rounded-[2rem] border border-white/20 bg-[#151515] p-2 shadow-2xl shadow-black/60">
          <div className="aspect-[9/18] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#1b1b1b] to-[#090909]">
            <div className="flex h-full flex-col p-5">
              <div className="mb-8 h-2 w-16 rounded-full bg-white/20" />

              <div className="mb-3 h-3 w-24 rounded bg-white/20" />
              <div className="mb-8 h-2 w-32 rounded bg-white/10" />

              <div className="mb-3 h-24 rounded-2xl border border-white/10 bg-white/[0.04]" />
              <div className="mb-3 h-16 rounded-2xl border border-white/10 bg-white/[0.04]" />
              <div className="h-16 rounded-2xl border border-white/10 bg-white/[0.04]" />

              <div className="mt-auto h-10 rounded-xl bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating technical labels */}
      <div className="project-particle absolute left-[8%] top-[22%] rounded-full border border-white/10 bg-black/50 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-white/50 backdrop-blur-md">
        {labels[type][0]}
      </div>

      <div className="project-particle absolute right-[8%] top-[30%] rounded-full border border-white/10 bg-black/50 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-white/50 backdrop-blur-md">
        {labels[type][1]}
      </div>

      <div className="project-particle absolute bottom-[18%] left-[15%] rounded-full border border-white/10 bg-black/50 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-white/50 backdrop-blur-md">
        {labels[type][2]}
      </div>

      {/* Corner metadata */}
      <div className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        Product system
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        01 / 05
      </div>
    </div>
  );
}