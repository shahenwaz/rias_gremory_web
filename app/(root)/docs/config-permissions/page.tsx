import { Callout } from "@/components/docs/callout";

const sections = [
  { id: "permissions", label: "Discord permissions" },
  { id: "config-commands", label: "Config commands" },
  { id: "best-practices", label: "Best practices" },
];

export default function ConfigPermissionsDocsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Documentation
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Config & Permissions
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Make sure Rias has the right permissions and configuration so music,
          filters, and game features run smoothly.
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
        <section id="permissions" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Discord permissions
          </h3>

          <p className="text-muted-foreground">At minimum, Rias needs:</p>
          <ul className="list-disc space-y-1 pl-5 text-xs sm:text-[13px]">
            <li>View Channels</li>
            <li>Send Messages</li>
            <li>Use Application Commands</li>
            <li>Connect &amp; Speak (for music)</li>
          </ul>

          <Callout type="warning" title="Voice channels">
            If Rias joins your voice channel but no audio plays, check that she
            has <span className="font-medium">Connect</span>,{" "}
            <span className="font-medium">Speak</span>, and{" "}
            <span className="font-medium">View Channel</span> in that specific
            voice channel or category.
          </Callout>
        </section>

        <section id="config-commands" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Config commands
          </h3>

          <p className="text-muted-foreground">
            The config category controls how the bot behaves globally in your
            server:
          </p>

          <ul className="mt-2 space-y-2 rounded-xl border border-border/60 bg-background p-3 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-primary">prefix</span> – change
              the bot&apos;s text prefix.
            </li>
            <li>
              <span className="font-mono text-primary">dj</span> – set or clear
              a DJ role for queue control.
            </li>
            <li>
              <span className="font-mono text-primary">247</span> – toggle 24/7
              mode so Rias stays in VC.
            </li>
          </ul>

          <Callout type="tip" title="Choosing a good prefix">
            Use a prefix that:
            <br />
            – is short (1–2 characters) <br />
            – doesn&apos;t conflict with other bots <br />– is easy for your
            community to remember.
          </Callout>
        </section>

        <section id="best-practices" className="space-y-3 scroll-mt-24">
          <h3 className="text-lg font-semibold tracking-tight">
            Best practices
          </h3>

          <ul className="list-disc space-y-1 pl-5 text-xs sm:text-[13px] text-muted-foreground">
            <li>
              Limit sensitive commands (clearqueue, remove, config) to staff or
              DJ role.
            </li>
            <li>
              Create dedicated channels for music and bot commands to reduce
              spam.
            </li>
            <li>
              Regularly review permissions when you add new roles or change
              channel structure.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
