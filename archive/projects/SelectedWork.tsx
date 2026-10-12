"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectVisual from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  type: "Independent" | "Professional";
  visual: "healthcare" | "quiz" | "wire2wifi" | "lca" | "lps";
};

const projects: Project[] = [
  {
    number: "01",
    title: "Healthcare Marketplace",
    category: "Independent Project",
    description:
      "A healthcare-focused marketplace experience designed around mobile usability, structured data flows, and a production-oriented application architecture.",
    technologies: ["Flutter", "Dart", "REST API", "Firebase"],
    type: "Independent",
    visual: "healthcare",
  },
  {
    number: "02",
    title: "Cross-Platform Quiz App",
    category: "Independent Project",
    description:
      "A cross-platform quiz experience built with Flutter, focusing on reusable UI, application state, structured content, and a smooth mobile experience.",
    technologies: ["Flutter", "Dart", "GetX"],
    type: "Independent",
    visual: "quiz",
  },
  {
    number: "03",
    title: "Wire2WiFi",
    category: "Professional Work",
    description:
      "A professional B2B mobile solution for monitoring WiFi bandwidth and LAN/WAN infrastructure through a Flutter-based application.",
    technologies: ["Flutter", "Dart", "REST API"],
    type: "Professional",
    visual: "wire2wifi",
  },
  {
    number: "04",
    title: "LCA Solutions",
    category: "Professional Work",
    description:
      "A production software project developed professionally as part of a software engineering team.",
    technologies: ["Flutter", ".NET", "REST API"],
    type: "Professional",
    visual: "lca",
  },
  {
    number: "05",
    title: "LPS of USA",
    category: "Professional Work",
    description:
      "A restricted community mobile application built professionally with Flutter and a .NET backend. The platform is private and does not allow unrestricted public registration.",
    technologies: ["Flutter", ".NET", "REST API"],
    type: "Professional",
    visual: "lps",
  },
];

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  const project = projects[activeProject];

  const changeProject = (index: number) => {
    if (index === activeProject) return;

    const detail = detailRef.current;
    const number = numberRef.current;

    if (!detail || !number) {
      setActiveProject(index);
      return;
    }

    const timeline = gsap.timeline();

    timeline
      // Hide current content
      .to([detail, number], {
        opacity: 0,
        y: 25,
        duration: 0.25,
        ease: "power2.in",
      })

      // Change React state while content is hidden
      .add(() => {
        setActiveProject(index);
      })

      // Position new content above
      .set([detail, number], {
        y: -25,
      })

      // Reveal new content
      .to([detail, number], {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".work-heading");
      const list = section.querySelector(".work-list");
      const detail = section.querySelector(".work-detail");

      if (heading) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      if (list) {
        gsap.from(list, {
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            once: true,
          },
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      if (detail) {
        gsap.from(detail, {
          scrollTrigger: {
            trigger: detail,
            start: "top 85%",
            once: true,
          },
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-48"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="work-heading mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
              Selected Work
            </p>

            <h2 className="max-w-3xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.06em]">
              Things I&apos;ve
              <br />
              <span className="text-white/35">built.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-white/40">
            A selection of independent projects and professional work across
            mobile applications, APIs, and backend systems.
          </p>
        </div>

        {/* Projects */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Project selector */}
          <div className="work-list border-t border-white/10">
            {projects.map((item, index) => {
              const active = index === activeProject;

              return (
                <button
                  key={item.title}
                  type="button"
                  data-cursor
                  onClick={() => changeProject(index)}
                  aria-pressed={active}
                  className={`group flex w-full items-center gap-5 border-b border-white/10 py-6 text-left transition-all duration-500 ${
                    active ? "pl-4" : ""
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      active ? "text-white" : "text-white/20"
                    }`}
                  >
                    {item.number}
                  </span>

                  {/* Title */}
                  <span
                    className={`text-xl tracking-[-0.03em] transition-colors duration-500 md:text-2xl ${
                      active
                        ? "text-white"
                        : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    {item.title}
                  </span>

                  {/* Type */}
                  <span className="ml-auto hidden text-[10px] uppercase tracking-[0.2em] text-white/20 md:block">
                    {item.type}
                  </span>

                  {/* Active indicator */}
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                      active
                        ? "scale-100 bg-white opacity-100"
                        : "scale-0 bg-white opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Project detail */}
          <div className="work-detail relative overflow-hidden border border-white/10 bg-[#0d0d0d] p-6 md:p-8 lg:p-10">
            {/* Background glow */}
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/[0.04] blur-3xl" />

            <div
              ref={detailRef}
              className="relative flex flex-col"
            >
              {/* Project visual */}
              <div className="mb-10">
                <ProjectVisual type={project.visual} />
              </div>

              {/* Project information */}
              <div className="relative">
                <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/30">
                  {project.category}
                </p>

                <h3 className="max-w-xl text-4xl font-medium tracking-[-0.05em] md:text-5xl lg:text-6xl">
                  {project.title}
                </h3>

                <p className="mt-7 max-w-xl text-sm leading-7 text-white/45 md:text-base">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="relative mt-12">
                <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Technology
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition-colors duration-300 hover:border-white/25 hover:text-white/80"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Large background number */}
              <div
                ref={numberRef}
                className="pointer-events-none absolute bottom-0 right-0 -z-0 select-none font-mono text-[7rem] font-bold leading-none text-white/[0.025] md:text-[10rem]"
              >
                {project.number}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}