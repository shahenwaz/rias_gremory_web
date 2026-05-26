export type BotTextChannel = {
  id: string;
  name: string;
  commandUsable?: boolean;
  visibility?: "public" | "private";
  unavailableReason?: string | null;
};

export type BotServerConfig = {
  guildId: string;
  prefix: string;
  disabledChannelIds: string[];
  textChannels: BotTextChannel[];
};
