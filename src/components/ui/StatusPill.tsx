import { statusLabels, type ClaimStatus } from "@/lib/data";

/** Claim-status pill colours, read off the Figma frames. */
const STATUS_CLASS: Record<ClaimStatus, string> = {
  "under-review": "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-green-200 bg-green-50 text-green-700",
  "docs-requested": "border-blue-200 bg-blue-50 text-blue-600",
  escalated: "border-red-200 bg-red-50 text-red-700",
  new: "border-slate-200 bg-slate-50 text-slate-600",
};

export function StatusPill({ status }: { status: ClaimStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${STATUS_CLASS[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
