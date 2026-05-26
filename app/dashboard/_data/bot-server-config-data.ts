export type BotTextChannel = {
  id: string;
  name: string;
  commandUsable?: boolean;
  unavailableType?:
    | "read-only"
    | "bot-cannot-view"
    | "bot-cannot-read"
    | "bot-cannot-reply"
    | null;
  unavailableTitle?: string | null;
  unavailableReason?: string | null;
};

export type BotServerConfig = {
  guildId: string;
  prefix: string;
  disabledChannelIds: string[];
  textChannels: BotTextChannel[];
};
