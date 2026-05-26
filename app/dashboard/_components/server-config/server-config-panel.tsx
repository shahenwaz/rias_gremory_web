"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Ban, Hash } from "lucide-react";
import { DashboardSaveBar } from "@/app/dashboard/_components/dashboard-save-bar";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import type {
  BotServerConfig,
  BotTextChannel,
} from "@/app/dashboard/_data/bot-server-config-data";
import { DashboardSkeleton } from "@/app/dashboard/_components/dashboard-skeleton";

export function ServerConfigPanel() {
  const { activeGuild } = useDashboard();

  const [config, setConfig] = React.useState<BotServerConfig | null>(null);
  const [prefix, setPrefix] = React.useState("");
  const [disabledChannelIds, setDisabledChannelIds] = React.useState<string[]>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ignoreResponse = false;

    async function loadServerConfig() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(
          `/api/dashboard/guilds/${activeGuild.id}/server-config`,
          {
            cache: "no-store",
          },
        );

        const data = (await response.json()) as
          | BotServerConfig
          | {
              error?: string;
            };

        if (!response.ok) {
          throw new Error(
            "error" in data && data.error
              ? data.error
              : "Unable to load server config.",
          );
        }

        if (!ignoreResponse) {
          applyConfig(data as BotServerConfig);
        }
      } catch (error) {
        if (!ignoreResponse) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load server config.",
          );
        }
      } finally {
        if (!ignoreResponse) {
          setIsLoading(false);
        }
      }
    }

    loadServerConfig();

    return () => {
      ignoreResponse = true;
    };
  }, [activeGuild.id]);

  const textChannels = config?.textChannels ?? [];

  const commandReadyChannels = textChannels.filter(
    (channel: BotTextChannel) => channel.commandUsable !== false,
  );

  const unavailableChannels = textChannels.filter(
    (channel: BotTextChannel) => channel.commandUsable === false,
  );

  const hasChanges = config
    ? prefix !== config.prefix ||
      !areStringListsEqual(disabledChannelIds, config.disabledChannelIds)
    : false;

  function applyConfig(nextConfig: BotServerConfig) {
    setConfig(nextConfig);
    setPrefix(nextConfig.prefix);
    setDisabledChannelIds(nextConfig.disabledChannelIds);
  }

  function toggleDisabledChannel(channelId: string) {
    setDisabledChannelIds((currentIds: string[]) =>
      currentIds.includes(channelId)
        ? currentIds.filter((currentId: string) => currentId !== channelId)
        : [...currentIds, channelId],
    );
  }

  function resetChanges() {
    if (!config) {
      return;
    }

    setPrefix(config.prefix);
    setDisabledChannelIds(config.disabledChannelIds);
  }

  async function saveChanges() {
    if (!config) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `/api/dashboard/guilds/${activeGuild.id}/server-config`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prefix,
            disabledChannelIds,
          }),
        },
      );

      const data = (await response.json()) as
        | BotServerConfig
        | {
            error?: string;
          };

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Unable to save server config.",
        );
      }

      applyConfig(data as BotServerConfig);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save server config.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <ServerConfigLoading />;
  }

  if (errorMessage && !config) {
    return <ServerConfigError message={errorMessage} />;
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 px-4 py-4 sm:px-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
          Server Settings
        </p>

        <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Server Config
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
          Manage the command prefix and choose where bot commands should be
          disabled.
        </p>
      </section>

      {errorMessage ? (
        <div className="rounded-md border border-red-400/20 bg-red-400/8 px-3 py-2 text-sm text-red-100/80">
          {errorMessage}
        </div>
      ) : null}

      <section className="space-y-3">
        <ConfigSection
          icon={<Hash className="size-4" />}
          title="Command prefix"
          description="Set the prefix members use before typing bot commands."
        >
          <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
            <Field label="Prefix">
              <input
                value={prefix}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPrefix(event.target.value.slice(0, 5))
                }
                className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary/35"
                placeholder="."
              />
            </Field>

            <Field label="Command preview">
              <div className="flex h-10 items-center rounded-md border border-white/8 bg-[#0b0d13] px-3">
                <span className="text-sm font-semibold text-white">
                  {prefix || "."}play faded
                </span>
              </div>
            </Field>
          </div>
        </ConfigSection>

        <ConfigSection
          icon={<Ban className="size-4" />}
          title="Channel command access"
          description="Allow or disable commands in channels where Rias can respond."
        >
          {textChannels.length ? (
            <div className="space-y-4">
              <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2.5">
                <p className="text-sm font-medium text-white/62">
                  Commands are allowed in command-ready public channels by
                  default.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Command-ready channels
                  </p>

                  <span className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-[11px] font-semibold text-white/42">
                    {commandReadyChannels.length}
                  </span>
                </div>

                {commandReadyChannels.length ? (
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {commandReadyChannels.map((channel: BotTextChannel) => {
                      const isDisabled = disabledChannelIds.includes(
                        channel.id,
                      );

                      return (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => toggleDisabledChannel(channel.id)}
                          className={cn(
                            "cursor-pointer rounded-md border px-3 py-3 text-left transition-colors",
                            isDisabled
                              ? "border-primary/30 bg-primary/12"
                              : "border-white/8 bg-[#0b0d13] hover:border-white/14 hover:bg-white/5",
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-white">
                                #{channel.name}
                              </p>

                              {channel.visibility === "private" ? (
                                <p className="mt-1 text-xs font-medium text-white/35">
                                  Private channel
                                </p>
                              ) : null}
                            </div>

                            <span
                              className={cn(
                                "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                                isDisabled
                                  ? "border-primary/25 bg-primary/12 text-primary"
                                  : "border-white/8 bg-white/4 text-white/35",
                              )}
                            >
                              {isDisabled ? "Disabled" : "Allowed"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-3 text-sm text-white/42">
                    No command-ready public channels were found.
                  </div>
                )}
              </div>

              {unavailableChannels.length ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                      Unavailable channels
                    </p>

                    <span className="rounded-md border border-amber-300/15 bg-amber-300/8 px-2 py-0.5 text-[11px] font-semibold text-amber-100/65">
                      {unavailableChannels.length}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {unavailableChannels.map((channel: BotTextChannel) => (
                      <div
                        key={channel.id}
                        className="rounded-md border border-amber-300/12 bg-amber-300/6 px-3 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              #{channel.name}
                            </p>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/42">
                              {channel.unavailableReason ??
                                "Commands cannot run here because of Discord permissions."}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-md border border-amber-300/15 bg-amber-300/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-100/65">
                            Unavailable
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-3 text-sm text-white/42">
              No public text channels were returned for this server.
            </div>
          )}
        </ConfigSection>
      </section>

      <DashboardSaveBar
        hasChanges={hasChanges}
        onReset={resetChanges}
        onSave={saveChanges}
        saveLabel="Save changes"
        saveDisabled={!hasChanges || isSaving}
        isSaving={isSaving}
      />
    </div>
  );
}

function ServerConfigLoading() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 px-4 py-4 sm:px-5">
        <DashboardSkeleton className="h-3 w-32 bg-primary/18" />
        <DashboardSkeleton className="mt-3 h-7 w-44" />
        <DashboardSkeleton className="mt-3 h-4 w-full max-w-160" />
        <DashboardSkeleton className="mt-2 h-4 w-full max-w-130" />
      </section>

      <section className="space-y-3">
        <SkeletonPrefixCard />
        <SkeletonChannelAccessCard />
      </section>
    </div>
  );
}

function SkeletonPrefixCard() {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/4 p-4 sm:p-5">
      <div className="mb-4 flex min-w-0 gap-3">
        <DashboardSkeleton className="size-9 shrink-0 bg-primary/12" />

        <div className="min-w-0 flex-1">
          <DashboardSkeleton className="h-4 w-36" />
          <DashboardSkeleton className="mt-2 h-3 w-full max-w-105" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
        <div>
          <SkeletonFieldLabel className="w-16" />
          <DashboardSkeleton className="mt-2 h-10 w-full" />
        </div>

        <div>
          <SkeletonFieldLabel className="w-32" />
          <DashboardSkeleton className="mt-2 h-10 w-full" />
        </div>
      </div>
    </article>
  );
}

function SkeletonChannelAccessCard() {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/4 p-4 sm:p-5">
      <div className="mb-4 flex min-w-0 gap-3">
        <DashboardSkeleton className="size-9 shrink-0 bg-primary/12" />

        <div className="min-w-0 flex-1">
          <DashboardSkeleton className="h-4 w-44" />
          <DashboardSkeleton className="mt-2 h-3 w-full max-w-130" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2.5">
          <DashboardSkeleton className="h-4 w-full max-w-107.5" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <DashboardSkeleton className="h-3 w-40" />
            <DashboardSkeleton className="h-5 w-8" />
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index: number) => (
              <SkeletonCommandChannelCard key={index} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <DashboardSkeleton className="h-3 w-36" />
            <DashboardSkeleton className="h-5 w-8 bg-amber-300/10" />
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index: number) => (
              <SkeletonUnavailableChannelCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function SkeletonCommandChannelCard() {
  return (
    <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <DashboardSkeleton className="h-4 w-28" />
          <DashboardSkeleton className="mt-2 h-3 w-20" />
        </div>

        <DashboardSkeleton className="h-5 w-16 shrink-0" />
      </div>
    </div>
  );
}

function SkeletonUnavailableChannelCard() {
  return (
    <div className="rounded-md border border-amber-300/12 bg-amber-300/6 px-3 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <DashboardSkeleton className="h-4 w-24" />
          <DashboardSkeleton className="mt-2 h-3 w-full max-w-45" />
          <DashboardSkeleton className="mt-1.5 h-3 w-full max-w-32.5" />
        </div>

        <DashboardSkeleton className="h-5 w-20 shrink-0 bg-amber-300/10" />
      </div>
    </div>
  );
}

function SkeletonFieldLabel({ className }: { className?: string }) {
  return <DashboardSkeleton className={cn("h-3 bg-white/8", className)} />;
}

function ServerConfigError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/8 p-5">
      <p className="text-sm font-semibold text-red-100">
        Server config could not be loaded.
      </p>
      <p className="mt-2 text-sm leading-6 text-red-100/65">{message}</p>
    </div>
  );
}

function ConfigSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/4 p-4 transition-colors hover:border-white/12 sm:p-5">
      <div className="mb-4 flex min-w-0 gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/18 bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-white/44">
            {description}
          </p>
        </div>
      </div>

      {children}
    </article>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function areStringListsEqual(firstList: string[], secondList: string[]) {
  if (firstList.length !== secondList.length) {
    return false;
  }

  const sortedFirstList = [...firstList].sort();
  const sortedSecondList = [...secondList].sort();

  return sortedFirstList.every(
    (item: string, index: number) => item === sortedSecondList[index],
  );
}
