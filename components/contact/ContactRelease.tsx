"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import ContactForm from "@/components/contact/ContactForm";
import { Magnetic } from "@/components/motion/MotionPolish";
import { siteConfig, socialLinks } from "@/data/portfolio";

export default function ContactRelease() {
  const [copyMessage, setCopyMessage] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const contactLinks = socialLinks.filter(
    (link) => link.type === "github" || link.type === "linkedin",
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function copyEmail() {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard access is unavailable in this browser.");
      }

      await navigator.clipboard.writeText(siteConfig.email);
      setCopyMessage("Copied");
    } catch {
      setCopyMessage("Unable to copy email. Please select the address.");
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopyMessage(""), 3000);
  }

  return (
    <GlassCard className="relative overflow-hidden p-6 sm:p-9 md:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-accent/[0.08] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 size-80 rounded-full bg-glow/[0.07] blur-3xl"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="section-kicker">Have a product in mind?</p>
          {siteConfig.isAvailableForWork ? (
            <Badge className="gap-2" tone="accent">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
              />
              Available for work
            </Badge>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
          <div>
            <h2 className="type-title max-w-4xl">
              Let&apos;s build
              <br />
              something useful.
            </h2>
            <p className="type-body mt-5 max-w-xl text-muted">
              Get in touch to discuss mobile development, backend integration,
              or a complete product workflow.
            </p>
            <p className="mt-5 break-all font-mono text-sm text-foreground/75">
              {siteConfig.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:shrink-0">
            <Magnetic>
              <Button
                nativeButton={false}
                render={<Link href={`mailto:${siteConfig.email}`} />}
                size="lg"
              >
                Send an email
                <Mail aria-hidden="true" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                onClick={copyEmail}
                size="lg"
                type="button"
                variant="outline"
              >
                <Copy aria-hidden="true" />
                Copy email
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
          {contactLinks.map((link) => (
            <Link
              className="inline-flex min-h-8 items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href={link.href}
              key={link.type}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </Link>
          ))}
        </div>
        <ContactForm />
      </div>

      <div
        aria-atomic="true"
        aria-live="polite"
        className="pointer-events-none absolute bottom-4 right-4 z-10"
        role="status"
      >
        {copyMessage ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-sm text-foreground shadow-xl backdrop-blur-xl">
            {copyMessage === "Copied" ? (
              <Check aria-hidden="true" className="size-4 text-accent" />
            ) : null}
            {copyMessage}
          </span>
        ) : null}
      </div>
    </GlassCard>
  );
}
