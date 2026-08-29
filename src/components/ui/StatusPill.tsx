import { statusLabels, type ClaimStatus } from "@/lib/data";
import { cn } from "@/lib/cn";

/** Claim-status pill colours, read off the Figma frames. */
const STATUS_CLASS: Record<ClaimStatus, string> = {
  "under-review": "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-green-200 bg-green-50 text-green-700",
  "docs-requested": "border-blue-200 bg-blue-50 text-blue-600",
  escalated: "border-red-200 bg-red-50 text-red-700",
  new: "border-slate-200 bg-slate-50 text-slate-600",
};

/**
 * `sm` is the claims-queue rail, where the same pill is drawn a size smaller
 * and semibold to hold up at 10.5px.
 */
const SIZE_CLASS = {
  md: "px-2.5 py-1 text-[11.5px] font-medium",
  sm: "px-[7px] py-0.5 text-[10.5px] font-semibold",
} as const;

export function StatusPill({
  status,
  size = "md",
}: {
  status: ClaimStatus;
  size?: keyof typeof SIZE_CLASS;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border whitespace-nowrap",
        SIZE_CLASS[size],
        STATUS_CLASS[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
