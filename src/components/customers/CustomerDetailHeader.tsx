"use client";

import Image from "next/image";
import { useState } from "react";
import { customerDetail } from "@/lib/customers";
import { cn } from "@/lib/cn";

/**
 * Desktop customer header: identity on the left, four KPIs and the two actions
 * on the right, then the section tabs.
 *
 * Tabs switch their own state only — Overview is the sole designed panel.
 */
export function CustomerDetailHeader() {
  const { name, avatar, statusLabel, badge, meta, id, kpis, actions, tabs } = customerDetail;
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <header className="leading-figma hidden w-full flex-col gap-3 border-b border-slate-200 bg-white px-6 pt-4 lg:flex">
      <div className="flex items-center gap-3.5">
        <Image
          src={avatar}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover"
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h1 className="text-[19px] font-semibold tracking-[-0.19px] text-slate-900">
              {name}
            </h1>
            <span className="flex items-center gap-[5px] rounded-[20px] border border-green-200 bg-green-50 px-[9px] py-[3px]">
              <span aria-hidden className="size-[5px] rounded-full bg-green-600" />
              <span className="text-[11.5px] font-medium whitespace-nowrap text-green-700">
                {statusLabel}
              </span>
            </span>
            <span className="rounded-[5px] bg-blue-100 px-[7px] py-0.5 text-[10.5px] font-semibold whitespace-nowrap text-blue-600">
              {badge}
            </span>
          </div>

          <p className="truncate text-[12px] text-slate-400">
            {meta}
            <span className="tnum font-mono text-[11.5px]">{id}</span>
          </p>
        </div>

        <div className="ml-auto flex items-center gap-6">
          <div className="hidden items-start gap-6 xl:flex">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="flex flex-col gap-px whitespace-nowrap">
                <span className="text-[12px] text-slate-400">{kpi.label}</span>
                <span className="text-[16px] font-semibold text-slate-900">
                  {kpi.value}
                  {kpi.suffix ? ` ${kpi.suffix}` : null}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-9 rounded-[9px] border border-slate-200 bg-white px-[13px] text-[13px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {actions.message}
            </button>
            <button
              type="button"
              className="gloss-blue h-9 rounded-[9px] bg-blue-600 px-[13px] text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {actions.newPolicy}
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full items-start gap-0.5">
        {tabs.map((item) => {
          const active = item.id === tab;

          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => setTab(item.id)}
              className={cn(
                "border-b-2 px-3 text-[13px] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                active
                  ? "border-blue-600 pt-[9px] pb-[11px] font-semibold text-blue-600"
                  : "border-transparent py-[9px] font-medium text-slate-600 hover:text-slate-900",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
