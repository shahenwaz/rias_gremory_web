import type { ReactNode } from "react";
import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";

type MusicConfigSectionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  toggleLabel: string;
  children: ReactNode;
  onToggle: () => void;
};

export function MusicConfigSection({
  icon,
  title,
  description,
  enabled,
  toggleLabel,
  children,
  onToggle,
}: MusicConfigSectionProps) {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/4 p-3.5 transition-colors hover:border-white/12 sm:p-4">
      <div className="mb-3.5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/18 bg-primary/10 text-primary">
            {icon}
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-white/44 sm:text-sm">
              {description}
            </p>
          </div>
        </div>

        <DashboardToggle
          checked={enabled}
          label={toggleLabel}
          onCheckedChange={onToggle}
        />
      </div>

      {children}
    </article>
  );
}
