"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { Logo } from "./Logo";
import {
  AnalyticsIcon,
  MenuChevronIcon,
  ProfileIcon,
  SettingsIcon,
  SignOutIcon,
} from "@/components/icons/figma-icons";
import { BellIcon, SearchIcon } from "@/components/icons/ui-icons";
import { NotificationsPanel, unreadCount } from "./NotificationsPanel";
import { currentUser, greeting, profileMenu, search } from "@/lib/data";
import { useDismissable } from "@/lib/use-dismissable";
import { useScrolled } from "@/lib/use-scrolled";
import { cn } from "@/lib/cn";

/** Height of the fixed bar; the scrolling block below clears it by the same amount. */
const BAR_H = 72;

const MENU_ICONS = {
  analytics: AnalyticsIcon,
  settings: SettingsIcon,
  profile: ProfileIcon,
} as const;

type MobileHeaderProps = {
  notificationsOpen: boolean;
  onNotificationsToggle: () => void;
  onNotificationsClose: () => void;
  profileOpen: boolean;
  onProfileToggle: () => void;
  onProfileClose: () => void;
};

export function MobileHeader({
  notificationsOpen,
  onNotificationsToggle,
  onNotificationsClose,
  profileOpen,
  onProfileToggle,
  onProfileClose,
}: MobileHeaderProps) {
  const bellRef = useRef<HTMLButtonElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const closeNotifications = useCallback(
    () => onNotificationsClose(),
    [onNotificationsClose],
  );
  const closeProfile = useCallback(() => onProfileClose(), [onProfileClose]);

  const notificationsRef = useDismissable<HTMLDivElement>(
    notificationsOpen,
    closeNotifications,
    bellRef,
  );
  const profileRef = useDismissable<HTMLDivElement>(profileOpen, closeProfile, avatarRef);
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        // Fixed like the bottom tab bar, so page content scrolls between them.
        // The border fades in only once content has slid underneath.
        "fixed inset-x-0 top-0 z-40 bg-white lg:hidden",
        "border-b transition-colors duration-200",
        scrolled ? "border-slate-200" : "border-transparent",
      )}
      style={{ height: BAR_H }}
    >
      <div className="flex h-full items-center justify-between px-5">
        <Link
          href="/"
          aria-label="SureBase"
          className="rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          <button
            ref={bellRef}
            type="button"
            onClick={onNotificationsToggle}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            className="relative grid size-12 place-items-center rounded-[12px] border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <BellIcon className="size-6" />
            {unreadCount > 0 ? (
              <span className="absolute right-[11px] top-[9px] size-3 rounded-full bg-red-600 ring-2 ring-white" />
            ) : null}
          </button>

          <button
            ref={avatarRef}
            type="button"
            onClick={onProfileToggle}
            aria-label="Account menu"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            className="rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Image
              src={currentUser.avatar}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-[12px] object-cover"
            />
          </button>
        </div>
      </div>

      {/* Notifications sheet */}
      {notificationsOpen ? (
        <div
          ref={notificationsRef}
          role="dialog"
          aria-label="Notifications"
          className="absolute inset-x-4 top-full z-40 max-h-[calc(100dvh-96px)] overflow-y-auto overscroll-contain rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-pop)]"
        >
          <NotificationsPanel onClose={closeNotifications} />
        </div>
      ) : null}

      {/* Account menu */}
      {profileOpen ? (
        <div
          ref={profileRef}
          role="menu"
          aria-label="Account"
          className="absolute right-4 top-full z-40 max-h-[calc(100dvh-96px)] w-[250px] overflow-y-auto overscroll-contain rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-pop)]"
        >
          <div className="flex items-center gap-[10px] border-b border-slate-100 px-[14px] pb-[13px] pt-[13px]">
            <Image
              src={currentUser.avatar}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-semibold leading-[18px] text-slate-900">
                {currentUser.name}
              </p>
              <p className="truncate text-[11.5px] leading-[15px] text-slate-400">
                {currentUser.role}
              </p>
            </div>
          </div>

          <ul className="p-1.5">
            {profileMenu.items.map((item) => {
              const Icon = MENU_ICONS[item.id as keyof typeof MENU_ICONS];
              return (
                <li key={item.id}>
                  <Link
                    href={`/${item.id}`}
                    role="menuitem"
                    onClick={closeProfile}
                    className="flex min-h-11 items-center gap-[11px] rounded-[9px] px-2.5 py-[13px] text-[14px] font-medium leading-[18px] text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <Icon className="size-6 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    <MenuChevronIcon className="size-3 shrink-0 text-slate-300" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Sign out is its own bordered section, and its glyph is 16px — not 24. */}
          <div className="border-t border-slate-100 px-1.5 pb-1.5 pt-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={closeProfile}
              className="flex min-h-11 w-full items-center gap-[11px] rounded-[9px] px-2.5 py-[13px] text-[14px] font-medium leading-[18px] text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
            >
              <SignOutIcon className="size-4 shrink-0" />
              {profileMenu.signOutLabel}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/**
 * Greeting and search — mobile only.
 *
 * Deliberately outside the fixed bar so it scrolls away with the page; the top
 * padding clears the bar's height.
 */
export function MobileGreeting() {
  return (
    <div className="bg-white px-5 pb-4 lg:hidden" style={{ paddingTop: BAR_H }}>
      <p className="text-[13px] text-slate-400">{greeting.date}</p>
      <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-slate-900">
        {greeting.salutation}, {currentUser.firstName} 👋
      </h1>

      <label className="relative mt-4 block">
        <span className="sr-only">Search</span>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder={search.mobilePlaceholder}
          className="h-[52px] w-full rounded-[14px] border border-slate-200 bg-slate-50 pl-12 pr-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
        />
      </label>
    </div>
  );
}
