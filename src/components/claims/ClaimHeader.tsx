import { CheckSmallIcon } from "@/components/icons/figma-icons";
import { claimDetail } from "@/lib/claims";
import { cn } from "@/lib/cn";

/**
 * Desktop claim header. Sits inside the detail pane rather than the shell's top
 * bar slot — the queue rail beside it starts at the top of the viewport, so
 * this page passes `topBar={null}` and owns the whole area.
 */
export function ClaimHeader() {
  const { titlePrefix, id, statusLabel, sla, meta, actions } = claimDetail;

  return (
    <header className="flex w-full flex-col gap-4 border-b border-slate-200 bg-white px-6 pt-3.5 pb-4">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <h1 className="flex items-end font-semibold whitespace-nowrap text-slate-900">
          <span className="text-[18px]">{titlePrefix}&nbsp;</span>
          <span className="tnum font-mono text-[17px]">{id}</span>
        </h1>

        <span className="flex items-center gap-[5px] rounded-[20px] border border-amber-200 bg-amber-50 px-2.5 py-1">
          <span aria-hidden className="size-[5px] rounded-full bg-amber-500" />
          <span className="text-[11.5px] font-medium whitespace-nowrap text-amber-700">
            {statusLabel}
          </span>
        </span>

        {/* The SLA chip is a 6px rounded rect, not a pill like the status. */}
        <span className="rounded-md border border-red-200 bg-red-50 px-2 py-[3px] text-[11px] font-semibold whitespace-nowrap text-red-700">
          {sla}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="h-9 rounded-[9px] border border-red-200 bg-white px-[13px] text-[13px] font-medium whitespace-nowrap text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {actions.reject}
          </button>
          <button
            type="button"
            className="h-9 rounded-[9px] border border-slate-200 bg-white px-[13px] text-[13px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {actions.requestInfo}
          </button>
          <button
            type="button"
            className="gloss-blue flex h-9 items-center gap-[7px] rounded-[9px] bg-blue-600 px-3.5 text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <CheckSmallIcon className="size-3" />
            {actions.approve}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-[22px]">
        {meta.map((item) => (
          <p key={item.label} className="text-[12.5px] whitespace-nowrap text-slate-400">
            {item.label}
            <span className="text-slate-600"> · </span>
            <span
              className={cn(
                item.strong && "font-semibold text-slate-900",
                item.mono && "tnum font-mono text-[12px] text-slate-600",
                !item.strong && !item.mono && "text-slate-600",
              )}
            >
              {item.value}
            </span>
          </p>
        ))}
      </div>
    </header>
  );
}
