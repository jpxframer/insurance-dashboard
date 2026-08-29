import Link from "next/link";
import { ArrowLeftIcon, ArrowNextIcon } from "@/components/icons/ui-icons";
import { ChevronSmallIcon, SortArrowIcon } from "@/components/icons/figma-icons";
import { CustomerAvatar, CustomerStatusPill } from "./CustomerStatusPill";
import {
  customerColumns,
  customers,
  customersFooter,
  unassignedLabel,
} from "@/lib/customers";
import type { DensityId } from "@/lib/policies";
import { cn } from "@/lib/cn";

/*
  Ten columns: a flexible customer cell, seven fixed ones, and a 16px gutter for
  the row chevron. 24px gutters, 18px side padding — all measured off the frame.
*/
const GRID =
  "grid grid-cols-[minmax(0,1.6fr)_92px_90px_56px_100px_56px_72px_92px_104px_16px] items-center gap-x-6 px-[18px]";

/** Compact is the state the frame selects; comfortable is this build's addition. */
const ROW_HEIGHT: Record<DensityId, string> = {
  compact: "h-12",
  comfortable: "h-14",
};

export function CustomersTable({ density }: { density: DensityId }) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
      <div role="table" aria-label="Customers" className="flex min-h-0 flex-1 flex-col">
        <div
          role="row"
          className={cn(GRID, "h-[33px] shrink-0 border-b border-slate-200 bg-slate-50")}
        >
          {customerColumns.map((column) => (
            <div
              key={column.id}
              role="columnheader"
              className="flex items-center gap-[5px] text-[11px] font-semibold tracking-[0.44px] text-slate-400 uppercase"
            >
              {column.label}
              {column.sorted ? <SortArrowIcon className="size-2.5" /> : null}
            </div>
          ))}
          <span />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {customers.map((customer) => (
            <Link
              key={customer.id}
              href={`/customers/${customer.id.toLowerCase()}`}
              role="row"
              className={cn(
                GRID,
                ROW_HEIGHT[density],
                "group border-b border-slate-100 hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
              )}
            >
              <span role="cell" className="flex min-w-0 items-center gap-[9px]">
                <CustomerAvatar initials={customer.initials} tone={customer.tone} />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[13px] font-medium text-slate-900">
                    {customer.name}
                  </span>
                  <span className="truncate text-[11px] text-slate-400">
                    {customer.email}
                  </span>
                </span>
              </span>

              <span role="cell" className="tnum truncate font-mono text-[12px] text-slate-600">
                {customer.id}
              </span>
              <span role="cell" className="truncate text-[13px] text-slate-600">
                {customer.segment}
              </span>
              <span
                role="cell"
                className="tnum text-center text-[13px] font-medium text-slate-900"
              >
                {customer.policies}
              </span>
              <span
                role="cell"
                className="tnum text-right text-[13px] font-medium text-slate-900"
              >
                {customer.premium ?? "—"}
              </span>
              <span
                role="cell"
                className={cn(
                  "tnum text-center text-[13px] font-medium",
                  customer.claims > 0 ? "text-amber-700" : "text-slate-600",
                )}
              >
                {customer.claims}
              </span>
              <span role="cell" className="truncate text-[13px] text-slate-600">
                {customer.since}
              </span>
              <span
                role="cell"
                className={cn(
                  "truncate text-[13px]",
                  customer.agent ? "text-slate-600" : "text-slate-400",
                )}
              >
                {customer.agent ?? unassignedLabel}
              </span>
              <span role="cell">
                <CustomerStatusPill status={customer.status} />
              </span>

              {/*
                The frame draws this chevron on one row only, which reads as a
                hover affordance — so it is one here.
              */}
              <ChevronSmallIcon className="size-[11px] -rotate-90 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-[18px] pt-[11px] pb-2.5">
        <p className="text-[12px] text-slate-400">{customersFooter.showing}</p>

        <div className="flex items-center gap-3.5">
          <p className="text-[12px] text-slate-400">
            {customersFooter.rowsPerPage}{" "}
            <span className="font-medium text-slate-900">
              {customersFooter.rowsPerPageValue} ▾
            </span>
          </p>

          <nav aria-label="Pagination" className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              className="rounded-[7px] border border-slate-200 px-2.5 py-1.5 text-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <ArrowLeftIcon className="size-[13px]" />
            </button>

            {customersFooter.pages.map((page, index) =>
              page === "…" ? (
                <span key={`gap-${index}`} className="text-[12px] font-medium text-slate-400">
                  {page}
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  aria-current={page === customersFooter.currentPage ? "page" : undefined}
                  className={cn(
                    "tnum rounded-[7px] px-2.5 py-[5px] text-[12px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                    page === customersFooter.currentPage
                      ? "gloss-blue bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-50",
                  )}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              className="rounded-[7px] border border-slate-200 px-2.5 py-1.5 text-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <ArrowNextIcon className="size-[13px]" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
