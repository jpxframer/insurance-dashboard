"use client";

import { useState } from "react";
import { InboxComposer } from "./InboxComposer";
import { InboxList } from "./InboxList";
import { InboxThreadHeader } from "./InboxThreadHeader";
import { InboxThreadMessages } from "./InboxThreadMessages";
import { inboxMessages, inboxPage } from "@/lib/inbox";

/**
 * Desktop Inbox: the message list beside one open thread, both pinned to a
 * single viewport height so each scrolls on its own.
 *
 * Only Marcus Johnson's thread is designed, so selecting another row moves the
 * highlight but leaves the pane where it is — the same arrangement Claims uses,
 * and for the same reason. See the deviation note in AGENTS.md.
 */
export function InboxDesktop() {
  const [selectedId, setSelectedId] = useState(inboxMessages[0].id);
  const [filter, setFilter] = useState(inboxPage.filters[0].id);

  return (
    <div className="hidden h-dvh min-w-0 lg:flex">
      <InboxList
        selectedId={selectedId}
        onSelect={setSelectedId}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="flex h-dvh min-w-0 flex-1 flex-col bg-slate-50">
        <InboxThreadHeader />

        <div className="flex min-h-0 flex-1 flex-col px-6 py-5">
          <InboxThreadMessages />
          <InboxComposer />
        </div>
      </div>
    </div>
  );
}
