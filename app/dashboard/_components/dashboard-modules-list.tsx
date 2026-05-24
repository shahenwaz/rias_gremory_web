"use client";

import { ModuleSection } from "@/app/dashboard/_components/module-section";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import type { DashboardModuleGroup } from "@/app/dashboard/_data/dashboard-data";

export function DashboardModulesList() {
  const { groupedModules, toggleModule } = useDashboard();

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-white/10 bg-white/4 p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/75">
          Module Settings
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Server modules
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
          Turn modules on or off here. Detailed setup is handled inside each
          module page.
        </p>
      </section>

      {(["utility", "moderation", "others"] as DashboardModuleGroup[]).map(
        (group: DashboardModuleGroup) => (
          <ModuleSection
            key={group}
            group={group}
            modules={groupedModules[group]}
            onToggleModule={toggleModule}
          />
        ),
      )}
    </div>
  );
}
