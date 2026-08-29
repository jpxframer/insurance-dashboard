import {
  FilterLinesIcon,
  PlusSmallIcon,
  SearchSmallIcon,
} from "@/components/icons/figma-icons";
import { mobileFilterChips, policiesPage } from "@/lib/policies";
import { cn } from "@/lib/cn";

const CHIP_TONE = {
  blue: "border-blue-200 bg-blue-50 font-semibold text-blue-600",
  amber: "border-amber-200 bg-amber-50 font-medium text-amber-700",
  plain: "border-slate-200 bg-white font-medium text-slate-600",
} as const;

/**
 * Mobile page header — title, primary action, search and the filter chips.
 *
 * Unlike the dashboard's mobile bar this scrolls with the page: at 183px it
 * would take a fifth of the viewport if it were pinned, and the frame places it
 * in normal flow above the list.
 */
export function PoliciesMobileHeader() {
  // pb is 13px in the frame; the border-b eats one, per the stroke-inside rule.
  return (
    <header className="leading-figma flex flex-col gap-4 border-b border-slate-200 bg-white px-4 pt-3.5 pb-3 lg:hidden">
      <div className="flex items-center gap-2.5">
        <div className="min-w-0">
          <h1 className="text-[20px] font-semibold tracking-[-0.2px] text-slate-900">
            {policiesPage.title}
          </h1>
          <p className="text-[12px] text-slate-400">{policiesPage.mobileMeta}</p>
        </div>

        <button
          type="button"
          className="gloss-blue ml-auto flex h-11 items-center gap-[7px] rounded-xl bg-blue-600 px-[15px] text-[14px] font-semibold whitespace-nowrap text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusSmallIcon className="size-[13px]" />
          {policiesPage.newPolicyShort}
        </button>
      </div>

      <label className="relative block">
        <span className="sr-only">Search policies</span>
        <SearchSmallIcon className="pointer-events-none absolute top-1/2 left-[15px] size-[15px] -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder={policiesPage.mobileSearchPlaceholder}
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-[15px] pl-10 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
        />
      </label>

      <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
        {mobileFilterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={cn(
              "flex shrink-0 items-center gap-[5px] rounded-[20px] border px-[13px] py-2 text-[12px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              CHIP_TONE[chip.tone],
            )}
          >
            {chip.id === "filters" ? <FilterLinesIcon className="size-[11px]" /> : null}
            {chip.label}
          </button>
        ))}
      </div>
    </header>
  );
}
