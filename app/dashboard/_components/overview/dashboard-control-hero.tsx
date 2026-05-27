import type { ReactNode } from "react";
import Link from "next/link";
import { Settings2, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServerConfigSummaryStatus } from "@/app/dashboard/_components/overview/use-server-config-summary";

type DashboardControlHeroProps = {
  guildName: string;
  configStatus: ServerConfigSummaryStatus;
  prefixLabel: string;
  channelAccessLabel: string;
  errorMessage: string | null;
};

export function DashboardControlHero({
  guildName,
  configStatus,
  prefixLabel,
  channelAccessLabel,
  errorMessage,
}: DashboardControlHeroProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5">
      <div className="relative p-4 sm:p-5">
        <div className="absolute -right-14 -top-18 size-48 rounded-full bg-primary/18 blur-3xl" />

        <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-center">
          <div>
            <h1 className="max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Server controls for{" "}
              <span className="text-primary">{guildName}</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Review key bot settings, command access, and shortcuts for this
              server.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <DashboardActionLink
                href="/dashboard/server-config"
                icon={<SlidersHorizontal className="size-4" />}
                label="Server Config"
                primary
              />

              <DashboardActionLink
                href="/dashboard/modules"
                icon={<Settings2 className="size-4" />}
                label="Modules"
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/8 bg-black/22 p-3.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  Live Config
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  Server summary
                </p>
              </div>

              <ConfigStatusPill status={configStatus} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <MiniConfigStat label="Prefix" value={prefixLabel} />
              <MiniConfigStat label="Channels" value={channelAccessLabel} />
            </div>

            {errorMessage ? (
              <p className="mt-3 rounded-md border border-red-400/20 bg-red-400/8 px-3 py-2 text-xs leading-5 text-red-100/75">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardActionLink({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
        primary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-white/10 bg-white/5 text-white/62 hover:border-primary/25 hover:text-primary",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function ConfigStatusPill({ status }: { status: ServerConfigSummaryStatus }) {
  const label =
    status === "ready" ? "Synced" : status === "error" ? "Error" : "Loading";

  return (
    <span
      className={cn(
        "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
        status === "ready" &&
          "border-emerald-300/20 bg-emerald-300/8 text-emerald-100/70",
        status === "error" && "border-red-300/20 bg-red-300/8 text-red-100/70",
        status === "loading" && "border-white/8 bg-white/4 text-white/40",
      )}
    >
      {label}
    </span>
  );
}

function MiniConfigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/8 bg-white/4 px-3 py-2">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/32">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}
