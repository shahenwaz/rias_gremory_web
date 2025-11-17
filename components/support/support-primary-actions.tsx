import * as React from "react";
import Link from "next/link";
import { LifeBuoy, Bug, Sparkles } from "lucide-react";

/**
 * Single source of truth for the support server invite URL.
 */
export const SUPPORT_SERVER_INVITE = "https://discord.gg/mairala" as const;

/**
 * SupportPrimaryActions
 *
 * Three primary CTAs:
 * - Join Support Server
 * - Report a Bug
 * - Request a Feature
 */
export function SupportPrimaryActions() {
  return (
    <section className="mx-auto max-w-6xl space-y-3">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary sm:text-base">
          Get help fast
        </h2>
        <p className="text-xs text-muted-foreground sm:text-[13px]">
          Choose how you want to get support – live help, bug reports, or
          feature ideas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SupportActionCard
          icon={LifeBuoy}
          label="Join Support Server"
          description="Live help from staff & community, announcements, and status updates."
          href={SUPPORT_SERVER_INVITE}
          cta="Open Discord"
          variant="primary"
        />

        <SupportActionCard
          icon={Bug}
          label="Report a Bug"
          description="Found something broken? Share details so we can fix it quickly."
          href={SUPPORT_SERVER_INVITE} // TODO: dedicated bug form / ticket link
          cta="Report in server"
        />

        <SupportActionCard
          icon={Sparkles}
          label="Request a Feature"
          description="Have a cool idea? Suggest new commands, modes, or QoL tweaks."
          href={SUPPORT_SERVER_INVITE} // TODO: feature board / form
          cta="Share your idea"
        />
      </div>
    </section>
  );
}

/**
 * SupportActionCard
 *
 * Futuristic card-style link used for primary support actions.
 */
type SupportActionCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  description: string;
  href: string;
  cta: string;
  variant?: "primary" | "secondary";
};

function SupportActionCard({
  icon: Icon,
  label,
  description,
  href,
  cta,
  variant = "secondary",
}: SupportActionCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card px-4 py-3 text-left shadow-sm transition-transform hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[0_0_12px_rgba(248,113,113,0.2)] sm:px-5 sm:py-4"
    >
      {/* Soft diagonal glow – toned down */}
      <div
        className={`pointer-events-none absolute inset-x-[-8%] -top-14 h-28 rotate-3 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.22),transparent_60%)] opacity-30 transition-opacity group-hover:opacity-55 ${
          isPrimary ? "" : "opacity-20 group-hover:opacity-40"
        }`}
      />

      {/* Subtle bottom edge highlight */}
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent opacity-70" />

      <div className="relative flex min-h-[130px] flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-background">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight sm:text-[15px]">
              {label}
            </span>
          </div>

          <p className="max-w-120 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {description}
          </p>
        </div>

        {/* Fancy CTA – glassy gradient chip */}
        <span className="relative inline-flex items-center self-start overflow-hidden rounded-full border border-primary/60 bg-primary/20 px-4 py-1.5 text-[13px] font-semibold text-primary-foreground transition-all duration-400 group-hover:border-primary group-hover:bg-primary/50">
          {/* glossy sweep */}
          <span className="pointer-events-none absolute inset-0 translate-y-[120%] bg-linear-to-r from-white/25 via-transparent to-white/10 opacity-60 transition-transform duration-300 group-hover:translate-y-0" />
          <span className="relative z-10 flex items-center gap-1.5">
            <span>{cta}</span>
            <span
              aria-hidden
              className="text-[11px] translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}
