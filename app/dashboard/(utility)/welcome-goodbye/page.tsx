"use client";

import * as React from "react";
import { MockSaveBar } from "@/app/dashboard/_components/mock-save-bar";
import { ModulePageHeader } from "@/app/dashboard/_components/module-page-header";
import { ModuleSettingItem } from "@/app/dashboard/_components/module-setting-item";
import { WelcomeFeatureEditor } from "@/app/dashboard/_components/welcome/welcome-feature-editor";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import {
  type WelcomeFeature,
  type WelcomeFeatureId,
  welcomeFeatures,
} from "@/app/dashboard/_data/welcome-module-data";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

export default function WelcomeGoodbyePage() {
  const { modules, toggleModule } = useDashboard();

  const welcomeModule = modules.find(
    (module: DashboardModule) => module.id === "welcome-goodbye",
  );

  const [activeFeatureId, setActiveFeatureId] =
    React.useState<WelcomeFeatureId | null>(null);

  const [featureState, setFeatureState] = React.useState<
    Record<WelcomeFeatureId, boolean>
  >({
    "welcome-message": true,
    "welcome-image": false,
    "goodbye-message": true,
  });

  const isModuleEnabled = welcomeModule?.enabled ?? false;

  function toggleFeature(featureId: WelcomeFeatureId) {
    setFeatureState((currentState: Record<WelcomeFeatureId, boolean>) => ({
      ...currentState,
      [featureId]: !currentState[featureId],
    }));
  }

  function toggleEditor(featureId: WelcomeFeatureId) {
    setActiveFeatureId((currentFeatureId: WelcomeFeatureId | null) =>
      currentFeatureId === featureId ? null : featureId,
    );
  }

  return (
    <div className="space-y-3">
      <ModulePageHeader
        eyebrow="Utility Module"
        title="Welcome & Goodbye"
        description="Control how Rias greets new members and handles leave messages for this server."
        enabled={isModuleEnabled}
        toggleLabel="Toggle welcome and goodbye module"
        onToggle={() => toggleModule("welcome-goodbye")}
      />

      <div className="space-y-2.5">
        {welcomeFeatures.map((feature: WelcomeFeature) => {
          const isActive = activeFeatureId === feature.id;

          return (
            <ModuleSettingItem
              key={feature.id}
              title={feature.title}
              description={feature.description}
              active={isActive}
              enabled={featureState[feature.id]}
              toggleLabel={`Toggle ${feature.title}`}
              onEdit={() => toggleEditor(feature.id)}
              onToggle={() => toggleFeature(feature.id)}
            >
              <WelcomeFeatureEditor feature={feature} />
            </ModuleSettingItem>
          );
        })}
      </div>

      {activeFeatureId ? <MockSaveBar /> : null}
    </div>
  );
}
