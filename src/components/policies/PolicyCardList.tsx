import { PolicyStatusPill } from "./PolicyStatusPill";
import { mobileLoadMore, mobilePolicyIds, policies, type Policy } from "@/lib/policies";
import { cn } from "@/lib/cn";

function PolicyCard({ policy }: { policy: Policy }) {
  const renewalDue = policy.status === "renewal-due";

  return (
    <article className="flex flex-col gap-[3px] rounded-[14px] border border-slate-200 bg-white p-[15px] shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="truncate text-[14.5px] font-semibold text-slate-900">
          {policy.customer}
        </h2>
        <PolicyStatusPill status={policy.status} size="mobile" className="shrink-0" />
      </div>

      <p className="pb-1.5 text-[12.5px] text-slate-600">
        {policy.type} · {policy.coverage}
      </p>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        <span className="tnum font-mono text-[11.5px] text-slate-400">{policy.id}</span>

        <span
          className={cn(
            "text-[12px]",
            renewalDue
              ? "font-medium text-amber-700"
              : policy.renewal
                ? "text-slate-600"
                : "text-slate-400",
          )}
        >
          {policy.renewal ? `Renews ${policy.renewal}` : "—"}
        </span>

        <span className="tnum text-[13.5px] font-semibold text-slate-900">
          {policy.premium}
          <span className="font-normal text-slate-400">/yr</span>
        </span>
      </div>
    </article>
  );
}

/**
 * Mobile list. The frame picks five policies rather than the table's first
 * five — see `mobilePolicyIds` — so the card list is driven by that order.
 */
export function PolicyCardList() {
  const shown = mobilePolicyIds
    .map((id) => policies.find((policy) => policy.id === id))
    .filter((policy): policy is Policy => policy !== undefined);

  return (
    <div className="leading-figma flex flex-col gap-2 px-4 py-3.5 lg:hidden">
      {shown.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} />
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
