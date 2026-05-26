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
      <div className="flex w-full shrink-0 flex-col items-center px-3 pb-3 pt-3">
        <Link
          href="/dashboard/profile"
          className="group flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/55 transition-colors hover:border-primary/35 hover:bg-primary/12 hover:text-primary"
          aria-label="Open user profile"
          title="Profile"
        >
          <UserRound className="size-4.5" />
        </Link>

        <div className="mt-3 h-px w-8 bg-white/10" />
      </div>

      <div className="min-h-0 w-full flex-1 overflow-y-auto px-3 pb-3">
        <div className="flex flex-col items-center gap-2.5">
          {guilds.map((guild: DashboardGuild) => {
            const isActive = activeGuildId === guild.id;

            return (
              <button
                key={guild.id}
                type="button"
                onClick={() => onGuildChange(guild.id)}
                className={cn(
                  "group relative flex size-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border text-xs font-bold transition-colors",
                  isActive
                    ? "border-primary/35 bg-primary/16 text-white"
                    : "border-white/10 bg-white/5 text-white/58 hover:border-white/18 hover:bg-white/8 hover:text-white",
                )}
                title={guild.name}
                aria-label={`Open ${guild.name}`}
              >
                {isActive ? (
                  <span className="absolute -left-3 z-10 h-6 w-0.5 rounded-r-sm bg-primary" />
                ) : null}

                {guild.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={guild.iconUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="relative">{guild.icon}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
