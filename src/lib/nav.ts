import type { ComponentType, SVGProps } from "react";
import {
  AnalyticsIcon,
  ClaimsIcon,
  CustomersIcon,
  DashboardIcon,
  InboxIcon,
  PoliciesIcon,
  SettingsIcon,
} from "@/components/icons/figma-icons";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
};

/** Sidebar primary group. */
export const primaryNav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/", icon: DashboardIcon },
  { id: "policies", label: "Policies", href: "/policies", icon: PoliciesIcon },
  { id: "claims", label: "Claims", href: "/claims", icon: ClaimsIcon, badge: "87" },
  { id: "customers", label: "Customers", href: "/customers", icon: CustomersIcon },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: AnalyticsIcon },
  { id: "inbox", label: "Inbox", href: "/inbox", icon: InboxIcon },
];

/** Sidebar footer group, separated by a rule in the design. */
export const secondaryNav: NavItem[] = [
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

/**
 * Mobile tab bar. Analytics and Settings drop out of the tabs and move into the
 * avatar menu, matching the mobile frames.
 */
export const mobileTabs: NavItem[] = [
  { id: "dashboard", label: "Home", href: "/", icon: DashboardIcon },
  { id: "policies", label: "Policies", href: "/policies", icon: PoliciesIcon },
  { id: "claims", label: "Claims", href: "/claims", icon: ClaimsIcon, badge: "87" },
  { id: "customers", label: "Customers", href: "/customers", icon: CustomersIcon },
  { id: "inbox", label: "Inbox", href: "/inbox", icon: InboxIcon },
];
