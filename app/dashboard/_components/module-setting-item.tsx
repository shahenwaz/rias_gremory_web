import type { ReactNode } from "react";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";
import { cn } from "@/lib/utils";

type ModuleSettingItemProps = {
  title: string;
  description: string;
  active: boolean;
  enabled: boolean;
  toggleLabel: string;
  children?: ReactNode;
  onEdit: () => void;
  onToggle: () => void;
};

export function ModuleSettingItem({
  title,
  description,
  active,
  enabled,
  toggleLabel,
  children,
  onEdit,
  onToggle,
}: ModuleSettingItemProps) {
  const EditIcon = active ? X : Pencil;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors",
        active
          ? "border-primary/24 bg-primary/8"
          : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/5",
      )}
    >
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 min-w-0 text-left cursor-pointer"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-white">{title}</h2>

            {active ? (
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-primary">
                Editing
              </span>
            ) : null}
          </div>

          <p className="max-w-2xl mt-1 text-sm leading-5 text-white/44">
            {description}
          </p>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            onClick={onEdit}
            className={cn(
              "h-8 rounded-md border px-3 text-xs font-semibold transition-colors",
              active
                ? "border-primary/28 bg-primary/14 text-white hover:bg-primary/20"
                : "border-white/10 bg-white/5 text-white/62 hover:border-white/16 hover:bg-white/8 hover:text-white",
            )}
          >
            <EditIcon className="mr-1.5 size-3.5" />
            {active ? "Close" : "Edit"}
          </Button>

          <DashboardToggle
            checked={enabled}
            label={toggleLabel}
            onCheckedChange={onToggle}
          />
        </div>
      </div>

      {active && children ? (
        <div className="px-4 pb-4 border-t border-white/8 sm:px-5 sm:pb-5">
          {children}
        </div>
      ) : null}
    </article>
  );
}
