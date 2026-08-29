import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PoliciesDesktop } from "@/components/policies/PoliciesDesktop";
import { PoliciesMobileHeader } from "@/components/policies/PoliciesMobileHeader";
import { PoliciesTopBar } from "@/components/policies/PoliciesTopBar";
import { PolicyCardList } from "@/components/policies/PolicyCardList";
import { policiesPage } from "@/lib/policies";

export const metadata: Metadata = {
  title: `${policiesPage.title} · RedPear`,
  description: policiesPage.meta,
};

/**
 * Policies — Figma `20875-31238` (desktop) and `20875-31629` (mobile).
 *
 * The two frames are different presentations of one list: a nine-column table
 * with bulk selection on desktop, a stack of cards on mobile. Both supply their
 * own header into the shell, since neither frame carries the dashboard's
 * greeting bar.
 */
export default function PoliciesPage() {
  return (
    <DashboardShell
      activeId="policies"
      topBar={<PoliciesTopBar />}
      mobileHeader={<PoliciesMobileHeader />}
    >
      <PoliciesDesktop />
      <PolicyCardList />
    </DashboardShell>
  );
}
