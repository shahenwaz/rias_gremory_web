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

const selfRoles = ["@Anime News", "@Game Events", "@Music Updates"];

export default function SelfRolesPage() {
  const { modules, toggleModule } = useDashboard();

  const selfRolesModule = modules.find(
    (module: DashboardModule) => module.id === "self-roles",
  );

  const isEnabled = selfRolesModule?.enabled ?? false;

  return (
    <div className="space-y-4">
      <SettingsPageHeader
        eyebrow="Utility Module"
        title="Self Roles"
        description="Let members choose optional roles from a controlled role menu."
        action={<MockSaveButton />}
      />

      <SettingsSection
        title="Module status"
        description="Control whether members can assign roles to themselves."
      >
        <SettingsRow
          title="Enable self roles"
          description="Members will be able to pick roles from a menu or button panel."
        >
          <DashboardToggle
            checked={isEnabled}
            label="Toggle self roles module"
            onCheckedChange={() => toggleModule("self-roles")}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Role menu"
        description="Configure where the self-role menu should be shown."
      >
        <SettingsRow
          title="Menu channel"
          description="Choose the channel where the bot should post the role menu."
        >
          <MockSelect
            value="#roles"
            options={["#roles", "#general", "#announcements", "#rules"]}
          />
        </SettingsRow>

        <SettingsRow
          title="Menu style"
          description="The visual style members will use to pick roles."
        >
          <MockSelect value="Buttons" options={["Buttons", "Dropdown"]} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Available self roles"
        description="Mock roles for now. Later they will come from Discord or the bot JSON files."
      >
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {selfRoles.map((role: string) => (
            <SettingsCard key={role}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {role}
                  </p>
                  <p className="mt-1 text-xs text-white/38">Selectable role</p>
                </div>

                <span className="shrink-0 rounded-md border border-emerald-400/18 bg-emerald-400/8 px-2 py-1 text-[11px] font-medium text-emerald-200">
                  Active
                </span>
              </div>
            </SettingsCard>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}
