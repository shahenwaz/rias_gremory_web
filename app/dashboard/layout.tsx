import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/app/dashboard/_components/dashboard-shell";
import { getDashboardSettingsList } from "@/app/dashboard/_data/dashboard-data";
import { getDashboardSession } from "@/lib/discord-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getDashboardSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.guilds.length) {
    return <NoManageableServers />;
  }

  const settings = getDashboardSettingsList(session.guilds);

  return (
    <DashboardShell guilds={session.guilds} settings={settings}>
      {children}
    </DashboardShell>
  );
}

function NoManageableServers() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d13] px-4 text-white">
      <section className="max-w-md rounded-2xl border border-white/8 bg-white/4 p-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
          Dashboard Access
        </p>

        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          No manageable Rias servers found
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Your Discord account needs Owner, Administrator, or Manage Server
          permission in a server where Rias is installed.
        </p>

        <div className="mt-5 flex justify-center gap-2">
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </Link>

          <Link
            href="/api/auth/discord/logout"
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70"
          >
            Logout
          </Link>
        </div>
      </section>
    </main>
  );
}
