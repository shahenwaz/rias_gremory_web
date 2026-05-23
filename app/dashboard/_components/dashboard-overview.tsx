import { Bot, Hash, Sparkles, Users } from "lucide-react";
import { DashboardInfoCard } from "@/app/dashboard/_components/dashboard-info-card";
import { DashboardStatCard } from "@/app/dashboard/_components/dashboard-stat-card";
import { ModuleSection } from "@/app/dashboard/_components/module-section";
import type {
  DashboardGuild,
  DashboardModule,
  DashboardModuleGroup,
  DashboardSettings,
} from "@/app/dashboard/_data/dashboard-data";

type DashboardOverviewProps = {
  activeGuild: DashboardGuild;
  settings: DashboardSettings;
  modules: DashboardModule[];
  enabledCount: number;
  onToggleModule: (moduleId: string) => void;
};

export function DashboardOverview({
  activeGuild,
  settings,
  modules,
  enabledCount,
  onToggleModule,
}: DashboardOverviewProps) {
  const groupedModules = {
    utility: modules.filter(
      (module: DashboardModule) => module.group === "utility",
    ),
    moderation: modules.filter(
      (module: DashboardModule) => module.group === "moderation",
    ),
    others: modules.filter(
      (module: DashboardModule) => module.group === "others",
    ),
  } satisfies Record<DashboardModuleGroup, DashboardModule[]>;

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/4">
        <div className="relative p-5 sm:p-6">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid gap-5 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                JSON mock mode
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                Build the dashboard first. Connect the real bot API later.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                This page is using local JSON data for now. The UI will stay the
                same later; only the data layer will change when the VPS API or
                bot storage details are ready.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <DashboardStatCard
                label="Members"
                value={activeGuild.memberCount.toLocaleString()}
              />
              <DashboardStatCard label="Role" value={activeGuild.role} />
              <DashboardStatCard
                label="Modules"
                value={`${enabledCount}/${modules.length}`}
              />
              <DashboardStatCard
                label="Logs"
                value={settings.controlPanelLogs.enabled ? "Active" : "Off"}
              />
            </div>
          </div>
        </div>
      </section>

      {!activeGuild.botInstalled ? (
        <section className="rounded-2xl border border-amber-400/20 bg-amber-400/8 p-4 text-sm text-amber-100">
          This server is visible because the user has permission, but the bot is
          not installed yet. Later this will show an invite button.
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        <DashboardInfoCard
          icon={<Users className="h-4 w-4" />}
          label="Permission check"
          title="Admin access verified"
          text="Mocked for now. Later Discord OAuth will check Manage Server or Administrator permission."
        />
        <DashboardInfoCard
          icon={<Bot className="h-4 w-4" />}
          label="Bot execution"
          title="Bot still does the work"
          text="Dashboard only saves settings. The Discord bot reads those settings and performs the action."
        />
        <DashboardInfoCard
          icon={<Hash className="h-4 w-4" />}
          label="Control logs"
          title={settings.controlPanelLogs.lastAction}
          text={`Last updated ${settings.controlPanelLogs.lastUpdated} in ${settings.controlPanelLogs.channelName}.`}
        />
      </section>

      {(Object.keys(groupedModules) as DashboardModuleGroup[]).map(
        (group: DashboardModuleGroup) => (
          <ModuleSection
            key={group}
            group={group}
            modules={groupedModules[group]}
            onToggleModule={onToggleModule}
          />
        ),
      )}
    </div>
  );
}
