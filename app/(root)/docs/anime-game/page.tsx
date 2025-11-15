import { Callout } from "@/components/docs/callout";

const sections = [
  { id: "core-loop", label: "Core loop" },
  { id: "currency", label: "Currency & rewards" },
  { id: "team-building", label: "Team building" },
];

export default function AnimeGameDocsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Documentation
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Anime Game Guide
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Collect characters, train them, and build powerful teams using the
          anime gacha game inside Rias.
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
        <section id="core-loop" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            The core loop
          </h3>
          <p className="text-muted-foreground">
            The anime game is built around collecting characters, upgrading
            them, and battling with your team.
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">gacha</span> – roll for a
              random character.
            </li>
            <li>
              <span className="font-mono text-primary">inventory</span> – list
              all characters you own.
            </li>
            <li>
              <span className="font-mono text-primary">profile</span> – view
              your game profile and stats.
            </li>
            <li>
              <span className="font-mono text-primary">release</span> – release
              characters you don&apos;t want anymore.
            </li>
          </ul>
        </section>

        <section id="currency" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Currency & rewards
          </h3>
          <p className="text-muted-foreground">
            Use daily rewards, quests, and events to grow your balance over
            time.
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">balance</span> – check
              your current balance.
            </li>
            <li>
              <span className="font-mono text-primary">daily</span> – claim a
              daily reward.
            </li>
            <li>
              <span className="font-mono text-primary">quest</span> – complete
              quests for extra rewards.
            </li>
            <li>
              <span className="font-mono text-primary">event</span> – view
              special events (if running).
            </li>
            <li>
              <span className="font-mono text-primary">shop</span> – buy items
              or characters with your balance.
            </li>
          </ul>

          <Callout type="tip" title="Play consistently">
            Logging in daily and completing quests is usually more rewarding
            long-term than spamming gacha instantly. Slow, consistent progress
            keeps your balance healthy.
          </Callout>
        </section>

        <section id="team-building" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Team building & battles
          </h3>

          <p className="text-muted-foreground">
            Once you have characters, build a squad and take them into battle.
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">team</span> – configure
              your team.
            </li>
            <li>
              <span className="font-mono text-primary">resetteam</span> – reset
              your current team setup.
            </li>
            <li>
              <span className="font-mono text-primary">train</span> – upgrade
              your characters.
            </li>
            <li>
              <span className="font-mono text-primary">teambattle</span> – send
              your team into battle.
            </li>
            <li>
              <span className="font-mono text-primary">leaderboard</span> – see
              where you rank among other players.
            </li>
          </ul>

          <Callout type="warning" title="Trading safely">
            Commands like <span className="font-mono">trade</span> and{" "}
            <span className="font-mono">give</span> let you interact with other
            players. Only trade with people you trust and double-check what
            you&apos;re giving away before confirming.
          </Callout>
        </section>
      </div>
    </div>
  );
}
