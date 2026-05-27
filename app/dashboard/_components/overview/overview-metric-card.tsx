import type { ReactNode } from "react";

type OverviewMetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  isLoading?: boolean;
};

export function OverviewMetricCard({
  icon,
  label,
  value,
  hint,
  isLoading = false,
}: OverviewMetricCardProps) {
  return (
    <article className="group rounded-xl border border-white/8 bg-white/4 px-3.5 py-3 transition-colors hover:border-primary/18 hover:bg-white/5">
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/18 bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
              {label}
            </p>

            {isLoading ? (
              <span className="size-1.5 shrink-0 rounded-full bg-primary/70" />
            ) : null}
          </div>

          <div className="mt-0.5 flex min-w-0 items-baseline gap-2">
            <p className="truncate text-base font-semibold tracking-tight text-white">
              {value}
            </p>
            <p className="truncate text-[11px] text-white/32">{hint}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
