import type { DashboardGuild } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

type DashboardMobileServerBarProps = {
  guilds: DashboardGuild[];
  activeGuildId: string;
  onGuildChange: (guildId: string) => void;
};

export function DashboardMobileServerBar({
  guilds,
  activeGuildId,
  onGuildChange,
}: DashboardMobileServerBarProps) {
  return (
    <div className="border-b border-white/8 bg-[#0f1117] px-4 py-3 md:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {guilds.map((guild: DashboardGuild) => (
          <button
            key={guild.id}
            type="button"
            onClick={() => onGuildChange(guild.id)}
            className={cn(
              "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors",
              activeGuildId === guild.id
                ? "border-primary/40 bg-primary/15 text-white"
                : "border-white/10 bg-white/5 text-white/55 hover:bg-white/8 hover:text-white",
            )}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-white/8 text-[10px] font-bold">
              {guild.icon}
            </span>
            <span className="max-w-32 truncate">{guild.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
