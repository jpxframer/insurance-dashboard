import {
  avatarToneClass,
  customerStatusLabels,
  type AvatarTone,
  type CustomerStatus,
} from "@/lib/customers";
import { cn } from "@/lib/cn";

/*
  Customer-status pills. `at-risk` shares amber with `renewal-due` in the frame —
  the two are distinguished by their label, not their colour.
*/
const STATUS_CLASS: Record<CustomerStatus, string> = {
  active: "border-green-200 bg-green-50 text-green-700",
  "renewal-due": "border-amber-200 bg-amber-50 text-amber-700",
  new: "border-blue-200 bg-blue-50 text-blue-600",
  "at-risk": "border-amber-200 bg-amber-50 text-amber-700",
  inactive: "border-slate-100 bg-slate-100 text-slate-600",
};

export function CustomerStatusPill({
  status,
  size = "desktop",
}: {
  status: CustomerStatus;
  /** The mobile cards draw the same pill a point smaller. */
  size?: "desktop" | "mobile";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-[20px] border font-medium whitespace-nowrap",
        size === "mobile" ? "px-[9px] py-[3px] text-[10.5px]" : "px-2.5 py-[3px] text-[11.5px]",
        STATUS_CLASS[status],
      )}
    >
      {customerStatusLabels[status]}
    </span>
  );
}

/**
 * Initials chip. 26px with 10px type on the table rows, 38px with 13px on the
 * mobile cards — the two sizes the frames use.
 */
export function CustomerAvatar({
  initials,
  tone,
  size = "sm",
}: {
  initials: string;
  tone: AvatarTone;
  size?: "sm" | "lg";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        size === "lg" ? "size-[38px] text-[13px]" : "size-[26px] text-[10px]",
        avatarToneClass[tone],
      )}
    >
      {initials}
    </span>
  );
}
