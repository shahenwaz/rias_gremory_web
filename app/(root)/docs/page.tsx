import Link from "next/link";
import { Callout } from "@/components/docs/callout";

const sections = [
  { id: "invite", label: "Invite the bot" },
  { id: "basic-setup", label: "Basic setup" },
  { id: "first-commands", label: "Try your first commands" },
];

export default function DocsHomePage() {
  return (
    <div className="space-y-8">
      {/* Heading + on-this-page */}
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Documentation
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Getting Started with Rias
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Rias is a multipurpose Discord bot with music, filters, playlists, an
          anime gacha game, config tools, and more. This page walks you through
          the initial setup so you can start vibing in a few minutes.
        </p>

        {/* On this page */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-muted-foreground/80">On this page</span>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/70 hover:text-foreground transition-colors"
            >
              {section.label}
            </a>
          ))}
        </div>
      </header>

      <div className="space-y-10 text-sm leading-relaxed">
        {/* 1. Invite */}
        <section id="invite" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            1. Invite Rias to your server
          </h3>
          <p className="text-muted-foreground">
            Use the official invite link from the bot listing or your dashboard.
            Make sure you&apos;re logged into the correct Discord account and
            have <span className="font-medium">Manage Server</span> permission.
          </p>

          <Callout type="tip" title="Recommended permissions">
            When the Discord permissions screen appears, keep{" "}
            <span className="font-medium">Connect</span>,{" "}
            <span className="font-medium">Speak</span>,{" "}
            <span className="font-medium">View Channel</span>, and{" "}
            <span className="font-medium">Use Application Commands</span>
            enabled so music and slash commands work properly.
          </Callout>
        </section>

        {/* 2. Basic setup */}
        <section id="basic-setup" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            2. Basic setup
          </h3>

          <p className="text-muted-foreground">
            Once Rias joins your server, she&apos;ll be ready to use out of the
            box. By default, you can interact with her using slash commands or
            the configured prefix.
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">/help</span> – show the
              help menu and all categories.
            </li>
            <li>
              <span className="font-mono text-primary">/about</span> – info
              about the bot and stats.
            </li>
            <li>
              <span className="font-mono text-primary">/invite</span> – get an
              invite link to add Rias to other servers.
            </li>
          </ul>

          <Callout type="tip" title="Prefix & DJ mode">
            Use the <span className="font-mono">config</span> commands to tailor
            Rias to your server:
            <br />
            <span className="font-mono text-primary">prefix</span> to change her
            text prefix, and <span className="font-mono text-primary">dj</span>{" "}
            to set a DJ role that can control the music queue.
          </Callout>
        </section>

        {/* 3. First commands */}
        <section id="first-commands" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            3. Try your first commands
          </h3>

          <p className="text-muted-foreground">
            Jump straight into music and the anime game. Here are a few safe
            starter commands:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-border/60 bg-background p-3">
              <h4 className="text-sm font-semibold">Music</h4>
              <ul className="space-y-1 text-xs sm:text-[13px]">
                <li>
                  <span className="font-mono text-primary">
                    play {"<song>"}
                  </span>{" "}
                  – play a track or playlist.
                </li>
                <li>
                  <span className="font-mono text-primary">queue</span> – view
                  the current queue.
                </li>
                <li>
                  <span className="font-mono text-primary">skip</span> – skip
                  the current song.
                </li>
              </ul>
            </div>

            <div className="space-y-2 rounded-xl border border-border/60 bg-background p-3">
              <h4 className="text-sm font-semibold">Anime Game</h4>
              <ul className="space-y-1 text-xs sm:text-[13px]">
                <li>
                  <span className="font-mono text-primary">gacha</span> – roll
                  for a new character.
                </li>
                <li>
                  <span className="font-mono text-primary">inventory</span> –
                  see your owned characters.
                </li>
                <li>
                  <span className="font-mono text-primary">profile</span> – view
                  your anime game profile.
                </li>
              </ul>
            </div>
          </div>

          <Callout type="warning" title="Voice channel requirements">
            To use music commands, Rias must be able to{" "}
            <span className="font-medium">Connect</span> and{" "}
            <span className="font-medium">Speak</span> in your voice channel. If
            nothing plays, double-check channel permissions or move her to a
            channel where she has those permissions.
          </Callout>

          <p className="text-xs text-muted-foreground">
            When you&apos;re ready, dive deeper into{" "}
            <Link
              href="/docs/music-filters"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Music & Filters
            </Link>{" "}
            or the{" "}
            <Link
              href="/docs/anime-game"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Anime Game Guide
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
