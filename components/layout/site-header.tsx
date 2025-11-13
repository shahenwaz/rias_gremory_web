import Link from "next/link";
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
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
            RG
          </span>
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
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/commands" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                    Commands
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/features" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/support" legacyBehavior passHref>
                  <NavigationMenuLink className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </NavigationMenuLink>
                </Link>
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

        {/* Mobile placeholder (we'll build menu later) */}
        <div className="flex items-center gap-2 md:hidden">
          <Button size="sm" variant="outline" className="rounded-full">
            <Link href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&scope=bot%20applications.commands&permissions=8">
              Invite
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
