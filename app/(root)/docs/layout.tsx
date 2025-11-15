import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Left sidebar */}
        <DocsSidebar />

        {/* Right docs content */}
        <section
          className="relative overflow-hidden rounded-2xl border border-border/60
          bg-linear-to-br from-background via-background to-secondary/15
          px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
        >
          {/* Smooth background glows */}
          <div className="pointer-events-none absolute inset-0">
            {/* top-right glow */}
            <div
              className="
                absolute right-[-120px] -top-40
                h-[260px] w-[260px] rounded-full
                bg-primary/18 blur-[110px]
              "
            />
            {/* bottom-left glow */}
            <div
              className="
                absolute -left-40 bottom-[-140px]
                h-[260px] w-[260px] rounded-full
                bg-secondary/25 blur-[110px]
              "
            />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">{children}</div>
        </section>
      </div>
    </div>
  );
}
