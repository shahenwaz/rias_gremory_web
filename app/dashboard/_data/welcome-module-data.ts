export type WelcomeFeatureId =
  | "welcome-message"
  | "welcome-image"
  | "goodbye-message";

export type WelcomeFeatureType = "text" | "image";

export type WelcomeSendMode = "channel" | "dm";

export type WelcomeVariable = readonly [token: string, description: string];

type BaseWelcomeFeature = {
  id: WelcomeFeatureId;
  type: WelcomeFeatureType;
  title: string;
  description: string;
  editorHint: string;
};

export type WelcomeTextFeature = BaseWelcomeFeature & {
  type: "text";
  defaultMessage: string;
  defaultChannel: string;
  allowDirectMessage: boolean;
  variables: WelcomeVariable[];
};

export type WelcomeImageFeature = BaseWelcomeFeature & {
  type: "image";
  defaultChannel: string;
  cardTitle: string;
  cardSubtitle: string;
};

export type WelcomeFeature = WelcomeTextFeature | WelcomeImageFeature;

const memberVariables: WelcomeVariable[] = [
  ["[user]", "Mentions the member"],
  ["[userName]", "Member name without mentioning"],
  ["[server]", "Server name"],
  ["[memberCount]", "Total member count"],
];

const inviteVariables: WelcomeVariable[] = [
  ["[inviter]", "Mentions the inviter"],
  ["[inviterName]", "Inviter name without mentioning"],
  ["[invites]", "User's invite counter"],
];

export const welcomeFeatures: WelcomeFeature[] = [
  {
    id: "welcome-message",
    type: "text",
    title: "Welcome text message",
    description: "Send a custom text message when a member joins.",
    editorHint: "Write the message Rias should send when a new member joins.",
    defaultMessage:
      "Welcome [user] to [server]!\nInvited by [inviterName]. You are member #[memberCount].",
    defaultChannel: "#welcome",
    allowDirectMessage: true,
    variables: [...memberVariables, ...inviteVariables],
  },
  {
    id: "welcome-image",
    type: "image",
    title: "Welcome image card",
    description: "Send a visual greeting card with the welcome message flow.",
    editorHint:
      "Design the image card. It can be sent with the welcome message, before it, or independently to a channel.",
    defaultChannel: "#welcome",
    cardTitle: "Welcome [userName]",
    cardSubtitle: "[server] just got stronger.",
  },
  {
    id: "goodbye-message",
    type: "text",
    title: "Goodbye text message",
    description: "Send a custom text message when a member leaves.",
    editorHint: "Write the message Rias should send when a member leaves.",
    defaultMessage:
      "[userName] has left [server]. We now have [memberCount] members.",
    defaultChannel: "#goodbye",
    allowDirectMessage: false,
    variables: memberVariables,
  },
];

export function renderWelcomePreview(message: string) {
  return message
    .replace(/\[user\]/g, "@Shahenwaz")
    .replace(/\[userName\]/g, "Shahenwaz")
    .replace(/\[server\]/g, "NRZ Esports")
    .replace(/\[memberCount\]/g, "5884")
    .replace(/\[inviter\]/g, "@Ayaan")
    .replace(/\[inviterName\]/g, "Ayaan")
    .replace(/\[invites\]/g, "12");
}
