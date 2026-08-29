import { customerDetail, recordToneClass } from "@/lib/customers";
import { cn } from "@/lib/cn";

/*
  The two mini-tables on the detail. Both share a card shell — a 12/8 header
  over a 30px column strip and 36px rows — but their column templates differ,
  so each passes its own.
*/
const POLICY_GRID =
  "grid grid-cols-[96px_minmax(0,1.3fr)_minmax(0,1.1fr)_76px_82px_100px] items-center gap-x-2.5 px-4";
const CLAIM_GRID =
  "grid grid-cols-[96px_minmax(0,1.5fr)_82px_minmax(0,1fr)_116px] items-center gap-x-2.5 px-4";

function RecordCard({
  title,
  action,
  columns,
  grid,
  children,
}: {
  title: string;
  action: string;
  columns: string[];
  grid: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2">
        <h2 className="text-[14px] font-semibold text-slate-900">{title}</h2>
        <button
          type="button"
          className="text-[12px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {action}
        </button>
      </div>

      <div
        className={cn(
          grid,
          "h-[30px] border-y border-slate-200 bg-slate-50 text-[10.5px] font-semibold tracking-[0.42px] text-slate-400 uppercase",
        )}
      >
        {columns.map((column) => (
          <span
            key={column}
            // The money column is the only right-aligned heading in either table.
            className={column === "Premium" || column === "Amount" ? "text-right" : undefined}
          >
            {column}
          </span>
        ))}
      </div>

      {children}
    </section>
  );
}

export function CustomerPoliciesCard() {
  const { policies } = customerDetail;

  return (
    <RecordCard
      title={policies.title}
      action={policies.action}
      columns={policies.columns}
      grid={POLICY_GRID}
    >
      {policies.rows.map((row) => (
        <div key={row.id} className={cn(POLICY_GRID, "h-9 border-b border-slate-100")}>
          <span className="tnum truncate font-mono text-[12px] text-blue-600">{row.id}</span>
          <span
            className={cn(
              "truncate text-[12.5px] font-medium",
              row.expired ? "text-slate-400" : "text-slate-900",
            )}
          >
            {row.type}
          </span>
          <span className="truncate text-[12.5px] text-slate-600">{row.coverage}</span>
          <span className="tnum text-right text-[12.5px] font-medium text-slate-900">
            {row.premium}
          </span>
          <span className="truncate text-[12.5px] text-slate-600">{row.renewal}</span>
          <span>
            <span
              className={cn(
                "inline-flex items-center rounded-[20px] border px-[9px] py-[3px] text-[11px] font-medium whitespace-nowrap",
                recordToneClass[row.tone],
              )}
            >
              {row.status}
            </span>
          </span>
        </div>
      ))}
    </RecordCard>
  );
}

export function CustomerClaimsCard() {
  const { claims } = customerDetail;

  return (
    <RecordCard
      title={claims.title}
      action={claims.action}
      columns={claims.columns}
      grid={CLAIM_GRID}
    >
      {claims.rows.map((row) => (
        <div
          key={row.id}
          className={cn(
            CLAIM_GRID,
            "h-9 border-b border-slate-100",
            row.highlighted && "bg-blue-50",
          )}
        >
          <span className="tnum truncate font-mono text-[12px] text-blue-600">{row.id}</span>
          <span className="truncate text-[12.5px] font-medium text-slate-900">
            {row.description}
          </span>
          <span className="tnum text-right text-[12.5px] font-medium text-slate-900">
            {row.amount}
          </span>
          <span className="truncate text-[12.5px] text-slate-600">{row.assessor}</span>
          <span>
            <span
              className={cn(
                "inline-flex items-center rounded-[20px] border px-[9px] py-[3px] text-[11px] font-medium whitespace-nowrap",
                recordToneClass[row.tone],
              )}
            >
              {row.status}
            </span>
          </span>
        </div>
      ))}
    </RecordCard>
  );
}
