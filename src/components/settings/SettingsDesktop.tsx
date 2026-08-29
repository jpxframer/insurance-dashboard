"use client";

import { useState } from "react";
import { SettingsSubNav } from "./SettingsSubNav";
import {
  ClaimsDefaultsCard,
  DangerZoneCard,
  TeamCard,
  WorkspaceCard,
} from "./SettingsCards";
import { settingsPage } from "@/lib/settings";

/**
 * Desktop Settings: the section rail beside the General panel, both pinned to a
 * single viewport height so each scrolls on its own.
 *
 * Only General is designed, so selecting another section moves the highlight
 * and leaves the panel where it is — the same arrangement Claims and Inbox use.
 *
 * Discard and Save changes are both 36px tall. The frame draws them at 36 and
 * 34; at equal heights they align optically, which is the call already made for
 * the Policies toolbar.
 */
export function SettingsDesktop() {
  const [section, setSection] = useState(settingsPage.activeSection);
  const activeLabel =
    settingsPage.sections.find((item) => item.id === section)?.label ?? "";

  return (
    <div className="hidden h-dvh min-w-0 lg:flex">
      <SettingsSubNav activeId={section} onSelect={setSection} />

      <div className="flex h-dvh min-w-0 flex-1 flex-col bg-slate-50">
        <header className="flex h-[57px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-7">
          <h1 className="truncate text-[15px] leading-[21px] font-semibold text-slate-900">
            {activeLabel}
          </h1>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className="h-9 rounded-lg border border-slate-200 bg-white px-[12px] text-[12.5px] font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {settingsPage.discard}
            </button>
            <button
              type="button"
              className="h-9 rounded-lg bg-blue-600 px-[14px] text-[12.5px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {settingsPage.save}
            </button>
          </div>
        </header>

        {/* Two equal columns; each row's cards stretch to the taller of the pair. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-7 py-5">
          <div className="grid grid-cols-2 items-stretch gap-[14px]">
            <WorkspaceCard />
            <ClaimsDefaultsCard />
            <TeamCard />
            <DangerZoneCard />
          </div>
        </div>
      </div>
    </div>
  );
}
