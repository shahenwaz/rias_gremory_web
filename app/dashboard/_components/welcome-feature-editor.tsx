"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  type WelcomeFeature,
  type WelcomeSendMode,
  type WelcomeVariable,
} from "@/app/dashboard/_data/welcome-module-data";
import { cn } from "@/lib/utils";

type WelcomeFeatureEditorProps = {
  feature: WelcomeFeature;
};

export function WelcomeFeatureEditor({ feature }: WelcomeFeatureEditorProps) {
  const [sendMode, setSendMode] = React.useState<WelcomeSendMode>("channel");

  const effectiveSendMode: WelcomeSendMode = feature.allowDirectMessage
    ? sendMode
    : "channel";

  return (
    <div className="grid gap-5 pt-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        <p className="text-sm leading-5 text-white/45">{feature.editorHint}</p>

        <div>
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
            Message template
          </label>

          <textarea
            defaultValue={feature.defaultMessage}
            className="mt-2 min-h-32 w-full resize-y rounded-md border border-white/10 bg-[#0b0d13] px-3 py-3 text-sm leading-6 text-white/78 outline-none transition-colors placeholder:text-white/30 focus:border-primary/35"
            placeholder="Type your message here..."
          />
        </div>

        <div
          className={cn(
            "grid gap-3",
            feature.allowDirectMessage ? "md:grid-cols-2" : "md:grid-cols-1",
          )}
        >
          {feature.allowDirectMessage ? (
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                Send mode
              </label>

              <div className="flex flex-wrap gap-2 mt-2">
                <ModeButton
                  active={sendMode === "channel"}
                  onClick={() => setSendMode("channel")}
                >
                  To channel
                </ModeButton>

                <ModeButton
                  active={sendMode === "dm"}
                  onClick={() => setSendMode("dm")}
                >
                  As DM
                </ModeButton>
              </div>
            </div>
          ) : null}

          {effectiveSendMode === "channel" ? (
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                Channel
              </label>

              <select
                defaultValue={feature.defaultChannel}
                className="mt-2 h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none transition-colors focus:border-primary/35"
              >
                <option value="#welcome">#welcome</option>
                <option value="#general">#general</option>
                <option value="#lobby">#lobby</option>
                <option value="#goodbye">#goodbye</option>
                <option value="#logs">#logs</option>
              </select>
            </div>
          ) : null}
        </div>

        {effectiveSendMode === "dm" ? (
          <div className="px-3 py-2 text-sm leading-5 border rounded-md border-primary/18 bg-primary/8 text-white/58">
            This message will be sent directly to the member. No channel is
            needed for DM mode.
          </div>
        ) : null}

        <div>
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
            Variables
          </label>

          <div className="flex flex-wrap gap-2 mt-2">
            {feature.variables.map(([token, description]: WelcomeVariable) => (
              <span
                key={token}
                title={description}
                className="rounded-md border border-white/8 bg-[#101218]/80 px-2.5 py-1.5 text-xs text-white/48"
              >
                <code className="font-semibold text-primary">{token}</code>
                <span className="ml-1.5 hidden sm:inline">{description}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <WelcomePreview feature={feature} sendMode={effectiveSendMode} />
    </div>
  );
}

function WelcomePreview({
  feature,
  sendMode,
}: {
  feature: WelcomeFeature;
  sendMode: WelcomeSendMode;
}) {
  const previewMessage = feature.defaultMessage
    .replace(/\[user\]/g, "@Shahenwaz")
    .replace(/\[userName\]/g, "Shahenwaz")
    .replace(/\[server\]/g, "NRZ Esports")
    .replace(/\[memberCount\]/g, "5884")
    .replace(/\[inviter\]/g, "@Ayaan")
    .replace(/\[inviterName\]/g, "Ayaan")
    .replace(/\[invites\]/g, "12");

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

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-md border px-3 text-sm font-medium transition-colors",
        active
          ? "border-primary/35 bg-primary/14 text-white hover:bg-primary/18"
          : "border-white/10 bg-white/4 text-white/48 hover:bg-white/7 hover:text-white",
      )}
    >
      {children}
    </Button>
  );
}
