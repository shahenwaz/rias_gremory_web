import mockGuilds from "./mock-guilds.json";
import mockDashboardSettings from "./mock-dashboard-settings.json";

export type DashboardGuild = {
  id: string;
  name: string;
  icon: string;
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

export function getDashboardSettingsList(): DashboardSettings[] {
  return mockDashboardSettings as DashboardSettings[];
}
