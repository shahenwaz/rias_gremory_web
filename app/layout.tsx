import type { Metadata } from "next";
import "./globals.css";
import { RootShell } from "@/components/layout/root-shell";

export const metadata: Metadata = {
  title: "Rias Gremory Discord Bot",
  description:
    "A multipurpose Discord bot with music, filters, anime game, moderation and more...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
