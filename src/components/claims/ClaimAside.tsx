import Image from "next/image";
import type { ReactNode } from "react";
import { claimDetail } from "@/lib/claims";
import { cn } from "@/lib/cn";

/**
 * The 280px right column: customer, assessor, policy and communication.
 *
 * All four share one shell — a 17px-padded card under an uppercase label — so
 * they live together rather than in four near-identical files.
 */
function AsideCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white p-[17px] shadow-[var(--shadow-card)]">
      <h2 className="text-[11.5px] font-semibold tracking-[0.69px] text-slate-400 uppercase">
        {label}
      </h2>
      {children}
    </section>
  );
}

/** Label left, value right — the row shape the customer and policy cards share. */
function DataRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[12.5px] whitespace-nowrap text-slate-400">{label}</span>
      <span
        className={cn(
          "text-right whitespace-nowrap",
          mono
            ? "tnum font-mono text-[12px] text-blue-600"
            : "text-[12.5px] font-medium text-slate-900",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function ClaimAside() {
  const { customer, assessor, policy, communication } = claimDetail;

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 lg:flex">
      <AsideCard label={customer.label}>
        <div className="flex items-center gap-2.5">
          <Image
            src={customer.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-slate-900">
              {customer.name}
            </p>
            <p className="truncate text-[11.5px] text-slate-400">
              {customer.since}
              <span className="text-blue-600">{customer.profileLink}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[7px] pt-0.5">
          {customer.rows.map((row) => (
            <DataRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>
      </AsideCard>

      <AsideCard label={assessor.label}>
        <div className="flex items-center gap-2.5">
          <Image
            src={assessor.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-slate-900">
              {assessor.name}
            </p>
            <p className="truncate text-[11.5px] text-slate-400">{assessor.region}</p>
          </div>
        </div>

        <div className="flex gap-[7px] pt-px">
          {assessor.actions.map((action) => (
            <button
              key={action}
              type="button"
              className="h-8 flex-1 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {action}
            </button>
          ))}
        </div>
      </AsideCard>

      <AsideCard label={policy.label}>
        <div className="flex flex-col gap-[7px]">
          {policy.rows.map((row) => (
            <DataRow key={row.label} label={row.label} value={row.value} mono={row.mono} />
          ))}

          <div className="flex items-start justify-between gap-3">
            <span className="text-[12.5px] text-slate-400">{policy.statusLabel}</span>
            <span className="rounded-[20px] border border-green-200 bg-green-50 px-[9px] py-0.5 text-[11.5px] font-medium text-green-700">
              {policy.statusValue}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-0.5 rounded-[9px] border border-blue-200 bg-blue-50 px-[13px] pt-3 pb-[11px]">
          <div className="flex items-start justify-between gap-3">
            <span className="text-[12.5px] text-slate-600">{policy.payout.label}</span>
            <span className="text-[12.5px] font-semibold text-slate-900">
              {policy.payout.value}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">{policy.payout.note}</p>
        </div>
      </AsideCard>

      <AsideCard label={communication.label}>
        <div className="flex flex-col gap-2">
          {communication.rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3">
              <span className="truncate text-[12.5px] font-medium text-slate-900">
                {row.label}
              </span>
              <span className="shrink-0 text-[12.5px] text-slate-400">{row.date}</span>
            </div>
          ))}

          <button
            type="button"
            className="pt-px text-left text-[12px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {communication.viewAll}
          </button>
        </div>
      </AsideCard>
    </aside>
  );
}
