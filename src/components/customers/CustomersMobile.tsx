import Link from "next/link";
import {
  FilterLinesIcon,
  PlusSmallIcon,
  SearchSmallIcon,
} from "@/components/icons/figma-icons";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { CustomerAvatar, CustomerStatusPill } from "./CustomerStatusPill";
import {
  customers,
  customersPage,
  mobileCustomerChips,
  mobileCustomerIds,
  mobileLoadMore,
  type Customer,
} from "@/lib/customers";
import { cn } from "@/lib/cn";

const CHIP_TONE = {
  blue: "border-blue-200 bg-blue-50 font-semibold text-blue-600",
  amber: "border-amber-200 bg-amber-50 font-medium text-amber-700",
  plain: "border-slate-200 bg-white font-medium text-slate-600",
} as const;

/**
 * Mobile page header — title, New, search and the filter chips.
 *
 * The title row pins; search and chips scroll away beneath it. Siblings rather
 * than nested, so the sticky row travels the length of the page.
 */
export function CustomersMobileHeader() {
  return (
    <>
      {/* pb is 16px in the frame; the border-b eats one, per the stroke-inside rule. */}
      <MobileStickyBar className="leading-figma px-4 pt-3.5 pb-[15px]">
        <div className="flex items-center gap-2.5">
          <div className="min-w-0">
            <h1 className="text-[20px] font-semibold tracking-[-0.2px] text-slate-900">
              {customersPage.title}
            </h1>
            <p className="text-[12px] text-slate-400">{customersPage.mobileMeta}</p>
          </div>

          <button
            type="button"
            className="gloss-blue ml-auto flex h-11 items-center gap-[7px] rounded-xl bg-blue-600 px-[15px] text-[14px] font-semibold whitespace-nowrap text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusSmallIcon className="size-[13px]" />
            {customersPage.newCustomerShort}
          </button>
        </div>
      </MobileStickyBar>

      <div className="leading-figma flex flex-col gap-4 border-b border-slate-200 bg-white px-4 pb-3 lg:hidden">
        <label className="relative block">
          <span className="sr-only">Search customers</span>
          <SearchSmallIcon className="pointer-events-none absolute top-1/2 left-[15px] size-[15px] -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder={customersPage.searchPlaceholder}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-[15px] pl-10 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </label>

        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
          {mobileCustomerChips.map((chip) => (
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
      </div>
    </>
  );
}

function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <Link
      href={`/customers/${customer.id.toLowerCase()}`}
      // 15px in the frame; the border-b eats one, per the stroke-inside rule.
      className="flex flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white p-3.5 shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="flex w-full items-center gap-[11px]">
        <CustomerAvatar initials={customer.initials} tone={customer.tone} size="lg" />

        <span className="flex min-w-0 flex-1 flex-col gap-px">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[14.5px] font-semibold text-slate-900">
              {customer.name}
            </span>
            <CustomerStatusPill status={customer.status} size="mobile" />
          </span>
          <span className="truncate text-[12px] text-slate-400">{customer.location}</span>
        </span>
      </span>

      <span className="flex w-full items-center justify-between gap-2 border-t border-slate-100 pt-[11px]">
        <span className="text-[12px] text-slate-600">
          {customer.policies} {customer.policies === 1 ? "policy" : "policies"}
        </span>
        <span
          className={cn(
            "text-[12px]",
            customer.claims > 0 ? "font-medium text-amber-700" : "text-slate-600",
          )}
        >
          {customer.claims > 0
            ? `${customer.claims} open claim${customer.claims === 1 ? "" : "s"}`
            : "No open claims"}
        </span>
        <span className="tnum text-[13px] font-semibold text-slate-900">
          {customer.premium ?? "—"}
          {customer.premium ? <span className="font-normal text-slate-400">/yr</span> : null}
        </span>
      </span>
    </Link>
  );
}

/**
 * Mobile list. The frame picks five customers rather than the table's first
 * five — see `mobileCustomerIds`.
 */
export function CustomersMobileList() {
  const shown = mobileCustomerIds
    .map((id) => customers.find((customer) => customer.id === id))
    .filter((customer): customer is Customer => customer !== undefined);

  return (
    <div className="leading-figma flex flex-col gap-2 px-4 py-3.5 lg:hidden">
      {shown.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} />
      ))}

      <button
        type="button"
        className="h-12 w-full rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {mobileLoadMore}
      </button>
    </div>
  );
}
