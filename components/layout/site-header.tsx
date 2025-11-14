"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Rias Gremory home"
            onClick={closeMobile}
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
              <Link href="https://discord.com/oauth2/authorize?client_id=1012710312857849937&permissions=139589975104&scope=bot">
                Invite Bot
              </Link>
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full"
            >
              <Link href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot%20applications.commands&permissions=8">
                Invite
              </Link>
            </Button>

            <button
              type="button"
              onClick={toggleMobile}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile floating drawer */}
      <div
        className={`fixed inset-0 z-40 flex items-start justify-end md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobile}
        />

        {/* Drawer */}
        <div
          className={`relative mt-3 mr-3 flex w-72 max-w-[80vw] flex-col rounded-2xl border border-border/80 bg-background/95 p-4 shadow-2xl
                      transition-all duration-250 ease-out
                      ${
                        mobileOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-3 opacity-0"
                      }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                Navigation
              </span>
              <span className="text-[11px] text-muted-foreground/80">
                Quick access for Rias Gremory
              </span>
            </div>
            <button
              type="button"
              onClick={closeMobile}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Close navigation"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <Link
              href="/"
              onClick={closeMobile}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === "/"
                  ? "font-medium text-foreground bg-primary/15"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              href="/commands"
              onClick={closeMobile}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname.startsWith("/commands")
                  ? "font-medium text-foreground bg-primary/15"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              Commands
            </Link>

            <Link
              href="/features"
              onClick={closeMobile}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname.startsWith("/features")
                  ? "font-medium text-foreground bg-primary/15"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              Features
            </Link>

            <Link
              href="/support"
              onClick={closeMobile}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname.startsWith("/support")
                  ? "font-medium text-foreground bg-primary/15"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              Support
            </Link>
          </div>

          <div className="mt-4 rounded-xl border border-border/60 bg-linear-to-r from-primary/15 via-primary/5 to-transparent px-3 py-3 text-[11px] text-muted-foreground">
            <p className="mb-1 font-semibold text-xs text-foreground">
              Rias Gremory Bot
            </p>
            <p>
              Music, filters, anime gacha, and moderation – optimized for your
              Discord server.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
