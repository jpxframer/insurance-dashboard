"use client";

import { useCallback, useRef } from "react";
import { BellIcon, PlusIcon, SearchIcon } from "@/components/icons/ui-icons";
import { NotificationsPanel, unreadCount } from "./NotificationsPanel";
import { currentUser, greeting, quickActions, search } from "@/lib/data";
import { useDismissable } from "@/lib/use-dismissable";

type TopBarProps = {
  notificationsOpen: boolean;
  onNotificationsToggle: () => void;
  onNotificationsClose: () => void;
};

export function TopBar({
  notificationsOpen,
  onNotificationsToggle,
  onNotificationsClose,
}: TopBarProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => onNotificationsClose(), [onNotificationsClose]);
  const panelRef = useDismissable<HTMLDivElement>(notificationsOpen, close, triggerRef);

  return (
    <header className="sticky top-0 z-30 hidden h-[57px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6 lg:flex">
      <div className="flex min-w-0 items-baseline gap-3">
        <h1 className="truncate text-[16px] font-semibold text-slate-900">
          {greeting.salutation}, {currentUser.firstName} 👋
        </h1>
        <span className="hidden whitespace-nowrap text-[12.5px] text-slate-400 xl:inline">
          {greeting.date}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <label className="relative hidden xl:block">
          <span className="sr-only">Search</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder={search.desktopPlaceholder}
            className="h-9 w-[280px] rounded-[9px] border border-slate-200 bg-slate-50 pl-9 pr-14 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-slate-400">
            {search.shortcut}
          </kbd>
        </label>

        <button
          type="button"
          className="h-9 whitespace-nowrap rounded-[9px] border border-slate-200 px-3.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {quickActions.secondary}
        </button>

        <button
          type="button"
          className="flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[9px] bg-blue-600 px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusIcon className="size-4" />
          {quickActions.primary}
        </button>

        <div className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={onNotificationsToggle}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            className="relative grid size-9 place-items-center rounded-[9px] border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <BellIcon className="size-[18px]" />
            {unreadCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-600 ring-2 ring-white" />
            ) : null}
          </button>

          {/* Frame anchors the panel at y=63 in the 57px bar; the 36px trigger is
              centred at y=10.5, so 16.5px clears its bottom edge. */}
          {notificationsOpen ? (
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Notifications"
              className="absolute right-0 top-[calc(100%+16.5px)] z-40 w-[314px] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-pop)]"
            >
              <NotificationsPanel onClose={close} />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
