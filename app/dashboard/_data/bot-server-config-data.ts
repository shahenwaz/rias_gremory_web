export type BotTextChannel = {
  id: string;
  name: string;
  description: string;
};

export type BotServerConfig = {
  guildId: string;
  prefix: string;
  botChannelId: string | null;
  disabledChannelIds: string[];
};

export const mockBotTextChannels: BotTextChannel[] = [
  {
    id: "channel_general",
    name: "general",
    description: "Main community chat.",
  },
  {
    id: "channel_music",
    name: "music",
    description: "Music commands and queue activity.",
  },
  {
    id: "channel_bot_commands",
    name: "bot-commands",
    description: "Dedicated channel for bot commands.",
  },
  {
    id: "channel_welcome",
    name: "welcome",
    description: "Member greeting channel.",
  },
  {
    id: "channel_logs",
    name: "logs",
    description: "Server logs and staff activity.",
  },
];

const mockBotServerConfigs: BotServerConfig[] = [
  {
    guildId: "guild_nrz_esports",
    prefix: "!",
    botChannelId: "channel_bot_commands",
    disabledChannelIds: ["channel_general", "channel_welcome"],
  },
  {
    guildId: "guild_rias_lab",
    prefix: "-",
    botChannelId: "channel_music",
    disabledChannelIds: ["channel_logs"],
  },
  {
    guildId: "guild_anime_arena",
    prefix: "?",
    botChannelId: null,
    disabledChannelIds: [],
  },
];

export function getBotServerConfig(guildId: string): BotServerConfig {
  return (
    mockBotServerConfigs.find(
      (config: BotServerConfig) => config.guildId === guildId,
    ) ?? {
      guildId,
      prefix: "!",
      botChannelId: null,
      disabledChannelIds: [],
    }
  );
}

export function getBotTextChannelName(channelId: string | null) {
  if (!channelId) {
    return "Not selected";
  }

  const channel = mockBotTextChannels.find(
    (textChannel: BotTextChannel) => textChannel.id === channelId,
  );

  return channel ? `#${channel.name}` : "Unknown channel";
}
