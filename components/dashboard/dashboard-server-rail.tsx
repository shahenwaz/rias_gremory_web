import Link from "next/link";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardGuild } from "@/lib/dashboard-data";

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
    <aside className="hidden h-screen w-20 shrink-0 overflow-hidden border-r border-white/8 bg-[#080a0f] md:flex md:flex-col">
      <div className="shrink-0 px-3 py-4">
        <Link
          href="/dashboard/profile"
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/15 text-primary shadow-lg shadow-primary/10 transition-all hover:bg-primary hover:text-primary-foreground"
          aria-label="Open user profile"
        >
          <UserRound className="h-5 w-5" />
        </Link>

        <div className="mx-auto mt-4 h-px w-9 bg-white/10" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <div className="flex flex-col items-center gap-3">
          {guilds.map((guild: DashboardGuild) => (
            <button
              key={guild.id}
              type="button"
              onClick={() => onGuildChange(guild.id)}
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
      </div>
    </aside>
  );
}
