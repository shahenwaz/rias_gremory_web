import { LifeBuoy } from "lucide-react";

/**
 * SupportHero
 *
 * Top hero section for the /support page.
 * Shows page title, short description, and response expectations.
 */
export function SupportHero() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/10 via-background to-secondary/20 px-6 py-6 sm:px-8 sm:py-8">
      {/* Glow accents */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="animate-float-slow absolute -left-24 -top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-orbit absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <LifeBuoy className="h-3.5 w-3.5" />
            <span>Support Center</span>
          </div>
          <div>
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Need help with Rias Gremory?
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Join the support server, report bugs, request new features, or
              quickly troubleshoot common issues. We want your experience to
              feel smooth and magical every time.
            </p>
          </div>
        </div>

        {/* Status / response expectations */}
        <div className="mt-3 flex flex-col items-start gap-2 rounded-xl border border-border/80 bg-background/80 px-3 py-3 text-xs sm:mt-0 sm:text-sm">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Typically responds within 24 hours
          </span>
          <span className="text-muted-foreground">
            Best way to get help: join the support server and open a ticket or
            DM staff.
          </span>
        </div>
      </div>
    </header>
  );
}
