import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-panel border border-border bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl md:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
