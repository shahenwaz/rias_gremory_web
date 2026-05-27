export type BotMusicTextChannel = {
  id: string;
  name: string;
  description?: string;
};

export type BotVoiceChannel = {
  id: string;
  name: string;
  description?: string;
  listenerCount?: number;
};

export type BotRole = {
  id: string;
  name: string;
  description?: string;
};

export type BotMusicSettingsPayload = {
  stayEnabled: boolean;
  stayTextChannelId: string | null;
  stayVoiceChannelId: string | null;
  djModeEnabled: boolean;
  djRoleIds: string[];
  setupEnabled: boolean;
  setupTextChannelId: string | null;
};

export type BotMusicSettings = BotMusicSettingsPayload & {
  guildId: string;
  setupMessageId: string | null;
  textChannels: BotMusicTextChannel[];
  voiceChannels: BotVoiceChannel[];
  roles: BotRole[];
};

export function getTextChannelLabel(
  channelId: string | null,
  channels: BotMusicTextChannel[],
) {
  if (!channelId) {
    return "No channel selected";
  }

  const channel = channels.find(
    (textChannel: BotMusicTextChannel) => textChannel.id === channelId,
  );

  return channel ? `#${channel.name}` : "Unknown channel";
}

export function getVoiceChannelLabel(
  channelId: string | null,
  channels: BotVoiceChannel[],
) {
  if (!channelId) {
    return "No voice channel selected";
  }

  const channel = channels.find(
    (voiceChannel: BotVoiceChannel) => voiceChannel.id === channelId,
  );

  return channel ? channel.name : "Unknown voice channel";
}
