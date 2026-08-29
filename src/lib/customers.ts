/**
 * Mock content for the Customers screens.
 *
 * Transcribed from four Figma frames — list `20875-32342` / `20875-33178` and
 * detail `20875-32812` / `20875-33328`. Same contract as `./data.ts`.
 *
 * Customer status is its own set: `at-risk` and `inactive` have no equivalent
 * in `ClaimStatus`, so these do not reuse the claims pill.
 */
import type { SparkTone } from "@/components/ui/Sparkline";

export type CustomerStatus =
  | "active"
  | "renewal-due"
  | "new"
  | "at-risk"
  | "inactive";

export const customerStatusLabels: Record<CustomerStatus, string> = {
  active: "Active",
  "renewal-due": "Renewal due",
  new: "New",
  "at-risk": "At risk",
  inactive: "Inactive",
};

/** Avatar chip tones, read per row off the desktop frame. */
export type AvatarTone = "amber" | "blue" | "slate";

export const avatarToneClass: Record<AvatarTone, string> = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-600",
  slate: "bg-slate-100 text-slate-600",
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  initials: string;
  tone: AvatarTone;
  segment: string;
  policies: number;
  /** `null` is the em dash the inactive row shows. */
  premium: string | null;
  claims: number;
  since: string;
  /** `null` renders "Unassigned" muted. */
  agent: string | null;
  status: CustomerStatus;
  /** Mobile replaces segment/agent with "Individual · Portland, OR". */
  location: string;
};

export const customersPage = {
  title: "Customers",
  meta: "6,318 total · $28.4M annual premium",
  mobileMeta: "6,318 total",
  searchPlaceholder: "Search name, email or ID…",
  searchShortcut: "⌘K",
  export: "Export",
  newCustomer: "New customer",
  newCustomerShort: "New",
} as const;

/** The four tiles above the table, each with its sparkline series. */
export const customerStats = [
  {
    id: "total",
    label: "Total customers",
    value: "6,318",
    badge: "+124 MTD",
    badgeTone: "green" as const,
    tone: "blue" as SparkTone,
    points: [18, 20, 19, 23, 22, 26, 25, 29, 31, 34],
  },
  {
    id: "high-value",
    label: "High value",
    value: "412",
    badge: "$14.2M",
    badgeTone: "slate" as const,
    tone: "slate" as SparkTone,
    points: [12, 13, 13, 15, 16, 16, 18, 19, 21, 22],
  },
  {
    id: "at-risk",
    label: "At risk",
    value: "31",
    badge: "needs outreach",
    badgeTone: "amber" as const,
    tone: "amber" as SparkTone,
    points: [26, 24, 25, 22, 24, 21, 22, 20, 21, 19],
  },
  {
    id: "avg-premium",
    label: "Avg. premium",
    value: "$4,495",
    badge: "+2.1%",
    badgeTone: "green" as const,
    tone: "green" as SparkTone,
    points: [14, 15, 16, 16, 18, 19, 21, 23, 26, 29],
  },
];

/** Badge colours on the stat tiles. */
export const statBadgeClass = {
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-600",
} as const;

export const customerTabs = [
  { id: "all", label: "All customers" },
  { id: "high-value", label: "High value" },
  { id: "at-risk", label: "At risk · 31" },
  { id: "new", label: "New this month" },
];

export const customerDropdowns = [
  { id: "segment", label: "Segment" },
  { id: "policy-type", label: "Policy type" },
  { id: "agent", label: "Agent" },
];

export const customerColumns = [
  { id: "customer", label: "Customer", sorted: true },
  { id: "id", label: "ID" },
  { id: "segment", label: "Segment" },
  { id: "policies", label: "Policies" },
  { id: "premium", label: "Premium/yr" },
  { id: "claims", label: "Claims" },
  { id: "since", label: "Since" },
  { id: "agent", label: "Agent" },
  { id: "status", label: "Status" },
];

export const customers: Customer[] = [
  {
    id: "CUS-40412",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    initials: "MJ",
    tone: "amber",
    segment: "Individual",
    policies: 2,
    premium: "$2,260",
    claims: 1,
    since: "Mar 2021",
    agent: "Dana Ortiz",
    status: "active",
    location: "Individual · Portland, OR",
  },
  {
    id: "CUS-31877",
    name: "Hartwell Logistics LLC",
    email: "ops@hartwelllogistics.com",
    initials: "HL",
    tone: "blue",
    segment: "Commercial",
    policies: 3,
    premium: "$24,800",
    claims: 0,
    since: "Jan 2019",
    agent: "Priya Nair",
    status: "renewal-due",
    location: "Commercial · Tacoma, WA",
  },
  {
    id: "CUS-22940",
    name: "Diane & Peter Okafor",
    email: "okafor.family@example.com",
    initials: "DO",
    tone: "amber",
    segment: "Individual",
    policies: 2,
    premium: "$3,480",
    claims: 0,
    since: "Aug 2017",
    agent: "Tom Reyes",
    status: "renewal-due",
    location: "Individual · Salem, OR",
  },
  {
    id: "CUS-35102",
    name: "Brightleaf Dental Group",
    email: "admin@brightleafdental.com",
    initials: "BD",
    tone: "blue",
    segment: "Group",
    policies: 1,
    premium: "$9,860",
    claims: 0,
    since: "Feb 2022",
    agent: "Priya Nair",
    status: "active",
    location: "Group · Portland, OR",
  },
  {
    id: "CUS-27615",
    name: "Robert Whitfield",
    email: "r.whitfield@example.com",
    initials: "RW",
    tone: "slate",
    segment: "Commercial",
    policies: 2,
    premium: "$15,900",
    claims: 1,
    since: "Apr 2018",
    agent: "Priya Nair",
    status: "active",
    location: "Commercial · Bend, OR",
  },
  {
    id: "CUS-29384",
    name: "Lena Park",
    email: "lena.park@example.com",
    initials: "LP",
    tone: "slate",
    segment: "Individual",
    policies: 2,
    premium: "$2,940",
    claims: 0,
    since: "Oct 2020",
    agent: "Tom Reyes",
    status: "active",
    location: "Individual · Gresham, OR",
  },
  {
    id: "CUS-38820",
    name: "Miguel Santana",
    email: "m.santana@example.com",
    initials: "MS",
    tone: "blue",
    segment: "Individual",
    policies: 1,
    premium: "$1,380",
    claims: 0,
    since: "Jun 2023",
    agent: "Dana Ortiz",
    status: "active",
    location: "Individual · Hillsboro, OR",
  },
  {
    id: "CUS-41209",
    name: "Aisha Bello",
    email: "aisha.bello@example.com",
    initials: "AB",
    tone: "blue",
    segment: "Individual",
    policies: 1,
    premium: "$3,240",
    claims: 0,
    since: "Jul 2026",
    agent: null,
    status: "new",
    location: "Individual · Seattle, WA",
  },
  {
    id: "CUS-25478",
    name: "Elaine Cho",
    email: "elaine.cho@example.com",
    initials: "EC",
    tone: "amber",
    segment: "Individual",
    policies: 1,
    premium: "$1,120",
    claims: 0,
    since: "May 2019",
    agent: "Dana Ortiz",
    status: "at-risk",
    location: "Individual · Eugene, OR",
  },
  {
    id: "CUS-33056",
    name: "Nordic Vale Bakery",
    email: "hello@nordicvale.com",
    initials: "NV",
    tone: "slate",
    segment: "Commercial",
    policies: 0,
    premium: null,
    claims: 0,
    since: "Sep 2021",
    agent: "Tom Reyes",
    status: "inactive",
    location: "Commercial · Astoria, OR",
  },
];

/** The mobile frame shows five, not the table's first five. */
export const mobileCustomerIds = [
  "CUS-40412",
  "CUS-31877",
  "CUS-22940",
  "CUS-41209",
  "CUS-25478",
];

export const unassignedLabel = "Unassigned";

export const customersFooter = {
  showing: "Showing 1–10 of 6,318 customers",
  rowsPerPage: "Rows per page",
  rowsPerPageValue: "10",
  pages: ["1", "2", "3", "…", "632"],
  currentPage: "1",
} as const;

export const mobileLoadMore = "Load 10 more · 6,318 total";

/** Mobile filter chips under the search field. */
export const mobileCustomerChips = [
  { id: "filters", label: "Filters", tone: "blue" as const },
  { id: "all", label: "All", tone: "plain" as const },
  { id: "high-value", label: "High value", tone: "plain" as const },
  { id: "at-risk", label: "At risk · 31", tone: "amber" as const },
];

/* ------------------------------------------------------------------ detail */

export const customerDetail = {
  id: "CUS-40412",
  name: "Marcus Johnson",
  avatar: "/brand/customer.png",
  status: "active" as CustomerStatus,
  statusLabel: "Active",
  badge: "MULTI-LINE",
  meta: "Since Mar 2021 · Portland, OR · ",
  mobileMeta: "Since 2021 · Portland, OR · ",

  kpis: [
    { label: "Lifetime premium", value: "$11,240" },
    { label: "Active policies", value: "2", suffix: "of 3" },
    { label: "Claims", value: "1 open" },
    { label: "Next renewal", value: "Sep 12" },
  ],

  actions: { message: "Message", newPolicy: "New policy" },

  tabs: [
    { id: "overview", label: "Overview", mobileLabel: "Overview" },
    { id: "policies", label: "Policies · 3", mobileLabel: "Policies" },
    { id: "claims", label: "Claims · 2", mobileLabel: "Claims" },
    { id: "documents", label: "Documents · 6", mobileLabel: "Docs" },
    { id: "communication", label: "Communication" },
    { id: "notes", label: "Notes · 2" },
  ],

  contact: {
    label: "Contact details",
    mobileLabel: "Contact",
    action: "Edit",
    rows: [
      { label: "Phone", value: "(503) 555-0184" },
      { label: "Email", value: "marcus.j@gmail.com", mobileValue: "marcus.j@example.com" },
      { label: "Address", value: "2418 SE Ankeny St", value2: "Portland, OR 97214" },
      { label: "Preferred", value: "Email", mobileHidden: true },
      { label: "Manager", value: "Tom Reyes", desktopHidden: true },
    ],
  },

  manager: {
    label: "Relationship manager",
    initials: "TR",
    name: "Tom Reyes",
    role: "Senior agent · Portland",
    touchpointLabel: "Last touchpoint",
    touchpointValue: "Jul 23 · claim email",
  },

  notes: {
    label: "Notes",
    action: "Add",
    items: [
      {
        body: "Prefers email. Asked about bundling discount at Oct home renewal.",
        meta: "Tom Reyes · Jun 30",
      },
      {
        body: "Subrogation follow-up pending on CLM-8241 (Meridian Mutual).",
        meta: "Sarah Kim · Jul 24",
      },
    ],
  },

  policies: {
    title: "Policies",
    action: "Open in Policies →",
    mobileAction: "All",
    columns: ["Policy", "Type", "Coverage", "Premium", "Renewal", "Status"],
    rows: [
      {
        id: "POL-20988",
        type: "Auto · Subaru Outback",
        coverage: "Liability $100/300",
        premium: "$940",
        renewal: "Sep 12",
        status: "Active",
        tone: "green" as const,
        mobileMeta: " · renews Sep 12",
      },
      {
        id: "POL-22104",
        type: "Home · SE Ankeny St",
        coverage: "Dwelling · $520K",
        premium: "$1,980",
        renewal: "Oct 20",
        status: "Active",
        tone: "green" as const,
        mobileMeta: " · renews Oct 20",
      },
      {
        id: "POL-16650",
        type: "Auto · Honda Civic",
        coverage: "Liability $50/100",
        premium: "$720",
        renewal: "—",
        status: "Expired",
        tone: "slate" as const,
        mobileMeta: " · expired 2023",
        expired: true,
      },
    ],
  },

  claims: {
    title: "Claims history",
    mobileTitle: "Claims",
    action: "Open in Claims →",
    mobileAction: "All",
    columns: ["Claim", "Description", "Amount", "Assessor", "Status"],
    rows: [
      {
        id: "CLM-8241",
        description: "Auto collision · I-84 W",
        amount: "$8,420",
        assessor: "Dana Ortiz",
        status: "Under review",
        tone: "amber" as const,
        highlighted: true,
      },
      {
        id: "CLM-5106",
        description: "Auto glass · windshield chip",
        mobileDescription: "Auto glass · windshield",
        amount: "$380",
        assessor: "Dana Ortiz",
        status: "Paid · 2024",
        tone: "green" as const,
      },
    ],
  },

  /*
    Each line is a sequence of runs, because the frame does not order them the
    same way twice: one reads "Claim <mono> moved to <strong>", the next
    "Uploaded <strong> via portal".
  */
  activity: {
    title: "Activity timeline",
    items: [
      {
        parts: [
          { text: "Claim " },
          { text: "CLM-8241", mono: true },
          { text: " moved to " },
          { text: "Under review", strong: true },
        ],
        meta: "Jul 23 · Dana Ortiz",
        dot: "amber" as const,
      },
      {
        parts: [
          { text: "Uploaded " },
          { text: "police report", strong: true },
          { text: " via portal" },
        ],
        meta: "Jul 22 · Marcus Johnson",
        dot: "blue" as const,
      },
      {
        parts: [
          { text: "Filed claim " },
          { text: "CLM-8241", mono: true },
          { text: " — auto collision" },
        ],
        meta: "Jul 21 · Marcus Johnson",
        dot: "slate" as const,
      },
      {
        parts: [{ text: "Auto policy renewed — $940/yr" }],
        meta: "Sep 12, 2025 · System",
        dot: "green" as const,
      },
    ],
  },

  communication: {
    title: "Communication",
    action: "Compose",
    viewAll: "View all →",
    items: [
      { kind: "email" as const, label: "Estimate received — next steps", date: "Jul 23" },
      { kind: "sms" as const, label: "SMS · Upload confirmation", date: "Jul 22" },
      { kind: "call" as const, label: "Call · Claim intake, 12 min", date: "Jul 21" },
    ],
  },
};

/** Timeline dot colours on the activity feed. */
export const activityDotClass = {
  amber: "bg-amber-500",
  blue: "bg-blue-600",
  slate: "bg-slate-400",
  green: "bg-green-600",
} as const;

/** Pill colours shared by the detail's policy and claim rows. */
export const recordToneClass = {
  green: "border-green-200 bg-green-50 text-green-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  slate: "border-slate-100 bg-slate-100 text-slate-600",
} as const;
