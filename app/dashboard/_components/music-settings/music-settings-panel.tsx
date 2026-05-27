"use client";

import { Disc3, Headphones, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardSaveBar } from "@/app/dashboard/_components/dashboard-save-bar";
import { DashboardSkeleton } from "@/app/dashboard/_components/dashboard-skeleton";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import { DjRoleSelector } from "@/app/dashboard/_components/music-settings/dj-role-selector";
import { MusicConfigSection } from "@/app/dashboard/_components/music-settings/music-config-section";
import { MusicField } from "@/app/dashboard/_components/music-settings/music-field";
import { MusicStatusHint } from "@/app/dashboard/_components/music-settings/music-status-hint";
import {
  TextChannelSelect,
  VoiceChannelSelect,
} from "@/app/dashboard/_components/music-settings/music-channel-select";
import { useMusicSettings } from "@/app/dashboard/_components/music-settings/use-music-settings";
import {
  getTextChannelLabel,
  getVoiceChannelLabel,
} from "@/app/dashboard/_data/bot-music-settings-data";

export function MusicSettingsPanel() {
  const { activeGuild } = useDashboard();
  const musicSettings = useMusicSettings(activeGuild.id);

  const config = musicSettings.config;
  const form = musicSettings.form;

  if (musicSettings.isLoading) {
    return <MusicSettingsLoading />;
  }

  if (musicSettings.errorMessage && !config) {
    return <MusicSettingsError message={musicSettings.errorMessage} />;
  }

  const textChannels = config?.textChannels ?? [];
  const voiceChannels = config?.voiceChannels ?? [];
  const roles = config?.roles ?? [];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 px-4 py-4 sm:px-5">
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Music settings for{" "}
          <span className="text-primary">{activeGuild.name}</span>
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
          Configure 24/7 playback, DJ permissions, and the music control panel.
        </p>
      </section>

      {musicSettings.errorMessage ? (
        <div className="rounded-md border border-red-400/20 bg-red-400/8 px-3 py-2 text-sm text-red-100/80">
          {musicSettings.errorMessage}
        </div>
      ) : null}

      <section className="space-y-3">
        <MusicConfigSection
          icon={<Radio className="size-4" />}
          title="24/7 music mode"
          description="Keep Rias connected to a voice channel and ready for playback."
          enabled={form.stayEnabled}
          toggleLabel="Toggle 24/7 music mode"
          onToggle={() =>
            musicSettings.updateForm({
              stayEnabled: !form.stayEnabled,
            })
          }
        >
          <div
            className={cn(
              "grid gap-3 lg:grid-cols-2",
              !form.stayEnabled && "opacity-55",
            )}
          >
            <MusicField label="Text channel">
              <TextChannelSelect
                value={form.stayTextChannelId}
                disabled={!form.stayEnabled}
                emptyLabel="Select text channel"
                channels={textChannels}
                onChange={(value: string | null) =>
                  musicSettings.updateForm({
                    stayTextChannelId: value,
                  })
                }
              />
            </MusicField>

            <MusicField label="Voice channel">
              <VoiceChannelSelect
                value={form.stayVoiceChannelId}
                disabled={!form.stayEnabled}
                channels={voiceChannels}
                onChange={(value: string | null) =>
                  musicSettings.updateForm({
                    stayVoiceChannelId: value,
                  })
                }
              />
            </MusicField>
          </div>

          <MusicStatusHint>
            {form.stayEnabled
              ? `Using ${getTextChannelLabel(
                  form.stayTextChannelId,
                  textChannels,
                )} and ${getVoiceChannelLabel(
                  form.stayVoiceChannelId,
                  voiceChannels,
                )}.`
              : "24/7 mode is currently disabled."}
          </MusicStatusHint>
        </MusicConfigSection>

        <MusicConfigSection
          icon={<Headphones className="size-4" />}
          title="DJ mode"
          description="Limit advanced music controls to selected server roles."
          enabled={form.djModeEnabled}
          toggleLabel="Toggle DJ mode"
          onToggle={() =>
            musicSettings.updateForm({
              djModeEnabled: !form.djModeEnabled,
            })
          }
        >
          <div
            className={cn("space-y-2.5", !form.djModeEnabled && "opacity-55")}
          >
            <DjRoleSelector
              roles={roles}
              selectedRoleIds={form.djRoleIds}
              disabled={!form.djModeEnabled}
              onToggleRole={musicSettings.toggleDjRole}
            />

            <MusicStatusHint>
              {form.djModeEnabled
                ? form.djRoleIds.length
                  ? `${form.djRoleIds.length} role${
                      form.djRoleIds.length > 1 ? "s" : ""
                    } can control DJ actions.`
                  : "DJ mode is enabled, but no roles are selected yet."
                : "DJ mode is currently disabled."}
            </MusicStatusHint>
          </div>
        </MusicConfigSection>

        <MusicConfigSection
          icon={<Disc3 className="size-4" />}
          title="Music setup panel"
          description="Choose where Rias should keep the music control message."
          enabled={form.setupEnabled}
          toggleLabel="Toggle music setup panel"
          onToggle={() =>
            musicSettings.updateForm({
              setupEnabled: !form.setupEnabled,
            })
          }
        >
          <div
            className={cn(
              "grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]",
              !form.setupEnabled && "opacity-55",
            )}
          >
            <MusicField label="Setup channel">
              <TextChannelSelect
                value={form.setupTextChannelId}
                disabled={!form.setupEnabled}
                emptyLabel="Select setup channel"
                channels={textChannels}
                onChange={(value: string | null) =>
                  musicSettings.updateForm({
                    setupTextChannelId: value,
                  })
                }
              />
            </MusicField>

            <div className="rounded-md border border-white/8 bg-[#0b0d13] px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/30">
                Setup message
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white/72">
                {config?.setupMessageId ?? "Not created yet"}
              </p>
            </div>
          </div>

          <MusicStatusHint>
            {form.setupEnabled
              ? `Setup panel will use ${getTextChannelLabel(
                  form.setupTextChannelId,
                  textChannels,
                )}.`
              : "Music setup panel is currently disabled."}
          </MusicStatusHint>
        </MusicConfigSection>
      </section>

      <DashboardSaveBar
        hasChanges={musicSettings.hasChanges}
        onReset={musicSettings.resetChanges}
        onSave={musicSettings.saveChanges}
        saveLabel="Save changes"
        saveDisabled={!musicSettings.hasChanges || musicSettings.isSaving}
        isSaving={musicSettings.isSaving}
      />
    </div>
  );
}

function MusicSettingsLoading() {
  return (
    <div className="space-y-3">
      <section className="rounded-2xl border border-white/8 bg-linear-to-br from-white/7 via-white/4 to-primary/5 px-4 py-4 sm:px-5">
        <DashboardSkeleton className="h-7 w-64" />
        <DashboardSkeleton className="mt-3 h-4 w-full max-w-120" />
      </section>

      <section className="space-y-2.5">
        {Array.from({ length: 3 }).map((_, index: number) => (
          <article
            key={index}
            className="rounded-2xl border border-white/8 bg-white/4 p-3.5 sm:p-4"
          >
            <div className="flex gap-3">
              <DashboardSkeleton className="size-9 bg-primary/12" />
              <div className="flex-1">
                <DashboardSkeleton className="h-4 w-40" />
                <DashboardSkeleton className="mt-2 h-3 w-full max-w-96" />
              </div>
            </div>

            <DashboardSkeleton className="mt-4 h-10 w-full" />
          </article>
        ))}
      </section>
    </div>
  );
}

function MusicSettingsError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-400/20 bg-red-400/8 p-5">
      <p className="text-sm font-semibold text-red-100">
        Music settings could not be loaded.
      </p>
      <p className="mt-2 text-sm leading-6 text-red-100/65">{message}</p>
    </div>
  );
}
