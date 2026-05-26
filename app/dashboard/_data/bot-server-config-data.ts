export type BotTextChannel = {
  id: string;
  name: string;
  description?: string;
};

export type BotServerConfig = {
  guildId: string;
  prefix: string;
  botChannelId: string | null;
  disabledChannelIds: string[];
  textChannels: BotTextChannel[];
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

export function getBotTextChannelName(
  channels: BotTextChannel[],
  channelId: string | null,
) {
  if (!channelId) {
    return "Not selected";
  }

  const channel = channels.find(
    (textChannel: BotTextChannel) => textChannel.id === channelId,
  );

  return channel ? `#${channel.name}` : "Unknown channel";
}
