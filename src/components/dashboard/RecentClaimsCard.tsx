import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons/ui-icons";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { mobileClaimIds, recentClaims } from "@/lib/data";
import { cn } from "@/lib/cn";

const AVATAR_CLASS = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-600",
  slate: "bg-slate-100 text-slate-600",
} as const;

/** Desktop: a five-column table with a summary footer. */
export function RecentClaimsCard() {
  return (
    <Card className="hidden flex-col lg:flex">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-900">
          {recentClaims.title}
        </h2>
        <a
          href="#"
          className="flex items-center gap-1.5 text-[12.5px] font-medium text-blue-600 hover:underline"
        >
          {recentClaims.viewAllLabel}
          <ArrowRightIcon className="size-3.5" />
        </a>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60">
              {["Claim", "Customer", "Type", "Amount", "Status"].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentClaims.rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 last:border-0">
                <td className="px-5 py-3.5 font-mono text-[12px] text-slate-500">
                  {row.id}
                </td>
                <td className="px-5 py-3.5 text-[13.5px] font-medium text-slate-900">
                  {row.customer}
                </td>
                <td className="px-5 py-3.5 text-[13.5px] text-slate-600">{row.type}</td>
                <td className="tnum px-5 py-3.5 text-[13.5px] font-medium text-slate-900">
                  {row.amount}
                </td>
                <td className="px-5 py-3.5">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-3.5">
        <span className="text-[12px] text-slate-400">{recentClaims.footerLeft}</span>
        <span className="flex items-center gap-1 text-[12px] text-slate-500">
          {recentClaims.footerRight}
          <ArrowUpRightIcon className="size-3.5 text-green-600" />
          <span className="tnum font-medium text-slate-700">
            {recentClaims.footerRightValue}
          </span>
        </span>
      </div>
    </Card>
  );
}

/** Mobile: three claims as stacked cards with an initials avatar. */
export function MobileRecentClaims() {
  const rows = recentClaims.rows.filter((row) => mobileClaimIds.includes(row.id));

  return (
    <section className="lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[16px] font-semibold text-slate-900">
          {recentClaims.title}
        </h2>
        <a href="#" className="text-[13.5px] font-medium text-blue-600">
          {recentClaims.viewAllLabel}
        </a>
      </div>

      <ul className="mt-3 flex flex-col gap-2.5">
        {rows.map((row) => (
          <li key={row.id}>
            <Card as="div" className="flex items-center gap-3 p-3.5">
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                  AVATAR_CLASS[row.avatarTone],
                )}
                aria-hidden="true"
              >
                {row.initials}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-slate-900">
                  {row.customer}
                </p>
                <p className="truncate text-[12px] text-slate-500">
                  {row.type} · {row.id}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className="tnum text-[14px] font-semibold text-slate-900">
                  {row.amount}
                </span>
                <StatusPill status={row.status} />
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
