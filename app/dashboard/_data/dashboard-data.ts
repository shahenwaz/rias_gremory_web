import mockGuilds from "./mock-guilds.json";
import mockDashboardSettings from "./mock-dashboard-settings.json";

export type DashboardGuild = {
  id: string;
  name: string;
  icon: string;
  iconUrl?: string | null;
  memberCount: number;
  role: string;
  botInstalled: boolean;
  permissions: string[];
};

export type DashboardModuleGroup = "utility" | "moderation" | "others";

export type DashboardModuleStatus = "ready" | "needs-api" | "later";

export type DashboardModule = {
  id: string;
  label: string;
  group: DashboardModuleGroup;
  description: string;
  enabled: boolean;
  status: DashboardModuleStatus;
  channelName: string;
  statsLabel: string;
};

export type ControlPanelLogs = {
  enabled: boolean;
  channelName: string;
  lastAction: string;
  lastUpdated: string;
};

export type DashboardSettings = {
  guildId: string;
  controlPanelLogs: ControlPanelLogs;
  modules: DashboardModule[];
};

export function getDashboardGuilds(): DashboardGuild[] {
  return mockGuilds as DashboardGuild[];
}

export function getDashboardSettingsList(
  guilds: DashboardGuild[] = [],
): DashboardSettings[] {
  const settings = mockDashboardSettings as DashboardSettings[];

  if (!guilds.length) {
    return settings;
  }

  return guilds.map((guild: DashboardGuild) => {
    const existingSettings = settings.find(
      (setting: DashboardSettings) => setting.guildId === guild.id,
    );

    return existingSettings ?? createDefaultSettings(guild.id, settings[0]);
  });
}

function createDefaultSettings(
  guildId: string,
  templateSettings: DashboardSettings,
): DashboardSettings {
  return {
    guildId,
    controlPanelLogs: {
      enabled: false,
      channelName: "Not selected",
      lastAction: "No activity yet",
      lastUpdated: "Not synced",
    },
    modules: templateSettings.modules.map((module: DashboardModule) => ({
      ...module,
      enabled: false,
      channelName: "Not selected",
      statsLabel: "Ready to configure",
    })),
  };
}
