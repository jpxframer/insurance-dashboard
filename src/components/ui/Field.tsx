import type { ReactNode } from "react";
import { ChevronSmallIcon } from "@/components/icons/figma-icons";
import { cn } from "@/lib/cn";

/**
 * A labelled form control. The frames give every one of these the same shape:
 * a 12.5px medium label, 5px of space, then a 38px control on a 9px radius.
 *
 * Borders sit inside the frame, so the control sheds 1px of horizontal padding
 * to hold its measured 13px inset.
 */
export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex min-w-0 flex-1 flex-col gap-[5px]", className)}>
      <span className="text-[12.5px] leading-[16px] font-medium text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

const CONTROL =
  "h-[38px] w-full rounded-[9px] border border-slate-200 bg-white px-3 text-[13.5px] text-slate-900 focus:border-blue-600 focus:outline-none";

/** The read-only variant drops the fixed height so its value can wrap. */

/**
 * Free-text control.
 *
 * `readOnly` renders the frame's disabled Role field, which is **not** an
 * input: its value wraps to two 18px lines inside the same 38px box, and an
 * input would truncate it instead. Nothing can be typed there anyway — the
 * owner manages the role — so a wrapping element is the honest control.
 */
export function TextField({
  label,
  value,
  readOnly,
  className,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  className?: string;
}) {
  if (readOnly) {
    return (
      <Field label={label} className={className}>
        <span
          className={cn(
            CONTROL.replace("h-[38px]", ""),
            "flex min-h-[38px] items-center bg-slate-50 py-px leading-[18px] text-slate-400",
          )}
        >
          {value}
        </span>
      </Field>
    );
  }

  return (
    <Field label={label} className={className}>
      <input type="text" defaultValue={value} className={CONTROL} />
    </Field>
  );
}

/**
 * Picker control. The options beyond the drawn one are not in any frame, so
 * this renders the selected value with its chevron and does not open — see the
 * deviation note in AGENTS.md.
 */
export function SelectField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <Field label={label} className={className}>
      <span className={cn(CONTROL, "flex items-center justify-between gap-2")}>
        <span className="truncate">{value}</span>
        <ChevronSmallIcon className="size-[11px] shrink-0 text-slate-400" />
      </span>
    </Field>
  );
}
