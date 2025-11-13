import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Rias Gremory – Your all-in-one Discord companion.
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Music, filters, anime gacha, moderation tools and more. Built to keep
          your community fun, safe, and active 24/7.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link
              href="https://discord.com/api/oauth2/authorize?client_id=1012710312857849937&permissions=139589975104&scope=bot&utm_source=discordbotlist.com&utm_medium=bot_page"
              target="_blank"
            >
              Invite Bot
            </Link>
          </Button>

          {/* more contrasty secondary button */}
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="border border-border/80 bg-secondary
                       text-sm font-medium text-foreground
                       shadow-sm hover:bg-secondary/90
                       transition-colors"
          >
            <Link href="/commands">View Commands</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border border-border/90 bg-secondary/80 shadow-sm transition-colors hover:bg-secondary">
          <CardHeader>
            <CardTitle className="text-base text-foreground">
              Music &amp; Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/80">
            High quality music playback with powerful filters like nightcore,
            bassboost, pitch and more.
          </CardContent>
        </Card>

        <Card className="border border-border/90 bg-secondary/80 shadow-sm transition-colors hover:bg-secondary">
          <CardHeader>
            <CardTitle className="text-base text-foreground">
              Anime Game
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/80">
            Pull, train, and battle anime characters with daily rewards, quests
            and team battles.
          </CardContent>
        </Card>

        <Card className="border border-border/90 bg-secondary/80 shadow-sm transition-colors hover:bg-secondary">
          <CardHeader>
            <CardTitle className="text-base text-foreground">
              Moderation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground/80">
            Smart tools to keep your server clean with snipe, editsnipe, config
            and more.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
