"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavItems } from "@/src/data/docs-nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Rias Docs
          </p>
          <h2 className="text-xl font-semibold tracking-tight">
            Guides & Commands
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Learn how to use music, filters, anime game and more.
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {docsNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  "border border-transparent",
                  "hover:border-border/70 hover:bg-secondary/50 hover:text-foreground",
                  isActive &&
                    "border-border/80 bg-secondary/60 text-foreground shadow-sm"
                )}
              >
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 transition-all duration-200 shrink-0",
                    isActive &&
                      "scale-125 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]",
                    "group-hover:scale-110"
                  )}
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-medium leading-tight">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="text-[11px] text-muted-foreground leading-relaxed">
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
