type DashboardInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  title: string;
  text: string;
};

export function DashboardInfoCard({
  icon,
  label,
  title,
  text,
}: DashboardInfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-xs font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/50">{text}</p>
    </div>
  );
}
