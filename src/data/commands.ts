export type CommandCategoryId =
  | "filters"
  | "music"
  | "playlist"
  | "animegame"
  | "config"
  | "fun"
  | "info"
  | "mod";

export interface CommandCategory {
  id: CommandCategoryId;
  label: string;
  description: string;
  sortOrder: number;
}

export interface Command {
  name: string;
  category: CommandCategoryId;
  description: string;
  usage: string;
  examples?: string[];
  keywords?: string[];
  premium?: boolean;
}

export const COMMAND_CATEGORIES: CommandCategory[] = [
  {
    id: "filters",
    label: "Filters",
    description: "Audio filters & effects for the music player.",
    sortOrder: 1,
  },
  {
    id: "music",
    label: "Music",
    description: "Core music playback and queue management.",
    sortOrder: 2,
  },
  {
    id: "playlist",
    label: "Playlist",
    description: "Create and manage custom playlists.",
    sortOrder: 3,
  },
  {
    id: "animegame",
    label: "Anime Game",
    description: "Economy & progression for the anime gacha game.",
    sortOrder: 4,
  },
  {
    id: "config",
    label: "Config",
    description: "Server configuration & bot behavior settings.",
    sortOrder: 5,
  },
  {
    id: "fun",
    label: "Fun",
    description: "Interaction and reaction commands.",
    sortOrder: 6,
  },
  {
    id: "info",
    label: "Info",
    description: "Bot, ping and uptime information.",
    sortOrder: 7,
  },
  {
    id: "mod",
    label: "Mod",
    description: "Lightweight moderation history tools.",
    sortOrder: 8,
  },
];

export const COMMANDS: Command[] = [
  // --- Filters (from Help Menu) ---
  {
    name: "8d",
    category: "filters",
    description: "Toggle 8D surround audio effect for the current music.",
    usage: "/8d",
    keywords: ["audio", "effect", "filter"],
  },
  {
    name: "distorsion",
    category: "filters",
    description: "Apply a distortion-style audio effect.",
    usage: "/distorsion",
    keywords: ["audio", "filter"],
  },
  {
    name: "pitch",
    category: "filters",
    description: "Change the pitch of the current track.",
    usage: "/pitch <value>",
    examples: ["/pitch 1.2", "/pitch 0.8"],
    keywords: ["key", "voice", "audio"],
  },
  {
    name: "reset",
    category: "filters",
    description: "Reset all active audio filters.",
    usage: "/reset",
    keywords: ["remove filter", "clear filter"],
  },
  {
    name: "bassboost",
    category: "filters",
    description: "Boost low frequencies for a bass-heavy sound.",
    usage: "/bassboost <level>",
    examples: ["/bassboost low", "/bassboost high"],
    keywords: ["bass", "filter"],
  },
  // ... add distorsion, rotation, tremolo, vibrato, karaoke, lowpass, nightcore, speed

  // --- Music ---
  {
    name: "play",
    category: "music",
    description: "Play a song from name or URL and join your voice channel.",
    usage: "/play <query>",
    examples: ["/play enemy imagine dragons", "/play https://youtu.be/..."],
    keywords: ["music", "song", "queue"],
  },
  {
    name: "skip",
    category: "music",
    description: "Skip the currently playing track.",
    usage: "/skip",
    keywords: ["next", "music"],
  },
  {
    name: "queue",
    category: "music",
    description: "Show the current music queue.",
    usage: "/queue",
    keywords: ["list", "music"],
  },
  {
    name: "pause",
    category: "music",
    description: "Pause the music playback.",
    usage: "/pause",
    keywords: ["stop", "music"],
  },
  {
    name: "resume",
    category: "music",
    description: "Resume the paused music.",
    usage: "/resume",
    keywords: ["unpause", "music"],
  },
  // ... add clearqueue, grab, autoplay, join, leave, loop, mood, nowplaying, remove, search, seek, shuffle, skipto, stop, volume

  // --- Playlist ---
  {
    name: "create",
    category: "playlist",
    description: "Create a new custom music playlist.",
    usage: "/playlist create <name>",
    examples: ["/playlist create chill"],
    keywords: ["playlist"],
  },
  {
    name: "add",
    category: "playlist",
    description: "Add the current or given song to a playlist.",
    usage: "/playlist add <name> [song]",
    keywords: ["playlist"],
  },
  // ... delete, load

  // --- Anime Game ---
  {
    name: "gacha",
    category: "animegame",
    description: "Roll the gacha to obtain new characters.",
    usage: "/gacha",
    keywords: ["roll", "pull"],
  },
  {
    name: "team",
    category: "animegame",
    description: "Show or manage your current team setup.",
    usage: "/team",
    keywords: ["anime", "party"],
  },
  // ... balance, daily, event, give, inventory, leaderboard, profile, quest,
  // release, resetteam, shop, show, teambattle, trade, train, use

  // --- Config ---
  {
    name: "247",
    category: "config",
    description: "Toggle 24/7 mode so Rias stays in the voice channel.",
    usage: "/247",
    keywords: ["24/7", "stay"],
  },
  {
    name: "dj",
    category: "config",
    description: "Configure DJ roles that can control the music.",
    usage: "/dj <add|remove> <role>",
  },
  {
    name: "prefix",
    category: "config",
    description: "Set a custom text prefix (for legacy message commands).",
    usage: "/prefix <symbol>",
  },

  // --- Fun ---
  {
    name: "hug",
    category: "fun",
    description: "Send a warm hug to another user.",
    usage: "/hug <user>",
    keywords: ["interaction", "rp"],
  },
  {
    name: "kiss",
    category: "fun",
    description: "Send a cute kiss to someone.",
    usage: "/kiss <user>",
  },
  // ... bite, cry, lick, poke, punch, ship, slap, sleep, spank

  // --- Info ---
  {
    name: "about",
    category: "info",
    description: "Show detailed info about Rias Gremory.",
    usage: "/about",
    keywords: ["bot", "info"],
  },
  {
    name: "ping",
    category: "info",
    description: "Check the bot latency and shard status.",
    usage: "/ping",
  },
  {
    name: "uptime",
    category: "info",
    description: "See how long Rias has been online.",
    usage: "/uptime",
  },
  // ... help, info, invite, lavalink

  // --- Mod ---
  {
    name: "snipe",
    category: "mod",
    description: "Show the last deleted message in this channel.",
    usage: "/snipe",
    keywords: ["mod", "logs"],
  },
  {
    name: "editsnipe",
    category: "mod",
    description: "Show the last edited message before it was changed.",
    usage: "/editsnipe",
  },
];
