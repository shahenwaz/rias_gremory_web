import {
  mockBotTextChannels,
  type BotTextChannel,
} from "@/app/dashboard/_data/bot-server-config-data";

export type BotVoiceChannel = {
  id: string;
  name: string;
  description: string;
  listenerCount: number;
};

export type BotRole = {
  id: string;
  name: string;
  description: string;
};

export type BotMusicSettings = {
  guildId: string;
  stayEnabled: boolean;
  stayTextChannelId: string | null;
  stayVoiceChannelId: string | null;
  djModeEnabled: boolean;
  djRoleIds: string[];
  setupEnabled: boolean;
  setupTextChannelId: string | null;
  setupMessageId: string | null;
};

export const mockBotVoiceChannels: BotVoiceChannel[] = [
  {
    id: "voice_lounge",
    name: "Lounge",
    description: "Main community voice channel.",
    listenerCount: 7,
  },
  {
    id: "voice_music",
    name: "Music Room",
    description: "Dedicated music listening channel.",
    listenerCount: 3,
  },
  {
    id: "voice_stage",
    name: "Stage",
    description: "Events, streams, and group sessions.",
    listenerCount: 0,
  },
];

export const mockBotRoles: BotRole[] = [
  {
    id: "role_dj",
    name: "DJ",
    description: "Can control music playback when DJ mode is enabled.",
  },
  {
    id: "role_mod",
    name: "Moderator",
    description: "Trusted staff role with music control access.",
  },
  {
    id: "role_music_manager",
    name: "Music Manager",
    description: "Community role for managing queues and playback.",
  },
  {
    id: "role_member",
    name: "Member",
    description: "Default community member role.",
  },
];

const mockBotMusicSettings: BotMusicSettings[] = [
  {
    guildId: "guild_nrz_esports",
    stayEnabled: true,
    stayTextChannelId: "channel_music",
    stayVoiceChannelId: "voice_music",
    djModeEnabled: true,
    djRoleIds: ["role_dj", "role_mod"],
    setupEnabled: true,
    setupTextChannelId: "channel_music",
    setupMessageId: "112233445566778899",
  },
  {
    guildId: "guild_rias_lab",
    stayEnabled: false,
    stayTextChannelId: null,
    stayVoiceChannelId: null,
    djModeEnabled: false,
    djRoleIds: [],
    setupEnabled: true,
    setupTextChannelId: "channel_bot_commands",
    setupMessageId: "998877665544332211",
  },
  {
    guildId: "guild_anime_arena",
    stayEnabled: false,
    stayTextChannelId: null,
    stayVoiceChannelId: null,
    djModeEnabled: false,
    djRoleIds: [],
    setupEnabled: false,
    setupTextChannelId: null,
    setupMessageId: null,
  },
];

export function getBotMusicSettings(guildId: string): BotMusicSettings {
  return (
    mockBotMusicSettings.find(
      (settings: BotMusicSettings) => settings.guildId === guildId,
    ) ?? {
      guildId,
      stayEnabled: false,
      stayTextChannelId: null,
      stayVoiceChannelId: null,
      djModeEnabled: false,
      djRoleIds: [],
      setupEnabled: false,
      setupTextChannelId: null,
      setupMessageId: null,
    }
  );
}

export function getTextChannelLabel(channelId: string | null) {
  if (!channelId) {
    return "No channel selected";
  }

  const channel = mockBotTextChannels.find(
    (textChannel: BotTextChannel) => textChannel.id === channelId,
  );

  return channel ? `#${channel.name}` : "Unknown channel";
}

export function getVoiceChannelLabel(channelId: string | null) {
  if (!channelId) {
    return "No voice channel selected";
  }

  const channel = mockBotVoiceChannels.find(
    (voiceChannel: BotVoiceChannel) => voiceChannel.id === channelId,
  );

  return channel ? channel.name : "Unknown voice channel";
}
