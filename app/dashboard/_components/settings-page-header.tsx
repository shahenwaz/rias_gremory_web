type SettingsPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function SettingsPageHeader({
  eyebrow,
  title,
  description,
  action,
}: SettingsPageHeaderProps) {
  return (
    <section className="p-4 border rounded-2xl border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
            {eyebrow}
          </p>

          <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {title}
          </h1>

          <p className="max-w-2xl mt-2 text-sm leading-6 text-white/52">
            {description}
          </p>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}
