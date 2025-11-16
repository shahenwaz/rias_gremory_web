export type DocsFaqItem = {
  question: string;
  answer: string;
};

export const docsFaqItems: DocsFaqItem[] = [
  {
    question: "Music commands are not working. What should I check?",
    answer:
      "Make sure Rias is online, has Connect & Speak in your voice channel, and Use Application Commands in the text channel. Try /help to confirm the bot is responding.",
  },
  {
    question: "Songs keep stopping or skipping.",
    answer:
      "Check your internet connection, server region, and make sure no one is spamming skip, stop, or clearqueue. If issues persist, try moving Rias to a different voice channel.",
  },
  {
    question: "Filters do nothing when I enable them.",
    answer:
      "Filters only apply while music is playing. Start a track with play first, then apply filters like nightcore, bassboost, or speed. Use reset to clear active filters.",
  },
  {
    question: "I lost my anime characters or balance.",
    answer:
      "If you switched servers, profiles may be separate per server depending on configuration. Double-check you are using the right server and account. If this still looks wrong, contact the bot owner with details.",
  },
  {
    question: "How do I restrict who can control music?",
    answer:
      "Use the dj config command to set a DJ role, then let only that role use powerful queue commands. You can also rely on Discord role permissions and channel overrides.",
  },
];
