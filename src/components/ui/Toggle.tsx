"use client";

import { cn } from "@/lib/cn";

/**
 * The pill switch used across Settings and Profile.
 *
 * Two sizes, both measured: desktop is 40x24 around a 16px knob, mobile 44x26
 * around an 18px knob. The 2px inset is the same at both, so one component with
 * a `size` covers them.
 */
export function Toggle({
  checked,
  onChange,
  label,
  size = "desktop",
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Announced to screen readers; the switch itself carries no visible text. */
  label: string;
  size?: "desktop" | "mobile";
}) {
  const mobile = size === "mobile";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex shrink-0 items-center rounded-[20px] p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        mobile ? "h-[26px] w-[44px]" : "h-6 w-10",
        checked ? "justify-end bg-blue-600" : "justify-start bg-slate-200",
      )}
    >
      <span
        className={cn(
          "block rounded-full bg-white",
          mobile ? "size-[18px]" : "size-4",
        )}
      />
    </button>
  );
}
