import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ClaimMobileBody } from "@/components/claims/ClaimMobileBody";
import { ClaimMobileHeader } from "@/components/claims/ClaimMobileHeader";
import { ClaimsDesktop } from "@/components/claims/ClaimsDesktop";
import { claimDetail } from "@/lib/claims";

export const metadata: Metadata = {
  title: `Claims · Surebase`,
  description: `Review claim ${claimDetail.id} — timeline, documents and decision.`,
};

/**
 * Claims — Figma `20875-31762` (desktop) and `20875-32146` (mobile).
 *
 * The two frames are not the same content at two widths: desktop pairs a queue
 * rail with one claim's detail, while mobile shows the detail alone. So the
 * queue is desktop-only, and `topBar` is nulled because the rail starts at the
 * top of the viewport — this page owns everything right of the sidebar.
 */
export default function ClaimsPage() {
  return (
    <DashboardShell
      activeId="claims"
      topBar={null}
      mobileHeader={<ClaimMobileHeader />}
    >
      <ClaimsDesktop />
      <ClaimMobileBody />
    </DashboardShell>
  );
}
