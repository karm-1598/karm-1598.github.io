"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    period: "PROFESSIONAL",
    title: "Flutter Developer",
    type: "Mobile Engineering",
    description:
      "Developed and maintained production mobile applications using Flutter, working across UI implementation, state management, API integration, debugging, and application releases.",
    technologies: ["Flutter", "Dart", "GetX", "REST API"],
  },
  {
    number: "02",
    period: "PROFESSIONAL",
    title: "Backend Integration",
    type: "Full-Stack Mobile",
    description:
      "Worked with backend services and APIs to connect mobile applications with business logic, authentication, structured data, and server-side functionality.",
    technologies: [".NET", "REST API", "SQL", "JSON"],
  },
  {
    number: "03",
    period: "PROFESSIONAL",
    title: "Production Delivery",
    type: "Engineering",
    description:
      "Worked through real development cycles including debugging, third-party integrations, notifications, payments, testing, platform-specific issues, and mobile application deployment.",
    technologies: ["Firebase", "FCM", "Razorpay", "App Deployment"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".experience-heading", {
        scrollTrigger: {
          trigger: ".experience-heading",
          start: "top 85%",
          once: true,
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".experience-item", {
        scrollTrigger: {
          trigger: ".experience-list",
          start: "top 80%",
        },
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".experience-footer", {
        scrollTrigger: {
          trigger: ".experience-footer",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-48"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="experience-heading mb-20">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/30">
            Experience
          </p>

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              Built in
              <br />
              <span className="text-white/30">the real world.</span>
            </h2>

            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Professional experience building and integrating production
              mobile applications, APIs, backend services, and third-party
              systems.
            </p>
          </div>
        </div>

        {/* Experience list */}
        <div className="experience-list border-t border-white/10">
          {experiences.map((experience) => (
            <article
              key={experience.number}
              className="experience-item group relative grid gap-8 border-b border-white/10 py-10 md:grid-cols-[100px_1fr_220px] md:py-14"
            >
              {/* Number */}
              <div className="font-mono text-xs text-white/20">
                {experience.number}
              </div>

              {/* Main content */}
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/30">
                    <BriefcaseBusiness size={11} strokeWidth={1.5} />
                    {experience.period}
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                    {experience.type}
                  </span>
                </div>

                <h3 className="mb-5 text-3xl font-medium tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                  {experience.title}
                </h3>

                <p className="max-w-2xl text-sm leading-7 text-white/40 md:text-base">
                  {experience.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="md:pt-2">
                <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-white/20">
                  Technologies
                </p>

                <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs text-white/35 transition-colors duration-300 group-hover:text-white/60"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-700 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* Footer statement */}
        <div className="experience-footer mt-20 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
              Focus
            </p>

            <p className="mt-3 text-lg tracking-[-0.03em] text-white/60">
              Mobile products + connected backend systems
            </p>
          </div>

          <a
            href="#contact"
            data-cursor
            className="group inline-flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
          >
            Discuss a project

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-transform duration-300 group-hover:rotate-45 group-hover:border-white/30">
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}