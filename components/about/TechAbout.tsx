"use client";

import { motion } from "motion/react";

import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type {
  Capability,
  ExperienceEntry,
  Project,
} from "@/data/portfolio";

type TechAboutProps = {
  capabilities: Capability[];
  experiences: ExperienceEntry[];
  projects: Project[];
  location: string;
  role: string;
};

function TechnologyMarquee({ technologies }: { technologies: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <ul
        aria-label="Technologies"
        className="mt-8 flex flex-wrap gap-2.5"
      >
        {technologies.map((technology) => (
          <li key={technology}>
            <Badge>{technology}</Badge>
          </li>
        ))}
      </ul>
    );
  }

  const midpoint = Math.ceil(technologies.length / 2);
  const rows = [technologies.slice(0, midpoint), technologies.slice(midpoint)];

  return (
    <div
      aria-label="Technologies"
      className="tech-marquee relative mt-8 space-y-3"
      role="group"
    >
      {rows.map((row, rowIndex) => {
        const loop = [...row, ...row];

        return (
          <div
            className="tech-marquee__viewport"
            key={`tech-row-${rowIndex + 1}`}
          >
            <ul
              aria-label={`Technology marquee row ${rowIndex + 1}`}
              className={`tech-marquee__track ${
                rowIndex === 0
                  ? "tech-marquee__track--forward"
                  : "tech-marquee__track--reverse"
              }`}
            >
              {loop.map((technology, index) => (
                <li
                  aria-hidden={index >= row.length}
                  key={`${technology}-${index}`}
                >
                  <Badge>{technology}</Badge>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default function TechAbout({
  capabilities,
  experiences,
  location,
  projects,
  role,
}: TechAboutProps) {
  const reducedMotion = useReducedMotion();
  const technologies = Array.from(
    new Set([
      ...projects.flatMap((project) => project.technologies),
      ...capabilities.flatMap((capability) => capability.technologies),
      ...experiences.flatMap((experience) => experience.technologies),
    ]),
  );
  const focus = Array.from(
    new Set(capabilities.slice(0, 3).map((capability) => capability.title)),
  );

  return (
    <div className="space-y-20 md:space-y-28">
      <div>
        <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="type-title max-w-3xl">Tools across the stack.</h2>
          <p className="max-w-sm text-sm leading-6 text-muted">
            Technologies listed across projects, capabilities, and professional
            experience.
          </p>
        </div>
        <TechnologyMarquee technologies={technologies} />
      </div>

      <section
        aria-labelledby="about-title"
        className="scroll-mt-24 border-t border-border pt-12 md:pt-16"
        id="about"
      >
        <p className="section-kicker">About</p>
        <h2 className="type-title mt-8 max-w-5xl" id="about-title">
          I build products
          <br />
          <span className="text-accent">that connect.</span>
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.38fr)] lg:gap-14">
          <motion.div
            className="max-w-4xl"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="font-display text-2xl leading-[1.35] tracking-[-0.035em] text-foreground/85 sm:text-3xl md:text-4xl">
              I&apos;m a <strong className="font-medium text-accent">Flutter developer</strong>{" "}
              who works across the mobile and backend layers of a product.
            </p>
            <p className="mt-8 text-base leading-8 text-foreground/70">
              My primary focus is building cross-platform mobile applications
              with <strong className="font-semibold text-foreground">Flutter</strong>,
              while also working with{" "}
              <strong className="font-semibold text-foreground">REST APIs</strong>,{" "}
              <strong className="font-semibold text-foreground">.NET backend services</strong>,
              databases, Firebase, and third-party integrations.
            </p>
            <p className="mt-6 text-base leading-8 text-foreground/70">
              That <strong className="font-semibold text-foreground">full-stack perspective</strong>{" "}
              allows me to understand more than just the interface. I can work
              with the data flow, API integration, application architecture, and
              backend systems behind the experience.
            </p>
            <p className="mt-8 border-l border-accent/50 pl-5 text-lg leading-7 text-foreground/75">
              From a mobile interface to the systems behind it, I like building
              the pieces that make a product actually work.
            </p>
          </motion.div>

          <motion.aside
            aria-label="Professional focus"
            className="lg:pt-2"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            transition={{
              delay: 0.08,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-5 sm:p-6">
              <p className="section-kicker">At a glance</p>
              <dl className="mt-6 divide-y divide-border">
                <div className="py-4 first:pt-0">
                  <dt className="font-mono text-[0.625rem] tracking-[0.14em] text-muted">
                    ROLE
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-foreground/85">
                    {role}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="font-mono text-[0.625rem] tracking-[0.14em] text-muted">
                    FOCUS
                  </dt>
                  <dd className="mt-2">
                    <ul
                      aria-label="Focus areas"
                      className="flex flex-wrap gap-2"
                    >
                      {focus.map((item) => (
                        <li key={item}>
                          <Badge>{item}</Badge>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="pb-0 pt-4">
                  <dt className="font-mono text-[0.625rem] tracking-[0.14em] text-muted">
                    LOCATION
                  </dt>
                  <dd className="mt-2 text-sm text-foreground/75">{location}</dd>
                </div>
              </dl>
            </GlassCard>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}
