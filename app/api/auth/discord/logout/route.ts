import { NextResponse } from "next/server";
import {
  dashboardOAuthStateCookieName,
  dashboardSessionCookieName,
} from "@/lib/discord-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.delete(dashboardSessionCookieName);
  response.cookies.delete(dashboardOAuthStateCookieName);

  return response;
}
