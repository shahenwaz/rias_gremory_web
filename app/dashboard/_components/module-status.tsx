import { cn } from "@/lib/utils";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

type ModuleStatusProps = {
  status: DashboardModule["status"];
};

const statusLabel: Record<DashboardModule["status"], string> = {
  ready: "Ready",
  "needs-api": "Needs API",
  later: "Later",
};

export function ModuleStatus({ status }: ModuleStatusProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none",
        status === "ready" &&
          "border-emerald-400/20 bg-emerald-400/8 text-emerald-200",
        status === "needs-api" && "border-sky-400/20 bg-sky-400/8 text-sky-200",
        status === "later" && "border-white/10 bg-white/5 text-white/45",
      )}
    >
      {statusLabel[status]}
    </span>
  );
}
