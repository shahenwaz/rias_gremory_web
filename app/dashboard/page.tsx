import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  getDashboardGuilds,
  getDashboardSettingsList,
} from "@/lib/dashboard-data";

export default function DashboardPage() {
  const guilds = getDashboardGuilds();
  const settings = getDashboardSettingsList();

  return <DashboardShell guilds={guilds} settings={settings} />;
}
