import Link from "next/link";
import {
  MessageCircle,
  AlertTriangle,
  Headphones,
  LifeBuoy,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

/**
 * SupportHelpAndContact
 *
 * Bottom grid on /support:
 * - Quick help links for common issues (wired to docs slugs)
 * - Contact section explaining how to DM staff / use tickets
 */
export function SupportHelpAndContact() {
  const quickHelpItems = [
    {
      title: "Music not playing",
      description: "Bot joined voice but no sound? Start with these checks.",
      // Docs slug: troubleshooting > music
      href: "/docs/troubleshooting/music-not-playing",
      icon: Headphones,
    },
    {
      title: "Commands not responding",
      description: "Bot online but ignoring you? Fix common command issues.",
      // Docs slug: troubleshooting > commands
      href: "/docs/troubleshooting/commands-not-responding",
      icon: AlertTriangle,
    },
    {
      title: "Prefix & slash confusion",
      description: "Not sure if it's prefix or slash commands? Clarify here.",
      // Docs slug: getting-started > command styles
      href: "/docs/getting-started/command-styles",
      icon: MessageCircle,
    },
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.25fr)]">
      {/* Quick help tiles – light, non-duplicate of full docs */}
      <Card className="border-border/70 bg-background/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <MessageCircle className="h-5 w-5 text-primary" />
            Quick help for common issues
          </CardTitle>
          <CardDescription className="text-sm">
            Shortcuts into the docs for the most frequent problems. For full
            details, visit the{" "}
            <Link
              href="/docs"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Docs hub
            </Link>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {quickHelpItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-xl border border-border/70 bg-muted/40 p-3 text-sm transition hover:border-primary/60 hover:bg-primary/5"
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/90">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center text-[11px] font-medium text-primary/90">
                    Open guide
                    <span aria-hidden className="ml-1">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Contact / DM staff info */}
      <Card className="border-border/70 bg-background/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <LifeBuoy className="h-5 w-5 text-primary" />
            Need direct support?
          </CardTitle>
          <CardDescription className="text-sm">
            Until the full ticket system or email support is live, you can reach
            us via the support server.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-1.5">
            <p className="font-medium text-foreground/90">
              1. Join the support server
            </p>
            <p className="text-muted-foreground">
              Use the{" "}
              <span className="font-medium text-primary">
                “Join Support Server”
              </span>{" "}
              button above. Make sure your DMs are enabled so staff can reach
              you.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="font-medium text-foreground/90">
              2. DM staff or open a ticket
            </p>
            <p className="text-muted-foreground">
              Look for channels like{" "}
              <span className="font-mono text-foreground">#support</span> or{" "}
              <span className="font-mono text-foreground">#create-ticket</span>{" "}
              or send a{" "}
              <span className="font-medium text-foreground">DM to staff</span>{" "}
              if you&apos;re unsure.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="font-medium text-foreground/90">
              3. Include helpful details
            </p>
            <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
              <li>Your Discord tag &amp; server ID (if relevant)</li>
              <li>The command you ran and exact error/message</li>
              <li>Screenshots or short clips if possible</li>
            </ul>
          </div>

          {/* Placeholder for future ticket / email system */}
          <div className="rounded-xl border border-dashed border-border/80 bg-muted/40 p-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              Coming soon:&nbsp;
            </span>
            dedicated ticket panels and/or email support will live here when
            they&apos;re ready.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
