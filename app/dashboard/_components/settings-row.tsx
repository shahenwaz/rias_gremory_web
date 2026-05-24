import type { ReactNode } from "react";

type SettingsRowProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsRow({
  title,
  description,
  children,
}: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-white/8 bg-[#101218]/80 p-3.5 transition-colors hover:border-white/12 hover:bg-[#12151d] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>

        {description ? (
          <p className="max-w-xl mt-1 text-sm leading-5 text-white/44">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-start w-full sm:w-auto sm:min-w-fit sm:shrink-0 sm:justify-end">
        {children}
      </div>
    </div>
  );
}
