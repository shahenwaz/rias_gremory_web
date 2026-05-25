"use client";

import * as React from "react";
import { Disc3, Headphones, Radio } from "lucide-react";
import { DashboardSaveBar } from "@/app/dashboard/_components/dashboard-save-bar";
import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import {
  mockBotTextChannels,
  type BotTextChannel,
} from "@/app/dashboard/_data/bot-server-config-data";
import {
  getBotMusicSettings,
  getTextChannelLabel,
  getVoiceChannelLabel,
  mockBotRoles,
  mockBotVoiceChannels,
  type BotRole,
  type BotVoiceChannel,
} from "@/app/dashboard/_data/bot-music-settings-data";
import { cn } from "@/lib/utils";

export function MusicSettingsPanel() {
  const { activeGuild } = useDashboard();

  const settings = React.useMemo(
    () => getBotMusicSettings(activeGuild.id),
    [activeGuild.id],
  );

  const [stayEnabled, setStayEnabled] = React.useState(settings.stayEnabled);
  const [stayTextChannelId, setStayTextChannelId] = React.useState(
    settings.stayTextChannelId ?? "",
  );
  const [stayVoiceChannelId, setStayVoiceChannelId] = React.useState(
    settings.stayVoiceChannelId ?? "",
  );
  const [djModeEnabled, setDjModeEnabled] = React.useState(
    settings.djModeEnabled,
  );
  const [djRoleIds, setDjRoleIds] = React.useState<string[]>(
    settings.djRoleIds,
  );
  const [setupEnabled, setSetupEnabled] = React.useState(settings.setupEnabled);
  const [setupTextChannelId, setSetupTextChannelId] = React.useState(
    settings.setupTextChannelId ?? "",
  );

  React.useEffect(() => {
    setStayEnabled(settings.stayEnabled);
    setStayTextChannelId(settings.stayTextChannelId ?? "");
    setStayVoiceChannelId(settings.stayVoiceChannelId ?? "");
    setDjModeEnabled(settings.djModeEnabled);
    setDjRoleIds(settings.djRoleIds);
    setSetupEnabled(settings.setupEnabled);
    setSetupTextChannelId(settings.setupTextChannelId ?? "");
  }, [settings]);

  const hasChanges =
    stayEnabled !== settings.stayEnabled ||
    normalizeId(stayTextChannelId) !== settings.stayTextChannelId ||
    normalizeId(stayVoiceChannelId) !== settings.stayVoiceChannelId ||
    djModeEnabled !== settings.djModeEnabled ||
    setupEnabled !== settings.setupEnabled ||
    normalizeId(setupTextChannelId) !== settings.setupTextChannelId ||
    !areStringListsEqual(djRoleIds, settings.djRoleIds);

  function toggleDjRole(roleId: string) {
    setDjRoleIds((currentIds: string[]) =>
      currentIds.includes(roleId)
        ? currentIds.filter((currentId: string) => currentId !== roleId)
        : [...currentIds, roleId],
    );
  }

  function resetChanges() {
    setStayEnabled(settings.stayEnabled);
    setStayTextChannelId(settings.stayTextChannelId ?? "");
    setStayVoiceChannelId(settings.stayVoiceChannelId ?? "");
    setDjModeEnabled(settings.djModeEnabled);
    setDjRoleIds(settings.djRoleIds);
    setSetupEnabled(settings.setupEnabled);
    setSetupTextChannelId(settings.setupTextChannelId ?? "");
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 px-4 py-4 sm:px-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
          Music Controls
        </p>

        <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Music Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
          Configure 24/7 playback, DJ mode, music roles, and the music setup
          panel for this server.
        </p>
      </section>

      <section className="space-y-3">
        <MusicConfigSection
          icon={<Radio className="size-4" />}
          title="24/7 music mode"
          description="Keep the bot connected to a voice channel and ready for music playback."
          enabled={stayEnabled}
          toggleLabel="Toggle 24/7 music mode"
          onToggle={() =>
            setStayEnabled((currentValue: boolean) => !currentValue)
          }
        >
          <div
            className={cn(
              "grid gap-3 lg:grid-cols-2",
              !stayEnabled && "opacity-55",
            )}
          >
            <Field label="Text channel">
              <TextChannelSelect
                value={stayTextChannelId}
                disabled={!stayEnabled}
                emptyLabel="Select text channel"
                onChange={setStayTextChannelId}
              />
            </Field>

            <Field label="Voice channel">
              <VoiceChannelSelect
                value={stayVoiceChannelId}
                disabled={!stayEnabled}
                onChange={setStayVoiceChannelId}
              />
            </Field>
          </div>

          <StatusHint>
            {stayEnabled
              ? `Using ${getTextChannelLabel(
                  normalizeId(stayTextChannelId),
                )} and ${getVoiceChannelLabel(normalizeId(stayVoiceChannelId))}.`
              : "24/7 mode is currently disabled."}
          </StatusHint>
        </MusicConfigSection>

        <MusicConfigSection
          icon={<Headphones className="size-4" />}
          title="DJ mode"
          description="Limit advanced music controls to selected roles."
          enabled={djModeEnabled}
          toggleLabel="Toggle DJ mode"
          onToggle={() =>
            setDjModeEnabled((currentValue: boolean) => !currentValue)
          }
        >
          <div className={cn("space-y-3", !djModeEnabled && "opacity-55")}>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {mockBotRoles.map((role: BotRole) => {
                const isSelected = djRoleIds.includes(role.id);

                return (
                  <button
                    key={role.id}
                    type="button"
                    disabled={!djModeEnabled}
                    onClick={() => toggleDjRole(role.id)}
                    className={cn(
                      "cursor-pointer rounded-md border px-3 py-3 text-left transition-colors disabled:cursor-not-allowed",
                      isSelected
                        ? "border-primary/30 bg-primary/12"
                        : "border-white/8 bg-[#0b0d13] hover:border-white/14 hover:bg-white/5",
                    )}
                  >
                    <p className="truncate text-sm font-semibold text-white">
                      {role.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/38">
                      {role.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <StatusHint>
              {djModeEnabled
                ? djRoleIds.length
                  ? `${djRoleIds.length} role${djRoleIds.length > 1 ? "s" : ""} can control DJ actions.`
                  : "DJ mode is enabled, but no roles are selected yet."
                : "DJ mode is currently disabled."}
            </StatusHint>
          </div>
        </MusicConfigSection>

        <MusicConfigSection
          icon={<Disc3 className="size-4" />}
          title="Music setup panel"
          description="Choose where the bot should keep its music control message."
          enabled={setupEnabled}
          toggleLabel="Toggle music setup panel"
          onToggle={() =>
            setSetupEnabled((currentValue: boolean) => !currentValue)
          }
        >
          <div
            className={cn(
              "grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]",
              !setupEnabled && "opacity-55",
            )}
          >
            <Field label="Setup channel">
              <TextChannelSelect
                value={setupTextChannelId}
                disabled={!setupEnabled}
                emptyLabel="Select setup channel"
                onChange={setSetupTextChannelId}
              />
            </Field>

            <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/30">
                Setup message
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white/72">
                {settings.setupMessageId ?? "Not created yet"}
              </p>
            </div>
          </div>

          <StatusHint>
            {setupEnabled
              ? `Setup panel will use ${getTextChannelLabel(
                  normalizeId(setupTextChannelId),
                )}.`
              : "Music setup panel is currently disabled."}
          </StatusHint>
        </MusicConfigSection>
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

function MusicConfigSection({
  icon,
  title,
  description,
  enabled,
  toggleLabel,
  children,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  toggleLabel: string;
  children: React.ReactNode;
  onToggle: () => void;
}) {
  return (
    <article className="rounded-2xl border border-white/8 bg-white/4 p-4 transition-colors hover:border-white/12 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
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

        <DashboardToggle
          checked={enabled}
          label={toggleLabel}
          onCheckedChange={onToggle}
        />
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

function TextChannelSelect({
  value,
  disabled,
  emptyLabel,
  onChange,
}: {
  value: string;
  disabled: boolean;
  emptyLabel: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.target.value)
      }
      className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-semibold text-white outline-none transition-colors focus:border-primary/35 disabled:cursor-not-allowed"
    >
      <option value="">{emptyLabel}</option>
      {mockBotTextChannels.map((channel: BotTextChannel) => (
        <option key={channel.id} value={channel.id}>
          #{channel.name}
        </option>
      ))}
    </select>
  );
}

function VoiceChannelSelect({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(event.target.value)
      }
      className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-semibold text-white outline-none transition-colors focus:border-primary/35 disabled:cursor-not-allowed"
    >
      <option value="">Select voice channel</option>
      {mockBotVoiceChannels.map((channel: BotVoiceChannel) => (
        <option key={channel.id} value={channel.id}>
          {channel.name} · {channel.listenerCount} listening
        </option>
      ))}
    </select>
  );
}

function StatusHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2 text-sm leading-5 text-white/42">
      {children}
    </div>
  );
}

function normalizeId(value: string) {
  return value || null;
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
