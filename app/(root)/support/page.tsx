import type { Metadata } from "next";
import { SupportHero } from "@/components/support/support-hero";
import { SupportPrimaryActions } from "@/components/support/support-primary-actions";
import { SupportHelpAndContact } from "@/components/support/support-help-and-contact";

export const metadata: Metadata = {
  title: "Support | Rias Gremory Discord Bot",
  description:
    "Need help with Rias Gremory? Join the support server, report bugs, request features, or quickly troubleshoot common issues.",
};

/**
 * /support
 *
 * Central support hub for Rias Gremory:
 * - Primary CTAs: support server, bug reports, feature requests
 * - Quick help tiles linking to docs / troubleshooting
 * - Contact note for DMing staff in the support server (until ticket/email is added)
 */
export default function SupportPage() {
  return (
    <section className="space-y-5">
      <SupportHero />
      <SupportPrimaryActions />
      <SupportHelpAndContact />
    </section>
  );
}
