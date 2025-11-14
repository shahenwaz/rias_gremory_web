export type DocsNavItem = {
  title: string;
  description?: string;
  href: string;
};

export const docsNavItems: DocsNavItem[] = [
  {
    title: "Getting Started",
    description: "Invite Rias, basic setup, and first commands.",
    href: "/docs",
  },
  {
    title: "Music & Filters",
    description: "Play songs, manage queue, and audio filters.",
    href: "/docs/music-filters",
  },
  {
    title: "Anime Game Guide",
    description: "Gacha, quests, and building your anime roster.",
    href: "/docs/anime-game",
  },
  {
    title: "Config & Permissions",
    description: "Prefix, DJ role, 24/7 and required Discord perms.",
    href: "/docs/config-permissions",
  },
  {
    title: "FAQ",
    description: "Common questions and quick fixes.",
    href: "/docs/faq",
  },
];
