import type { ReactNode } from "react";

export function MusicStatusHint({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2.5 rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2 text-xs leading-5 text-white/42">
      {children}
    </div>
  );
}
