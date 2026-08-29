/**
 * Mock content for the Policies screen.
 *
 * Transcribed from the two Figma frames — desktop `20875-31238` and mobile
 * `20875-31629`. Same contract as `./data.ts`: every string and figure the page
 * renders lives here, so swapping in a real API never touches a component.
 */

export type PolicyStatus =
  | "renewal-due"
  | "active"
  | "pending"
  | "lapsed"
  | "cancelled";

export const policyStatusLabels: Record<PolicyStatus, string> = {
  "renewal-due": "Renewal due",
  active: "Active",
  pending: "Pending",
  lapsed: "Lapsed",
  cancelled: "Cancelled",
};

export type Policy = {
  /** Policy number. Doubles as the row key and the selection id. */
  id: string;
  customer: string;
  type: string;
  coverage: string;
  premium: string;
  /** `null` renders the em dash the lapsed and cancelled rows show. */
  renewal: string | null;
  /** `null` renders "Unassigned" in the muted tone. */
  agent: string | null;
  status: PolicyStatus;
};

export const policiesPage = {
  title: "Policies",
  /** The desktop bar carries both figures; the mobile header only the first. */
  meta: "12,847 in force · $28.4M annual premium",
  mobileMeta: "12,847 in force",
  export: "Export",
  newPolicy: "New policy",
  newPolicyShort: "New",
  searchPlaceholder: "Search name or policy number…",
  mobileSearchPlaceholder: "Search name or number…",
} as const;

/** Saved-view tabs above the table. */
export const policyTabs = [
  { id: "all", label: "All policies" },
  { id: "renewals", label: "Renewals this month", badge: "64" },
  { id: "book", label: "My book" },
  { id: "lapsed", label: "Lapsed & cancelled" },
] as const;

export const saveViewLabel = "Save view";

/**
 * The filter row. The two blue ones are applied and carry a clear affordance;
 * the rest are unset dropdowns.
 */
export const policyFilters = {
  applied: [
    { id: "status", label: "Status: Active +2" },
    { id: "type", label: "Type: Auto, Home" },
  ],
  dropdowns: [
    { id: "premium", label: "Premium" },
    { id: "renewal-date", label: "Renewal date" },
    { id: "agent", label: "Agent" },
  ],
  clearAll: "Clear all",
} as const;

export const densityOptions = [
  { id: "comfortable", label: "Comfortable" },
  { id: "compact", label: "Compact" },
] as const;

export type DensityId = (typeof densityOptions)[number]["id"];

export const columnsLabel = "Columns";

/** Actions on the blue bar that appears once rows are selected. */
export const bulkActions = {
  items: ["Assign agent", "Send renewal notice", "Export"],
  destructive: "Cancel policies",
  deselect: "Deselect ×",
} as const;

export const tableColumns = [
  { id: "policy", label: "Policy", sorted: true },
  { id: "customer", label: "Customer" },
  { id: "type", label: "Type" },
  { id: "coverage", label: "Coverage" },
  { id: "premium", label: "Premium" },
  { id: "renewal", label: "Renewal" },
  { id: "agent", label: "Agent" },
  { id: "status", label: "Status" },
] as const;

export const policies: Policy[] = [
  {
    id: "POL-20441",
    customer: "Hartwell Logistics LLC",
    type: "Commercial",
    coverage: "General liability · $2M",
    premium: "$18,200",
    renewal: "Jul 29",
    agent: "Priya Nair",
    status: "renewal-due",
  },
  {
    id: "POL-18832",
    customer: "Diane & Peter Okafor",
    type: "Home",
    coverage: "Dwelling · $640K",
    premium: "$2,140",
    renewal: "Jul 30",
    agent: "Tom Reyes",
    status: "renewal-due",
  },
  {
    id: "POL-21093",
    customer: "Miguel Santana",
    type: "Auto",
    coverage: "Full coverage · $500/500",
    premium: "$1,380",
    renewal: "Aug 02",
    agent: "Dana Ortiz",
    status: "active",
  },
  {
    id: "POL-19560",
    customer: "Brightleaf Dental Group",
    type: "Health",
    coverage: "Group plan · 24 members",
    premium: "$9,860",
    renewal: "Aug 04",
    agent: "Priya Nair",
    status: "active",
  },
  {
    id: "POL-20988",
    customer: "Marcus Johnson",
    type: "Auto",
    coverage: "Liability · $100/300",
    premium: "$940",
    renewal: "Sep 12",
    agent: "Dana Ortiz",
    status: "active",
  },
  {
    id: "POL-17204",
    customer: "Lena Park",
    type: "Home",
    coverage: "Dwelling · $480K",
    premium: "$1,860",
    renewal: "Oct 01",
    agent: "Tom Reyes",
    status: "active",
  },
  {
    id: "POL-16871",
    customer: "Aisha Bello",
    type: "Health",
    coverage: "Individual · Silver",
    premium: "$3,240",
    renewal: "Nov 15",
    agent: null,
    status: "pending",
  },
  {
    id: "POL-15420",
    customer: "Robert Whitfield",
    type: "Commercial",
    coverage: "Property · $1.2M",
    premium: "$12,600",
    renewal: "Dec 08",
    agent: "Priya Nair",
    status: "active",
  },
  {
    id: "POL-14109",
    customer: "Elaine Cho",
    type: "Auto",
    coverage: "Full coverage · $250/500",
    premium: "$1,120",
    renewal: null,
    agent: "Dana Ortiz",
    status: "lapsed",
  },
  {
    id: "POL-13757",
    customer: "Nordic Vale Bakery",
    type: "Commercial",
    coverage: "BOP · $500K",
    premium: "$4,480",
    renewal: null,
    agent: "Tom Reyes",
    status: "cancelled",
  },
];

/** The three rows the desktop frame draws checked, driving the bulk bar. */
export const initialSelection = ["POL-20441", "POL-18832", "POL-21093"];

export const unassignedLabel = "Unassigned";

/**
 * The mobile frame shows five cards, and they are not the table's first five —
 * it swaps Marcus Johnson for Elaine Cho so a lapsed policy is on screen. Same
 * arrangement as `mobileClaimIds` in ./data.ts, and the reason it is a list of
 * ids rather than a slice.
 */
export const mobilePolicyIds = [
  "POL-20441",
  "POL-18832",
  "POL-21093",
  "POL-19560",
  "POL-14109",
];

/** Filter chips under the mobile search field. */
export const mobileFilterChips = [
  { id: "filters", label: "Filters · 2", tone: "blue" as const },
  { id: "all", label: "All", tone: "plain" as const },
  { id: "renewals", label: "Renewals · 64", tone: "amber" as const },
  { id: "book", label: "My book", tone: "plain" as const },
];

export const tableFooter = {
  showing: "Showing 1–10 of 8,412 filtered",
  selectedSuffix: "selected",
  rowsPerPage: "Rows per page",
  rowsPerPageValue: "10",
  pages: ["1", "2", "3", "…", "842"],
  currentPage: "1",
} as const;

export const mobileLoadMore = "Load 10 more · 8,412 total";
