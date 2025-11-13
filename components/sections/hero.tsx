"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-b from-background via-background to-secondary/40 px-4 py-10 sm:px-8 sm:py-12 lg:py-16">
      {/* subtle particles / glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -top-12 -right-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-float-slow absolute bottom-0 -left-12 h-32 w-32 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="animate-orbit absolute top-10 left-1/3 h-24 w-24 rounded-full border border-primary/25" />
      </div>

      <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center">
        {/* Left: copy + CTAs */}
        <div className="flex-1 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            Multipurpose Discord Bot
          </span>

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="block">Rias Gremory –</span>
            <span className="mt-1 block bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
              your all-in-one Discord companion.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Music, filters, anime gacha, moderation tools and more – all tuned
            to keep your community fun, safe, and active 24/7.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link
                href="https://discord.com/api/oauth2/authorize?client_id=1012710312857849937&permissions=139589975104&scope=bot&utm_source=discordbotlist.com&utm_medium=bot_page"
                target="_blank"
              >
                Invite Rias to your server
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border border-border/80 bg-secondary
                         text-sm font-medium text-foreground
                         shadow-sm hover:bg-secondary/90
                         transition-colors"
            >
              <Link href="/commands">Browse commands</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Always online – low latency music &amp; filters</span>
            </div>
            <span className="hidden h-3 w-px bg-border/70 sm:inline-block" />
            <span className="hidden text-xs sm:inline-block">
              Music · Anime gacha · Moderation · Utility
            </span>
          </div>
        </div>

        {/* Right: Rias card */}
        <div className="relative flex-1">
          <div className="animate-float-slow-delayed pointer-events-none absolute -top-6 -left-10 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative mx-auto max-w-xs rounded-3xl border border-primary/40 bg-secondary/40 p-px shadow-[0_0_40px_rgba(0,0,0,0.18)]">
            <div className="relative overflow-hidden rounded-3xl bg-background/90">
              {/* top glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-primary/35 via-background/0 to-transparent" />

              <div className="relative px-4 pt-4 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide">
                      Rias Gremory
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Ultra Legendary Support
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    v5.0
                  </span>
                </div>

                <div className="mt-4 flex justify-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
                    {/* Drop your actual Rias artwork in /public/rias-gremory-hero.png */}
                    <Image
                      src="/rias-gremory-hero.png"
                      alt="Rias Gremory artwork"
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded-xl bg-secondary/60 px-2 py-1.5">
                    <p className="text-[10px] text-muted-foreground">Music</p>
                    <p className="text-xs font-semibold">24/7</p>
                  </div>
                  <div className="rounded-xl bg-secondary/60 px-2 py-1.5">
                    <p className="text-[10px] text-muted-foreground">Gacha</p>
                    <p className="text-xs font-semibold">Anime</p>
                  </div>
                  <div className="rounded-xl bg-secondary/60 px-2 py-1.5">
                    <p className="text-[10px] text-muted-foreground">
                      Moderation
                    </p>
                    <p className="text-xs font-semibold">Smart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* small glow badge bottom-right */}
          <div className="mt-4 flex justify-center lg:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>
                Optimized for anime communities &amp; multiplayer servers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
