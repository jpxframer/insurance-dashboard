import { cn } from "@/lib/cn";
import type { SVGProps } from "react";

/**
 * The logomark, exported from Figma node `22777-846`. Authored at its native
 * 17.333px box and recoloured to `currentColor` — the export fills it slate-50,
 * which the tile supplies as white.
 *
 * The frame drops this 17.333px glyph into a 16px clipped box, which would
 * shave 1.33px off its right and bottom edges. It is scaled to fit instead:
 * cropping a logomark reads as a rendering bug rather than a decision.
 */
function SurebaseMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 17.3333 17.3333" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.44772 0.259095C6.28396 0.765579 5.33637 2.37574 3.4412 5.59607C1.10335 9.56861 -0.0655821 11.5548 0.00283904 13.2372C0.0488784 14.3692 0.412637 15.4313 1.01632 16.1964C1.91347 17.3333 3.76266 17.3333 7.46105 17.3333H7.66685C8.57133 17.3333 9.42722 16.7697 9.99616 15.8029C11.8695 12.6197 12.8061 11.0282 14.0162 10.7881C14.3103 10.7298 14.609 10.7298 14.9032 10.7881C15.7145 10.9491 16.403 11.7177 17.3333 13.1664C15.8451 9.32741 13.113 1.66338 9.8863 0.259095C9.09256 -0.086365 8.24146 -0.086365 7.44772 0.259095Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Surebase lockup — Figma `22777-843` (full) and `22777-850` (mark only).
 *
 * Both nodes are the same 32px tile; the full lockup adds an 8px gap and the
 * 24px wordmark. The collapsed sidebar uses the mark on its own, which is
 * exactly what `22777-850` is for.
 *
 * The tile carries the design system's "Gloss Dashboard" treatment, already in
 * `globals.css` as `.gloss-blue` from the Policies buttons.
 */
export function Logo({
  showWordmark = true,
  className,
}: {
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      {/*
        `text-white`, not `text-slate-50`: the mark sits on a blue tile in both
        themes, and dark mode inverts the slate ramp — slate-50 becomes #020617
        and the mark disappears into its own tile. White is what it actually is.
      */}
      <span className="gloss-blue grid size-8 shrink-0 place-items-center rounded-lg bg-blue-600 text-white">
        <SurebaseMark className="size-4" />
      </span>

      {showWordmark ? (
        <span className="text-[24px] leading-none font-semibold whitespace-nowrap text-slate-900">
          SureBase
        </span>
      ) : null}
    </span>
  );
}
