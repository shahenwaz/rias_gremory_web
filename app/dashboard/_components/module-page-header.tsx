import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";

type ModulePageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  enabled: boolean;
  toggleLabel: string;
  onToggle: () => void;
};

export function ModulePageHeader({
  eyebrow,
  title,
  description,
  enabled,
  toggleLabel,
  onToggle,
}: ModulePageHeaderProps) {
  return (
    <section className="px-4 py-4 border rounded-2xl border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 sm:px-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
            {eyebrow}
          </p>

          <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {title}
          </h1>

          <p className="max-w-2xl mt-2 text-sm leading-6 text-white/50">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-medium text-white/45">
            {enabled ? "Enabled" : "Disabled"}
          </span>

          <DashboardToggle
            checked={enabled}
            label={toggleLabel}
            onCheckedChange={onToggle}
          />
        </div>
      </div>
    </section>
  );
}
