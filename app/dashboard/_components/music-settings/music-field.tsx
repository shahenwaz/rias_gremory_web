import type { ReactNode } from "react";

type MusicFieldProps = {
  label: string;
  children: ReactNode;
};

export function MusicField({ label, children }: MusicFieldProps) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}
