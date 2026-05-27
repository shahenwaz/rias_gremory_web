import type {
  BotMusicTextChannel,
  BotVoiceChannel,
} from "@/app/dashboard/_data/bot-music-settings-data";

type TextChannelSelectProps = {
  value: string | null;
  disabled: boolean;
  emptyLabel: string;
  channels: BotMusicTextChannel[];
  onChange: (value: string | null) => void;
};

type VoiceChannelSelectProps = {
  value: string | null;
  disabled: boolean;
  channels: BotVoiceChannel[];
  onChange: (value: string | null) => void;
};

export function TextChannelSelect({
  value,
  disabled,
  emptyLabel,
  channels,
  onChange,
}: TextChannelSelectProps) {
  return (
    <select
      value={value ?? ""}
      disabled={disabled}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(normalizeSelectValue(event.target.value))
      }
      className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-semibold text-white outline-none transition-colors focus:border-primary/35 disabled:cursor-not-allowed"
    >
      <option value="">{emptyLabel}</option>
      {channels.map((channel: BotMusicTextChannel) => (
        <option key={channel.id} value={channel.id}>
          #{channel.name}
        </option>
      ))}
    </select>
  );
}

export function VoiceChannelSelect({
  value,
  disabled,
  channels,
  onChange,
}: VoiceChannelSelectProps) {
  return (
    <select
      value={value ?? ""}
      disabled={disabled}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(normalizeSelectValue(event.target.value))
      }
      className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-semibold text-white outline-none transition-colors focus:border-primary/35 disabled:cursor-not-allowed"
    >
      <option value="">Select voice channel</option>
      {channels.map((channel: BotVoiceChannel) => (
        <option key={channel.id} value={channel.id}>
          {channel.name}
          {typeof channel.listenerCount === "number"
            ? ` · ${channel.listenerCount} listening`
            : ""}
        </option>
      ))}
    </select>
  );
}

function normalizeSelectValue(value: string) {
  return value || null;
}
