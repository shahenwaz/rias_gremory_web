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
          className="
            relative overflow-hidden rounded-2xl
            border border-border/70
            bg-card/60
          "
        >
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
