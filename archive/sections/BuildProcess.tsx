"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  Smartphone,
  Workflow,
  Server,
  Database,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Define",
    description:
      "Understand the product, users, requirements, and technical constraints before writing the first line of code.",
    icon: Lightbulb,
    label: "PRODUCT",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Create responsive Flutter interfaces with reusable components, structured state management, and scalable application architecture.",
    icon: Smartphone,
    label: "FLUTTER",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Connect the application to REST APIs and move structured data between the mobile application and backend services.",
    icon: Workflow,
    label: "REST API",
  },
  {
    number: "04",
    title: "Engineer",
    description:
      "Develop backend services with .NET, business logic, authentication, API endpoints, and reliable data processing.",
    icon: Server,
    label: ".NET",
  },
  {
    number: "05",
    title: "Persist",
    description:
      "Work with structured data and relational databases to support the application's core workflows and information.",
    icon: Database,
    label: "DATABASE",
  },
  {
    number: "06",
    title: "Ship",
    description:
      "Test, debug, integrate services, prepare releases, and move the finished product toward production.",
    icon: Rocket,
    label: "RELEASE",
  },
];

export default function BuildProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;

    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.from(".process-heading", {
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 85%",
          once: true,
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".process-intro", {
        scrollTrigger: {
          trigger: ".process-intro",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(line, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: ".process-track",
          start: "top 70%",
          end: "bottom 65%",
          scrub: 1,
        },
      });

      gsap.from(".process-step", {
        scrollTrigger: {
          trigger: ".process-track",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-48"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="process-heading mb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
            How I Build
          </p>

          <h2 className="max-w-5xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
            From idea
            <br />
            <span className="text-white/30">to production.</span>
          </h2>
        </div>

        {/* Intro */}
        <div className="process-intro mb-24 flex justify-end">
          <p className="max-w-xl text-sm leading-7 text-white/40 md:text-base">
            I approach mobile products as connected systems — from the
            interface users interact with to the APIs, backend services, and
            data that make the experience work.
          </p>
        </div>

        {/* Desktop process */}
        <div className="process-track relative hidden lg:block">
          {/* Base line */}
          <div className="absolute left-0 right-0 top-[48px] h-px bg-white/10" />

          {/* Animated line */}
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-[48px] h-px origin-left scale-x-0 bg-white/60"
          />

          <div className="grid grid-cols-6 gap-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="process-step relative pt-0"
                >
                  {/* Node */}
                  <div className="relative z-10 mb-10 flex h-24 items-start">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#080808]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                        <Icon
                          size={20}
                          strokeWidth={1.3}
                          className="text-white/60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number */}
                  <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-white/20">
                    {step.number}
                  </p>

                  {/* Label */}
                  <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-white/25">
                    {step.label}
                  </p>

                  {/* Title */}
                  <h3 className="mb-5 text-2xl font-medium tracking-[-0.04em] text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-6 text-white/35">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile process */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-white/10" />

          <div className="space-y-12">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex gap-6"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#080808]">
                    <Icon
                      size={17}
                      strokeWidth={1.3}
                      className="text-white/60"
                    />
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-white/20">
                      {step.number}
                    </p>

                    <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/25">
                      {step.label}
                    </p>

                    <h3 className="mb-3 text-2xl font-medium tracking-[-0.04em]">
                      {step.title}
                    </h3>

                    <p className="max-w-md text-sm leading-6 text-white/35">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture statement */}
        <div className="mt-28 border-t border-white/10 pt-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
                Client
              </p>

              <p className="mt-3 text-xl tracking-[-0.03em] text-white/70">
                Flutter
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
                Transport
              </p>

              <p className="mt-3 text-xl tracking-[-0.03em] text-white/70">
                REST API
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
                Server
              </p>

              <p className="mt-3 text-xl tracking-[-0.03em] text-white/70">
                .NET + Database
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}