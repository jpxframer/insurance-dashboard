/**
 * Mock content for the Profile screen.
 *
 * Transcribed from Figma `22783-3126` (desktop). **There is no mobile frame** —
 * the mobile view was designed here; see *The mobile profile* in AGENTS.md.
 *
 * As in `./settings.ts`, every `@redpear.com` address and the "RedPear app"
 * session label is written as Surebase: the product was renamed in `56734e9`
 * and the Figma file simply predates it.
 */

export const profilePage = {
  name: "Sarah Kim",
  initials: "SK",
  roleBadge: "ADMIN",
  meta: "sarah@surebase.com · Operations · Portland office · Joined Feb 2022",
  /** Mobile drops the address, which the identity block already carries. */
  mobileMeta: "Operations · Portland office · Joined Feb 2022",
  changePhoto: "Change photo",
  save: "Save changes",
};

export const personalInfo = {
  title: "Personal information",
  fields: [
    { id: "first", label: "First name", value: "Sarah", type: "text" },
    { id: "last", label: "Last name", value: "Kim", type: "text" },
    { id: "email", label: "Work email", value: "sarah@surebase.com", type: "text" },
    { id: "phone", label: "Phone", value: "(503) 555-0102", type: "text" },
    {
      id: "role",
      label: "Role",
      value: "Operations Admin · managed by owner",
      type: "readonly",
    },
    { id: "office", label: "Office", value: "Portland, OR", type: "select" },
  ] as const,
};

export const profilePreferences = {
  title: "Preferences",
  theme: {
    title: "Theme",
    description: "Applies to this device.",
    options: [
      { id: "light", label: "Light" },
      { id: "dark", label: "Dark" },
      { id: "system", label: "System" },
    ],
    value: "light",
  },
  density: {
    title: "Default table density",
    description: "Starting density for all data tables.",
    options: [
      { id: "comfortable", label: "Comfortable" },
      { id: "compact", label: "Compact" },
    ],
    value: "compact",
  },
  toggles: [
    {
      id: "digests",
      title: "Email digests",
      description: "Weekly summary of renewals and SLA risks.",
      on: true,
    },
    {
      id: "desktop",
      title: "Desktop notifications",
      description: "New claim assignments and @mentions.",
      on: true,
    },
  ],
};

export const profileSecurity = {
  title: "Security",
  password: {
    title: "Password",
    description: "Last changed 3 months ago.",
    action: "Change",
  },
  rows: [
    {
      id: "2fa",
      title: "Two-factor authentication",
      description: "Authenticator app · enabled Jan 2026.",
      pill: "Enabled",
    },
    {
      id: "sso",
      title: "Single sign-on",
      description: "Google Workspace · surebase.com",
      pill: "Connected",
    },
  ],
};

export type Session = {
  id: string;
  device: string;
  meta: string;
  kind: "desktop" | "phone";
  /** The session you are on cannot be signed out from itself. */
  current?: boolean;
};

export const activeSessions = {
  title: "Active sessions",
  signOutAll: "Sign out all",
  currentBadge: "This device",
  signOut: "Sign out",
  items: [
    {
      id: "mac",
      device: "MacBook Pro · Chrome",
      meta: "Portland, OR · Active now",
      kind: "desktop",
      current: true,
    },
    {
      id: "iphone",
      device: "iPhone 16 · Surebase app",
      meta: "Portland, OR · 2 hours ago",
      kind: "phone",
    },
    {
      id: "windows",
      device: "Windows · Edge",
      meta: "Seattle, WA · Jul 20",
      kind: "desktop",
    },
  ] satisfies Session[],
};
