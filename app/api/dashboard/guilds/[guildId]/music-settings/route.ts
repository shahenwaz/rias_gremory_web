import { NextResponse } from "next/server";
import { canAccessDashboardGuild } from "@/lib/discord-auth";
import type { BotMusicSettingsPayload } from "@/app/dashboard/_data/bot-music-settings-data";

type RouteContext = {
  params: Promise<{
    guildId: string;
  }>;
};

function getBotApiConfig() {
  const apiUrl = process.env.BOT_DASHBOARD_API_URL;
  const apiKey = process.env.BOT_DASHBOARD_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("Bot dashboard API environment variables are missing.");
  }

  return {
    apiUrl: apiUrl.replace(/\/$/, ""),
    apiKey,
  };
}

function createMusicSettingsUrl(apiUrl: string, guildId: string) {
  return `${apiUrl}/dashboard/guilds/${encodeURIComponent(
    guildId,
  )}/music-settings`;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { guildId } = await context.params;
    const hasAccess = await canAccessDashboardGuild(guildId);

    if (!hasAccess) {
      return NextResponse.json(
        {
          error: "You do not have access to this server.",
        },
        { status: 403 },
      );
    }

    const { apiUrl, apiKey } = getBotApiConfig();

    const response = await fetch(createMusicSettingsUrl(apiUrl, guildId), {
      method: "GET",
      headers: {
        "x-dashboard-key": apiKey,
      },
      cache: "no-store",
    });

    const data: unknown = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[MUSIC_SETTINGS_GET]", error);

    return NextResponse.json(
      {
        error: "Unable to load music settings.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { guildId } = await context.params;
    const hasAccess = await canAccessDashboardGuild(guildId);

    if (!hasAccess) {
      return NextResponse.json(
        {
          error: "You do not have access to this server.",
        },
        { status: 403 },
      );
    }

    const { apiUrl, apiKey } = getBotApiConfig();
    const payload = (await request.json()) as BotMusicSettingsPayload;

    const response = await fetch(createMusicSettingsUrl(apiUrl, guildId), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-dashboard-key": apiKey,
      },
      body: JSON.stringify({
        stayEnabled: payload.stayEnabled,
        stayTextChannelId: payload.stayTextChannelId,
        stayVoiceChannelId: payload.stayVoiceChannelId,
        djModeEnabled: payload.djModeEnabled,
        djRoleIds: payload.djRoleIds ?? [],
        setupEnabled: payload.setupEnabled,
        setupTextChannelId: payload.setupTextChannelId,
      }),
      cache: "no-store",
    });

    const data: unknown = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[MUSIC_SETTINGS_PATCH]", error);

    return NextResponse.json(
      {
        error: "Unable to save music settings.",
      },
      { status: 500 },
    );
  }
}
