import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

type ActiveModulesSectionProps = {
  modules: DashboardModule[];
};

export function ActiveModulesSection({ modules }: ActiveModulesSectionProps) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/4 p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
            Active Modules
          </p>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
            Enabled features in this server
          </h2>
        </div>

        <Link
          href="/dashboard/modules"
          className="inline-flex w-fit items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-3 py-2 text-xs font-semibold text-white/55 transition-colors hover:border-primary/25 hover:text-primary"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {modules.length ? (
          modules
            .slice(0, 6)
            .map((module: DashboardModule) => (
              <ModuleSummaryCard key={module.id} module={module} />
            ))
        ) : (
          <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-3 text-sm text-white/45 md:col-span-2 xl:col-span-3">
            No modules are enabled yet. Open module settings to configure the
            server.
          </div>
        )}
      </div>
    </section>
  );
}

function ModuleSummaryCard({ module }: { module: DashboardModule }) {
  return (
    <article className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-3 transition-colors hover:border-white/12">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white">
            {module.label}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/40">
            {module.statsLabel}
          </p>
        </div>

        <span className="shrink-0 rounded-md border border-primary/18 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
          On
        </span>
      </div>

      <p className="mt-3 truncate rounded-md border border-white/8 bg-white/4 px-2 py-1.5 text-xs text-white/36">
        {module.channelName}
      </p>
    </article>
  );
}
