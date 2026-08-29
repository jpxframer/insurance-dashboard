import { policyStatusLabels, type PolicyStatus } from "@/lib/policies";
import { cn } from "@/lib/cn";

/*
  Policy-status pills, read off both frames. Four are bordered at 9/3 padding;
  Lapsed alone is a borderless slate chip at 8/2, which is why the padding sits
  in the map rather than on the shared class.
*/
const STATUS_CLASS: Record<PolicyStatus, string> = {
  "renewal-due": "border border-amber-200 bg-amber-50 px-[9px] py-[3px] text-amber-700",
  active: "border border-green-200 bg-green-50 px-[9px] py-[3px] text-green-700",
  pending: "border border-blue-200 bg-blue-50 px-[9px] py-[3px] text-blue-600",
  lapsed: "bg-slate-100 px-2 py-0.5 text-slate-600",
  cancelled: "border border-red-200 bg-red-50 px-[9px] py-[3px] text-red-700",
};

export function PolicyStatusPill({
  status,
  className,
  size = "desktop",
}: {
  status: PolicyStatus;
  className?: string;
  /** The mobile cards set the same pills a half-point smaller. */
  size?: "desktop" | "mobile";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[20px] font-medium whitespace-nowrap",
        size === "mobile" ? "text-[10.5px]" : "text-[11px]",
        STATUS_CLASS[status],
        className,
      )}
    >
      {policyStatusLabels[status]}
    </span>
  );
}
