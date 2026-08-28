/**
 * Mock content for the dashboard home screen.
 *
 * Every string, figure and status here is transcribed from the RedPear Figma
 * frames so the implementation renders exactly what was designed. Swap this
 * module for real API calls without touching the components.
 */

export type ClaimStatus =
  | "under-review"
  | "approved"
  | "docs-requested"
  | "escalated"
  | "new";

export type NotificationTone = "amber" | "blue" | "green" | "slate";

export const currentUser = {
  name: "Sarah Kim",
  role: "Operations Admin",
  firstName: "Sarah",
  avatar: "/brand/avatar.png",
} as const;

export const greeting = {
  salutation: "Good morning",
  date: "Monday, July 27",
} as const;

/**
 * Sparkline series for the four stat tiles. Values are unitless — the sparkline
 * normalises them — and the shapes match the Figma curves.
 */
export const stats = [
  {
    id: "active-policies",
    label: "Active Policies",
    value: "12,847",
    delta: "+3.2%",
    deltaTone: "positive" as const,
    mobileCaption: "+3.2% this month",
    mobileCaptionTone: "positive" as const,
    spark: [8, 10, 9, 12, 11, 14, 13, 17, 16, 20, 22, 25],
    sparkTone: "blue" as const,
  },
  {
    id: "claims-submitted",
    label: "Claims Submitted",
    value: "342",
    badge: "MTD",
    mobileCaption: "+12 vs. last month",
    mobileCaptionTone: "neutral" as const,
    spark: [13, 14, 12.5, 13.5, 12, 13, 14, 13, 12.5, 13.5, 13, 14],
    sparkTone: "slate" as const,
  },
  {
    id: "pending-claims",
    label: "Pending Claims",
    value: "87",
    badge: "18 urgent",
    badgeTone: "warning" as const,
    mobileCaption: "18 need attention",
    mobileCaptionTone: "warning" as const,
    spark: [15, 16, 14.5, 15.5, 14, 15, 13.5, 14.5, 13, 14, 12.5, 13],
    sparkTone: "amber" as const,
  },
  {
    id: "revenue-mtd",
    label: "Revenue MTD",
    value: "$2.84M",
    delta: "+8.4%",
    deltaTone: "positive" as const,
    mobileCaption: "+8.4% vs. June",
    mobileCaptionTone: "positive" as const,
    spark: [6, 8, 7, 10, 9, 12, 14, 13, 17, 19, 22, 26],
    sparkTone: "green" as const,
  },
];

/** 12 months of premium revenue, Aug through Jul. */
export const revenueTrend = {
  title: "Revenue trend",
  rangeLabel: "12 months",
  seriesLabel: "Premium",
  points: [
    { month: "Aug", value: 32 },
    { month: "Sep", value: 34 },
    { month: "Oct", value: 33 },
    { month: "Nov", value: 41 },
    { month: "Dec", value: 39 },
    { month: "Jan", value: 48 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 53 },
    { month: "May", value: 62 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 76 },
  ],
  /** Desktop prints every other month; mobile prints four. */
  desktopTicks: ["Aug", "Oct", "Dec", "Feb", "Apr", "Jun", "Jul"],
  mobileTicks: ["Aug", "Nov", "Feb", "May", "Jul"],
};

export const policyDistribution = {
  title: "Policy distribution",
  segments: [
    { label: "Auto", percent: 42, tone: "blue-600" },
    { label: "Home & Property", percent: 28, tone: "blue-400" },
    { label: "Health", percent: 19, tone: "slate-400" },
    { label: "Commercial", percent: 11, tone: "slate-300" },
  ],
  totalLabel: "Total in force",
  totalValue: "12,847",
};

export const aiInsights = {
  title: "AI insights",
  badge: "3 new",
  items: [
    {
      id: "water-damage",
      body: "Water-damage claims up 34% in Portland — 12 open claims share the same storm window.",
      action: "Review",
    },
    {
      id: "renewals-unassigned",
      body: "23 renewals this week lack an agent — ~$61K premium at risk.",
      action: "Assign",
    },
    {
      id: "idle-claim",
      body: "CLM-8238 idle 6 days over threshold — escalate.",
      action: "View",
    },
  ],
  /** Mobile shows a single, longer-form insight. */
  mobile: {
    title: "AI insight",
    body: "Water-damage claims are up 34% in the Portland region — 12 open claims share the same storm window.",
    action: "Review cluster",
  },
};

export const recentClaims = {
  title: "Recent claims",
  viewAllLabel: "View all",
  footerLeft: "Showing 5 of 342 this month",
  footerRight: "Claims trend",
  footerRightValue: "+12 MTD",
  rows: [
    {
      id: "CLM-8241",
      customer: "Marcus Johnson",
      initials: "MJ",
      avatarTone: "amber" as const,
      type: "Auto · Collision",
      amount: "$8,420",
      status: "under-review" as ClaimStatus,
    },
    {
      id: "CLM-8240",
      customer: "Lena Park",
      initials: "LP",
      avatarTone: "blue" as const,
      type: "Home · Water damage",
      amount: "$14,900",
      status: "approved" as ClaimStatus,
    },
    {
      id: "CLM-8239",
      customer: "Aisha Bello",
      initials: "AB",
      avatarTone: "slate" as const,
      type: "Health · Outpatient",
      amount: "$1,260",
      status: "docs-requested" as ClaimStatus,
    },
    {
      id: "CLM-8238",
      customer: "Robert Whitfield",
      initials: "RW",
      avatarTone: "slate" as const,
      type: "Commercial · Liability",
      amount: "$42,000",
      status: "escalated" as ClaimStatus,
    },
    {
      id: "CLM-8237",
      customer: "Elaine Cho",
      initials: "EC",
      avatarTone: "blue" as const,
      type: "Auto · Windshield",
      amount: "$640",
      status: "new" as ClaimStatus,
    },
  ],
};

/** The mobile frame lists three of the five claims. */
export const mobileClaimIds = ["CLM-8241", "CLM-8240", "CLM-8238"];

export const statusLabels: Record<ClaimStatus, string> = {
  "under-review": "Under review",
  approved: "Approved",
  "docs-requested": "Docs requested",
  escalated: "Escalated",
  new: "New",
};

export const upcomingRenewals = {
  title: "Upcoming renewals",
  allLabel: "All",
  items: [
    {
      id: "hartwell",
      month: "JUL",
      day: "29",
      name: "Hartwell Logistics LLC",
      kind: "Commercial",
      amount: "$18.2K",
    },
    {
      id: "okafor",
      month: "JUL",
      day: "30",
      name: "Diane & Peter Okafor",
      kind: "Home",
      amount: "$2.1K",
    },
    {
      id: "santana",
      month: "AUG",
      day: "02",
      name: "Miguel Santana",
      kind: "Auto",
      amount: "$1.4K",
    },
  ],
};

export type Task = {
  id: string;
  label: string;
  done: boolean;
  /** Due-date chip; the mobile frame spells it out as "Due today". */
  due?: string;
  mobileDue?: string;
  /** Trimmed from the mobile frame for height. */
  desktopOnly?: boolean;
};

export const tasks: {
  title: string;
  progressLabel: string;
  items: Task[];
} = {
  title: "Tasks",
  progressLabel: "2 of 5 done",
  items: [
    {
      id: "urgent-claims",
      label: "Review 18 urgent pending claims",
      done: false,
      due: "Today",
      mobileDue: "Due today",
    },
    {
      id: "reassign-dana",
      label: "Reassign Dana's open claims (PTO)",
      done: false,
    },
    {
      id: "hartwell-coi",
      label: "Verify Hartwell COI documents",
      done: false,
      desktopOnly: true,
    },
    {
      id: "renewal-reminders",
      label: "Send renewal reminders — July batch",
      done: true,
    },
  ],
};

export const notifications = {
  title: "Notifications",
  markAllLabel: "Mark all read",
  viewAllLabel: "View all notifications",
  items: [
    {
      id: "escalated",
      icon: "shield" as const,
      tone: "amber" as NotificationTone,
      lead: "Claim escalated",
      body: " — CLM-8238 exceeded $40K threshold",
      time: "12 min ago",
      ref: "CLM-8238",
      unread: true,
    },
    {
      id: "reply",
      icon: "mail" as const,
      tone: "blue" as NotificationTone,
      lead: "Marcus Johnson",
      body: " replied — repair timeline on CLM-8241",
      time: "28 min ago",
      ref: "CLM-8241",
      unread: true,
    },
    {
      id: "payment",
      icon: "check" as const,
      tone: "green" as NotificationTone,
      lead: "Payment issued",
      body: " — $14,900 to Lena Park",
      time: "2 hrs ago",
      ref: "CLM-8240",
      unread: false,
    },
    {
      id: "renewal",
      icon: "clock" as const,
      tone: "slate" as NotificationTone,
      lead: "Renewal due Jul 29",
      body: " — Hartwell Logistics, $18.2K",
      time: "Yesterday",
      ref: "POL-20441",
      unread: false,
    },
  ],
};

export const quickActions = {
  primary: "New policy",
  secondary: "File a claim",
} as const;

export const search = {
  desktopPlaceholder: "Search…",
  mobilePlaceholder: "Search policies, claims…",
  shortcut: "⌘K",
} as const;

export const profileMenu = {
  items: [
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
    { id: "profile", label: "Profile" },
  ],
  signOutLabel: "Sign out",
} as const;
