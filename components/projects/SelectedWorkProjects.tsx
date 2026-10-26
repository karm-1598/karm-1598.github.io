"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import type { Project } from "@/data/portfolio";
import { useReducedMotion } from "@/lib/useReducedMotion";

const storeLinks = [
  {
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.lpsofusa.app",
  },
  {
    label: "App Store",
    href: "https://apps.apple.com/in/app/lps-of-usa/id1375100991",
  },
];

// Project preview images when files are provided in /public/projects/
const projectPreviewImages: Partial<
  Record<Project["visual"], { src: string; alt: string }>
> = {};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const preview = projectPreviewImages[project.visual];

  return (
    <motion.article
      className={project.visual === "lps" ? "md:col-span-2" : ""}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28, rotateX: 3 }}
      style={{ transformPerspective: 1100, transformOrigin: "center bottom" }}
      transition={{
        delay: (index % 2) * 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -5, rotateX: 1.3, rotateY: index % 2 ? -1.1 : 1.1 }
      }
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    >
      <GlassCard className="flex h-full flex-col overflow-hidden p-5 sm:p-7">
        {preview ? (
          <div className="relative mb-5 overflow-hidden rounded-[calc(var(--radius-panel)-0.4rem)] border border-white/[0.09]">
            <Image
              alt={preview.alt}
              className="h-auto w-full object-cover"
              height={450}
              src={preview.src}
              unoptimized
              width={800}
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs text-accent">
              {project.number}
            </span>
            <Badge tone={project.type === "Independent" ? "accent" : "neutral"}>
              {project.type}
            </Badge>
          </div>
          <h3 className="type-heading mt-6">{project.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/75">
            {project.description}
          </p>
          <ul
            aria-label={`${project.title} technologies`}
            className="mt-auto flex flex-wrap gap-2 pt-7"
          >
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge>{technology}</Badge>
              </li>
            ))}
          </ul>
          {project.visual === "lps" ? (
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-4">
              {storeLinks.map((link) => (
                <Link
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </GlassCard>
    </motion.article>
  );
}

export default function SelectedWorkProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard index={index} key={project.number} project={project} />
      ))}
    </div>
  );
}
