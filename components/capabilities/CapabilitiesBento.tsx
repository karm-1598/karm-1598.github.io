"use client";

import {
  Cloud,
  Code2,
  Database,
  Layers3,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import type { Capability } from "@/data/portfolio";
import { useReducedMotion } from "@/lib/useReducedMotion";

const capabilityIcons: Record<Capability["icon"], LucideIcon> = {
  mobile: Smartphone,
  backend: Server,
  cloud: Cloud,
  architecture: Layers3,
  data: Database,
  engineering: Code2,
};

function updatePointerGlow(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") {
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--pointer-x",
    `${event.clientX - bounds.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--pointer-y",
    `${event.clientY - bounds.top}px`,
  );
}

export default function CapabilitiesBento({
  capabilities,
}: {
  capabilities: Capability[];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-full lg:block"
      >
        <svg
          className="h-full w-full overflow-visible"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 600"
        >
          <path
            d="M250 110H500M500 110H750M250 260V340H500M750 260V340H500M500 340H250M500 340H750M250 490H500M500 490H750"
            stroke="url(#api-connector)"
            strokeDasharray="2 8"
            strokeWidth="1"
          />
          {[250, 500, 750].map((x, index) => (
            <circle
              cx={x}
              cy={index === 1 ? 340 : 110}
              fill="#8ce4d1"
              key={`${x}-${index}`}
              r="3"
            />
          ))}
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="api-connector"
              x1="250"
              x2="750"
              y1="110"
              y2="490"
            >
              <stop stopColor="#8ce4d1" stopOpacity=".08" />
              <stop offset=".5" stopColor="#8ce4d1" stopOpacity=".4" />
              <stop offset="1" stopColor="#8298ff" stopOpacity=".08" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-3 top-8 z-0 w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent lg:hidden"
      />
      <div className="relative z-10 grid gap-4 lg:grid-cols-4 lg:auto-rows-[minmax(10rem,auto)]">
        {capabilities.map((capability, index) => {
          const Icon = capabilityIcons[capability.icon];
          const isLarge = index < 2;

          return (
            <motion.article
              className={isLarge ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-2"}
              key={capability.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              style={{ transformPerspective: 1100 }}
              transition={{
                delay: index * 0.07,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            >
              <GlassCard
                className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden p-5 sm:p-7"
                onPointerMove={updatePointerGlow}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(22rem circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(140, 228, 209, 0.11), transparent 72%)",
                  }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-mono text-xs tracking-[0.12em] text-accent">
                    0{index + 1} / {capability.id.toUpperCase()}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/20 bg-accent/[0.06] text-accent">
                    <Icon aria-hidden="true" className="size-[1.125rem]" />
                  </span>
                </div>
                <h3 className="type-heading relative mt-5 text-[1.5rem] sm:mt-6">
                  {capability.title}
                </h3>
                <p className="relative mt-3 max-w-2xl text-sm leading-6 text-foreground/75">
                  {capability.description}
                </p>
                <ul
                  aria-label={`${capability.title} technologies`}
                  className="relative mt-auto flex flex-wrap gap-2 pt-6"
                >
                  {capability.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge>{technology}</Badge>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
