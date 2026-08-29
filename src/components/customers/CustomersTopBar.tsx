import {
  ExportIcon,
  PlusSmallIcon,
  SearchSmallIcon,
} from "@/components/icons/figma-icons";
import { customersPage } from "@/lib/customers";

/**
 * Desktop page header in the shell's 57px slot. Unlike the Policies bar this
 * one carries the search field, so the trio is search / Export / New customer.
 */
export function CustomersTopBar() {
  return (
    <header className="leading-figma sticky top-0 z-30 hidden h-[57px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-6 lg:flex">
      <h1 className="text-[16px] font-semibold whitespace-nowrap text-slate-900">
        {customersPage.title}
      </h1>
      <p className="truncate text-[12.5px] font-medium text-slate-400">
        {customersPage.meta}
      </p>

      <div className="ml-auto flex items-center gap-2.5">
        <label className="relative block w-[304px]">
          <span className="sr-only">Search customers</span>
          <SearchSmallIcon className="pointer-events-none absolute top-1/2 left-3 size-[13px] -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder={customersPage.searchPlaceholder}
            className="h-9 w-full rounded-[9px] border border-slate-200 bg-slate-50 pr-12 pl-[31px] text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
          <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-[5px] border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10.5px] text-slate-400">
            {customersPage.searchShortcut}
          </kbd>
        </label>

        <button
          type="button"
          className="flex h-9 items-center gap-[7px] rounded-[9px] border border-slate-200 bg-white px-[13px] text-[13px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ExportIcon className="size-[13px]" />
          {customersPage.export}
        </button>

        <button
          type="button"
          className="gloss-blue flex h-9 items-center gap-[7px] rounded-[9px] bg-blue-600 px-[13px] text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusSmallIcon className="size-3" />
          {customersPage.newCustomer}
        </button>
      </div>
    </header>
  );
}
