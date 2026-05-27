import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BotRole } from "@/app/dashboard/_data/bot-music-settings-data";

type DjRoleSelectorProps = {
  roles: BotRole[];
  selectedRoleIds: string[];
  disabled: boolean;
  onToggleRole: (roleId: string) => void;
};

export function DjRoleSelector({
  roles,
  selectedRoleIds,
  disabled,
  onToggleRole,
}: DjRoleSelectorProps) {
  if (!roles.length) {
    return (
      <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2 text-sm text-white/42">
        No server roles were returned for music controls.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role: BotRole) => {
        const isSelected = selectedRoleIds.includes(role.id);

        return (
          <button
            key={role.id}
            type="button"
            disabled={disabled}
            onClick={() => onToggleRole(role.id)}
            title={role.name}
            className={cn(
              "inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-55",
              isSelected
                ? "border-primary/35 bg-primary/12 text-primary"
                : "border-white/8 bg-[#0b0d13] text-white/62 hover:border-primary/22 hover:bg-primary/8 hover:text-white",
            )}
          >
            {isSelected ? <Check className="size-3.5 shrink-0" /> : null}

            <span className="max-w-56 truncate sm:max-w-72">{role.name}</span>
          </button>
        );
      })}
    </div>
  );
}
