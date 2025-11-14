"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavItems } from "@/src/data/docs-nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative h-full">
      <div className="sticky top-4 space-y-4">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Rias Docs
          </p>
          <h1 className="text-lg font-semibold tracking-tight">
            Guides & Commands
          </h1>
          <p className="text-xs text-muted-foreground">
            Learn how to use music, filters, anime game and more.
          </p>
        </div>

        <nav className="space-y-1">
          {docsNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                  "border border-transparent",
                  "hover:border-border/70 hover:bg-secondary/40 hover:text-foreground",
                  isActive &&
                    "border-border/80 bg-secondary/60 text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-muted-foreground/40 transition-transform duration-200",
                    isActive && "scale-110 bg-primary"
                  )}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{item.title}</span>
                  {item.description && (
                    <span className="text-[11px] text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
