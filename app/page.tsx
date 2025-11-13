// src/app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          <Button size="lg">Invite Bot</Button>
          <Button size="lg" variant="outline">
            View Commands
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Music & Filters</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            High quality music playback with powerful filters like nightcore,
            bassboost, pitch and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Anime Game</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Pull, train, and battle anime characters with daily rewards, quests
            and team battles.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Moderation</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Smart tools to keep your server clean with snipe, editsnipe, config
            and more.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
