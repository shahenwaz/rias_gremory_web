import Link from "next/link";
import { ArrowRight, Hash, Music2, SlidersHorizontal } from "lucide-react";
import type { ControlPanelLogs } from "@/app/dashboard/_data/dashboard-data";

type QuickActionsPanelProps = {
  controlPanelLogs: ControlPanelLogs;
};

export function QuickActionsPanel({
  controlPanelLogs,
}: QuickActionsPanelProps) {
  return (
    <aside className="rounded-2xl border border-white/8 bg-white/4 p-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
        Quick Actions
      </p>

      <div className="mt-4 space-y-2">
        <QuickActionCard
          href="/dashboard/server-config"
          icon={<SlidersHorizontal className="size-4" />}
          title="Server Config"
          text="Prefix and command channels"
        />

        <QuickActionCard
          href="/dashboard/music-settings"
          icon={<Music2 className="size-4" />}
          title="Music Settings"
          text="DJ, 24/7, and playback controls"
        />

        <QuickActionCard
          href="/dashboard/control-panel-logs"
          icon={<Hash className="size-4" />}
          title="Control Logs"
          text={
            controlPanelLogs.enabled
              ? controlPanelLogs.channelName
              : "Logging is currently off"
          }
        />
      </div>
    </aside>
  );
}

function QuickActionCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2.5 transition-colors hover:border-primary/22 hover:bg-primary/8"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-white/8 bg-white/4 text-white/45 transition-colors group-hover:border-primary/22 group-hover:text-primary">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 truncate text-xs text-white/38">{text}</p>
      </div>

      <ArrowRight className="size-4 shrink-0 text-white/25 transition-colors group-hover:text-primary" />
    </Link>
  );
}
