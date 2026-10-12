"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import type { BuildStep, ExperienceEntry } from "@/data/portfolio";
import { useReducedMotion } from "@/lib/useReducedMotion";

function TimelineNode({
  step,
  index,
  progress,
  reducedMotion,
}: {
  step: BuildStep;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = Math.max(0, (index - 0.65) / 5);
  const end = Math.min(1, (index + 0.35) / 5);
  const backgroundColor = useTransform(
    progress,
    [start, end],
    ["rgba(8, 11, 14, 0.98)", "rgba(140, 228, 209, 0.2)"],
  );
  const borderColor = useTransform(
    progress,
    [start, end],
    ["rgba(140, 228, 209, 0.25)", "rgba(140, 228, 209, 0.9)"],
  );
  const color = useTransform(
    progress,
    [start, end],
    ["#8ce4d1", "#f1f4f5"],
  );
  const boxShadow = useTransform(
    progress,
    [start, end],
    ["0 0 0 rgba(140, 228, 209, 0)", "0 0 24px rgba(140, 228, 209, 0.35)"],
  );

  return (
    <motion.span
      aria-label={`Step ${step.number}: ${step.title}`}
      className="relative z-10 grid size-10 place-items-center rounded-full border bg-background font-mono text-[0.65rem] sm:size-12"
      style={
        reducedMotion
          ? undefined
          : { backgroundColor, borderColor, boxShadow, color }
      }
    >
      {step.number}
    </motion.span>
  );
}

function BuildTimeline({ steps }: { steps: BuildStep[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 25%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative mt-12" ref={timelineRef}>
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-5 top-6 w-px bg-border sm:left-6 lg:left-1/2 lg:-translate-x-1/2"
      >
        <motion.div
          className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent to-glow"
          style={{ scaleY: reducedMotion ? 1 : lineScale }}
        />
      </div>
      <ol className="relative space-y-6 sm:space-y-8">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;

          return (
            <li
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-5 lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] lg:gap-x-6"
              key={step.number}
            >
              <div className="col-start-1 row-start-1 flex justify-center lg:col-start-2">
                <TimelineNode
                  index={index}
                  progress={scrollYProgress}
                  reducedMotion={Boolean(reducedMotion)}
                  step={step}
                />
              </div>
              <motion.article
                className={`col-start-2 row-start-1 min-w-0 lg:col-span-1 ${
                  isLeft
                    ? "lg:col-start-1 lg:row-start-1 lg:text-right"
                    : "lg:col-start-3 lg:row-start-1"
                }`}
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.25 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="h-full p-5 sm:p-6">
                  <div
                    className={`flex flex-wrap items-center gap-3 ${
                      isLeft ? "lg:justify-end" : ""
                    }`}
                  >
                    <h3 className="type-heading text-[1.375rem] sm:text-2xl">
                      {step.title}
                    </h3>
                    <Badge tone="accent">{step.label}</Badge>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-6 text-foreground/75 ${
                      isLeft ? "lg:ml-auto lg:max-w-xl" : "max-w-xl"
                    }`}
                  >
                    {step.description}
                  </p>
                </GlassCard>
              </motion.article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ExperienceList({ experiences }: { experiences: ExperienceEntry[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-20 border-t border-border pt-9">
      <p className="section-kicker">Professional experience</p>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {experiences.map((experience, index) => (
          <motion.article
            className={
              index === 0 && experiences.length === 3 ? "lg:col-span-2" : ""
            }
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            key={experience.number}
            transition={{
              delay: index * 0.07,
              duration: 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="grid h-full gap-5 p-5 sm:p-6 md:grid-cols-[minmax(9rem,0.7fr)_minmax(0,1.3fr)] md:gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">
                    {experience.number}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-border" />
                  <span className="text-[0.65rem] font-medium tracking-[0.12em] text-muted">
                    {experience.period}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {experience.title}
                </h3>
                <p className="mt-1 text-xs text-muted">{experience.type}</p>
              </div>
              <div>
                <p className="text-sm leading-6 text-foreground/75">
                  {experience.description}
                </p>
                <ul
                  aria-label={`${experience.title} technologies`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {experience.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge>{technology}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function BuildExperience({
  buildSteps,
  experiences,
}: {
  buildSteps: BuildStep[];
  experiences: ExperienceEntry[];
}) {
  return (
    <>
      <div className="mt-8">
        <h2 className="type-title">
          From product
          <br />
          to release.
        </h2>
        <p className="type-body mt-6 max-w-lg text-muted">
          A practical flow through product definition, Flutter, integration,
          backend, data, and delivery.
        </p>
      </div>
      <BuildTimeline steps={buildSteps} />
      <ExperienceList experiences={experiences} />
    </>
  );
}
