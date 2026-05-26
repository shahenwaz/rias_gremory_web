import { NextResponse } from "next/server";
import { canAccessDashboardGuild } from "@/lib/discord-auth";

type RouteContext = {
  params: Promise<{
    guildId: string;
  }>;
};

type ServerConfigPayload = {
  prefix?: string;
  botChannelId?: string | null;
  disabledChannelIds?: string[];
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

function createServerConfigUrl(apiUrl: string, guildId: string) {
  return `${apiUrl}/dashboard/guilds/${encodeURIComponent(
    guildId,
  )}/server-config`;
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

    const response = await fetch(createServerConfigUrl(apiUrl, guildId), {
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
    console.error("[SERVER_CONFIG_GET]", error);

    return NextResponse.json(
      {
        error: "Unable to load server config.",
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
    const payload = (await request.json()) as ServerConfigPayload;

    const response = await fetch(createServerConfigUrl(apiUrl, guildId), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-dashboard-key": apiKey,
      },
      body: JSON.stringify({
        prefix: payload.prefix,
        disabledChannelIds: payload.disabledChannelIds ?? [],
      }),
      cache: "no-store",
    });

    const data: unknown = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[SERVER_CONFIG_PATCH]", error);

    return NextResponse.json(
      {
        error: "Unable to save server config.",
      },
      { status: 500 },
    );
  }
}
