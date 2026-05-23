import { ChevronRight } from "lucide-react";
import { StatusPill } from "@/components/dashboard/status-pill";
import type { DashboardGuild } from "@/lib/dashboard-data";

type DashboardTopbarProps = {
  activeGuild: DashboardGuild;
  enabledCount: number;
  totalModules: number;
};

export function DashboardTopbar({
  activeGuild,
  enabledCount,
  totalModules,
}: DashboardTopbarProps) {
  return (
    <header className="shrink-0 border-b border-white/8 bg-[#0f1117]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/45">
            <span>Dashboard</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{activeGuild.name}</span>
          </div>

          <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            Server Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPill active={activeGuild.botInstalled}>
            {activeGuild.botInstalled ? "Bot connected" : "Bot not installed"}
          </StatusPill>
          <StatusPill active>
            {enabledCount}/{totalModules} modules enabled
          </StatusPill>
        </div>
      </div>
    </header>
  );
}
