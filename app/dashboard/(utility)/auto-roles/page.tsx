"use client";

import { DashboardToggle } from "@/app/dashboard/_components/dashboard-toggle";
import { MockSaveButton } from "@/app/dashboard/_components/mock-save-button";
import { MockSelect } from "@/app/dashboard/_components/mock-select";
import { SettingsCard } from "@/app/dashboard/_components/settings-card";
import { SettingsPageHeader } from "@/app/dashboard/_components/settings-page-header";
import { SettingsRow } from "@/app/dashboard/_components/settings-row";
import { SettingsSection } from "@/app/dashboard/_components/settings-section";
import { useDashboard } from "@/app/dashboard/_components/dashboard-context";
import type { DashboardModule } from "@/app/dashboard/_data/dashboard-data";

export default function AutoRolesPage() {
  const { modules, toggleModule } = useDashboard();

  const autoRolesModule = modules.find(
    (module: DashboardModule) => module.id === "auto-roles",
  );

  const isEnabled = autoRolesModule?.enabled ?? false;

  return (
    <div className="space-y-4">
      <SettingsPageHeader
        eyebrow="Utility Module"
        title="Auto Roles"
        description="Automatically assign selected roles when new members join the server."
        action={<MockSaveButton />}
      />

      <SettingsSection
        title="Module status"
        description="Control whether auto roles are enabled for this server."
      >
        <SettingsRow
          title="Enable auto roles"
          description="New members will receive the selected default role automatically."
        >
          <DashboardToggle
            checked={isEnabled}
            label="Toggle auto roles module"
            onCheckedChange={() => toggleModule("auto-roles")}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Default member role"
        description="Select the role that should be assigned to new members."
      >
        <SettingsRow
          title="Role to assign"
          description="The bot must have permission to manage this role."
        >
          <MockSelect
            value="@Member"
            options={["@Member", "@Verified", "@Anime Fan", "@Community"]}
          />
        </SettingsRow>

        <SettingsCard>
          <p className="text-sm font-medium text-white">Permission reminder</p>
          <p className="mt-1 text-sm leading-6 text-white/42">
            Discord only allows the bot to assign roles below its highest role.
            Later we can check this using the Discord API.
          </p>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection
        title="Role assignment rules"
        description="Optional behaviour that can be connected once we receive the real bot JSON shape."
      >
        <SettingsRow
          title="Assign only after verification"
          description="Useful if the server has a verification or rules flow."
        >
          <MockSelect value="Disabled" options={["Disabled", "Enabled"]} />
        </SettingsRow>

        <SettingsRow
          title="Delay before assigning"
          description="Optional delay after a member joins."
        >
          <MockSelect
            value="Instant"
            options={["Instant", "10 seconds", "1 minute"]}
          />
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
