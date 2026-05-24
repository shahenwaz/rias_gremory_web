import { WelcomeImageEditor } from "@/app/dashboard/_components/welcome/welcome-image-editor";
import { WelcomeTextEditor } from "@/app/dashboard/_components/welcome/welcome-text-editor";
import type { WelcomeFeature } from "@/app/dashboard/_data/welcome-module-data";

type WelcomeFeatureEditorProps = {
  feature: WelcomeFeature;
};

export function WelcomeFeatureEditor({ feature }: WelcomeFeatureEditorProps) {
  if (feature.type === "image") {
    return <WelcomeImageEditor feature={feature} />;
  }

  return <WelcomeTextEditor feature={feature} />;
}
