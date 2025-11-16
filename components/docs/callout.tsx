"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutType = "tip" | "warning";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const typeStyles: Record<CalloutType, string> = {
  tip: "border-primary/40 bg-primary/5",
  warning: "border-destructive/60 bg-destructive/5",
};

const pillStyles: Record<CalloutType, string> = {
  tip: "bg-primary/20 text-primary-foreground/80",
  warning: "bg-destructive/15 text-destructive",
};

export function Callout({
  type = "tip",
  title,
  children,
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border px-4 py-3 text-sm sm:px-5 sm:py-4",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        typeStyles[type],
        className
      )}
    >
      {/* Subtle top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-75" />

      <div className="flex gap-3">
        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background/40 ring-1 ring-border/60">
          <span className="text-xs">{type === "tip" ? "💡" : "⚠️"}</span>
        </div>

        <div className="space-y-1">
          {title && (
            <div
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                pillStyles[type]
              )}
            >
              {title}
            </div>
          )}

          <div className="text-[13px] leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
