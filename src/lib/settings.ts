/**
 * Mock content for the Settings screen.
 *
 * Transcribed from Figma `22783-1835` (desktop) and `22783-2031` (mobile).
 * Same contract as the other `lib/` modules.
 *
 * The two frames are different screens, not one screen at two widths: desktop
 * is a seven-item sub-nav beside a four-card General panel, mobile is a stack
 * of grouped rows that *link into* those sections rather than showing them.
 *
 * **Every `@redpear.com` address and the "RedPear Operations" version string in
 * the frames is written here as Surebase.** The product was renamed in
 * `56734e9`; the Figma file still carries the old name, and reproducing it
 * would put a brand the repo deliberately removed back on screen.
 */

export type SettingsSection = {
  id: string;
  label: string;
};

export const settingsPage = {
  title: "Settings",
  activeSection: "general",
  sections: [
    { id: "general", label: "General" },
    { id: "team", label: "Team & roles" },
    { id: "notifications", label: "Notifications" },
    { id: "workflow", label: "Claims workflow" },
    { id: "security", label: "Security" },
    { id: "billing", label: "Billing" },
    { id: "integrations", label: "Integrations" },
  ] satisfies SettingsSection[],
  discard: "Discard",
  save: "Save changes",
};

export const workspaceCard = {
  title: "Workspace",
  description: "Company identity across the platform and customer communications.",
  companyNameLabel: "Company name",
  companyName: "Gemini Communications",
  timezoneLabel: "Timezone",
  timezone: "Pacific (UTC−7)",
  currencyLabel: "Currency",
  currency: "USD ($)",
  logoLabel: "Logo",
  logoHint: "SVG or PNG, min 128px · ",
  logoAction: "Replace",
};

export const claimsDefaultsCard = {
  title: "Claims defaults",
  description: "Service-level targets and automation applied to new claims.",
  slaLabel: "Review SLA",
  sla: "7 days",
  fastTrackLabel: "Fast-track threshold",
  fastTrack: "$2,500",
  toggles: [
    {
      id: "auto-assign",
      title: "Auto-assign assessors",
      description: "Route by line of business and region.",
      on: true,
    },
    {
      id: "ai-insights",
      title: "AI insights on dashboard",
      description: "Surface anomalies and suggested actions.",
      on: true,
    },
    {
      id: "sms",
      title: "Customer SMS updates",
      description: "Status texts at each claim milestone.",
      on: false,
    },
  ],
};

export type TeamMember = {
  name: string;
  email: string;
  initials: string;
  role: string;
  tone: "blue" | "amber" | "slate";
};

export const teamCard = {
  title: "Team",
  meta: "8 members · 3 roles",
  invite: "Invite member",
  viewAll: "View all 8 →",
  members: [
    {
      name: "Sarah Kim",
      email: "sarah@surebase.com",
      initials: "SK",
      role: "ADMIN",
      tone: "blue",
    },
    {
      name: "Dana Ortiz",
      email: "dana@surebase.com",
      initials: "DO",
      role: "ASSESSOR",
      tone: "amber",
    },
    {
      name: "Tom Reyes",
      email: "tom@surebase.com",
      initials: "TR",
      role: "AGENT",
      tone: "slate",
    },
  ] satisfies TeamMember[],
};

export const dangerZoneCard = {
  title: "Danger zone",
  description: "These actions are irreversible and require owner confirmation.",
  rows: [
    {
      id: "export",
      title: "Export all workspace data",
      description: "Policies, claims, customers as CSV.",
      action: "Export",
      destructive: false,
    },
    {
      id: "delete",
      title: "Delete workspace",
      description: "Removes all data after 30-day grace period.",
      action: "Delete…",
      destructive: true,
    },
  ],
};

/* ---------------------------------------------------------------- mobile -- */

export const settingsMobile = {
  title: "Settings",
  account: {
    name: "Sarah Kim",
    role: "ADMIN",
    email: "sarah@surebase.com",
    initials: "SK",
  },
  preferences: {
    heading: "Preferences",
    themeLabel: "Theme",
    themeOptions: [
      { id: "light", label: "Light" },
      { id: "dark", label: "Dark" },
      { id: "system", label: "Auto" },
    ],
    toggles: [
      { id: "push", label: "Push notifications", on: true },
      { id: "digests", label: "Email digests", on: true },
      { id: "faceid", label: "Face ID unlock", on: false },
    ],
  },
  workspace: {
    heading: "Workspace",
    rows: [
      { id: "general", label: "General", icon: "general", tone: "blue" },
      { id: "team", label: "Team & roles", icon: "team", value: "8 members" },
      { id: "workflow", label: "Claims workflow", icon: "workflow" },
      { id: "security", label: "Security", icon: "security", pill: "2FA on" },
      { id: "billing", label: "Billing", icon: "billing", value: "Enterprise" },
    ],
  },
  support: {
    heading: "Support",
    rows: [
      { id: "help", label: "Help center" },
      { id: "contact", label: "Contact support" },
    ],
  },
  signOut: "Sign out",
  version: "Surebase Operations · v4.2.1 (build 1180)",
};

/** Avatar tile tones, shared by the team list and the mobile account card. */
export const memberToneClass = {
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-700",
  slate: "bg-slate-100 text-slate-600",
} as const;
