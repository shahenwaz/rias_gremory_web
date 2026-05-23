"use client";

import * as React from "react";
import type {
  DashboardGuild,
  DashboardModule,
  DashboardModuleGroup,
  DashboardSettings,
} from "@/app/dashboard/_data/dashboard-data";

type DashboardContextValue = {
  guilds: DashboardGuild[];
  settings: DashboardSettings[];
  activeGuildId: string;
  activeGuild: DashboardGuild;
  activeSettings: DashboardSettings;
  modules: DashboardModule[];
  enabledCount: number;
  groupedModules: Record<DashboardModuleGroup, DashboardModule[]>;
  setActiveGuildId: (guildId: string) => void;
  toggleModule: (moduleId: string) => void;
};

const DashboardContext = React.createContext<DashboardContextValue | null>(
  null,
);

type DashboardProviderProps = {
  guilds: DashboardGuild[];
  settings: DashboardSettings[];
  children: React.ReactNode;
};

function buildModuleState(modules: DashboardModule[]) {
  return Object.fromEntries(
    modules.map((module: DashboardModule) => [module.id, module.enabled]),
  ) as Record<string, boolean>;
}

export function DashboardProvider({
  guilds,
  settings,
  children,
}: DashboardProviderProps) {
  const firstGuild = guilds[0];
  const firstSettings = settings[0];

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
    ) ?? firstSettings;

  const [moduleState, setModuleState] = React.useState<Record<string, boolean>>(
    () => buildModuleState(activeSettings?.modules ?? []),
  );

  React.useEffect(() => {
    setModuleState(buildModuleState(activeSettings?.modules ?? []));
  }, [activeGuildId, activeSettings]);

  if (!activeGuild || !activeSettings) {
    return null;
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
    <DashboardContext.Provider
      value={{
        guilds,
        settings,
        activeGuildId,
        activeGuild,
        activeSettings,
        modules,
        enabledCount,
        groupedModules,
        setActiveGuildId,
        toggleModule,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = React.useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return context;
}
