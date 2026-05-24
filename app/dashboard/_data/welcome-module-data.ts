export type WelcomeFeatureId =
  | "welcome-message"
  | "welcome-image"
  | "goodbye-message";

export type WelcomeSendMode = "channel" | "dm";

export type WelcomeVariable = readonly [token: string, description: string];

export type WelcomeFeature = {
  id: WelcomeFeatureId;
  title: string;
  description: string;
  editorHint: string;
  defaultMessage: string;
  defaultChannel: string;
  allowDirectMessage: boolean;
  variables: WelcomeVariable[];
};

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
    title: "Welcome image card",
    description: "Send a visual greeting card when a member joins.",
    editorHint: "Configure the welcome image card message and destination.",
    defaultMessage:
      "Welcome [user] to [server]!\nWe hope you enjoy your stay here.",
    defaultChannel: "#welcome",
    allowDirectMessage: true,
    variables: [...memberVariables, ...inviteVariables],
  },
  {
    id: "goodbye-message",
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
