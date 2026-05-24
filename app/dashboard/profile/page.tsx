import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";

export default function DashboardProfilePage() {
  return (
    <main className="min-h-screen bg-[#0b0d13] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/8 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <section className="mt-6 rounded-xl border border-white/10 bg-white/4 p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <UserRound className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            User Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/55">
            This is a placeholder for the authenticated Discord user profile.
            Later we can show avatar, username, linked servers, permissions,
            dashboard activity, and saved preferences here.
          </p>
        </section>
      </div>
    </main>
  );
}
