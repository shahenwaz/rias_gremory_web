"use client";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Rias Gremory home"
        >
          <Image
            src="/rias-gremory.png"
            alt="Rias Gremory logo"
            width={32}
            height={32}
            className="rounded-full"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">
              Rias Gremory
            </span>
            <span className="text-[11px] text-muted-foreground">
              Multipurpose Discord Bot
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/commands"
                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Commands
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/features"
                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/support"
                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Invite Button */}
          <Button asChild size="sm" className="rounded-full">
            <Link href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot%20applications.commands&permissions=8">
              Invite Bot
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot%20applications.commands&permissions=8">
              Invite
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
