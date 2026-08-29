"use client";

import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { SelectField, TextField } from "@/components/ui/Field";
import { Toggle } from "@/components/ui/Toggle";
import { SettingRow, SettingsCard } from "./SettingsCard";
import {
  claimsDefaultsCard,
  dangerZoneCard,
  memberToneClass,
  teamCard,
  workspaceCard,
} from "@/lib/settings";
import { cn } from "@/lib/cn";

/** Company identity — name, timezone, currency and the workspace logo. */
export function WorkspaceCard() {
  return (
    <SettingsCard title={workspaceCard.title} description={workspaceCard.description}>
      <div className="flex flex-col gap-3">
        <TextField label={workspaceCard.companyNameLabel} value={workspaceCard.companyName} />

        <div className="flex gap-3">
          <SelectField label={workspaceCard.timezoneLabel} value={workspaceCard.timezone} />
          <SelectField label={workspaceCard.currencyLabel} value={workspaceCard.currency} />
        </div>

        <div className="flex flex-col gap-[5px]">
          <span className="text-[12.5px] leading-[16px] font-medium text-slate-600">
            {workspaceCard.logoLabel}
          </span>
          <div className="flex items-center gap-3 rounded-[9px] border border-slate-200 px-[14px] py-[12px]">
            {/*
              The frame drops the pre-rename product mark in this slot as its
              sample upload. That brand is gone from the repo, so the Surebase
              mark stands in — see the deviation note in AGENTS.md.
            */}
            <Logo showWordmark={false} />
            <p className="text-[12.5px] leading-[16px] text-slate-400">
              {workspaceCard.logoHint}
              <button
                type="button"
                className="font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {workspaceCard.logoAction}
              </button>
            </p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

/** SLA targets and the three automation switches. */
export function ClaimsDefaultsCard() {
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(claimsDefaultsCard.toggles.map((t) => [t.id, t.on])),
  );

  return (
    <SettingsCard
      title={claimsDefaultsCard.title}
      description={claimsDefaultsCard.description}
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <SelectField label={claimsDefaultsCard.slaLabel} value={claimsDefaultsCard.sla} />
          <TextField
            label={claimsDefaultsCard.fastTrackLabel}
            value={claimsDefaultsCard.fastTrack}
          />
        </div>

        {claimsDefaultsCard.toggles.map((toggle) => (
          <SettingRow
            key={toggle.id}
            title={toggle.title}
            description={toggle.description}
            control={
              <Toggle
                checked={toggles[toggle.id]}
                onChange={(next) => setToggles((prev) => ({ ...prev, [toggle.id]: next }))}
                label={toggle.title}
              />
            }
          />
        ))}
      </div>
    </SettingsCard>
  );
}

/** The three visible members of eight, each with their role badge. */
export function TeamCard() {
  return (
    <SettingsCard
      title={teamCard.title}
      description={teamCard.meta}
      action={
        <button
          type="button"
          className="shrink-0 text-[12.5px] leading-[16px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {teamCard.invite}
        </button>
      }
    >
      <ul className="flex flex-col">
        {teamCard.members.map((member, index) => (
          <li
            key={member.email}
            className={cn(
              "flex items-center gap-2.5 py-2",
              index === 0 ? null : "border-t border-slate-100",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "grid size-[30px] shrink-0 place-items-center rounded-full text-[11px] font-semibold",
                memberToneClass[member.tone],
              )}
            >
              {member.initials}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] leading-[17px] font-medium text-slate-900">
                {member.name}
              </p>
              <p className="truncate text-[11.5px] leading-[15px] text-slate-400">
                {member.email}
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] leading-[14px] font-semibold text-slate-500">
              {member.role}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-2 self-start text-[12.5px] leading-[16px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {teamCard.viewAll}
      </button>
    </SettingsCard>
  );
}

/** Export and delete, behind a red border. */
export function DangerZoneCard() {
  return (
    <SettingsCard
      title={dangerZoneCard.title}
      description={dangerZoneCard.description}
      tone="danger"
    >
      <div className="flex flex-col">
        {dangerZoneCard.rows.map((row, index) => (
          <SettingRow
            key={row.id}
            title={row.title}
            description={row.description}
            first={index === 0}
            control={
              <button
                type="button"
                className={cn(
                  "h-8 shrink-0 rounded-lg border bg-white px-[12px] text-[12.5px] font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  row.destructive
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50",
                )}
              >
                {row.action}
              </button>
            }
          />
        ))}
      </div>
    </SettingsCard>
  );
}
