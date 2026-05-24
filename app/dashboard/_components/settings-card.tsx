import type { ReactNode } from "react";

type SettingsCardProps = {
  children: ReactNode;
};

export function SettingsCard({ children }: SettingsCardProps) {
  return (
    <div className="rounded-md border border-white/8 bg-[#101218]/90 p-3.5 transition-colors hover:border-white/12 hover:bg-[#12151d]">
      {children}
    </div>
  );
}
