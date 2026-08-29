import { CheckSmallIcon } from "@/components/icons/figma-icons";
import { ClaimDocuments } from "./ClaimDocuments";
import { ClaimNotes } from "./ClaimNotes";
import { ClaimTimeline } from "./ClaimTimeline";
import { claimDetail } from "@/lib/claims";
import { cn } from "@/lib/cn";

/** Height of the fixed action bar, so the scrolling body can clear it. */
const ACTION_BAR_H = 145;

/**
 * Mobile claim detail. The desktop meta strip and 280px aside collapse into one
 * summary card at the top; the three action buttons move to a bar fixed above
 * the tab bar.
 */
export function ClaimMobileBody() {
  const { mobileSummary, policy, actions } = claimDetail;

  return (
    <>
      <div
        className="leading-figma flex flex-col gap-4 px-4 py-3.5 lg:hidden"
        style={{ paddingBottom: ACTION_BAR_H }}
      >
        <section className="flex w-full flex-col gap-3 rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 shadow-[var(--shadow-card)]">
          {/* Three fixed 35px rows, as the frame sets them — not content height. */}
          <div className="grid w-full grid-cols-2 grid-rows-[35px_35px_35px] gap-2.5">
            {mobileSummary.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-col gap-px self-start">
                <span className="truncate text-[12.5px] leading-4 text-slate-400">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "truncate leading-4",
                    item.mono
                      ? "tnum font-mono text-[12px] text-blue-600"
                      : item.strong
                        ? "text-[12.5px] font-semibold text-slate-900"
                        : "text-[12.5px] font-medium text-slate-900",
                  )}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex w-full items-center justify-between gap-3 rounded-[10px] border border-blue-200 bg-blue-50 px-[13px] py-[11px]">
            <span className="text-[12.5px] leading-4 text-slate-600">{policy.payout.label}</span>
            <span className="text-[15px] leading-5 font-semibold text-slate-900">
              {policy.payout.value}
            </span>
          </div>
        </section>

        <ClaimTimeline variant="mobile" />
        <ClaimDocuments variant="mobile" />
        <ClaimNotes variant="mobile" />
      </div>

      {/* Fixed above the 75px tab bar, matching the frame's stacked buttons. */}
      <div className="leading-figma fixed inset-x-0 bottom-[75px] z-30 flex flex-col gap-2 border-t border-slate-200 bg-white px-4 pt-[13px] pb-[26px] lg:hidden">
        <button
          type="button"
          className="gloss-blue flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <CheckSmallIcon className="size-3.5" />
          {actions.approveMobile}
        </button>

        <div className="flex w-full gap-2">
          <button
            type="button"
            className="h-[46px] flex-1 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {actions.requestInfoShort}
          </button>
          <button
            type="button"
            className="h-[46px] flex-1 rounded-xl border border-red-200 bg-white text-[13.5px] font-medium text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {actions.reject}
          </button>
        </div>
      </div>
    </>
  );
}
