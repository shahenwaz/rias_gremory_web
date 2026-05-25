"use client";

import * as React from "react";
import { Ban, CheckCircle2, Hash } from "lucide-react";
import { DashboardSaveBar } from "@/app/dashboard/_components/dashboard-save-bar";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import {
  getBotServerConfig,
  mockBotTextChannels,
  type BotTextChannel,
} from "@/app/dashboard/_data/bot-server-config-data";
import { cn } from "@/lib/utils";

export function ServerConfigPanel() {
  const { activeGuild } = useDashboard();

  const config = React.useMemo(
    () => getBotServerConfig(activeGuild.id),
    [activeGuild.id],
  );

  const [prefix, setPrefix] = React.useState(config.prefix);
  const [botChannelId, setBotChannelId] = React.useState(
    config.botChannelId ?? "",
  );
  const [disabledChannelIds, setDisabledChannelIds] = React.useState<string[]>(
    config.disabledChannelIds,
  );

  React.useEffect(() => {
    setPrefix(config.prefix);
    setBotChannelId(config.botChannelId ?? "");
    setDisabledChannelIds(config.disabledChannelIds);
  }, [config]);

  const selectedBotChannelId = botChannelId || null;

  const selectedBotChannel = mockBotTextChannels.find(
    (channel: BotTextChannel) => channel.id === selectedBotChannelId,
  );

  const commandChannelSummary = selectedBotChannel
    ? `Commands are limited to #${selectedBotChannel.name}.`
    : "Commands are allowed in every channel.";

  const hasChanges =
    prefix !== config.prefix ||
    selectedBotChannelId !== config.botChannelId ||
    !areStringListsEqual(disabledChannelIds, config.disabledChannelIds);

  function toggleDisabledChannel(channelId: string) {
    setDisabledChannelIds((currentIds: string[]) =>
      currentIds.includes(channelId)
        ? currentIds.filter((currentId: string) => currentId !== channelId)
        : [...currentIds, channelId],
    );
  }

  function resetChanges() {
    setPrefix(config.prefix);
    setBotChannelId(config.botChannelId ?? "");
    setDisabledChannelIds(config.disabledChannelIds);
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
          Manage the command prefix, command channel, and where bot commands are
          allowed to run.
        </p>
      </section>

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
                placeholder="!"
              />
            </Field>

            <Field label="Command preview">
              <div className="flex h-10 items-center rounded-md border border-white/8 bg-[#0b0d13] px-3">
                <span className="text-sm font-semibold text-white">
                  {prefix || "!"}play faded
                </span>
              </div>
            </Field>
          </div>
        </ConfigSection>

        <ConfigSection
          icon={<CheckCircle2 className="size-4" />}
          title="Bot command channel"
          description="Choose a dedicated channel for bot commands, or allow commands everywhere."
        >
          <div className="space-y-3">
            <Field label="Allowed command channel">
              <select
                value={botChannelId}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setBotChannelId(event.target.value)
                }
                className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-semibold text-white outline-none transition-colors focus:border-primary/35"
              >
                <option value="">No dedicated channel</option>
                {mockBotTextChannels.map((channel: BotTextChannel) => (
                  <option key={channel.id} value={channel.id}>
                    #{channel.name}
                  </option>
                ))}
              </select>
            </Field>

            <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2.5">
              <p className="text-sm font-medium text-white/62">
                {commandChannelSummary}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/34">
                Choose “No dedicated channel” when you want commands to work in
                all available channels.
              </p>
            </div>
          </div>
        </ConfigSection>

        <ConfigSection
          icon={<Ban className="size-4" />}
          title="Disabled command channels"
          description="Block bot commands in channels where users should not run them."
        >
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {mockBotTextChannels.map((channel: BotTextChannel) => {
              const isDisabled = disabledChannelIds.includes(channel.id);

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
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        #{channel.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/38">
                        {channel.description}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "mt-0.5 shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
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
        </ConfigSection>
      </section>

      <DashboardSaveBar
        hasChanges={hasChanges}
        onReset={resetChanges}
        saveLabel="Save soon"
        saveDisabled
      />
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
