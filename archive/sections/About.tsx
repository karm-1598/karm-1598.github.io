"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  Code2,
  Layers3,
  Smartphone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Product-minded",
    description:
      "I think beyond individual screens and focus on how the complete product should behave, connect, and scale.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Full-stack perspective",
    description:
      "My work spans Flutter applications, REST APIs, .NET services, databases, and the integrations connecting them.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Built for production",
    description:
      "I care about maintainable architecture, reliable data flow, responsive interfaces, debugging, and real deployment.",
    icon: Code2,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
          once: true,
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".about-copy", {
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 85%",
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".about-principle", {
        scrollTrigger: {
          trigger: ".about-principles",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".about-orbit", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-48"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2">
        <div className="about-orbit absolute inset-0 rounded-full border border-white/[0.035]" />

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.035] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="about-heading mb-24">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
            About
          </p>

          <h2 className="max-w-6xl text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.86] tracking-[-0.07em]">
            I build products
            <br />
            <span className="text-white/30">that connect.</span>
          </h2>
        </div>

        {/* Main positioning */}
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Label */}
          <div>
            <div className="sticky top-32">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
                Karm Patel
              </p>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/40">
                Full-Stack Mobile Developer
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="about-copy">
            <p className="max-w-4xl text-2xl leading-[1.35] tracking-[-0.035em] text-white/75 md:text-4xl">
              I&apos;m a Flutter developer who works across the mobile and
              backend layers of a product.
            </p>

            <p className="mt-10 max-w-3xl text-base leading-8 text-white/40">
              My primary focus is building cross-platform mobile applications
              with Flutter, while also working with REST APIs, .NET backend
              services, databases, Firebase, and third-party integrations.
            </p>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/40">
              That full-stack perspective allows me to understand more than
              just the interface. I can work with the data flow, API
              integration, application architecture, and backend systems
              behind the experience.
            </p>

            <div className="mt-12 flex items-center gap-4 text-sm text-white/40">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                <ArrowDownRight size={15} strokeWidth={1.5} />
              </span>

              <span>
                Looking for a developer who can own more than the UI?
              </span>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="about-principles mt-32 grid border-t border-white/10 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <div
                key={principle.number}
                className="about-principle group border-b border-white/10 p-8 first:pl-0 md:border-b-0 md:border-r md:last:border-r-0 md:py-10 md:pl-8 md:last:pr-0"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/20">
                    {principle.number}
                  </span>

                  <Icon
                    size={18}
                    strokeWidth={1.3}
                    className="text-white/25 transition-colors duration-300 group-hover:text-white/70"
                  />
                </div>

                <h3 className="text-2xl font-medium tracking-[-0.04em] text-white/80">
                  {principle.title}
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/35">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="mt-24 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-[clamp(2rem,4vw,4rem)] leading-[1] tracking-[-0.05em] text-white/70">
            From a mobile interface to the systems behind it, I like building
            the pieces that make a product actually work.
          </p>
        </div>
      </div>
    </section>
  );
}