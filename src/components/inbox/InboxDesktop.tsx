"use client";

import { useState } from "react";
import { InboxComposer } from "./InboxComposer";
import { InboxList } from "./InboxList";
import { InboxThreadHeader } from "./InboxThreadHeader";
import { InboxThreadMessages } from "./InboxThreadMessages";
import { inboxPage, inboxThreads } from "@/lib/inbox";

/**
 * Desktop Inbox: the message list beside the open thread, both pinned to a
 * single viewport height so each scrolls on its own.
 *
 * Which thread is open comes from the URL, not local state — every row is a
 * link to `/inbox/[id]`, so a thread can be shared, reloaded and reached from
 * the mobile card list. Only the filter chips keep client state, which is why
 * this stays the one client component on the page.
 */
export function InboxDesktop({ selectedId }: { selectedId: string }) {
  const [filter, setFilter] = useState(inboxPage.filters[0].id);
  const thread = inboxThreads[selectedId];

  return (
    <div className="hidden h-dvh min-w-0 lg:flex">
      <InboxList
        selectedId={selectedId}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="flex h-dvh min-w-0 flex-1 flex-col bg-slate-50">
        <InboxThreadHeader thread={thread} />

        <div className="flex min-h-0 flex-1 flex-col px-6 py-5">
          <InboxThreadMessages thread={thread} />
          {thread.replyTo ? <InboxComposer replyTo={thread.replyTo} /> : null}
        </div>
      </div>
    </div>
  );
}
