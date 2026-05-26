import crypto from "node:crypto";
import { cookies } from "next/headers";
import type { DashboardGuild } from "@/app/dashboard/_data/dashboard-data";

export const dashboardSessionCookieName = "rias_dashboard_session";
export const dashboardOAuthStateCookieName = "rias_oauth_state";

const discordApiUrl = "https://discord.com/api/v10";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

const administratorPermission = BigInt(0x0000000000000008);
const manageGuildPermission = BigInt(0x0000000000000020);

type DiscordTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
};

type DiscordUser = {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
};

type DiscordGuild = {
  id: string;
  name: string;
  icon?: string | null;
  owner?: boolean;
  permissions: string;
  approximate_member_count?: number;
};

export type DashboardSessionUser = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

export type DashboardSession = {
  user: DashboardSessionUser;
  guilds: DashboardGuild[];
  createdAt: number;
  expiresAt: number;
};

export function createOAuthState() {
  return crypto.randomBytes(32).toString("base64url");
}

export function createDiscordAuthorizationUrl(state: string) {
  const url = new URL("https://discord.com/oauth2/authorize");

  url.searchParams.set("client_id", getRequiredEnv("DISCORD_CLIENT_ID"));
  url.searchParams.set("redirect_uri", getDiscordRedirectUri());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "identify guilds");
  url.searchParams.set("state", state);

  return url;
}

export function getDiscordRedirectUri() {
  return (
    process.env.DISCORD_REDIRECT_URI ??
    `${getRequiredEnv("APP_URL").replace(/\/$/, "")}/api/auth/discord/callback`
  );
}

export async function exchangeDiscordCode(code: string) {
  const body = new URLSearchParams({
    client_id: getRequiredEnv("DISCORD_CLIENT_ID"),
    client_secret: getRequiredEnv("DISCORD_CLIENT_SECRET"),
    grant_type: "authorization_code",
    code,
    redirect_uri: getDiscordRedirectUri(),
  });

  const response = await fetch(`${discordApiUrl}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Discord token exchange failed.");
  }

  return (await response.json()) as DiscordTokenResponse;
}

export async function fetchDiscordUser(accessToken: string) {
  const response = await fetch(`${discordApiUrl}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load Discord user.");
  }

  return (await response.json()) as DiscordUser;
}

export async function fetchDiscordGuilds(accessToken: string) {
  const response = await fetch(
    `${discordApiUrl}/users/@me/guilds?with_counts=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load Discord guilds.");
  }

  return (await response.json()) as DiscordGuild[];
}

export async function fetchInstalledDashboardGuildIds(guildIds: string[]) {
  const apiUrl = getRequiredEnv("BOT_DASHBOARD_API_URL").replace(/\/$/, "");
  const apiKey = getRequiredEnv("BOT_DASHBOARD_API_KEY");

  const response = await fetch(`${apiUrl}/dashboard/guilds/installed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-dashboard-key": apiKey,
    },
    body: JSON.stringify({
      guildIds,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to check installed bot servers.");
  }

  const data = (await response.json()) as {
    installedGuildIds?: string[];
  };

  return data.installedGuildIds ?? [];
}

export function createDashboardUser(user: DiscordUser): DashboardSessionUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.global_name || user.username,
    avatarUrl: user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=96`
      : null,
  };
}

export function createManageableDashboardGuilds(
  guilds: DiscordGuild[],
): DashboardGuild[] {
  return guilds
    .filter((guild: DiscordGuild) => canManageGuild(guild))
    .map((guild: DiscordGuild) => ({
      id: guild.id,
      name: guild.name,
      icon: createGuildInitials(guild.name),
      iconUrl: guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=96`
        : null,
      memberCount: guild.approximate_member_count ?? 0,
      role: guild.owner ? "Owner" : "Manager",
      botInstalled: true,
      permissions: guild.owner
        ? ["OWNER", "ADMINISTRATOR", "MANAGE_GUILD"]
        : ["MANAGE_GUILD"],
    }))
    .sort((firstGuild: DashboardGuild, secondGuild: DashboardGuild) =>
      firstGuild.name.localeCompare(secondGuild.name),
    );
}

export async function getDashboardSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(dashboardSessionCookieName);

  if (!sessionCookie?.value) {
    return null;
  }

  return verifySignedSession(sessionCookie.value);
}

export async function canAccessDashboardGuild(guildId: string) {
  const session = await getDashboardSession();

  if (!session) {
    return false;
  }

  return session.guilds.some((guild: DashboardGuild) => guild.id === guildId);
}

export function signDashboardSession(session: DashboardSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getRequiredEnv("AUTH_SECRET"))
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

function verifySignedSession(value: string): DashboardSession | null {
  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", getRequiredEnv("AUTH_SECRET"))
    .update(payload)
    .digest("base64url");

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  const session = JSON.parse(
    Buffer.from(payload, "base64url").toString("utf8"),
  ) as DashboardSession;

  if (session.expiresAt < Date.now()) {
    return null;
  }

  return session;
}

export function createSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  };
}

export function createStateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 10,
  };
}

function canManageGuild(guild: DiscordGuild) {
  if (guild.owner) {
    return true;
  }

  const permissions = BigInt(guild.permissions);

  return (
    hasPermission(permissions, administratorPermission) ||
    hasPermission(permissions, manageGuildPermission)
  );
}

function hasPermission(permissions: bigint, permission: bigint) {
  return (permissions & permission) === permission;
}

function createGuildInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  return initials || "RI";
}

function safeCompare(value: string, expectedValue: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expectedValue);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is missing.`);
  }

  return value;
}
