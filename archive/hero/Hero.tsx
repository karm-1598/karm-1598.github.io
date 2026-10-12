"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ArchitectureScene from "@/components/three/ArchitectureScene";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".hero-eyebrow", {
          y: 30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-title-line",
          {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.4",
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-system",
          {
            scale: 0.92,
            opacity: 0,
            duration: 1,
          },
          "-=0.5",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        {/* LEFT SIDE */}
        <div>
          <p className="hero-eyebrow mb-8 text-xs uppercase tracking-[0.35em] text-white/40">
            Full-Stack Mobile Developer
          </p>

          <h1 className="overflow-hidden text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.85] tracking-[-0.07em]">
            <span className="hero-title-line block">I build</span>

            <span className="hero-title-line block text-white/40">
              mobile
            </span>

            <span className="hero-title-line block">products.</span>
          </h1>

          <p className="hero-description mt-10 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
            Flutter Developer and .NET Backend Engineer building production
            mobile experiences and the systems behind them.
          </p>

          <div className="hero-actions mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-105"
            >
              View my work
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/40"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — 3D ARCHITECTURE */}
        <div className="hero-system relative aspect-square w-full max-w-xl justify-self-center">
          <div className="absolute inset-0 rounded-full border border-white/5" />

          <div className="absolute inset-0">
            <ArchitectureScene />
          </div>

        </div>
      </div>
    </section>
  );
}