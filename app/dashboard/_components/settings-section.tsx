import type { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="p-4 border rounded-2xl border-white/8 bg-white/4 sm:p-5">
      <div className="mb-3.5">
        <h2 className="text-sm font-semibold text-white sm:text-base">
          {title}
        </h2>

        {description ? (
          <p className="max-w-2xl mt-1 text-sm leading-5 text-white/46">
            {description}
          </p>
        ) : null}
      </div>

      <div className="space-y-2.5">{children}</div>
    </section>
  );
}
