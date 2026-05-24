"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-b from-background via-background to-secondary/40 px-4 py-6 sm:px-8 sm:py-8 lg:py-10">
      {/* subtle particles / glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -top-12 -right-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-float-slow absolute bottom-0 -left-12 h-32 w-32 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="animate-orbit absolute top-10 left-1/3 h-24 w-24 rounded-full border border-primary/25" />
      </div>

      <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center">
        {/* Left: copy + CTAs */}
        <div className="flex-1 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-chart-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(248,113,113,0.6)]" />
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
              className="border border-border/80 bg-secondary text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary/90"
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

        {/* Right: Rias artwork + attached stat chips */}
        <div className="relative flex-1">
          <div className="animate-float-slow-delayed pointer-events-none absolute -top-6 -left-10 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative mx-auto w-full max-w-md">
            {/* main hero image */}
            <Image
              src="/rias-gremory-hero.png"
              alt="Rias Gremory artwork"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full rounded-xl object-cover"
            />

            {/* stat chips, gently overlapping the bottom of the image */}
            <div className="grid grid-cols-3 gap-2 text-[11px] -mt-4 sm:-mt-5">
              <div className="rounded-xl border border-border/80 bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                <p className="text-[10px] text-muted-foreground">Music</p>
                <p className="text-xs font-semibold text-foreground">24/7</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                <p className="text-[10px] text-muted-foreground">Gacha</p>
                <p className="text-xs font-semibold text-foreground">Anime</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                <p className="text-[10px] text-muted-foreground">Moderation</p>
                <p className="text-xs font-semibold text-foreground">Smart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
