import { NextResponse } from "next/server";
import {
  createDiscordAuthorizationUrl,
  createOAuthState,
  createStateCookieOptions,
  dashboardOAuthStateCookieName,
} from "@/lib/discord-auth";

export const runtime = "nodejs";

export async function GET() {
  const state = createOAuthState();
  const response = NextResponse.redirect(createDiscordAuthorizationUrl(state));

  response.cookies.set(
    dashboardOAuthStateCookieName,
    state,
    createStateCookieOptions(),
  );

  return response;
}
