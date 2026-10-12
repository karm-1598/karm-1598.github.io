"use client";

import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { Magnetic } from "@/components/motion/MotionPolish";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/portfolio";

const headline = ["Full-Stack", "Mobile Developer"];

const characterVariants = {
  hidden: { opacity: 1, y: "0.45em" },
  visible: { opacity: 1, y: 0 },
};

export default function GlassRefractionHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center px-5 pb-24 pt-32 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:pt-28"
      data-scroll-zone="hero"
      id="home"
    >
      <div className="relative max-w-5xl">
        <p className="section-kicker">
          <span>Flutter Developer</span>
          <span aria-hidden="true" className="text-accent">
            /
          </span>
          <span>.NET Backend Engineer</span>
        </p>
        <motion.h1
          aria-label={headline.join(" ")}
          className="hero-title type-display mt-8 max-w-5xl"
          id="hero-title"
          initial={shouldReduceMotion ? false : "hidden"}
          transition={{ delayChildren: 0.12, staggerChildren: 0.018 }}
          variants={{
            hidden: {},
            visible: {},
          }}
          viewport={{ once: true, amount: 0.7 }}
          whileInView="visible"
        >
          <span className="sr-only">{headline.join(" ")}</span>
          <span aria-hidden="true" className="block">
            {Array.from(headline[0]).map((character, index) => (
              <motion.span
                className={
                  character === " "
                    ? "inline-block w-[0.25em]"
                    : "inline-block"
                }
                key={`${character}-${index}`}
                variants={characterVariants}
              >
                {character}
              </motion.span>
            ))}
          </span>
          <span aria-hidden="true" className="block text-accent">
            {Array.from(headline[1]).map((character, index) => (
              <motion.span
                className={
                  character === " "
                    ? "inline-block w-[0.25em]"
                    : "inline-block"
                }
                key={`${character}-${index}`}
                variants={characterVariants}
              >
                {character}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        <p className="type-body mt-7 max-w-2xl text-muted">
          Flutter Developer | .NET Backend Engineer
        </p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/80 sm:text-base sm:leading-7">
          {siteConfig.defaultDescription}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Button
              nativeButton={false}
              render={<Link href="#work" />}
              size="lg"
            >
              Explore selected work
              <ArrowDownRight aria-hidden="true" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Link
              className="animated-underline inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href="#contact"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
      <a
        aria-label="Scroll to explore selected work"
        className="absolute bottom-7 left-1/2 inline-flex -translate-x-1/2 items-center gap-3 font-mono text-[0.65rem] tracking-[0.16em] text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        href="#work"
      >
        SCROLL TO EXPLORE
        <ArrowDown aria-hidden="true" className="size-3" />
      </a>
    </section>
  );
}
