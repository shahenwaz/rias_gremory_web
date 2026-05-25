"use client";

import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardSaveBarProps = {
  hasChanges: boolean;
  onReset: () => void;
  saveLabel?: string;
  saveDisabled?: boolean;
  className?: string;
};

export function DashboardSaveBar({
  hasChanges,
  onReset,
  saveLabel = "Save changes",
  saveDisabled = true,
  className,
}: DashboardSaveBarProps) {
  return (
    <div
      className={cn(
        "sticky bottom-3 z-20 mx-auto mt-5 flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/78 p-2 pl-4 shadow-2xl shadow-black/35 backdrop-blur-xl",
        className,
      )}
    >
      <p className="text-sm font-semibold text-white/72">
        {hasChanges ? "Unsaved changes" : "No changes made"}
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          disabled={!hasChanges}
          onClick={onReset}
          className="h-9 rounded-md px-3 text-white/55 hover:bg-white/7 hover:text-white"
        >
          <RotateCcw className="mr-1.5 size-3.5" />
          Reset
        </Button>

        <Button
          type="button"
          disabled={saveDisabled}
          className="h-9 rounded-md bg-primary/80 px-4 text-primary-foreground opacity-80"
        >
          <Save className="mr-1.5 size-3.5" />
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
