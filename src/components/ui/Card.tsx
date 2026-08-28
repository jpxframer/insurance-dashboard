import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The white rounded panel every dashboard block sits in. */
export function Card({
  children,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "aside";
}) {
  return (
    <Tag
      className={cn(
        "rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Title row shared by the larger cards — heading left, action right. */
export function CardHeader({
  title,
  meta,
  action,
  className,
}: {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-baseline gap-2">
        <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
        {meta ? <span className="text-[12px] text-slate-400">{meta}</span> : null}
      </div>
      {action}
    </div>
  );
}
