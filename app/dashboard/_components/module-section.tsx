import { ModuleCard } from "@/app/dashboard/_components/module-card";
import type {
  DashboardModule,
  DashboardModuleGroup,
} from "@/app/dashboard/_data/dashboard-data";

type ModuleSectionProps = {
  group: DashboardModuleGroup;
  modules: DashboardModule[];
  onToggleModule: (moduleId: string) => void;
};

const groupLabels: Record<DashboardModuleGroup, string> = {
  utility: "Module Settings",
  moderation: "Moderation",
  others: "Others",
};

const groupDescriptions: Record<DashboardModuleGroup, string> = {
  utility: "Core server setup and member experience tools.",
  moderation: "Logging, safety, and staff control modules.",
  others: "Dashboard activity and control panel records.",
};

export function ModuleSection({
  group,
  modules,
  onToggleModule,
}: ModuleSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/75">
            {groupLabels[group]}
          </p>
          <h2 className="mt-1 text-base font-semibold text-white">
            {groupDescriptions[group]}
          </h2>
        </div>

        <p className="text-xs text-white/35">{modules.length} modules</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {modules.map((module: DashboardModule) => (
          <ModuleCard
            key={module.id}
            module={module}
            onToggle={() => onToggleModule(module.id)}
          />
        ))}
      </div>
    </section>
  );
}
