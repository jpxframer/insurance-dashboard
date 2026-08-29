import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { InboxDesktop } from "@/components/inbox/InboxDesktop";
import { InboxThreadMobile } from "@/components/inbox/InboxThreadMobile";
import { inboxMessages, inboxThreads } from "@/lib/inbox";

export function generateStaticParams() {
  return inboxMessages.map((message) => ({ id: message.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/inbox/[id]">): Promise<Metadata> {
  const { id } = await params;
  const thread = inboxThreads[id];

  return {
    title: thread ? `${thread.subject} · Surebase` : "Inbox · Surebase",
    description: thread?.mobileMetaLead,
  };
}

/**
 * One thread.
 *
 * Desktop renders the whole Inbox with this message open, so the two-column
 * frame is unchanged and a thread link opened on a desktop still lands
 * somewhere sensible. Mobile renders the thread on its own — the only view in
 * the app with no frame behind it, since the mobile design stops at the list.
 */
export default async function InboxThreadPage({ params }: PageProps<"/inbox/[id]">) {
  const { id } = await params;
  const thread = inboxThreads[id];

  if (!thread) notFound();

  return (
    <DashboardShell activeId="inbox" topBar={null} mobileHeader={null}>
      <InboxDesktop selectedId={id} />
      <InboxThreadMobile thread={thread} />
    </DashboardShell>
  );
}
