import { Callout } from "@/components/docs/callout";
import { docsFaqItems } from "@/src/data/docs-faq"; // or "@/data/docs-faq" if you add a path alias

export default function FaqDocsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Documentation
        </p>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          FAQ
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Quick answers to common problems and questions about Rias.
        </p>
      </header>

      <div className="space-y-4 text-sm leading-relaxed">
        {docsFaqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border/60 bg-background px-4 py-3 sm:px-5 sm:py-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium">
              <span>{item.question}</span>
              <span className="text-xs text-muted-foreground group-open:hidden">
                +
              </span>
              <span className="hidden text-xs text-muted-foreground group-open:inline">
                –
              </span>
            </summary>
            <div className="mt-2 text-xs text-muted-foreground sm:text-[13px]">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      <Callout type="tip" title="Need more help?">
        You can always run <span className="font-mono text-primary">/help</span>{" "}
        inside Discord or contact the bot owner if something looks broken or out
        of date.
      </Callout>
    </div>
  );
}
