import { HeroSection } from "@/components/sections/hero";
import { FeatureHighlights } from "@/components/sections/feature-highlights";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <FeatureHighlights />
    </div>
  );
}
