import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SettingsDesktop } from "@/components/settings/SettingsDesktop";
import {
  SettingsMobile,
  SettingsMobileHeader,
} from "@/components/settings/SettingsMobile";
import { settingsPage } from "@/lib/settings";

export const metadata: Metadata = {
  title: `${settingsPage.title} · Surebase`,
  description: "Workspace identity, claims defaults, team and billing.",
};

/**
 * Settings — Figma `22783-1835` (desktop) and `22783-2031` (mobile).
 *
 * The two frames are different screens rather than one at two widths: desktop
 * is a 245px section rail beside the General panel, mobile is a stack of
 * grouped rows that link into those sections. The rail starts at the top of the
 * viewport, so the page passes `topBar={null}` and owns everything right of the
 * sidebar.
 *
 * The mobile frame draws no tab bar — Settings lives in the account menu, not
 * the tabs. The shell keeps the bar with nothing lit, as Analytics does.
 */
export default function SettingsPage() {
  return (
    <DashboardShell
      activeId="settings"
      topBar={null}
      mobileHeader={<SettingsMobileHeader />}
    >
      <SettingsDesktop />
      <SettingsMobile />
    </DashboardShell>
  );
}
