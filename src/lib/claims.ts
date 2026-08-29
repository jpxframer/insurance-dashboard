/**
 * Mock content for the Claims screen.
 *
 * Transcribed from Figma `20875-31762` (desktop) and `20875-32146` (mobile).
 * Same contract as `./data.ts` and `./policies.ts`.
 *
 * The queue reuses `ClaimStatus` from ./data.ts — the dashboard's recent-claims
 * card already defines the same five states with the same labels and colours,
 * and this screen's pills are those pills a size smaller.
 */
import type { ClaimStatus } from "./data";

export type QueueClaim = {
  id: string;
  customer: string;
  /** "Auto · Collision · $8,420" — type, subtype and amount on one line. */
  summary: string;
  /** Age, plus an SLA warning where the frame shows one. */
  age: string;
  status: ClaimStatus;
};

export const claimsQueue = {
  title: "Claims queue",
  urgentBadge: "18 urgent",
  searchPlaceholder: "Search claims…",
  filters: [
    { id: "mine", label: "My review · 12" },
    { id: "open", label: "All open" },
    { id: "flagged", label: "Flagged" },
  ],
  showMore: "Show 82 more →",
  items: [
    {
      id: "CLM-8241",
      customer: "Marcus Johnson",
      summary: "Auto · Collision · $8,420",
      age: "6 days open · SLA 1 day left",
      status: "under-review",
    },
    {
      id: "CLM-8238",
      customer: "Robert Whitfield",
      summary: "Commercial · Liability · $42,000",
      age: "9 days open",
      status: "escalated",
    },
    {
      id: "CLM-8236",
      customer: "Aisha Bello",
      summary: "Health · Outpatient · $1,260",
      age: "7 days open",
      status: "docs-requested",
    },
    {
      id: "CLM-8233",
      customer: "Lena Park",
      summary: "Home · Water damage · $6,200",
      age: "5 days open",
      status: "under-review",
    },
    {
      id: "CLM-8230",
      customer: "Elaine Cho",
      summary: "Auto · Windshield · $640",
      age: "2 days open",
      status: "new",
    },
  ] satisfies QueueClaim[],
};

export type TimelineStep = {
  title: string;
  /** Desktop: sits inline after the title. */
  time: string;
  /** Desktop only — the mobile frame drops the body line. */
  body: string;
  /** Rendered bold at the end of the body, where the frame emphasises a figure. */
  bodyStrong?: string;
  /** Mobile restates the last step from the reviewer's point of view. */
  mobileTitle?: string;
  /** Mobile folds the body's key figure into the meta line instead. */
  mobileMeta: string;
  current?: boolean;
};

export type ClaimDocument = {
  kind: "ZIP" | "PDF";
  name: string;
  /** Desktop shows status and size on one muted line. */
  meta: string;
  /** Mobile splits them: page/photo count and size here, status into a pill. */
  mobileMeta: string;
  state: "verified" | "in-review";
};

export const documentStateLabels: Record<ClaimDocument["state"], string> = {
  verified: "Verified",
  "in-review": "In review",
};

export const claimDetail = {
  id: "CLM-8241",
  titlePrefix: "Claim",
  status: "under-review" as ClaimStatus,
  statusLabel: "Under review",
  sla: "SLA: 1 day left",
  slaShort: "SLA: 1 day",

  /** Desktop meta strip: label · value pairs under the title. */
  meta: [
    { label: "Type", value: "Auto — Collision" },
    { label: "Claimed", value: "$8,420", strong: true },
    { label: "Policy", value: "POL-20988", mono: true },
    { label: "Filed", value: "Jul 21" },
    { label: "Incident", value: "Jul 19 — I-84 W, Portland OR" },
  ],

  /** Mobile replaces that strip with a 2 x 3 grid. */
  mobileSummary: [
    { label: "Type", value: "Auto — Collision" },
    { label: "Amount claimed", value: "$8,420", strong: true },
    { label: "Customer", value: "Marcus Johnson" },
    { label: "Policy", value: "POL-20988", mono: true },
    { label: "Filed", value: "Jul 21, 2026" },
    { label: "Assessor", value: "Dana Ortiz" },
  ],

  actions: {
    reject: "Reject",
    requestInfo: "Request information",
    requestInfoShort: "Request info",
    approve: "Approve claim",
    approveMobile: "Approve claim · $7,920",
  },

  timeline: {
    title: "Claim timeline",
    mobileTitle: "Timeline",
    steps: [
      {
        title: "Claim submitted",
        time: "Jul 21 · 9:14 AM",
        body: "Filed via portal with 4 photos of vehicle damage.",
        mobileMeta: "Jul 21 · 9:14 AM",
      },
      {
        title: "Assessor assigned",
        time: "Jul 21 · 11:02 AM",
        body: "Auto-routed to Dana Ortiz (Auto — Pacific NW).",
        mobileMeta: "Jul 21 · 11:02 AM",
      },
      {
        title: "Report & estimate received",
        time: "Jul 23 · 3:40 PM",
        body: "Rose City Auto Body estimate: $8,420 (parts + labor).",
        mobileMeta: "Jul 23 · 3:40 PM · $8,420 estimate",
      },
      {
        title: "Awaiting reviewer decision",
        mobileTitle: "Awaiting your decision",
        time: "Current step · You",
        body: "Coverage verified · deductible $500 · payout if approved: ",
        bodyStrong: "$7,920",
        mobileMeta: "Current step",
        current: true,
      },
    ] satisfies TimelineStep[],
  },

  documents: {
    title: "Supporting documents",
    mobileTitle: "Documents",
    uploadLabel: "Upload",
    items: [
      {
        kind: "ZIP",
        name: "damage-photos.zip",
        meta: "Verified · 18.2 MB",
        mobileMeta: "4 photos · 18.2 MB",
        state: "verified",
      },
      {
        kind: "PDF",
        name: "police-report.pdf",
        meta: "Verified · 1.1 MB",
        mobileMeta: "2 pages · 1.1 MB",
        state: "verified",
      },
      {
        kind: "PDF",
        name: "repair-estimate.pdf",
        meta: "In review · 840 KB",
        mobileMeta: "3 pages · 840 KB",
        state: "in-review",
      },
    ] satisfies ClaimDocument[],
  },

  notes: {
    title: "Internal notes",
    badge: "TEAM ONLY",
    composerPlaceholder: "Add a note…",
    /** The current user's initials on the composer bubble. */
    composerInitials: "SK",
    items: [
      {
        author: "Dana Ortiz",
        avatar: "/brand/assessor.png",
        date: "Jul 23",
        body:
          "Estimate in line with regional averages. Other driver cited. Recommend approval at $7,920 after deductible.",
        /** The mobile frame drops the middle sentence to keep the note three lines. */
        mobileBody:
          "Estimate in line with regional averages. Recommend approval at $7,920 after deductible.",
      },
    ],
  },

  customer: {
    label: "Customer",
    name: "Marcus Johnson",
    avatar: "/brand/customer.png",
    since: "Since 2021 · ",
    profileLink: "View profile",
    rows: [
      { label: "Phone", value: "(503) 555-0184" },
      { label: "Location", value: "Portland, OR" },
      { label: "Open claims", value: "1 of 2 lifetime" },
    ],
  },

  assessor: {
    label: "Assessor",
    name: "Dana Ortiz",
    avatar: "/brand/assessor.png",
    region: "Auto · Pacific NW",
    actions: ["Message", "Reassign"],
  },

  policy: {
    label: "Policy",
    rows: [
      { label: "Policy", value: "POL-20988", mono: true },
      { label: "Coverage", value: "Liability $100/300" },
      { label: "Deductible", value: "$500" },
    ],
    statusLabel: "Status",
    statusValue: "Active",
    payout: {
      label: "Payout if approved",
      value: "$7,920",
      note: "$8,420 − $500 deductible",
    },
  },

  communication: {
    label: "Communication",
    rows: [
      { label: "Email · Estimate received", date: "Jul 23" },
      { label: "SMS · Upload confirmation", date: "Jul 22" },
      { label: "Call · Intake, 12 min", date: "Jul 21" },
    ],
    viewAll: "View all →",
  },
};
