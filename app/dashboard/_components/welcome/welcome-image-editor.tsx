"use client";

import * as React from "react";
import {
  ChannelSelect,
  EditorField,
  EditorInput,
  EditorTabList,
  NumberControl,
  type EditorTab,
} from "@/app/dashboard/_components/welcome/welcome-editor-controls";
import {
  renderWelcomePreview,
  type WelcomeImageFeature,
} from "@/app/dashboard/_data/welcome-module-data";

type WelcomeImageEditorProps = {
  feature: WelcomeImageFeature;
};

type ImageEditorTab = "background" | "avatar" | "username" | "text";

type ImageDelivery = "with-message" | "before-message" | "to-channel";

const imageTabs = [
  { id: "background", label: "Background" },
  { id: "avatar", label: "Avatar" },
  { id: "username", label: "Username" },
  { id: "text", label: "Text" },
] satisfies readonly EditorTab<ImageEditorTab>[];

export function WelcomeImageEditor({ feature }: WelcomeImageEditorProps) {
  const [activeTab, setActiveTab] =
    React.useState<ImageEditorTab>("background");

  const [delivery, setDelivery] = React.useState<ImageDelivery>("with-message");

  return (
    <div className="grid gap-5 pt-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-4">
        <ImageCanvas feature={feature} delivery={delivery} />

        <EditorTabList
          tabs={imageTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ImageTabPanel feature={feature} activeTab={activeTab} />
      </div>

      <aside className="space-y-4 rounded-md border border-white/8 bg-[#101218]/80 p-4">
        <EditorField label="Image delivery">
          <div className="grid gap-2">
            <DeliveryOption
              active={delivery === "with-message"}
              title="With welcome message"
              description="The welcome message sends first, then the image card follows."
              onClick={() => setDelivery("with-message")}
            />

            <DeliveryOption
              active={delivery === "before-message"}
              title="Before welcome message"
              description="The image card sends first, then the welcome message follows."
              onClick={() => setDelivery("before-message")}
            />

            <DeliveryOption
              active={delivery === "to-channel"}
              title="To a channel"
              description="Send only this image card to a selected channel."
              onClick={() => setDelivery("to-channel")}
            />
          </div>
        </EditorField>

        {delivery === "to-channel" ? (
          <EditorField label="Channel">
            <ChannelSelect
              defaultValue={feature.defaultChannel}
              options={["#welcome", "#general", "#lobby"]}
            />
          </EditorField>
        ) : (
          <div className="px-3 py-2 text-sm leading-5 border rounded-md border-white/8 bg-white/4 text-white/42">
            This image will use the destination from the main welcome message
            setup.
          </div>
        )}

        <div className="px-3 py-2 text-sm leading-5 border rounded-md border-primary/16 bg-primary/7 text-white/58">
          The text configured here appears inside the image card only. It does
          not replace the main welcome message.
        </div>
      </aside>
    </div>
  );
}

function ImageCanvas({
  feature,
  delivery,
}: {
  feature: WelcomeImageFeature;
  delivery: ImageDelivery;
}) {
  const titlePreview = renderWelcomePreview(feature.cardTitle);
  const subtitlePreview = renderWelcomePreview(feature.cardSubtitle);

  return (
    <section className="rounded-md border border-white/8 bg-[#101218]/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
          Image preview
        </p>

        <span className="rounded-md border border-white/8 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/42">
          {delivery === "with-message"
            ? "With message"
            : delivery === "before-message"
              ? "Image first"
              : "Image only"}
        </span>
      </div>

      <div className="p-5 mt-4 border rounded-md shadow-2xl min-h-65 border-white/8 bg-linear-to-br from-primary/24 via-fuchsia-500/10 to-black shadow-black/30">
        <div className="flex items-center justify-center text-center min-h-55">
          <div>
            <div className="flex items-center justify-center mx-auto text-xl font-bold border shadow-xl size-20 rounded-2xl border-white/14 bg-black/35 text-primary shadow-black/25">
              SM
            </div>

            <p className="mt-4 text-xl font-bold tracking-tight text-white">
              {titlePreview}
            </p>

            <p className="mt-1 text-sm font-medium text-white/58">
              {subtitlePreview}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageTabPanel({
  feature,
  activeTab,
}: {
  feature: WelcomeImageFeature;
  activeTab: ImageEditorTab;
}) {
  if (activeTab === "avatar") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <EditorField label="Avatar shape">
          <select className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none">
            <option>Rounded square</option>
            <option>Circle</option>
            <option>Soft card</option>
          </select>
        </EditorField>

        <NumberControl label="Avatar size" defaultValue={80} step={4} />
        <NumberControl label="Coordinate left" defaultValue={220} step={4} />
        <NumberControl label="Coordinate top" defaultValue={58} step={4} />
      </div>
    );
  }

  if (activeTab === "username") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <EditorField label="Username text">
          <EditorInput defaultValue={feature.cardTitle} />
        </EditorField>

        <EditorField label="Text color">
          <EditorInput defaultValue="#ffffff" />
        </EditorField>

        <NumberControl label="Coordinate left" defaultValue={175} step={4} />
        <NumberControl label="Coordinate top" defaultValue={148} step={4} />
        <NumberControl label="Text size" defaultValue={24} step={1} />

        <EditorField label="Text alignment">
          <select className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none">
            <option>Center</option>
            <option>Left</option>
            <option>Right</option>
          </select>
        </EditorField>
      </div>
    );
  }

  if (activeTab === "text") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <EditorField label="Card subtitle">
          <EditorInput defaultValue={feature.cardSubtitle} />
        </EditorField>

        <EditorField label="Text color">
          <EditorInput defaultValue="#d7d7ff" />
        </EditorField>

        <NumberControl label="Coordinate left" defaultValue={165} step={4} />
        <NumberControl label="Coordinate top" defaultValue={180} step={4} />
        <NumberControl label="Text size" defaultValue={14} step={1} />

        <EditorField label="Text alignment">
          <select className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none">
            <option>Center</option>
            <option>Left</option>
            <option>Right</option>
          </select>
        </EditorField>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <EditorField label="Background style">
        <select className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none">
          <option>Rias gradient</option>
          <option>Dark anime glow</option>
          <option>Minimal glass</option>
        </select>
      </EditorField>

      <EditorField label="Template">
        <button
          type="button"
          className="w-full h-10 px-3 text-sm font-semibold transition-colors border rounded-md cursor-pointer border-white/10 bg-white/4 text-white/58 hover:bg-white/7 hover:text-white"
        >
          Use clean welcome template
        </button>
      </EditorField>

      <NumberControl label="Card width" defaultValue={420} step={10} />
      <NumberControl label="Card height" defaultValue={230} step={10} />
    </div>
  );
}

function DeliveryOption({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-md border px-3 py-2 text-left transition-colors ${
        active
          ? "border-primary/35 bg-primary/12"
          : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/6"
      }`}
    >
      <span className="block text-sm font-semibold text-white">{title}</span>
      <span className="block mt-1 text-xs leading-5 text-white/42">
        {description}
      </span>
    </button>
  );
}
