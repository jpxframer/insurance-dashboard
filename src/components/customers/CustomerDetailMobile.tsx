"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { customerDetail, recordToneClass } from "@/lib/customers";
import { cn } from "@/lib/cn";

/**
 * Mobile customer header. Where desktop puts the KPIs beside the name, mobile
 * moves them into a 2x2 grid in the body and gives the actions a full row, with
 * the section tabs as a segmented control.
 *
 * The back/title/overflow row pins; the identity, actions and tabs scroll away
 * beneath it. Pinning down to the tabs would take a third of the viewport.
 */
export function CustomerDetailMobileHeader() {
  const { name, avatar, statusLabel, mobileMeta, id, actions, tabs } = customerDetail;
  const mobileTabs = tabs.filter((tab) => tab.mobileLabel);
  const [tab, setTab] = useState(mobileTabs[0].id);

  return (
    <>
      {/* pb is the frame's 16px gap; the border-b eats one. */}
      <MobileStickyBar className="leading-figma px-4 pt-3.5 pb-[15px]">
        <div className="flex items-center gap-2.5">
          <Link
            href="/customers"
            aria-label="Back to customers"
            className="grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ArrowLeftIcon className="size-[15px]" />
          </Link>

          <h1 className="text-[15px] font-semibold text-slate-900">Customer</h1>

          <button
            type="button"
            aria-label="More actions"
            className="ml-auto grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-[16px] text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            ⋯
          </button>
        </div>
      </MobileStickyBar>

      <div className="leading-figma flex flex-col gap-4 border-b border-slate-200 bg-white px-4 pb-[15px] lg:hidden">
        <div className="flex items-center gap-[13px] pt-0.5">
          <Image
            src={avatar}
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-x-[7px]">
              <span className="text-[19px] font-semibold tracking-[-0.19px] text-slate-900">
                {name}
              </span>
              <span className="flex items-center gap-1 rounded-[20px] border border-green-200 bg-green-50 px-2 py-[3px]">
                <span aria-hidden className="size-1 rounded-full bg-green-600" />
                <span className="text-[10.5px] font-medium whitespace-nowrap text-green-700">
                  {statusLabel}
                </span>
              </span>
            </div>
            <p className="truncate text-[12px] text-slate-400">
              {mobileMeta}
              <span className="tnum font-mono text-[11px]">{id}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-0.5">
          <button
            type="button"
            className="gloss-blue h-11 flex-1 rounded-xl bg-blue-600 text-[14px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {actions.message}
          </button>
          <button
            type="button"
            className="h-[46px] flex-1 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {actions.newPolicy}
          </button>
        </div>

        <div
          role="tablist"
          className="flex w-full gap-0.5 rounded-[11px] bg-slate-100 p-[3px]"
        >
          {mobileTabs.map((item) => {
            const active = item.id === tab;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex-1 rounded-[9px] py-2 text-center text-[12.5px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                  active
                    ? "bg-white font-semibold text-slate-900 shadow-[0_1px_1px_rgba(15,23,42,0.08)]"
                    : "font-medium text-slate-500",
                )}
              >
                {item.mobileLabel}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/** A record row on mobile: title, mono sub-line, then a figure or a pill. */
function MobileRecordRow({
  title,
  mono,
  monoSuffix,
  amount,
  pill,
  tone,
  muted,
  last,
}: {
  title: string;
  mono: string;
  monoSuffix: string;
  amount?: string;
  pill?: string;
  tone?: keyof typeof recordToneClass;
  muted?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[65px] w-full items-center gap-[11px] py-[15.5px]",
        !last && "border-b border-slate-100",
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "truncate text-[13.5px] font-medium",
            muted ? "text-slate-400" : "text-slate-900",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "tnum truncate font-mono text-[11.5px]",
            muted ? "text-slate-300" : "text-slate-400",
          )}
        >
          {mono}
          <span className="font-sans">{monoSuffix}</span>
        </span>
      </span>

      {amount ? (
        <span className="tnum shrink-0 text-[13px] font-semibold text-slate-900">
          {amount}
          <span className="font-normal text-slate-400">/yr</span>
        </span>
      ) : null}

      {pill && tone ? (
        <span
          className={cn(
            "shrink-0 rounded-[20px] border px-[9px] py-[3px] text-[10.5px] font-medium whitespace-nowrap",
            recordToneClass[tone],
          )}
        >
          {pill}
        </span>
      ) : null}
    </div>
  );
}

function MobileCard({
  title,
  action,
  children,
}: {
  title: string;
  action: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col rounded-[14px] border border-slate-200 bg-white px-[17px] py-[15px] shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
        <button
          type="button"
          className="text-[13px] font-medium text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {action}
        </button>
      </div>
      {children}
    </section>
  );
}

export function CustomerDetailMobileBody() {
  const { kpis, policies, claims, contact } = customerDetail;
  const contactRows = contact.rows.filter((row) => !row.mobileHidden);

  return (
    <div className="leading-figma flex flex-col gap-3 px-4 py-3.5 lg:hidden">
      <div className="grid w-full grid-cols-2 gap-2">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col gap-0.5 rounded-[14px] border border-slate-200 bg-white p-3.5 shadow-[var(--shadow-card)]"
          >
            <span className="truncate text-[11.5px] text-slate-400">{kpi.label}</span>
            <span className="text-[18px] font-semibold text-slate-900">
              {kpi.value}
              {kpi.suffix ? (
                <span className="text-[12px] font-medium text-slate-400"> {kpi.suffix}</span>
              ) : null}
            </span>
          </div>
        ))}
      </div>

      <MobileCard title={policies.title} action={policies.mobileAction}>
        {policies.rows.map((row, index) => (
          <MobileRecordRow
            key={row.id}
            title={row.type}
            mono={row.id}
            monoSuffix={row.mobileMeta}
            amount={row.expired ? undefined : row.premium}
            pill={row.expired ? row.status : undefined}
            tone={row.expired ? row.tone : undefined}
            muted={row.expired}
            last={index === policies.rows.length - 1}
          />
        ))}
      </MobileCard>

      <MobileCard title={claims.mobileTitle} action={claims.mobileAction}>
        {claims.rows.map((row, index) => (
          <MobileRecordRow
            key={row.id}
            title={row.mobileDescription ?? row.description}
            mono={row.id}
            monoSuffix={` · ${row.amount}`}
            pill={row.status}
            tone={row.tone}
            last={index === claims.rows.length - 1}
          />
        ))}
      </MobileCard>

      <section className="flex w-full flex-col gap-2 rounded-[14px] border border-slate-200 bg-white px-[17px] py-[15px] shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold text-slate-900">{contact.mobileLabel}</h2>
          <button
            type="button"
            className="text-[13px] font-medium text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {contact.action}
          </button>
        </div>

        <div className="flex flex-col gap-[9px]">
          {contactRows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3">
              <span className="text-[13px] whitespace-nowrap text-slate-400">{row.label}</span>
              <span className="text-right text-[13px] font-medium whitespace-nowrap text-slate-900">
                {row.mobileValue ?? row.value}
                {row.value2 ? (
                  <>
                    <br />
                    {row.value2}
                  </>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
