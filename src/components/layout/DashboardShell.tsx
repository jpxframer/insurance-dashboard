"use client";

import { useCallback, useState, type ReactNode } from "react";
import { MobileGreeting, MobileHeader } from "./MobileHeader";
import { MobileTabBar } from "./MobileTabBar";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

/**
 * Owns the nav chrome and its interactive state so page content can stay a
 * server component.
 *
 * The desktop sidebar's expanded/collapsed states and the mobile header's two
 * overlays are the four "nav" frames in the Figma set — they are states of one
 * shell, not separate layouts.
 */
export function DashboardShell({
  children,
  activeId = "dashboard",
}: {
  children: ReactNode;
  activeId?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = useCallback(() => setCollapsed((v) => !v), []);

  // The two mobile overlays are mutually exclusive.
  const toggleNotifications = useCallback(() => {
    setNotificationsOpen((v) => !v);
    setProfileOpen(false);
  }, []);
  const toggleProfile = useCallback(() => {
    setProfileOpen((v) => !v);
    setNotificationsOpen(false);
  }, []);

  const closeNotifications = useCallback(() => setNotificationsOpen(false), []);
  const closeProfile = useCallback(() => setProfileOpen(false), []);

  return (
    <div className="flex min-h-dvh bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} activeId={activeId} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          notificationsOpen={notificationsOpen}
          onNotificationsToggle={toggleNotifications}
          onNotificationsClose={closeNotifications}
        />

        <MobileHeader
          notificationsOpen={notificationsOpen}
          onNotificationsToggle={toggleNotifications}
          onNotificationsClose={closeNotifications}
          profileOpen={profileOpen}
          onProfileToggle={toggleProfile}
          onProfileClose={closeProfile}
        />

        {/* Scrolls away under the fixed bar above it. */}
        <MobileGreeting />

        <main className="flex-1 pb-[75px] lg:pb-0">{children}</main>
      </div>

      <MobileTabBar activeId={activeId} />
    </div>
  );
}
