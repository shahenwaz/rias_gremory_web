"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    window.location.replace("/api/auth/discord/login");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d13] px-4 text-white">
      <section className="max-w-sm rounded-2xl border border-white/8 bg-white/4 p-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/75">
          Discord Login
        </p>

        <h1 className="mt-2 text-xl font-semibold tracking-tight">
          Redirecting to Discord
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Please wait while we open Discord authentication.
        </p>

        <a
          href="/api/auth/discord/login"
          className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Continue manually
        </a>
      </section>
    </main>
  );
}
