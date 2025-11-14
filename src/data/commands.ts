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
  // --- Filters ---
  {
    name: "8d",
    category: "filters",
    description: "Toggle 8D surround audio effect for the current track.",
    usage: "/8d",
    keywords: ["8d", "surround", "3d", "spatial", "filter"],
  },
  {
    name: "distorsion",
    category: "filters",
    description: "Apply a distorted, overdriven audio effect.",
    usage: "/distorsion",
    keywords: ["distortion", "overdrive", "filter", "fx", "audio effect"],
  },
  {
    name: "pitch",
    category: "filters",
    description: "Change the pitch of the current track without restarting it.",
    usage: "/pitch <value>",
    examples: ["/pitch 1.2", "/pitch 0.8"],
    keywords: ["pitch", "key", "voice", "high", "low", "chipmunk", "deep"],
  },
  {
    name: "reset",
    category: "filters",
    description: "Reset all active audio filters back to default.",
    usage: "/reset",
    keywords: ["reset filters", "clear filters", "remove effect", "default"],
  },
  {
    name: "rotation",
    category: "filters",
    description: "Enable rotating stereo audio for a 3D sound experience.",
    usage: "/rotation",
    keywords: ["rotate", "pan", "3d", "spinning", "filter"],
  },
  {
    name: "tremolo",
    category: "filters",
    description: "Apply a tremolo effect that oscillates the volume.",
    usage: "/tremolo",
    keywords: ["tremolo", "volume wobble", "oscillate", "filter"],
  },
  {
    name: "vibrato",
    category: "filters",
    description: "Apply a vibrato effect that oscillates the pitch.",
    usage: "/vibrato",
    keywords: ["vibrato", "pitch wobble", "wavy", "filter"],
  },
  {
    name: "bassboost",
    category: "filters",
    description: "Boost low frequencies for a deeper, bass-heavy sound.",
    usage: "/bassboost <level>",
    examples: ["/bassboost low", "/bassboost medium", "/bassboost high"],
    keywords: ["bass", "bass boost", "low end", "subwoofer", "filter"],
  },
  {
    name: "karaoke",
    category: "filters",
    description: "Remove vocals from the track for a karaoke-style mix.",
    usage: "/karaoke",
    keywords: ["karaoke", "remove vocals", "instrumental", "sing", "filter"],
  },
  {
    name: "lowpass",
    category: "filters",
    description: "Enable a lowpass filter for a muffled, underwater effect.",
    usage: "/lowpass",
    keywords: ["lowpass", "muffle", "underwater", "lofi", "filter"],
  },
  {
    name: "nightcore",
    category: "filters",
    description: "Toggle a nightcore-style effect (faster & higher pitch).",
    usage: "/nightcore",
    keywords: ["nightcore", "anime edit", "speed up", "high pitch", "filter"],
  },
  {
    name: "speed",
    category: "filters",
    description: "Change the playback speed of the current track.",
    usage: "/speed <value>",
    keywords: ["speed", "tempo", "faster", "slower", "filter"],
  },

  // --- Music ---
  {
    name: "clearqueue",
    category: "music",
    description: "Clear the entire music queue.",
    usage: "/clearqueue",
    keywords: ["clear queue", "wipe queue", "remove songs", "music"],
  },
  {
    name: "grab",
    category: "music",
    description: "Send the currently playing song to your DMs or a channel.",
    usage: "/grab",
    keywords: ["save song", "grab track", "send to dm", "bookmark"],
  },
  {
    name: "autoplay",
    category: "music",
    description: "Toggle autoplay to keep playing related songs.",
    usage: "/autoplay",
    keywords: ["radio", "autoplay", "auto play", "continue", "recommendations"],
  },
  {
    name: "join",
    category: "music",
    description: "Make the bot join your current voice channel.",
    usage: "/join",
    keywords: ["connect", "join vc", "summon", "voice channel"],
  },
  {
    name: "leave",
    category: "music",
    description: "Disconnect the bot from the voice channel.",
    usage: "/leave",
    keywords: ["disconnect", "leave vc", "dc", "stop voice"],
  },
  {
    name: "loop",
    category: "music",
    description: "Toggle looping for the current track or the whole queue.",
    usage: "/loop [off|track|queue]",
    keywords: ["repeat", "loop song", "loop queue", "repeat track"],
  },
  {
    name: "mood",
    category: "music",
    description: "Change the bot's music mood or recommendation style.",
    usage: "/mood <style>",
    keywords: ["mood", "theme", "vibe", "recommendation style"],
  },
  {
    name: "nowplaying",
    category: "music",
    description: "Show detailed information about the current track.",
    usage: "/nowplaying",
    keywords: ["np", "now playing", "current song", "track info"],
  },
  {
    name: "pause",
    category: "music",
    description: "Pause the music playback.",
    usage: "/pause",
    keywords: ["pause", "stop temporarily", "hold song"],
  },
  {
    name: "play",
    category: "music",
    description: "Play a song from a name, URL, or playlist.",
    usage: "/play <query|url>",
    examples: [
      "/play enemy imagine dragons",
      "/play https://youtu.be/dQw4w9WgXcQ",
    ],
    keywords: ["play", "song", "music", "url", "yt", "spotify", "start"],
  },
  {
    name: "queue",
    category: "music",
    description: "Display the current music queue.",
    usage: "/queue",
    keywords: ["queue", "song list", "up next", "playlist"],
  },
  {
    name: "remove",
    category: "music",
    description: "Remove a specific song from the queue.",
    usage: "/remove <position>",
    keywords: ["remove song", "delete from queue", "skip specific"],
  },
  {
    name: "resume",
    category: "music",
    description: "Resume the paused music.",
    usage: "/resume",
    keywords: ["unpause", "continue", "resume song"],
  },
  {
    name: "search",
    category: "music",
    description: "Search for a song and choose from the results.",
    usage: "/search <query>",
    examples: ["/search tokyo ghoul unravel"],
    keywords: ["search", "find song", "lookup", "browse", "music"],
  },
  {
    name: "seek",
    category: "music",
    description: "Seek to a specific timestamp in the current track.",
    usage: "/seek <time>",
    keywords: ["seek", "skip time", "jump", "timestamp", "minute"],
  },
  {
    name: "shuffle",
    category: "music",
    description: "Shuffle the current music queue.",
    usage: "/shuffle",
    keywords: ["shuffle", "random", "mix queue", "randomize"],
  },
  {
    name: "skip",
    category: "music",
    description: "Skip the current track.",
    usage: "/skip",
    keywords: ["skip", "next", "vote skip", "skp"],
  },
  {
    name: "skipto",
    category: "music",
    description: "Skip directly to a specific song in the queue.",
    usage: "/skipto <position>",
    keywords: ["skipto", "jump queue", "go to", "skip to"],
  },
  {
    name: "stop",
    category: "music",
    description: "Stop the music and clear the queue.",
    usage: "/stop",
    keywords: ["stop", "end", "clear all", "stop music"],
  },
  {
    name: "volume",
    category: "music",
    description: "Adjust the playback volume.",
    usage: "/volume <0-100>",
    keywords: ["volume", "loud", "quiet", "sound level", "vol"],
  },

  // --- Playlist ---
  {
    name: "add",
    category: "playlist",
    description: "Add the current or a given song to one of your playlists.",
    usage: "/playlist add <name> [song]",
    examples: [
      "/playlist add chill",
      "/playlist add chill https://youtu.be/...",
    ],
    keywords: ["playlist add", "save song", "add to list", "favorites"],
  },
  {
    name: "create",
    category: "playlist",
    description: "Create a new custom music playlist.",
    usage: "/playlist create <name>",
    examples: ["/playlist create chill"],
    keywords: ["new playlist", "create list", "playlist make", "library"],
  },
  {
    name: "delete",
    category: "playlist",
    description: "Delete one of your saved playlists.",
    usage: "/playlist delete <name>",
    keywords: ["delete playlist", "remove list", "clear playlist"],
  },
  {
    name: "load",
    category: "playlist",
    description: "Load a saved playlist into the current queue.",
    usage: "/playlist load <name>",
    examples: ["/playlist load chill"],
    keywords: ["load playlist", "import list", "play playlist"],
  },

  // --- Anime Game ---
  {
    name: "balance",
    category: "animegame",
    description: "Check your anime game currency balance.",
    usage: "/balance",
    keywords: ["coins", "money", "currency", "wallet", "bal"],
  },
  {
    name: "daily",
    category: "animegame",
    description: "Claim your daily reward for the anime game.",
    usage: "/daily",
    keywords: ["daily", "login reward", "claim", "streak"],
  },
  {
    name: "event",
    category: "animegame",
    description: "View the current or upcoming anime game events.",
    usage: "/event",
    keywords: ["event", "limited", "special", "banner"],
  },
  {
    name: "gacha",
    category: "animegame",
    description: "Roll the gacha to obtain new characters.",
    usage: "/gacha",
    keywords: ["pull", "summon", "roll", "banner", "gacha"],
  },
  {
    name: "give",
    category: "animegame",
    description: "Send currency to another player.",
    usage: "/give <coins/gems> <user> <amount>",
    examples: ["/give coins @User 1000"],
    keywords: ["donate", "gift", "send coins", "transfer"],
  },
  {
    name: "inventory",
    category: "animegame",
    description: "View all characters and items you currently own.",
    usage: "/inventory",
    keywords: ["bag", "collection", "characters", "items", "inv"],
  },
  {
    name: "leaderboard",
    category: "animegame",
    description: "Show the top players in the anime game.",
    usage: "/leaderboard",
    keywords: ["ranks", "top players", "lb", "ranking"],
  },
  {
    name: "profile",
    category: "animegame",
    description: "View your anime game profile and stats.",
    usage: "/profile [user]",
    keywords: ["profile", "card", "stats", "player info"],
  },
  {
    name: "quest",
    category: "animegame",
    description: "Show your active quests and their progress.",
    usage: "/quest",
    keywords: ["quests", "missions", "tasks", "objectives"],
  },
  {
    name: "release",
    category: "animegame",
    description: "Release a character from your inventory.",
    usage: "/release <character> or /release <category> all",
    examples: ["/release Yamamoto", "/release common all"],
    keywords: ["delete character", "free character", "sell", "release"],
  },
  {
    name: "resetteam",
    category: "animegame",
    description: "Reset or clear your current team setup.",
    usage: "/resetteam",
    keywords: ["reset team", "clear team", "remove all", "team wipe"],
  },
  {
    name: "shop",
    category: "animegame",
    description: "Browse the anime game shop for items or characters.",
    usage: "/shop",
    keywords: ["store", "buy", "shop", "items", "gems"],
  },
  {
    name: "show",
    category: "animegame",
    description: "Show detailed info about one of your characters.",
    usage: "/show <character>",
    keywords: ["inspect", "character info", "details", "stats"],
  },
  {
    name: "team",
    category: "animegame",
    description: "Show or manage your current battle team.",
    usage: "/team",
    keywords: ["party", "squad", "lineup", "team setup"],
  },
  {
    name: "teambattle",
    category: "animegame",
    description: "Start a team battle against another player or AI.",
    usage: "/teambattle",
    examples: ["/teambattle", "/teambattle @User"],
    keywords: ["pvp", "fight", "battle", "duel", "match"],
  },
  {
    name: "trade",
    category: "animegame",
    description: "Trade characters or items with another player.",
    usage: "/trade @User Your Character, Their Character",
    examples: ["/trade @User Gakuto, Yamamoto"],
    keywords: ["exchange", "swap", "trade items", "trade characters"],
  },
  {
    name: "train",
    category: "animegame",
    description: "Train a character to gain experience and stats.",
    usage: "/train power <character> or /train defense <character>",
    examples: ["/train power Yamamoto", "/train defense Gokuu Son"],
    keywords: ["level up", "upgrade", "xp", "training"],
  },
  {
    name: "use",
    category: "animegame",
    description: "Use a consumable item from your inventory.",
    usage: "/use <item>",
    examples: ["/use ultra legendary box"],
    keywords: ["consume", "use item", "potion", "ticket"],
  },

  // --- Config ---
  {
    name: "247",
    category: "config",
    description: "Toggle 24/7 mode so Rias stays in the voice channel.",
    usage: "/247",
    keywords: ["24/7", "stay connected", "no disconnect", "afk music"],
  },
  {
    name: "dj",
    category: "config",
    description: "Configure DJ roles that can control the music.",
    usage: "/dj <add|remove> <role>",
    keywords: ["dj role", "music perms", "dj add", "dj remove"],
  },
  {
    name: "prefix",
    category: "config",
    description: "Set a custom text prefix for legacy commands.",
    usage: "/prefix <symbol>",
    keywords: ["prefix", "text command", "legacy", "command symbol"],
  },

  // --- Fun ---
  {
    name: "bite",
    category: "fun",
    description: "Bite another user in a playful way.",
    usage: "/bite <user>",
    keywords: ["roleplay", "rp", "interaction", "bite"],
  },
  {
    name: "cry",
    category: "fun",
    description: "Cry and let everyone know your feelings.",
    usage: "/cry [reason]",
    keywords: ["roleplay", "rp", "sad", "emote", "cry"],
  },
  {
    name: "hug",
    category: "fun",
    description: "Send a warm hug to another user.",
    usage: "/hug <user>",
    examples: ["/hug @Friend"],
    keywords: ["hug", "rp", "affection", "comfort"],
  },
  {
    name: "kiss",
    category: "fun",
    description: "Send a cute kiss to someone.",
    usage: "/kiss <user>",
    examples: ["/kiss @Crush"],
    keywords: ["kiss", "rp", "love", "affection", "ship"],
  },
  {
    name: "lick",
    category: "fun",
    description: "Lick another user (consensually, of course).",
    usage: "/lick <user>",
    keywords: ["lick", "rp", "interaction", "playful"],
  },
  {
    name: "poke",
    category: "fun",
    description: "Poke someone to get their attention.",
    usage: "/poke <user>",
    keywords: ["poke", "ping", "annoy", "rp"],
  },
  {
    name: "punch",
    category: "fun",
    description: "Throw a playful punch at someone.",
    usage: "/punch <user>",
    keywords: ["fight", "punch", "rp", "interaction"],
  },
  {
    name: "ship",
    category: "fun",
    description: "Ship two users together and see the result.",
    usage: "/ship <user1> <user2>",
    keywords: ["ship", "love", "compatibility", "couple"],
  },
  {
    name: "slap",
    category: "fun",
    description: "Slap a user dramatically.",
    usage: "/slap <user>",
    keywords: ["slap", "smack", "rp", "interaction"],
  },
  {
    name: "sleep",
    category: "fun",
    description: "Go to sleep or show that you're tired.",
    usage: "/sleep",
    keywords: ["sleep", "zzz", "tired", "bed"],
  },
  {
    name: "spank",
    category: "fun",
    description: "Spank another user in a comedic way.",
    usage: "/spank <user>",
    keywords: ["spank", "rp", "interaction", "joke"],
  },

  // --- Info ---
  {
    name: "about",
    category: "info",
    description: "Show detailed information about Rias Gremory.",
    usage: "/about",
    examples: ["/about"],
    keywords: ["bot info", "bot details", "about rias", "info"],
  },
  {
    name: "help",
    category: "info",
    description: "Open the interactive help menu.",
    usage: "/help",
    keywords: ["help", "commands", "manual", "how to"],
  },
  {
    name: "info",
    category: "info",
    description: "Display general information and stats about the bot.",
    usage: "/info",
    keywords: ["bot stats", "info", "shards", "system"],
  },
  {
    name: "invite",
    category: "info",
    description: "Get the bot's invite link for your server.",
    usage: "/invite",
    keywords: ["invite", "add bot", "oauth2", "link"],
  },
  {
    name: "lavalink",
    category: "info",
    description: "Show the status of the music Lavalink nodes.",
    usage: "/lavalink",
    keywords: ["lavalink", "node status", "music backend", "latency"],
  },
  {
    name: "ping",
    category: "info",
    description: "Check the bot's latency and API response time.",
    usage: "/ping",
    examples: ["/ping"],
    keywords: ["ping", "latency", "delay", "ms", "connection"],
  },
  {
    name: "uptime",
    category: "info",
    description: "See how long Rias has been online without restarting.",
    usage: "/uptime",
    examples: ["/uptime"],
    keywords: ["uptime", "online time", "runtime"],
  },

  // --- Mod ---
  {
    name: "editsnipe",
    category: "mod",
    description: "Show the last edited message before it was changed.",
    usage: "/editsnipe",
    examples: ["/editsnipe"],
    keywords: ["edit snipe", "last edit", "message edit", "mod"],
  },
  {
    name: "snipe",
    category: "mod",
    description: "Show the last deleted message in this channel.",
    usage: "/snipe",
    examples: ["/snipe"],
    keywords: ["deleted message", "snipe", "last delete", "mod", "logs"],
  },
];
