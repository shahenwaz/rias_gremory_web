import { cn } from "@/lib/utils";

type DashboardToggleProps = {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onCheckedChange: () => void;
};

export function DashboardToggle({
  checked,
  disabled = false,
  label,
  onCheckedChange,
}: DashboardToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onCheckedChange}
      aria-label={label}
      aria-pressed={checked}
      className={cn(
        "relative inline-flex h-7 w-12.5 shrink-0 items-center rounded-full border p-0.5 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d13]",
        disabled
          ? "cursor-not-allowed border-white/8 bg-white/5 opacity-55"
          : "cursor-pointer",
        checked
          ? "border-primary/35 bg-primary/90 shadow-[0_0_18px_rgba(244,63,94,0.22)]"
          : "border-white/10 bg-[#20242d] hover:border-white/16 hover:bg-[#252a34]",
      )}
    >
      <span
        className={cn(
          "flex size-5.5 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-5.5" : "translate-x-0",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            checked ? "bg-primary" : "bg-white/35",
          )}
        />
      </span>
    </button>
  );
}
