import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { InboxCardList } from "@/components/inbox/InboxCardList";
import { InboxDesktop } from "@/components/inbox/InboxDesktop";
import { InboxMobileHeader } from "@/components/inbox/InboxMobileHeader";
import { inboxPage } from "@/lib/inbox";

export const metadata: Metadata = {
  title: `${inboxPage.title} · Surebase`,
  description: "Messages from customers, agents and the system.",
};

/**
 * Inbox — Figma `22780-917` (desktop) and `22780-1226` (mobile).
 *
 * Like Claims, the two frames are not the same content at two widths: desktop
 * pairs a 361px message list with one open thread, while mobile shows the list
 * alone as cards and designs no thread at all. Neither frame carries the
 * dashboard's greeting bar, and the desktop list starts at the top of the
 * viewport, so the page passes `topBar={null}` and owns everything right of the
 * sidebar.
 */
export default function InboxPage() {
  return (
    <DashboardShell
      activeId="inbox"
      topBar={null}
      mobileHeader={<InboxMobileHeader />}
    >
      <InboxDesktop />
      <InboxCardList />
    </DashboardShell>
  );
}
