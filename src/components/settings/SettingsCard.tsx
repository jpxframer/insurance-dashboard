import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The panel every Settings and Profile card sits in: 21px of padding, a 14px
 * title and a 12.5px description, with the body 12px below.
 *
 * `tone="danger"` is the Danger zone's red border and heading.
 */
export function SettingsCard({
  title,
  description,
  action,
  tone = "default",
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "default" | "danger";
  children: ReactNode;
  className?: string;
}) {
  const danger = tone === "danger";

  return (
    <section
      className={cn(
        "flex flex-col rounded-[14px] border bg-white p-[20px] shadow-[var(--shadow-card)]",
        danger ? "border-red-200" : "border-slate-200",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            className={cn(
              "text-[14px] leading-[18px] font-semibold",
              danger ? "text-red-600" : "text-slate-900",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-[12.5px] leading-[16px] text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
        {action}
      </div>

      <div className={cn("flex flex-col", description ? "mt-4" : "mt-[14px]")}>
        {children}
      </div>
    </section>
  );
}

/**
 * A titled row with a control on the right — the shape the toggle, pill and
 * button rows all share. Rows after the first carry the 1px rule.
 */
export function SettingRow({
  title,
  description,
  control,
  first,
}: {
  title: string;
  description: string;
  control: ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 pt-[10px] pb-[10px]",
        first ? null : "border-t border-slate-100",
      )}
    >
      <div className="min-w-0">
        <p className="text-[13px] leading-[17px] font-medium text-slate-900">{title}</p>
        <p className="text-[12px] leading-[16px] text-slate-400">{description}</p>
      </div>
      {control}
    </div>
  );
}
