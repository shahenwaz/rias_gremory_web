import { Callout } from "@/components/docs/callout";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "music-basics", label: "Music basics" },
  { id: "queue-control", label: "Queue control" },
  { id: "filters", label: "Filters" },
];

export default function MusicFiltersDocsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Documentation
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Music & Filters
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Rias ships with a rich music system: queue control, autoplay, loop
          modes, and a full set of audio filters like nightcore, bassboost, and
          more.
        </p>

        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-muted-foreground/80">On this page</span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/70 hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </header>

      <div className="space-y-10 text-sm leading-relaxed">
        <section id="overview" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">Overview</h3>
          <p className="text-muted-foreground">
            Music commands let you play songs from links or searches, manage the
            queue, and control playback. Filters change how the music sounds in
            real time.
          </p>

          <Callout type="tip" title="Good practice">
            Create a dedicated{" "}
            <span className="font-mono text-primary">#music</span> text channel
            and restrict music commands there. This keeps chat clean and makes
            it easier to troubleshoot.
          </Callout>
        </section>

        <section id="music-basics" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">Music basics</h3>
          <p className="text-muted-foreground">
            Core music commands from the help menu:
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">play</span> – play a song
              or playlist.
            </li>
            <li>
              <span className="font-mono text-primary">search</span> – search
              for tracks to choose from.
            </li>
            <li>
              <span className="font-mono text-primary">nowplaying</span> – see
              what&apos;s currently playing.
            </li>
            <li>
              <span className="font-mono text-primary">volume</span> – adjust
              playback volume.
            </li>
            <li>
              <span className="font-mono text-primary">pause</span> /{" "}
              <span className="font-mono text-primary">resume</span> – control
              playback.
            </li>
            <li>
              <span className="font-mono text-primary">stop</span> – stop
              playback and clear the player.
            </li>
          </ul>
        </section>

        <section id="queue-control" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Queue control
          </h3>

          <p className="text-muted-foreground">
            Manage the music queue precisely:
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">queue</span> – show the
              queue.
            </li>
            <li>
              <span className="font-mono text-primary">skip</span> /{" "}
              <span className="font-mono text-primary">skipto</span> – skip one
              song or jump to a specific position.
            </li>
            <li>
              <span className="font-mono text-primary">shuffle</span> – shuffle
              the queue.
            </li>
            <li>
              <span className="font-mono text-primary">remove</span> – remove an
              entry from the queue.
            </li>
            <li>
              <span className="font-mono text-primary">clearqueue</span> – wipe
              the queue entirely.
            </li>
            <li>
              <span className="font-mono text-primary">autoplay</span> – toggle
              autoplay when the queue ends.
            </li>
            <li>
              <span className="font-mono text-primary">loop</span> – loop
              current track or entire queue.
            </li>
          </ul>

          <Callout type="warning" title="Protect your queue">
            Consider limiting destructive commands like{" "}
            <span className="font-mono">clearqueue</span> and{" "}
            <span className="font-mono">remove</span> to DJ role or trusted
            staff, so random users can&apos;t wipe the queue.
          </Callout>
        </section>

        <section id="filters" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Filters (audio effects)
          </h3>
          <p className="text-muted-foreground">
            Filters change how the music sounds without changing the queue.
            Available filter commands:
          </p>

          <div className="grid gap-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:grid-cols-2 sm:text-[13px]">
            <div>
              <h4 className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                Style / pitch
              </h4>
              <ul className="space-y-1">
                <li>nightcore</li>
                <li>speed</li>
                <li>pitch</li>
                <li>rotation</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                FX &amp; tone
              </h4>
              <ul className="space-y-1">
                <li>bassboost</li>
                <li>8d</li>
                <li>distorsion</li>
                <li>tremolo</li>
                <li>vibrato</li>
                <li>karaoke</li>
                <li>lowpass</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Use <span className="font-mono text-primary">reset</span> to clear
            all filters and go back to the normal sound.
          </p>
        </section>
      </div>
    </div>
  );
}
