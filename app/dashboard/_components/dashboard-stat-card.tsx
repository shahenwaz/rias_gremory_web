type DashboardStatCardProps = {
  label: string;
  value: string;
};

export function DashboardStatCard({ label, value }: DashboardStatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs text-white/40">{label}</p>
      <p className="mt-1 truncate text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
