import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createDashboardUser,
  createManageableDashboardGuilds,
  createSessionCookieOptions,
  dashboardOAuthStateCookieName,
  dashboardSessionCookieName,
  exchangeDiscordCode,
  fetchDiscordGuilds,
  fetchDiscordUser,
  fetchInstalledDashboardGuildIds,
  signDashboardSession,
  type DashboardSession,
} from "@/lib/discord-auth";
import type { DashboardGuild } from "@/app/dashboard/_data/dashboard-data";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const returnedState = requestUrl.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get(dashboardOAuthStateCookieName)?.value;

  if (
    !code ||
    !returnedState ||
    !storedState ||
    returnedState !== storedState
  ) {
    return NextResponse.redirect(
      new URL("/?authError=discord-state", request.url),
    );
  }

  try {
    const token = await exchangeDiscordCode(code);
    const [user, discordGuilds] = await Promise.all([
      fetchDiscordUser(token.access_token),
      fetchDiscordGuilds(token.access_token),
    ]);

    const manageableGuilds = createManageableDashboardGuilds(discordGuilds);
    const installedGuildIds = await fetchInstalledDashboardGuildIds(
      manageableGuilds.map((guild: DashboardGuild) => guild.id),
    );

    const installedGuildIdSet = new Set(installedGuildIds);

    const allowedGuilds = manageableGuilds.filter((guild: DashboardGuild) =>
      installedGuildIdSet.has(guild.id),
    );

    const now = Date.now();

    const session: DashboardSession = {
      user: createDashboardUser(user),
      guilds: allowedGuilds,
      createdAt: now,
      expiresAt: now + 1000 * 60 * 60 * 24 * 7,
    };

    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    response.cookies.set(
      dashboardSessionCookieName,
      signDashboardSession(session),
      createSessionCookieOptions(),
    );

    response.cookies.delete(dashboardOAuthStateCookieName);

    return response;
  } catch (error) {
    console.error("[DISCORD_AUTH_CALLBACK]", error);

    return NextResponse.redirect(
      new URL("/?authError=discord-callback", request.url),
    );
  }
}
