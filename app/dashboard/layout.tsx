import { DashboardShell } from "@/app/dashboard/_components/dashboard-shell";
import {
  getDashboardGuilds,
  getDashboardSettingsList,
} from "@/app/dashboard/_data/dashboard-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guilds = getDashboardGuilds();
  const settings = getDashboardSettingsList();

  return (
    <DashboardShell guilds={guilds} settings={settings}>
      {children}
    </DashboardShell>
  );
}
