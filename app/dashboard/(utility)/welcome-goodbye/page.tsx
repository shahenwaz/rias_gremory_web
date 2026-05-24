"use client";

import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";
import { MockInput } from "@/app/dashboard/_components/mock-input";
import { MockSaveButton } from "@/app/dashboard/_components/mock-save-button";
import { MockSelect } from "@/app/dashboard/_components/mock-select";
import { SettingsCard } from "@/app/dashboard/_components/settings-card";
import { SettingsPageHeader } from "@/app/dashboard/_components/settings-page-header";
import { SettingsRow } from "@/app/dashboard/_components/settings-row";
import { SettingsSection } from "@/app/dashboard/_components/settings-section";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

export default function WelcomeGoodbyePage() {
  const { modules, toggleModule } = useDashboard();

  const welcomeModule = modules.find(
    (module: DashboardModule) => module.id === "welcome-goodbye",
  );

  const isEnabled = welcomeModule?.enabled ?? false;

  return (
    <div className="space-y-4">
      <SettingsPageHeader
        eyebrow="Utility Module"
        title="Welcome & Goodbye"
        description="Configure automatic messages for members joining or leaving the server."
        action={<MockSaveButton />}
      />

      <SettingsSection
        title="Module status"
        description="Control whether Rias sends join and leave messages."
      >
        <SettingsRow
          title="Enable welcome and goodbye messages"
          description="When enabled, Rias will send automatic member join and leave messages."
        >
          <DashboardToggle
            checked={isEnabled}
            label="Toggle welcome and goodbye module"
            onCheckedChange={() => toggleModule("welcome-goodbye")}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Welcome message"
        description="Set the channel and message shown to new members."
      >
        <SettingsRow
          title="Welcome channel"
          description="Choose where the welcome message should be sent."
        >
          <MockSelect
            value="#welcome"
            options={["#welcome", "#general", "#lobby", "#announcements"]}
          />
        </SettingsRow>

        <SettingsCard>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-white">Message template</p>
              <p className="mt-1 text-sm text-white/42">
                Mock value for now. Later this will save into the bot JSON.
              </p>
            </div>

            <MockInput
              value="Welcome {user} to {server}! Enjoy your stay."
              placeholder="Welcome message"
            />
          </div>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection
        title="Goodbye message"
        description="Set the channel and message shown when a member leaves."
      >
        <SettingsRow
          title="Goodbye channel"
          description="Choose where the goodbye message should be sent."
        >
          <MockSelect
            value="#goodbye"
            options={["#goodbye", "#general", "#logs", "#lobby"]}
          />
        </SettingsRow>

        <SettingsCard>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-white">Message template</p>
              <p className="mt-1 text-sm text-white/42">
                Supports placeholders like user and server later.
              </p>
            </div>

            <MockInput
              value="{user} has left {server}."
              placeholder="Goodbye message"
            />
          </div>
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
