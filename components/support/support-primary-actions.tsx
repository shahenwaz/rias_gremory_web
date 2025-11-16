import * as React from "react";
import Link from "next/link";
import { LifeBuoy, Bug, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Single source of truth for the support server invite URL.
 */
export const SUPPORT_SERVER_INVITE = "https://discord.gg/mairala" as const;

/**
 * SupportPrimaryActions
 *
 * Three big primary CTAs:
 * - Join Support Server
 * - Report a Bug
 * - Request a Feature
 */
export function SupportPrimaryActions() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Get help fast
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {/* Join support server */}
        <SupportActionButton
          icon={LifeBuoy}
          label="Join Support Server"
          badge="Recommended"
          description="Live help from staff & community, announcements, and status updates."
          href={SUPPORT_SERVER_INVITE}
          cta="Open Discord"
        />

        {/* Report a bug */}
        <SupportActionButton
          icon={Bug}
          label="Report a Bug"
          badge="Stability"
          description="Found something broken? Share details so we can fix it quickly."
          href={SUPPORT_SERVER_INVITE} // TODO: replace with dedicated bug form / ticket link
          cta="Report in server"
        />

        {/* Request a feature */}
        <SupportActionButton
          icon={Sparkles}
          label="Request a Feature"
          badge="Improvements"
          description="Have a cool idea? Suggest new commands, modes, or QoL tweaks."
          href={SUPPORT_SERVER_INVITE} // TODO: replace with feature board / form
          cta="Share your idea"
        />
      </div>
    </section>
  );
}

/**
 * SupportActionButton
 *
 * Reusable big button used for primary support actions.
 */
type SupportActionButtonProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  badge?: string;
  description: string;
  href: string;
  cta: string;
};

function SupportActionButton({
  icon: Icon,
  label,
  badge,
  description,
  href,
  cta,
}: SupportActionButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      className="group h-auto justify-start gap-3 rounded-2xl border border-border/80 bg-linear-to-br from-primary/15 via-background to-background px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[0_0_32px_rgba(248,113,113,0.40)]"
    >
      <Link href={href} target="_blank" rel="noreferrer">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                <Icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="text-sm font-semibold tracking-tight">
                {label}
              </span>
            </div>
            {badge ? (
              <span className="rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
          <span className="inline-flex items-center text-xs font-medium text-primary group-hover:text-primary/90">
            {cta}
            <span
              aria-hidden
              className="ml-1 transition-transform group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </span>
        </div>
      </Link>
    </Button>
  );
}
