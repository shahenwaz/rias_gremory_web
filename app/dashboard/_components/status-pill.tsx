import { cn } from "@/lib/utils";

type StatusPillProps = {
  active: boolean;
  children: React.ReactNode;
};

export function StatusPill({ active, children }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-white/10 bg-white/5 text-white/50",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-emerald-300" : "bg-white/35",
        )}
      />
      {children}
    </span>
  );
}
