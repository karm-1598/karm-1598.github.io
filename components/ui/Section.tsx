import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  number: string;
  label: string;
  children: ReactNode;
};

export default function Section({
  number,
  label,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn("relative", className)} {...props}>
      <p className="section-kicker">
        <span className="sr-only">Section </span>
        <span className="font-mono text-accent">{number}</span>
        <span>{label}</span>
      </p>
      {children}
    </section>
  );
}
