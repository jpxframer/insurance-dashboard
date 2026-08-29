"use client";

import { settingsPage } from "@/lib/settings";
import { cn } from "@/lib/cn";

/**
 * The 245px section rail between the sidebar and the panel. Desktop only —
 * mobile turns these sections into grouped rows instead.
 *
 * Only General is designed, so selecting another section moves the highlight
 * and leaves the panel where it is. See the deviation note in AGENTS.md.
 */
export function SettingsSubNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="hidden h-dvh w-[245px] shrink-0 flex-col border-r border-slate-200 bg-white px-3 lg:flex">
      <h2 className="px-2.5 pt-5 pb-[14px] text-[15px] leading-[20px] font-semibold text-slate-900">
        {settingsPage.title}
      </h2>

      <ul className="flex flex-col gap-px">
        {settingsPage.sections.map((section) => {
          const active = section.id === activeId;

          return (
            <li key={section.id}>
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => onSelect(section.id)}
                className={cn(
                  "flex h-[34px] w-full items-center rounded-[8px] px-2.5 text-left text-[13px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                  active
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "font-medium text-slate-600 hover:bg-slate-50",
                )}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
