"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavItems } from "@/src/data/docs-nav";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function DocsPager() {
  const pathname = usePathname();
  const index = docsNavItems.findIndex((item) => item.href === pathname);
  if (index === -1) return null;

  const prev = index > 0 ? docsNavItems[index - 1] : null;
  const next = index < docsNavItems.length - 1 ? docsNavItems[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-6 pt-3 text-xs sm:text-sm lg:hidden">
      <div className="flex gap-1">
        {prev && (
          <Link
            href={prev.href}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border/70",
              "bg-background px-3 py-2 hover:border-border hover:bg-card/80 transition-colors"
            )}
          >
            <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Previous
              </div>
              <div className="truncate text-xs font-medium">{prev.title}</div>
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={next.href}
            className={cn(
              "flex min-w-0 flex-1 items-center justify-end gap-2 rounded-2xl border border-border/70",
              "bg-background px-3 py-2 hover:border-border hover:bg-card/80 transition-colors"
            )}
          >
            <div className="min-w-0 text-right">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Next
              </div>
              <div className="truncate text-xs font-medium">{next.title}</div>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
        )}
      </div>
    </div>
  );
}
