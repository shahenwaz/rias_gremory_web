import { NextResponse } from "next/server";
import { getDashboardSession } from "@/lib/discord-auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getDashboardSession();

  return NextResponse.json({
    isAuthenticated: Boolean(session),
    user: session?.user ?? null,
    guilds: session?.guilds ?? [],
  });
}
