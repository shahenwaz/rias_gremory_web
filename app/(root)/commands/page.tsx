"use client";

import * as React from "react";
import {
  COMMANDS,
  COMMAND_CATEGORIES,
  type CommandCategoryId,
} from "@/src/data/commands";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Copy,
  Check,
  Filter,
  Music2,
  ListMusic,
  Gamepad2,
  Settings2,
  SmilePlus,
  Info,
  ShieldCheck,
  Grid3X3,
  type LucideIcon,
} from "lucide-react";

const CATEGORY_ICON_MAP: Record<CommandCategoryId, LucideIcon> = {
  filters: Filter,
  music: Music2,
  playlist: ListMusic,
  animegame: Gamepad2,
  config: Settings2,
  fun: SmilePlus,
  info: Info,
  mod: ShieldCheck,
};

export default function CommandsPage() {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<
    CommandCategoryId | "all"
  >("all");

  const categoriesSorted = React.useMemo(
    () => [...COMMAND_CATEGORIES].sort((a, b) => a.sortOrder - b.sortOrder),
    []
  );

  const filteredCommands = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    return COMMANDS.filter((cmd) => {
      if (activeCategory !== "all" && cmd.category !== activeCategory)
        return false;

      if (!query) return true;

      const catLabel =
        COMMAND_CATEGORIES.find((c) => c.id === cmd.category)?.label ?? "";
      const haystack = [
        cmd.name,
        cmd.description,
        catLabel,
        ...(cmd.keywords ?? []),
        ...(cmd.examples ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    }).sort((a, b) => {
      const aCat =
        COMMAND_CATEGORIES.find((c) => c.id === a.category)?.sortOrder ?? 99;
      const bCat =
        COMMAND_CATEGORIES.find((c) => c.id === b.category)?.sortOrder ?? 99;
      if (aCat !== bCat) return aCat - bCat;
      return a.name.localeCompare(b.name);
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex max-w-6xl flex-col gap-4">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Rias Gremory Commands
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Command Library
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Browse all Rias Gremory commands with live search, category
                filters, and detailed usage examples. Perfect for server owners
                and power users.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <StatChip
                label="Total commands"
                value={COMMANDS.length.toString()}
              />
              <StatChip
                label="Categories"
                value={COMMAND_CATEGORIES.length.toString()}
              />
            </div>
          </div>
        </div>

        {/* Filters bar */}
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-sm">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands by name or keyword…"
                className="h-10 text-sm"
              />
            </div>
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Showing{" "}
                <span className="font-medium">{filteredCommands.length}</span>{" "}
                commands
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 pt-1 text-xs">
            <CategoryPill
              label="All"
              icon={Grid3X3}
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {categoriesSorted.map((cat) => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
                icon={CATEGORY_ICON_MAP[cat.id]}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Commands list */}
        <div className="rounded-2xl border border-border/60 bg-card p-3 sm:p-4">
          {filteredCommands.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
              <p className="font-medium">No commands found.</p>
              <p className="max-w-sm">
                Try a different keyword or reset the category filter to
                &quot;All&quot;.
              </p>
            </div>
          ) : (
            <Accordion type="multiple" className="w-full">
              {filteredCommands.map((cmd) => (
                <AccordionItem
                  key={cmd.category + ":" + cmd.name}
                  value={cmd.category + ":" + cmd.name}
                  className="border-border/40"
                >
                  <AccordionTrigger className="px-3 text-left hover:no-underline hover:bg-muted/80">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base lg:text-lg font-bold uppercase tracking-[0.18em] text-primary">
                            /{cmd.name}
                          </span>
                          <CommandCategoryBadge categoryId={cmd.category} />
                        </div>

                        <p className="line-clamp-1 text-xs text-muted-foreground sm:text-sm">
                          {cmd.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-3 pb-4 pt-1 text-sm">
                    <div className="space-y-3 rounded-xl border border-border/40 bg-background p-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            Usage
                          </p>
                          <CopyUsageButton usage={cmd.usage} />
                        </div>
                        <code className="inline-block rounded-md bg-muted/60 px-2 py-1 text-xs">
                          {cmd.usage}
                        </code>
                      </div>

                      {cmd.examples && cmd.examples.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            Examples
                          </p>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            {cmd.examples.map((ex, idx) => (
                              <li
                                key={idx}
                                className="rounded-md bg-muted/40 px-2 py-1 font-mono text-[11px] sm:text-xs"
                              >
                                {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {cmd.keywords && cmd.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cmd.keywords.map((kw) => (
                            <Badge
                              key={kw}
                              variant="outline"
                              className="border-border/40 bg-muted/40 px-1.5 py-0 text-[10px] font-normal"
                            >
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>
    </main>
  );
}

function StatChip({
  label,
  value,
  truncate,
}: {
  label: string;
  value: string;
  truncate?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-muted/40 px-3 py-1">
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className={`text-xs ${truncate ? "line-clamp-1" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function CategoryPill({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active ? "true" : "false"}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-transparent bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground transition hover:bg-muted/70 data-[active=true]:border-primary/60 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground cursor-pointer"
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </button>
  );
}

function CopyUsageButton({ usage }: { usage: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(usage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy usage", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 px-2 py-1 text-[10px] font-medium text-muted-foreground transition hover:bg-muted/70 hover:text-foreground cursor-pointer"
      aria-label="Copy usage"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function CommandCategoryBadge({
  categoryId,
}: {
  categoryId: CommandCategoryId;
}) {
  const categoryMeta = COMMAND_CATEGORIES.find((c) => c.id === categoryId);
  const Icon = CATEGORY_ICON_MAP[categoryId];

  return (
    <Badge
      variant="outline"
      className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.12),rgba(10,10,12,0.96))] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-100/90 shadow-sm shadow-black/30"
    >
      {Icon && (
        <Icon
          className="h-3.5 w-3.5 shrink-0 text-rose-200/90 drop-shadow-[0_0_2px_rgba(248,113,113,0.35)]"
          aria-hidden="true"
        />
      )}
      <span className="relative top-[0.2px]">
        {categoryMeta?.label ?? categoryId}
      </span>
    </Badge>
  );
}
