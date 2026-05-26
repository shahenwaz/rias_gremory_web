import { cn } from "@/lib/utils";

type DashboardSkeletonProps = {
  className?: string;
};

export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-white/7", className)} />
  );
}
