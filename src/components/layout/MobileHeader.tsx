"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import {
  AnalyticsIcon,
  SettingsIcon,
} from "@/components/icons/figma-icons";
import {
  BellIcon,
  ChevronRightIcon,
  SearchIcon,
  SignOutIcon,
  UserIcon,
} from "@/components/icons/ui-icons";
import { NotificationsPanel, unreadCount } from "./NotificationsPanel";
import { currentUser, greeting, profileMenu, search } from "@/lib/data";
import { useDismissable } from "@/lib/use-dismissable";

const MENU_ICONS = {
  analytics: AnalyticsIcon,
  settings: SettingsIcon,
  profile: UserIcon,
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

  return (
    <header className="relative z-30 bg-white lg:hidden">
      <div className="flex items-center justify-between px-5 pb-4 pt-3">
        <Link href="/" className="rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <Image
            src="/brand/redpear-logo.svg"
            alt="RedPear"
            width={46}
            height={32}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="flex items-center gap-3">
          <button
            ref={bellRef}
            type="button"
            onClick={onNotificationsToggle}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            className="relative grid size-11 place-items-center rounded-[12px] border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <BellIcon className="size-5" />
            {unreadCount > 0 ? (
              <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-red-600 ring-2 ring-white" />
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
              width={44}
              height={44}
              className="size-11 rounded-[12px] object-cover"
            />
          </button>
        </div>
      </div>

      <div className="px-5 pb-4">
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

      {/* Notifications sheet */}
      {notificationsOpen ? (
        <div
          ref={notificationsRef}
          role="dialog"
          aria-label="Notifications"
          className="absolute inset-x-4 top-[76px] z-40 overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-pop)]"
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
          className="absolute right-4 top-[76px] z-40 w-[250px] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-pop)]"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
            <Image
              src={currentUser.avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-semibold text-slate-900">
                {currentUser.name}
              </p>
              <p className="truncate text-[12px] text-slate-400">{currentUser.role}</p>
            </div>
          </div>

          <ul className="border-b border-slate-100 py-1">
            {profileMenu.items.map((item) => {
              const Icon = MENU_ICONS[item.id as keyof typeof MENU_ICONS];
              return (
                <li key={item.id}>
                  <Link
                    href={`/${item.id}`}
                    role="menuitem"
                    onClick={closeProfile}
                    className="flex items-center gap-3 px-4 py-3 text-[14px] text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <Icon className="size-5 shrink-0 text-slate-500" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRightIcon className="size-4 shrink-0 text-slate-300" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            role="menuitem"
            onClick={closeProfile}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-[14px] font-medium text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
          >
            <SignOutIcon className="size-5 shrink-0" />
            {profileMenu.signOutLabel}
          </button>
        </div>
      ) : null}
    </header>
  );
}
