import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import { claimDetail } from "@/lib/claims";

/**
 * Mobile claim header: back, title with its two chips, and an overflow button.
 *
 * The frame gives no destination for the back arrow — there is no mobile claims
 * queue in the design — so it returns to the dashboard. See the deviation note
 * in AGENTS.md.
 */
export function ClaimMobileHeader() {
  const { titlePrefix, id, statusLabel, slaShort } = claimDetail;

  return (
    <header className="leading-figma flex flex-col border-b border-slate-200 bg-white px-4 pt-3.5 pb-[15px] lg:hidden">
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          aria-label="Back"
          className="grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ArrowLeftIcon className="size-[15px]" />
        </Link>

        <div className="flex min-w-0 flex-col gap-[3px]">
          <h1 className="flex items-end font-semibold whitespace-nowrap text-slate-900">
            <span className="text-[17px]">{titlePrefix}&nbsp;</span>
            <span className="tnum font-mono text-[16px]">{id}</span>
          </h1>

          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-[5px] rounded-[20px] border border-amber-200 bg-amber-50 px-[9px] py-[3px]">
              <span aria-hidden className="size-[5px] rounded-full bg-amber-500" />
              <span className="text-[11px] font-medium whitespace-nowrap text-amber-700">
                {statusLabel}
              </span>
            </span>
            <span className="rounded-[5px] border border-red-200 bg-red-50 px-[7px] py-0.5 text-[10px] font-semibold whitespace-nowrap text-red-700">
              {slaShort}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="More actions"
          className="ml-auto grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-[16px] text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ⋯
        </button>
      </div>
    </header>
  );
}
