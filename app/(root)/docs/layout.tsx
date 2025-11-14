import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px,minmax(0,1fr)]">
      {/* Left sidebar */}
      <DocsSidebar />

      {/* Right docs content shell */}
      <section
        className="relative overflow-hidden rounded-2xl border border-border/60
        bg-linear-to-b from-background via-background/90 to-secondary/20
        px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
      >
        {/* subtle gradient orb */}
        <div className="pointer-events-none absolute -right-28 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl">{children}</div>
      </section>
    </div>
  );
}
