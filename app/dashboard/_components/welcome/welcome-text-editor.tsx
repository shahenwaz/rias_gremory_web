"use client";

import * as React from "react";
import { WelcomePreview } from "@/app/dashboard/_components/welcome/welcome-preview";
import {
  ChannelSelect,
  EditorField,
  EditorOptionButton,
  EditorTextarea,
  WelcomeVariableList,
} from "@/app/dashboard/_components/welcome/welcome-editor-controls";
import {
  type WelcomeSendMode,
  type WelcomeTextFeature,
} from "@/app/dashboard/_data/welcome-module-data";

type WelcomeTextEditorProps = {
  feature: WelcomeTextFeature;
};

export function WelcomeTextEditor({ feature }: WelcomeTextEditorProps) {
  const [sendMode, setSendMode] = React.useState<WelcomeSendMode>("channel");

  const effectiveSendMode: WelcomeSendMode = feature.allowDirectMessage
    ? sendMode
    : "channel";

  return (
    <div className="grid gap-5 pt-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        <p className="text-sm leading-5 text-white/45">{feature.editorHint}</p>

        <EditorField label="Message template">
          <EditorTextarea
            defaultValue={feature.defaultMessage}
            className="min-h-32"
            placeholder="Type your message here..."
          />
        </EditorField>

        <SendDestinationControl
          feature={feature}
          sendMode={sendMode}
          onSendModeChange={setSendMode}
        />

        {effectiveSendMode === "dm" ? (
          <div className="px-3 py-2 text-sm leading-5 border rounded-md border-primary/18 bg-primary/8 text-white/58">
            This message will be sent directly to the member. No channel is
            needed for DM mode.
          </div>
        ) : null}

        <WelcomeVariableList variables={feature.variables} />
      </div>

      <WelcomePreview feature={feature} sendMode={effectiveSendMode} />
    </div>
  );
}

function SendDestinationControl({
  feature,
  sendMode,
  onSendModeChange,
}: {
  feature: WelcomeTextFeature;
  sendMode: WelcomeSendMode;
  onSendModeChange: (mode: WelcomeSendMode) => void;
}) {
  const effectiveSendMode: WelcomeSendMode = feature.allowDirectMessage
    ? sendMode
    : "channel";

  return (
    <div
      className={
        feature.allowDirectMessage ? "grid gap-3 md:grid-cols-2" : "grid gap-3"
      }
    >
      {feature.allowDirectMessage ? (
        <EditorField label="Send mode">
          <div className="flex flex-wrap gap-2">
            <EditorOptionButton
              active={sendMode === "channel"}
              onClick={() => onSendModeChange("channel")}
            >
              To channel
            </EditorOptionButton>

            <EditorOptionButton
              active={sendMode === "dm"}
              onClick={() => onSendModeChange("dm")}
            >
              As DM
            </EditorOptionButton>
          </div>
        </EditorField>
      ) : null}

      {effectiveSendMode === "channel" ? (
        <EditorField label="Channel">
          <ChannelSelect defaultValue={feature.defaultChannel} />
        </EditorField>
      ) : null}
    </div>
  );
}
