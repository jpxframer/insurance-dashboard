import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProfileDesktop } from "@/components/profile/ProfileDesktop";
import { ProfileMobile } from "@/components/profile/ProfileMobile";
import { profilePage } from "@/lib/profile";

export const metadata: Metadata = {
  title: `${profilePage.name} · Surebase`,
  description: "Personal information, preferences, security and active sessions.",
};

/**
 * Profile — Figma `22783-3126` (desktop). **No mobile frame exists**; the
 * mobile view was designed here, and the Settings account row is the way in.
 *
 * The identity header starts at the top of the viewport, so this page passes
 * `topBar={null}` and owns everything right of the sidebar. Profile is not a
 * nav item, so `activeId` leaves Settings lit — it is the section this sits
 * under.
 */
export default function ProfileRoutePage() {
  return (
    <DashboardShell activeId="settings" topBar={null} mobileHeader={null}>
      <ProfileDesktop />
      <ProfileMobile />
    </DashboardShell>
  );
}
