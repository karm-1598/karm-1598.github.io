"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Database,
  Flame,
  GitBranch,
  Layers3,
  Smartphone,
  Server,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Capability = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
};

const capabilities: Capability[] = [
  {
    id: "mobile",
    title: "Mobile",
    description:
      "Production-oriented cross-platform mobile applications with Flutter, responsive interfaces, reusable components, and structured application architecture.",
    technologies: ["Flutter", "Dart", "GetX", "Responsive UI"],
    icon: Smartphone,
  },
  {
    id: "backend",
    title: "Backend",
    description:
      "API-driven backend systems and integrations focused on reliable data flow between mobile applications and server-side services.",
    technologies: [".NET", "ASP.NET Core", "REST API", "SQL Server"],
    icon: Server,
  },
  {
    id: "firebase",
    title: "Cloud & Services",
    description:
      "Application services including authentication, notifications, cloud integrations, and supporting infrastructure for mobile products.",
    technologies: ["Firebase", "FCM", "Authentication", "Cloud Services"],
    icon: Flame,
  },
  {
    id: "architecture",
    title: "Architecture",
    description:
      "Structured application development using reusable components, state management, API layers, DTOs, and maintainable project organization.",
    technologies: ["MVVM", "State Management", "DTO", "API Layer"],
    icon: Layers3,
  },
  {
    id: "data",
    title: "Data",
    description:
      "Working with structured application data, relational databases, API models, queries, and data-driven mobile experiences.",
    technologies: ["SQL Server", "MySQL", "JSON", "REST"],
    icon: Database,
  },
  {
    id: "engineering",
    title: "Engineering",
    description:
      "Development workflow covering source control, debugging, releases, application integration, and production deployment.",
    technologies: ["Git", "GitHub", "Debugging", "App Deployment"],
    icon: GitBranch,
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);

  const capability = capabilities[active];
  const Icon = capability.icon;

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".capabilities-heading", {
        scrollTrigger: {
          trigger: ".capabilities-heading",
          start: "top 85%",
          once: true,
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".capabilities-list", {
        scrollTrigger: {
          trigger: ".capabilities-list",
          start: "top 85%",
          once: true,
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".capability-detail", {
        scrollTrigger: {
          trigger: ".capability-detail",
          start: "top 85%",
          once: true,
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const changeCapability = (index: number) => {
    if (index === active) return;

    const detail = sectionRef.current?.querySelector(".capability-content");

    if (!detail) {
      setActive(index);
      return;
    }

    gsap.to(detail, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);

        gsap.fromTo(
          detail,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
        );
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-48"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="capabilities-heading mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
              Capabilities
            </p>

            <h2 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              From interface
              <br />
              <span className="text-white/30">to infrastructure.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-white/40">
            I work across the layers required to turn a mobile product idea
            into a connected, production-ready system.
          </p>
        </div>

        {/* Main capability interface */}
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          {/* Capability list */}
          <div className="capabilities-list border-t border-white/10">
            {capabilities.map((item, index) => {
              const isActive = index === active;
              const ItemIcon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  data-cursor
                  aria-pressed={isActive}
                  onClick={() => changeCapability(index)}
                  className={`group flex w-full items-center gap-5 border-b border-white/10 py-7 text-left transition-all duration-500 ${
                    isActive ? "pl-4" : ""
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isActive
                        ? "border-white/30 bg-white text-black"
                        : "border-white/10 text-white/30 group-hover:border-white/25 group-hover:text-white/70"
                    }`}
                  >
                    <ItemIcon size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className={`text-xl tracking-[-0.03em] transition-colors duration-500 ${
                      isActive
                        ? "text-white"
                        : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    {item.title}
                  </span>

                  <span
                    className={`ml-auto font-mono text-[10px] transition-colors ${
                      isActive ? "text-white/50" : "text-white/15"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Capability detail */}
          <div className="capability-detail relative min-h-[520px] overflow-hidden border border-white/10 bg-[#0d0d0d] p-8 md:p-12">
            {/* Decorative grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Glow */}
            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[100px]" />

            <div className="capability-content relative flex min-h-[420px] flex-col justify-between">
              {/* Top */}
              <div>
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-white/70"
                    />
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
                    Layer / 0{active + 1}
                  </span>
                </div>

                <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/30">
                  Technical capability
                </p>

                <h3 className="text-5xl font-medium tracking-[-0.06em] md:text-7xl">
                  {capability.title}
                </h3>

                <p className="mt-8 max-w-xl text-sm leading-7 text-white/45 md:text-base">
                  {capability.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mt-16">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Working with
                </p>

                <div className="flex flex-wrap gap-2">
                  {capability.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition-colors duration-300 hover:border-white/25 hover:text-white/80"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative code */}
              <div className="pointer-events-none absolute bottom-0 right-0 font-mono text-[7rem] font-bold leading-none text-white/[0.025] md:text-[10rem]">
                {String(active + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Technology ribbon */}
        <div className="mt-20 overflow-hidden border-y border-white/10 py-6">
          <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 whitespace-nowrap">
            {[
              "FLUTTER",
              "DART",
              "GETX",
              ".NET",
              "ASP.NET CORE",
              "REST API",
              "FIREBASE",
              "SQL SERVER",
              "MYSQL",
              "GIT",
              "GITHUB",
            ].map((technology, index) => (
              <div
                key={`${technology}-${index}`}
                className="flex items-center gap-10"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-white/20">
                  {technology}
                </span>

                <span className="text-white/10">✦</span>
              </div>
            ))}

            {[
              "FLUTTER",
              "DART",
              "GETX",
              ".NET",
              "ASP.NET CORE",
              "REST API",
              "FIREBASE",
              "SQL SERVER",
              "MYSQL",
              "GIT",
              "GITHUB",
            ].map((technology, index) => (
              <div
                key={`duplicate-${technology}-${index}`}
                className="flex items-center gap-10"
              >
                <span className="font-mono text-xs tracking-[0.25em] text-white/20">
                  {technology}
                </span>

                <span className="text-white/10">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}