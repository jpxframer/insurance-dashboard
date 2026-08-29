import { ExportIcon, PlusSmallIcon } from "@/components/icons/figma-icons";
import { policiesPage } from "@/lib/policies";

/**
 * Desktop page header, filling the shell's 57px slot.
 *
 * The frame drops the notifications bell and the search field the dashboard's
 * bar carries — see the deviation note in AGENTS.md.
 */
export function PoliciesTopBar() {
  return (
    <header className="leading-figma sticky top-0 z-30 hidden h-[57px] shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-6 lg:flex">
      <h1 className="text-[16px] font-semibold whitespace-nowrap text-slate-900">
        {policiesPage.title}
      </h1>
      <p className="truncate text-[12.5px] text-slate-400">{policiesPage.meta}</p>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 items-center gap-[7px] rounded-[9px] border border-slate-200 bg-white px-[13px] text-[13px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ExportIcon className="size-[13px]" />
          {policiesPage.export}
        </button>

        <button
          type="button"
          className="gloss-blue flex h-9 items-center gap-[7px] rounded-[9px] bg-blue-600 px-[13px] text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusSmallIcon className="size-3" />
          {policiesPage.newPolicy}
        </button>
      </div>
    </header>
  );
}
