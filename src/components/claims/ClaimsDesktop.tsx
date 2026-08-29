"use client";

import { useState } from "react";
import { ClaimAside } from "./ClaimAside";
import { ClaimDocuments } from "./ClaimDocuments";
import { ClaimHeader } from "./ClaimHeader";
import { ClaimNotes } from "./ClaimNotes";
import { ClaimsQueue } from "./ClaimsQueue";
import { ClaimTimeline } from "./ClaimTimeline";
import { claimDetail, claimsQueue } from "@/lib/claims";

/**
 * Desktop Claims: the queue rail beside one claim's detail, both pinned to a
 * single viewport height so each scrolls on its own.
 *
 * Only one claim is designed, so selecting a different row moves the highlight
 * but leaves the detail on CLM-8241 — see the deviation note in AGENTS.md.
 */
export function ClaimsDesktop() {
  const [selectedId, setSelectedId] = useState(claimDetail.id);
  const [filter, setFilter] = useState(claimsQueue.filters[0].id);

  return (
    <div className="hidden h-dvh min-w-0 lg:flex">
      <ClaimsQueue
        selectedId={selectedId}
        onSelect={setSelectedId}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="leading-figma flex min-w-0 flex-1 flex-col">
        <ClaimHeader />

        <div className="flex min-h-0 flex-1 gap-4 overflow-y-auto px-6 py-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <ClaimTimeline />
            <ClaimDocuments />
            <ClaimNotes />
          </div>

          <ClaimAside />
        </div>
      </div>
    </div>
  );
}
