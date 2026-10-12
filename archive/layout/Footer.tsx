"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUp } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10 bg-[#080808] px-6 pb-8 pt-16 md:px-12 lg:px-20"
    >
      <div className="footer-content mx-auto max-w-7xl">
        {/* Main footer */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          {/* Brand */}
          <div>
            <a
              href="#"
              data-cursor
              className="text-2xl font-semibold tracking-[-0.05em]"
            >
              KP<span className="text-white/25">.</span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/30">
              Full-Stack Mobile Developer building Flutter applications and
              the systems behind them.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm md:grid-cols-3 md:gap-x-12">
            <a
              href="#work"
              data-cursor
              className="text-white/40 transition-colors hover:text-white"
            >
              Work
            </a>

            <a
              href="#capabilities"
              data-cursor
              className="text-white/40 transition-colors hover:text-white"
            >
              Capabilities
            </a>

            <a
              href="#process"
              data-cursor
              className="text-white/40 transition-colors hover:text-white"
            >
              Process
            </a>

            <a
              href="#experience"
              data-cursor
              className="text-white/40 transition-colors hover:text-white"
            >
              Experience
            </a>

            <a
              href="#about"
              data-cursor
              className="text-white/40 transition-colors hover:text-white"
            >
              About
            </a>

            <a
              href="#contact"
              data-cursor
              className="text-white/40 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            data-cursor
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm text-white/40 transition-colors hover:text-white"
          >
            Back to top

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/30">
              <ArrowUp size={14} strokeWidth={1.5} />
            </span>
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/20 md:flex-row">
          <p>© {new Date().getFullYear()} Karm Patel</p>

          <div className="flex gap-6">
            <a
              href="https://github.com/karm-1598"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="transition-colors hover:text-white/60"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/karm-patel-1170b1273"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="transition-colors hover:text-white/60"
            >
              LinkedIn
            </a>

            <a
              href="mailto:karmpatell@outlook.com"
              data-cursor
              className="transition-colors hover:text-white/60"
            >
              Email
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}