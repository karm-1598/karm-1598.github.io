import Link from "next/link";

import TechAbout from "@/components/about/TechAbout";
import BuildExperience from "@/components/build/BuildExperience";
import CapabilitiesBento from "@/components/capabilities/CapabilitiesBento";
import ContactRelease from "@/components/contact/ContactRelease";
import GlassRefractionHero from "@/components/hero/GlassRefractionHero";
import {
  DesktopCursor,
  ScrollChrome,
  SessionPreloader,
} from "@/components/motion/MotionPolish";
import SelectedWorkProjects from "@/components/projects/SelectedWorkProjects";
import Section from "@/components/ui/Section";
import {
  buildSteps,
  capabilities,
  experiences,
  navLinks,
  projects,
  siteConfig,
  socialLinks,
} from "@/data/portfolio";

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          aria-label="KP, Karm Patel home"
          className="font-display text-sm font-semibold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          href="#home"
        >
          KP<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              className="animated-underline text-xs font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-sm"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="hidden rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:inline-flex"
            href={`mailto:${siteConfig.email}`}
          >
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="font-display text-sm font-semibold tracking-[-0.03em] text-foreground">
              {siteConfig.siteName.split(" | ")[0]}
            </p>
            <p className="mt-2 text-xs text-muted">{siteConfig.role}</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
            {navLinks.map((link) => (
              <Link
                className="animated-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-border pt-5 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {year} {siteConfig.siteName.split(" | ")[0]}</p>
          <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <Link
                className="animated-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                href={link.href}
                key={link.type}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                {link.label}
                {link.href.startsWith("http") ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </Link>
            ))}
            <Link
              className="animated-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href="#home"
            >
              Back to top
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <ScrollChrome />
      <DesktopCursor />
      <SessionPreloader />
      <main
        className="relative isolate overflow-hidden"
        id="main"
        tabIndex={-1}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_10%,rgba(130,152,255,0.12),transparent_35%),radial-gradient(ellipse_at_12%_42%,rgba(140,228,209,0.07),transparent_33%)]"
        />

        <GlassRefractionHero />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Section
            className="scroll-mt-24 border-t border-border py-24 md:py-32"
            id="work"
            data-scroll-zone="work"
            label="Selected work"
            number="02"
          >
            <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="type-title max-w-3xl">
                Built for real
                <br className="hidden sm:block" /> product workflows.
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted">
                Independent projects and professional work, presented with
                their project context and technologies.
              </p>
            </div>
            <SelectedWorkProjects projects={projects} />
          </Section>

          <Section
            className="scroll-mt-24 border-t border-border py-24 md:py-32"
            id="capabilities"
            data-scroll-zone="capabilities"
            label="Capabilities"
            number="03"
          >
            <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="type-title max-w-3xl">
                One product.
                <br className="hidden sm:block" /> Connected layers.
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted">
                Mobile, APIs, backend, data, and supporting services—connected
                across the product flow.
              </p>
            </div>
            <CapabilitiesBento capabilities={capabilities} />
          </Section>

          <Section
            className="scroll-mt-24 border-t border-border py-24 md:py-32"
            id="build"
            data-scroll-zone="build"
            label="How I build / experience"
            number="04"
          >
            <BuildExperience
              buildSteps={buildSteps}
              experiences={experiences}
            />
          </Section>

          <Section
            className="scroll-mt-24 border-t border-border py-24 md:py-32"
            id="data"
            data-scroll-zone="database"
            label="Data & services"
            number="05"
          >
            <TechAbout
              capabilities={capabilities}
              experiences={experiences}
              location={siteConfig.location}
              projects={projects}
              role={siteConfig.role}
            />
          </Section>

          <Section
            className="scroll-mt-24 border-t border-border py-24 md:py-32"
            id="contact"
            data-scroll-zone="contact"
            label="Contact / release"
            number="06"
          >
            <ContactRelease />
          </Section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
