"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bot,
  ChevronRight,
  Hash,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  DashboardGuild,
  DashboardModule,
  DashboardModuleGroup,
  DashboardSettings,
} from "@/lib/dashboard-data";

type DashboardShellProps = {
  guilds: DashboardGuild[];
  settings: DashboardSettings[];
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

const moduleIcons: Record<string, string> = {
  utility: "⚙️",
  "welcome-goodbye": "👋",
  "auto-roles": "🎭",
  "self-roles": "🧩",
  statistics: "📊",
  moderation: "🛡️",
  logs: "📜",
  automod: "🚨",
  "control-panel-logs": "🧾",
  "mod-actions": "🔨",
};

function buildModuleState(modules: DashboardModule[]) {
  return Object.fromEntries(
    modules.map((module: DashboardModule) => [module.id, module.enabled]),
  ) as Record<string, boolean>;
}

export function DashboardShell({ guilds, settings }: DashboardShellProps) {
  const firstGuild = guilds[0];
  const [activeGuildId, setActiveGuildId] = React.useState(
    firstGuild?.id ?? "",
  );

  const activeGuild =
    guilds.find((guild: DashboardGuild) => guild.id === activeGuildId) ??
    firstGuild;

  const activeSettings =
    settings.find(
      (dashboardSettings: DashboardSettings) =>
        dashboardSettings.guildId === activeGuildId,
    ) ?? settings[0];

  const [moduleState, setModuleState] = React.useState<Record<string, boolean>>(
    () => buildModuleState(activeSettings?.modules ?? []),
  );

  React.useEffect(() => {
    setModuleState(buildModuleState(activeSettings?.modules ?? []));
  }, [activeGuildId, activeSettings]);

  if (!activeGuild || !activeSettings) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-sm rounded-2xl border border-white/10 bg-white/4 p-6">
          <p className="text-sm font-medium text-white">No dashboard data</p>
          <p className="mt-2 text-sm text-white/55">
            Add a mock guild first, then reload the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const modules = activeSettings.modules.map((module: DashboardModule) => ({
    ...module,
    enabled: moduleState[module.id] ?? module.enabled,
  }));

  const enabledCount = modules.filter(
    (module: DashboardModule) => module.enabled,
  ).length;

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

  function toggleModule(moduleId: string) {
    setModuleState((currentState: Record<string, boolean>) => ({
      ...currentState,
      [moduleId]: !currentState[moduleId],
    }));
  }

  return (
    <div className="flex min-h-screen bg-[#0b0d13] text-white">
      <aside className="hidden w-19 border-r border-white/8 bg-[#0a0b10] px-3 py-4 md:block">
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-sm font-bold shadow-lg shadow-primary/20"
            aria-label="Back to website"
          >
            RG
          </Link>

          <div className="h-px w-9 bg-white/10" />

          {guilds.map((guild: DashboardGuild) => (
            <button
              key={guild.id}
              type="button"
              onClick={() => setActiveGuildId(guild.id)}
              className={cn(
                "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border text-xs font-semibold transition-all",
                activeGuildId === guild.id
                  ? "border-primary/50 bg-primary/20 text-white shadow-lg shadow-primary/10"
                  : "border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:bg-white/10 hover:text-white",
              )}
              title={guild.name}
            >
              {activeGuildId === guild.id ? (
                <span className="absolute -left-3 h-8 w-1 rounded-r-full bg-primary" />
              ) : null}
              {guild.icon}
            </button>
          ))}
        </div>
      </aside>

      <aside className="hidden w-72 border-r border-white/8 bg-[#101218] lg:block">
        <div className="border-b border-white/8 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/35">
            Control Panel
          </p>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-sm font-bold text-primary">
                {activeGuild.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {activeGuild.name}
                </p>
                <p className="text-xs text-white/45">{activeGuild.role}</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-5 p-4">
          <SidebarGroup title="Overview">
            <SidebarItem active icon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </SidebarItem>
            <SidebarItem icon={<Settings2 className="h-4 w-4" />}>
              Module Settings
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="Moderation">
            <SidebarItem icon={<ShieldCheck className="h-4 w-4" />}>
              Logs
            </SidebarItem>
            <SidebarItem icon={<Bot className="h-4 w-4" />}>
              Mod Actions
            </SidebarItem>
          </SidebarGroup>

          <SidebarGroup title="System">
            <SidebarItem icon={<Hash className="h-4 w-4" />}>
              Control Panel Logs
            </SidebarItem>
          </SidebarGroup>
        </nav>
      </aside>

      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-white/8 bg-[#0f1117]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
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
                {activeGuild.botInstalled
                  ? "Bot connected"
                  : "Bot not installed"}
              </StatusPill>
              <StatusPill active>{enabledCount} modules enabled</StatusPill>
            </div>
          </div>
        </header>

        <div className="space-y-5 px-4 py-5 sm:px-6 lg:px-8">
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
                    This page is using local JSON data for now. The UI will stay
                    the same later; only the data layer will change when the VPS
                    API or bot storage details are ready.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <DashboardStat
                    label="Members"
                    value={activeGuild.memberCount.toLocaleString()}
                  />
                  <DashboardStat label="Role" value={activeGuild.role} />
                  <DashboardStat
                    label="Modules"
                    value={`${enabledCount}/${modules.length}`}
                  />
                  <DashboardStat
                    label="Logs"
                    value={
                      activeSettings.controlPanelLogs.enabled ? "Active" : "Off"
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {!activeGuild.botInstalled ? (
            <section className="rounded-2xl border border-amber-400/20 bg-amber-400/8 p-4 text-sm text-amber-100">
              This server is visible because the user has permission, but the
              bot is not installed yet. Later this will show an invite button.
            </section>
          ) : null}

          <section className="grid gap-4 lg:grid-cols-3">
            <InfoCard
              icon={<Users className="h-4 w-4" />}
              label="Permission check"
              title="Admin access verified"
              text="Mocked for now. Later Discord OAuth will check Manage Server or Administrator permission."
            />
            <InfoCard
              icon={<Bot className="h-4 w-4" />}
              label="Bot execution"
              title="Bot still does the work"
              text="Dashboard only saves settings. The Discord bot reads those settings and performs the action."
            />
            <InfoCard
              icon={<Hash className="h-4 w-4" />}
              label="Control logs"
              title={activeSettings.controlPanelLogs.lastAction}
              text={`Last updated ${activeSettings.controlPanelLogs.lastUpdated} in ${activeSettings.controlPanelLogs.channelName}.`}
            />
          </section>

          {(Object.keys(groupedModules) as DashboardModuleGroup[]).map(
            (group: DashboardModuleGroup) => (
              <section key={group} className="space-y-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
                      {groupLabels[group]}
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                      {groupDescriptions[group]}
                    </h2>
                  </div>
                  <p className="text-xs text-white/40">
                    {groupedModules[group].length} modules
                  </p>
                </div>

                <div className="grid gap-3 xl:grid-cols-2">
                  {groupedModules[group].map((module: DashboardModule) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onToggle={() => toggleModule(module.id)}
                    />
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarItem({
  active = false,
  icon,
  children,
}: {
  active?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/15 text-white"
          : "text-white/50 hover:bg-white/6 hover:text-white",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function StatusPill({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-white/10 bg-white/5 text-white/50",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-emerald-300" : "bg-white/35",
        )}
      />
      {children}
    </span>
  );
}

function DashboardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 truncate text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  title,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-xs font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/50">{text}</p>
    </div>
  );
}

function ModuleCard({
  module,
  onToggle,
}: {
  module: DashboardModule;
  onToggle: () => void;
}) {
  const isDisabled = module.status === "later";

  return (
    <article className="rounded-2xl border border-white/10 bg-[#12151d] p-4 transition-colors hover:border-white/18 hover:bg-[#151924]">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-xl">
          {moduleIcons[module.id] ?? "✨"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-white">{module.label}</h3>
                <ModuleStatus status={module.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-white/50">
                {module.description}
              </p>
            </div>

            <button
              type="button"
              onClick={onToggle}
              disabled={isDisabled}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
                isDisabled
                  ? "cursor-not-allowed border-white/10 bg-white/5 opacity-50"
                  : "cursor-pointer",
                module.enabled
                  ? "border-primary/40 bg-primary"
                  : "border-white/10 bg-white/8",
              )}
              aria-label={`Toggle ${module.label}`}
            >
              <span
                className={cn(
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                  module.enabled ? "translate-x-5" : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/45">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {module.channelName}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {module.statsLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {module.enabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ModuleStatus({ status }: { status: DashboardModule["status"] }) {
  const labelMap: Record<DashboardModule["status"], string> = {
    ready: "Ready",
    "needs-api": "Needs API",
    later: "Later",
  };

  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[11px] font-medium",
        status === "ready" &&
          "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
        status === "needs-api" &&
          "border-sky-400/20 bg-sky-400/10 text-sky-200",
        status === "later" && "border-white/10 bg-white/5 text-white/40",
      )}
    >
      {labelMap[status]}
    </span>
  );
}
