import { ArrowLeftIcon, ArrowNextIcon } from "@/components/icons/ui-icons";
import { CheckSmallIcon, SortArrowIcon } from "@/components/icons/figma-icons";
import { PolicyStatusPill } from "./PolicyStatusPill";
import {
  policies,
  tableColumns,
  tableFooter,
  unassignedLabel,
  type DensityId,
} from "@/lib/policies";
import { cn } from "@/lib/cn";

/*
  Nine columns, measured off the frame: a checkbox gutter, four fixed text
  columns and three that share the remainder at 1.5 : 1.2 : 1. Header and body
  rows use the same template so the gutters line up.

  Premium is authored `text-right` in Figma but sits in a shrink-wrapped box, so
  it renders left-aligned — which is what the frame shows, and what is built.
*/
const GRID =
  "grid grid-cols-[40px_104px_minmax(0,1.5fr)_104px_minmax(0,1.2fr)_88px_92px_minmax(0,1fr)_116px] items-center gap-x-2.5 px-[18px]";

/** Compact is the state the frame selects; comfortable is this build's addition. */
const ROW_HEIGHT: Record<DensityId, string> = {
  compact: "h-9",
  comfortable: "h-11",
};

function Checkbox({
  checked,
  indeterminate,
  label,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "grid size-[17px] place-items-center rounded-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
        indeterminate
          ? "border border-slate-300 bg-blue-50"
          : checked
            ? "gloss-blue bg-blue-600"
            : "border border-slate-300 bg-white hover:border-slate-400",
      )}
    >
      {indeterminate ? (
        <span className="h-[1.5px] w-[7px] rounded-full bg-blue-600" />
      ) : checked ? (
        <CheckSmallIcon className="size-2 text-white" />
      ) : null}
    </button>
  );
}

export function PoliciesTable({
  density,
  selected,
  onToggle,
  onToggleAll,
}: {
  density: DensityId;
  selected: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}) {
  const allSelected = selected.size === policies.length;
  const someSelected = selected.size > 0 && !allSelected;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
      <div
        role="table"
        aria-label="Policies"
        aria-rowcount={policies.length}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div
          role="row"
          className={cn(GRID, "h-9 shrink-0 border-b border-slate-200 bg-slate-50")}
        >
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            label="Select all policies"
            onChange={onToggleAll}
          />

          {tableColumns.map((column) => (
            <div
              key={column.id}
              role="columnheader"
              className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.44px] text-slate-400 uppercase"
            >
              {column.label}
              {"sorted" in column && column.sorted ? (
                <SortArrowIcon className="size-[9px]" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {policies.map((policy) => {
            const isSelected = selected.has(policy.id);

            return (
              <div
                key={policy.id}
                role="row"
                aria-selected={isSelected}
                className={cn(
                  GRID,
                  ROW_HEIGHT[density],
                  "border-b border-slate-100",
                  isSelected ? "bg-blue-50" : "hover:bg-slate-50",
                )}
              >
                <Checkbox
                  checked={isSelected}
                  label={`Select ${policy.id}`}
                  onChange={() => onToggle(policy.id)}
                />

                <div role="cell" className="tnum truncate font-mono text-[12px] text-slate-600">
                  {policy.id}
                </div>
                <div role="cell" className="truncate text-[13px] font-medium text-slate-900">
                  {policy.customer}
                </div>
                <div role="cell" className="truncate text-[13px] text-slate-600">
                  {policy.type}
                </div>
                <div role="cell" className="truncate text-[13px] text-slate-600">
                  {policy.coverage}
                </div>
                <div
                  role="cell"
                  className="tnum truncate text-[13px] font-medium text-slate-900"
                >
                  {policy.premium}
                </div>
                <div
                  role="cell"
                  className={cn(
                    "truncate text-[13px]",
                    policy.status === "renewal-due"
                      ? "font-medium text-amber-700"
                      : policy.renewal
                        ? "text-slate-600"
                        : "text-slate-400",
                  )}
                >
                  {policy.renewal ?? "—"}
                </div>
                <div
                  role="cell"
                  className={cn(
                    "truncate text-[13px]",
                    policy.agent ? "text-slate-600" : "text-slate-400",
                  )}
                >
                  {policy.agent ?? unassignedLabel}
                </div>
                <div role="cell">
                  <PolicyStatusPill status={policy.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-[18px] pt-[11px] pb-2.5">
        <p className="text-[12.5px] text-slate-400">
          {tableFooter.showing}
          {selected.size > 0 ? (
            <>
              {" · "}
              <span className="font-medium text-slate-600">
                {selected.size} {tableFooter.selectedSuffix}
              </span>
            </>
          ) : null}
        </p>

        <div className="flex items-center gap-3">
          <p className="text-[12.5px] text-slate-400">
            {tableFooter.rowsPerPage}{" "}
            <span className="font-medium text-slate-900">
              {tableFooter.rowsPerPageValue} ▾
            </span>
          </p>

          <nav aria-label="Pagination" className="flex items-center gap-[5px]">
            <button
              type="button"
              aria-label="Previous page"
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <ArrowLeftIcon className="size-[13px]" />
            </button>

            {tableFooter.pages.map((page, index) =>
              page === "…" ? (
                <span key={`gap-${index}`} className="text-[12.5px] font-medium text-slate-400">
                  {page}
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  aria-current={page === tableFooter.currentPage ? "page" : undefined}
                  className={cn(
                    "tnum rounded-lg px-2.5 py-[5px] text-[12.5px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                    page === tableFooter.currentPage
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
              className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <ArrowNextIcon className="size-[13px]" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
