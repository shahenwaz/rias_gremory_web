"use client";

import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";
import { ModuleStatus } from "@/app/dashboard/_components/module-status";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

type DashboardModuleDetailProps = {
  moduleId: string;
};

export function DashboardModuleDetail({
  moduleId,
}: DashboardModuleDetailProps) {
  const { modules, toggleModule } = useDashboard();

  const selectedModule = modules.find(
    (item: DashboardModule) => item.id === moduleId,
  );

  if (!selectedModule) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/4 p-6">
        <p className="text-sm font-medium text-white">Module not found</p>
        <p className="mt-2 text-sm text-white/55">
          This module is not available in the mock settings yet.
        </p>
      </div>
    );
  }

  const isDisabled = selectedModule.status === "later";

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-white/10 bg-white/4 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/75">
                Module Settings
              </p>
              <ModuleStatus status={selectedModule.status} />
            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              {selectedModule.label}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              {selectedModule.description}
            </p>
          </div>

          <DashboardToggle
            checked={selectedModule.enabled}
            disabled={isDisabled}
            label={`Toggle ${selectedModule.label}`}
            onCheckedChange={() => toggleModule(selectedModule.id)}
          />
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#11141c] p-5 sm:p-6">
        <h2 className="text-base font-semibold text-white">
          Current configuration
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <SettingRow
            label="Status"
            value={selectedModule.enabled ? "Enabled" : "Disabled"}
          />
          <SettingRow label="Channel" value={selectedModule.channelName} />
          <SettingRow label="Summary" value={selectedModule.statsLabel} />
          <SettingRow label="Source" value="Local JSON mock" />
        </div>
      </section>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <p className="text-xs text-white/38">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
