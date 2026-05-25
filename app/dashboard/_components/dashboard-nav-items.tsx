import {
  Bot,
  Hash,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  UserRound,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

export type DashboardNavGroup = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: "Module Settings",
        href: "/dashboard/modules",
        icon: Settings2,
        exact: true,
      },
    ],
  },
  {
    title: "Utility",
    items: [
      {
        label: "Welcome & Goodbye",
        href: "/dashboard/welcome-goodbye",
        icon: Users,
      },
      {
        label: "Auto Roles",
        href: "/dashboard/auto-roles",
        icon: ShieldCheck,
      },
      {
        label: "Self Roles",
        href: "/dashboard/self-roles",
        icon: UserRound,
      },
    ],
  },
  {
    title: "Moderation",
    items: [
      {
        label: "Logs",
        href: "/dashboard/logs",
        icon: Hash,
      },
      {
        label: "Mod Actions",
        href: "/dashboard/mod-actions",
        icon: Bot,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Server Config",
        href: "/dashboard/server-config",
        icon: SlidersHorizontal,
      },
      {
        label: "Control Panel Logs",
        href: "/dashboard/control-panel-logs",
        icon: Hash,
      },
    ],
  },
];

export const dashboardMobileNavItems = dashboardNavGroups.flatMap(
  (group: DashboardNavGroup) => group.items,
);
