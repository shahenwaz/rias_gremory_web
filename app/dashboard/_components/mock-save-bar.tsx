import { Button } from "@/components/ui/button";

export function MockSaveBar() {
  return (
    <div className="sticky z-10 flex items-center justify-between max-w-xl gap-3 p-2 pl-4 mx-auto mt-5 border shadow-2xl bottom-3 rounded-2xl border-white/10 bg-black/75 shadow-black/30 backdrop-blur-xl">
      <p className="text-sm font-medium text-white/78">
        Mock mode — changes are visual for now.
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          disabled
          className="px-4 rounded-md h-9 text-white/45"
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled
          className="px-4 rounded-md h-9 bg-primary/80 text-primary-foreground opacity-70"
        >
          Save later
        </Button>
      </div>
    </div>
  );
}
