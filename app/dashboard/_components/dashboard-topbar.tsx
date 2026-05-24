import Image from "next/image";
import Link from "next/link";
import { Command, HelpCircle } from "lucide-react";

export function DashboardTopbar() {
  return (
    <header className="relative z-20 h-14 shrink-0 bg-[#0b0d13]/95 px-4 backdrop-blur-xl">
      <div className="flex h-full items-center justify-end">
        <Link
          href="/dashboard"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5"
        >
          <Image
            src="/rias-gremory.png"
            alt="Rias Gremory"
            width={38}
            height={38}
            className="size-9.5 shrink-0 object-contain"
            priority
          />

          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-bold uppercase tracking-[0.22em] text-white">
              Rias Gremory
            </p>
            <p className="hidden text-[11px] leading-3 text-white/35 sm:block">
              Discord bot control centre
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <TopbarLink href="/commands" icon={<Command className="h-4 w-4" />}>
            Commands
          </TopbarLink>

          <TopbarLink href="/support" icon={<HelpCircle className="h-4 w-4" />}>
            Support
          </TopbarLink>
        </div>
      </div>
    </header>
  );
}

function TopbarLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-8 items-center gap-2 rounded-md border border-white/8 bg-white/4 px-3 text-xs font-medium text-white/58 transition-colors hover:border-white/14 hover:bg-white/7 hover:text-white"
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}
