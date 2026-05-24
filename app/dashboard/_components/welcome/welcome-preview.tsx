import {
  renderWelcomePreview,
  type WelcomeSendMode,
  type WelcomeTextFeature,
} from "@/app/dashboard/_data/welcome-module-data";

type WelcomePreviewProps = {
  feature: WelcomeTextFeature;
  sendMode: WelcomeSendMode;
};

export function WelcomePreview({ feature, sendMode }: WelcomePreviewProps) {
  const previewMessage = renderWelcomePreview(feature.defaultMessage);

  return (
    <aside className="rounded-md border border-white/8 bg-[#101218]/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
          Preview
        </p>

        <span className="rounded-md border border-white/8 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/42">
          {sendMode === "channel" ? "Channel" : "DM"}
        </span>
      </div>

      <div className="mt-4 rounded-md border border-white/8 bg-[#0b0d13] p-3">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center text-xs font-bold rounded-md size-9 shrink-0 bg-primary/16 text-primary">
            RG
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Rias Gremory</p>
            <p className="mt-1 text-sm leading-6 whitespace-pre-line text-white/55">
              {previewMessage}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-white/36">
        Preview is visual only for now. Real values will come from Discord and
        the bot JSON settings later.
      </p>
    </aside>
  );
}
