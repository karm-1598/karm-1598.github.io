"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Mail,
  Link,
  MapPin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-eyebrow", {
        scrollTrigger: {
          trigger: ".contact-eyebrow",
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".contact-heading", {
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 85%",
          once: true,
        },
        y: 100,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      });

      gsap.from(".contact-copy", {
        scrollTrigger: {
          trigger: ".contact-copy",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".contact-links", {
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 90%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".contact-orbit", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".contact-glow", {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#080808] px-6 py-32 md:px-12 lg:px-20 lg:py-48"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="contact-glow absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.06] blur-[130px]" />

        <div className="contact-orbit absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />
      </div>

      <div className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center">
        {/* Eyebrow */}
        <div className="contact-eyebrow mb-8 flex items-center gap-4">
          <span className="h-px w-10 bg-white/30" />

          <p className="text-xs uppercase tracking-[0.35em] text-white/30">
            Start a project
          </p>
        </div>

        {/* Heading */}
        <h2 className="contact-heading max-w-6xl text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">
          Have a product
          <br />
          <span className="text-white/30">in mind?</span>
        </h2>

        {/* Copy */}
        <div className="contact-copy mt-12 max-w-2xl">
          <p className="text-lg leading-8 text-white/50 md:text-xl">
            If you&apos;re looking for a developer who can work across the
            mobile interface, API layer, and backend systems, let&apos;s talk
            about what you&apos;re building.
          </p>

          <a
            href="mailto:karmpatell@outlook.com"
            data-cursor
            className="group mt-10 inline-flex items-center gap-4 text-xl tracking-[-0.03em] text-white md:text-2xl"
          >
            <span className="border-b border-white/20 pb-1 transition-colors duration-300 group-hover:border-white">
              karmpatell@outlook.com
            </span>

            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:border-white/30">
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </a>
        </div>

        {/* Links */}
        <div className="contact-links mt-24 grid border-t border-white/10 md:grid-cols-3">
          {/* Email */}
          <a
            href="mailto:karmpatell@outlook.com"
            data-cursor
            className="group flex items-center gap-5 border-b border-white/10 py-7 md:border-b-0 md:border-r md:pr-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-white/30">
              <Mail size={15} strokeWidth={1.5} />
            </span>

            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                Email
              </p>

              <p className="mt-2 text-sm text-white/50 transition-colors group-hover:text-white/80">
                Get in touch
              </p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/karm-1598"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group flex items-center gap-5 border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-white/30">
              <Link size={15} strokeWidth={1.5} />
            </span>

            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                GitHub
              </p>

              <p className="mt-2 text-sm text-white/50 transition-colors group-hover:text-white/80">
                View my code
              </p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/karm-patel-1170b1273"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group flex items-center gap-5 py-7 md:pl-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-white/30">
              <Link size={15} strokeWidth={1.5} />
            </span>

            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                LinkedIn
              </p>

              <p className="mt-2 text-sm text-white/50 transition-colors group-hover:text-white/80">
                Connect with me
              </p>
            </div>
          </a>
        </div>

        {/* Location */}
        <div className="mt-10 flex items-center gap-3 text-white/20">
          <MapPin size={13} strokeWidth={1.5} />

          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
            Gandhinagar, Gujarat, India
          </span>
        </div>
      </div>
    </section>
  );
}