import {
  Bot,
  Hash,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { DashboardToggle } from "@/components/dashboard/dashboard-toggle";
import { ModuleStatus } from "@/components/dashboard/module-status";
import { cn } from "@/lib/utils";
import type { DashboardModule } from "@/lib/dashboard-data";

type ModuleCardProps = {
  module: DashboardModule;
  onToggle: () => void;
};

const moduleIcons: Record<string, LucideIcon> = {
  utility: Settings2,
  "welcome-goodbye": Users,
  "auto-roles": ShieldCheck,
  "self-roles": Users,
  statistics: LayoutDashboard,
  moderation: ShieldCheck,
  logs: Hash,
  automod: Bot,
  "control-panel-logs": Hash,
  "mod-actions": ShieldCheck,
};

export function ModuleCard({ module, onToggle }: ModuleCardProps) {
  const isDisabled = module.status === "later";
  const Icon = moduleIcons[module.id] ?? Settings2;

  return (
    <article
      className={cn(
        "rounded-2xl border p-4 transition-colors sm:p-5",
        module.enabled
          ? "border-white/12 bg-white/5 hover:border-white/18"
          : "border-white/8 bg-white/3 hover:border-white/14",
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
            module.enabled
              ? "border-primary/20 bg-primary/10 text-primary"
              : "border-white/8 bg-white/5 text-white/45",
          )}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  {module.label}
                </h3>
                <ModuleStatus status={module.status} />
              </div>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/52">
                {module.description}
              </p>
            </div>

            <div className="pt-0.5">
              <DashboardToggle
                checked={module.enabled}
                disabled={isDisabled}
                label={`Toggle ${module.label}`}
                onCheckedChange={onToggle}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/38">
            <span>{module.channelName}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{module.statsLabel}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
