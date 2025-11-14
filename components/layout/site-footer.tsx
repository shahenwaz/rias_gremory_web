export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} Rias Gremory Bot. All rights reserved.
        </p>
        <p className="text-[11px]">
          Built with <span className="text-primary font-medium">Next.js</span>{" "}
          &amp; <span className="text-primary font-medium">shadcn/ui</span>.
        </p>
      </div>
    </footer>
  );
}
