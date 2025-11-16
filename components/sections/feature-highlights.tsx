import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureHighlights() {
  return (
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

      <Card className="border border-border/90 bg-card shadow-sm transition-colors hover:bg-secondary">
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
  );
}
