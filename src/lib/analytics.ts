/**
 * Mock content for the Analytics screen.
 *
 * Transcribed from Figma `20875-33493` (desktop) and `20875-33812` (mobile).
 * Same contract as `./data.ts`.
 */

export type BarTone = "blue" | "blue-light" | "slate" | "amber" | "slate-light";

/** Bar fills, straight off the frame. */
export const barToneClass: Record<BarTone, string> = {
  blue: "bg-blue-600",
  "blue-light": "bg-blue-400",
  slate: "bg-slate-400",
  amber: "bg-amber-500",
  "slate-light": "bg-slate-300",
};

export const analyticsPage = {
  title: "Analytics",
  updated: "Updated 4 min ago",
  export: "Export",
  ranges: [
    { id: "30d", label: "30d" },
    { id: "quarter", label: "Quarter" },
    { id: "ytd", label: "YTD" },
    { id: "12m", label: "12m" },
  ],
  defaultRange: "quarter",
} as const;

export const analyticsKpis = [
  {
    id: "loss-ratio",
    label: "Loss ratio",
    value: "62.4%",
    delta: "−1.8 pts",
    tone: "green" as const,
    note: "Target < 65%",
    mobileNote: "−1.8 pts · target < 65%",
  },
  {
    id: "combined-ratio",
    label: "Combined ratio",
    value: "94.1%",
    delta: "−0.6 pts",
    tone: "green" as const,
    note: "Underwriting profitable",
    mobileNote: "−0.6 pts · profitable",
  },
  {
    id: "retention",
    label: "Retention rate",
    value: "91.2%",
    delta: "−0.4 pts",
    tone: "amber" as const,
    note: "12-month rolling",
    mobileNote: "−0.4 pts · 12-mo rolling",
  },
  {
    id: "claim-cycle",
    label: "Avg. claim cycle",
    value: "4.2 days",
    delta: "−0.8d",
    tone: "green" as const,
    note: "Submission → decision",
    mobileNote: "−0.8d · submit → decision",
  },
];

export const kpiToneClass = {
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-700",
} as const;

export const kpiMobileToneClass = {
  green: "text-green-600",
  amber: "text-amber-700",
} as const;

/*
  The chart. Both series are read off the frame's own exported paths, expressed
  in its plot units: the plot is 170 tall, 0 sits on the baseline, and the four
  gridlines land at 10 / 60 / 110 / 160. Keeping the frame's units means the
  curve is reproduced rather than re-invented, and the two series stay on the
  one shared scale the design puts them on.
*/
export const premiumChart = {
  title: "Premium earned vs. claims paid",
  mobileTitle: "Premium vs. claims paid",
  height: 170,
  gridlines: [160, 110, 60, 10],
  series: [
    {
      id: "premium",
      label: "Premium",
      className: "text-blue-600",
      points: [50.9, 56.8, 52.9, 66.6, 62.7, 78.3, 73.4, 90.1, 85.2, 103.8, 109.6, 125.3, 135.1],
    },
    {
      id: "claims",
      label: "Claims paid",
      className: "text-slate-400",
      points: [24.8, 28.6, 22.9, 32.4, 26.7, 38.1, 30.5, 43.8, 36.2, 49.5, 43.8, 57.1, 53.3],
    },
  ],
  /** Desktop labels seven months, mobile five. */
  xLabels: ["Aug", "Oct", "Dec", "Feb", "Apr", "Jun", "Jul"],
  mobileXLabels: ["Aug", "Nov", "Feb", "May", "Jul"],
};

export const claimsByType = {
  title: "Claims by type · Q3",
  mobileTitle: "Claims by type",
  mobileBadge: "Q3",
  rows: [
    { label: "Collision", value: "128 · $1.02M", percent: 64, tone: "blue" as BarTone },
    { label: "Water damage", value: "74 · $890K", percent: 48, tone: "blue-light" as BarTone },
    { label: "Medical / outpatient", value: "96 · $410K", percent: 36, tone: "slate" as BarTone },
    { label: "Liability", value: "22 · $760K", percent: 31, tone: "amber" as BarTone },
    { label: "Glass & other", value: "64 · $96K", percent: 18, tone: "slate-light" as BarTone },
  ],
  totalLabel: "Total paid Q3",
  totalValue: "$3.18M",
};

export const premiumByRegion = {
  title: "Premium by region",
  mobileBadge: "Annual",
  rows: [
    { label: "Portland metro", value: "$9.6M", percent: 78, tone: "blue" as BarTone },
    { label: "Seattle / Tacoma", value: "$7.4M", percent: 60, tone: "blue-light" as BarTone },
    { label: "Boise", value: "$4.1M", percent: 33, tone: "slate" as BarTone },
    { label: "Spokane & other", value: "$7.3M", percent: 59, tone: "slate-light" as BarTone },
  ],
  totalLabel: "Annual premium",
  totalValue: "$28.4M",
};

export const agentPerformance = {
  title: "Agent performance",
  note: "This quarter",
  columns: [
    { id: "agent", label: "Agent" },
    { id: "policies", label: "Policies", width: "w-[90px]" },
    { id: "premium", label: "Premium", width: "w-[100px]" },
    { id: "retention", label: "Retention", width: "w-[90px]" },
    { id: "cycle", label: "Avg. cycle", width: "w-[110px]" },
  ],
  rows: [
    {
      initials: "PN",
      tone: "slate" as const,
      name: "Priya Nair",
      policies: "214",
      premium: "$1.42M",
      retention: "94%",
      retentionTone: "green" as const,
      cycle: "3.1 days",
      mobileSummary: "214 policies · $1.42M · 3.1d cycle",
      mobilePill: "94% ret.",
    },
    {
      initials: "TR",
      tone: "slate" as const,
      name: "Tom Reyes",
      policies: "186",
      premium: "$1.18M",
      retention: "92%",
      retentionTone: "green" as const,
      cycle: "3.6 days",
      mobileSummary: "186 policies · $1.18M · 3.6d cycle",
      mobilePill: "92% ret.",
    },
    {
      initials: "DO",
      tone: "amber" as const,
      name: "Dana Ortiz",
      policies: "168",
      premium: "$940K",
      retention: "90%",
      retentionTone: "green" as const,
      cycle: "3.1 days",
      mobileSummary: "168 policies · $940K · 3.1d cycle",
      mobilePill: "90% ret.",
    },
    {
      initials: "JW",
      tone: "slate" as const,
      name: "Jonah Weiss",
      policies: "122",
      premium: "$710K",
      retention: "86%",
      retentionTone: "amber" as const,
      cycle: "4.9 days",
      mobileSummary: "122 policies · $710K · 4.9d cycle",
      mobilePill: "86% ret.",
    },
  ],
};

export const agentAvatarTone = {
  slate: "bg-slate-100 text-slate-600",
  amber: "bg-amber-100 text-amber-700",
} as const;

export const retentionToneClass = {
  green: "text-green-700",
  amber: "text-amber-700",
} as const;

export const retentionPillClass = {
  green: "border-green-200 bg-green-50 text-green-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
} as const;
