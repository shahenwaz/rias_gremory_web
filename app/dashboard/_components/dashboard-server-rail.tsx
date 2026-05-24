import Link from "next/link";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardGuild } from "@/app/dashboard/_data/dashboard-data";

type DashboardServerRailProps = {
  guilds: DashboardGuild[];
  activeGuildId: string;
  onGuildChange: (guildId: string) => void;
};

export function DashboardServerRail({
  guilds,
  activeGuildId,
  onGuildChange,
}: DashboardServerRailProps) {
  return (
    <aside className="hidden h-full w-20 shrink-0 overflow-hidden bg-[#0b0d13]/95 md:flex md:flex-col md:items-center">
      <div className="flex flex-col items-center w-full px-3 pt-3 pb-3 shrink-0">
        <Link
          href="/dashboard/profile"
          className="flex items-center justify-center transition-colors border rounded-xl group size-11 border-white/10 bg-white/5 text-white/55 hover:border-primary/35 hover:bg-primary/12 hover:text-primary"
          aria-label="Open user profile"
          title="Profile"
        >
          <UserRound className="size-4.5" />
        </Link>

        <div className="w-8 h-px mt-3 bg-white/10" />
      </div>

      <div className="flex-1 w-full min-h-0 px-3 pb-3 overflow-y-auto">
        <div className="flex flex-col items-center gap-2.5">
          {guilds.map((guild: DashboardGuild) => {
            const isActive = activeGuildId === guild.id;

            return (
              <button
                key={guild.id}
                type="button"
                onClick={() => onGuildChange(guild.id)}
                className={cn(
                  "group relative flex size-11 cursor-pointer items-center justify-center rounded-xl border text-xs font-bold transition-colors",
                  isActive
                    ? "border-primary/35 bg-primary/16 text-white"
                    : "border-white/10 bg-white/5 text-white/58 hover:border-white/18 hover:bg-white/8 hover:text-white",
                )}
                title={guild.name}
              >
                {isActive ? (
                  <span className="absolute -left-3 h-6 w-0.5 rounded-r-sm bg-primary" />
                ) : null}

                <span className="relative">{guild.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
