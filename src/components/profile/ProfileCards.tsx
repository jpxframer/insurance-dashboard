"use client";

import { useState, type ReactNode } from "react";
import { MonitorIcon, PhoneIcon } from "@/components/icons/figma-icons";
import { SelectField, TextField } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Toggle } from "@/components/ui/Toggle";
import { SettingsCard } from "@/components/settings/SettingsCard";
import {
  activeSessions,
  personalInfo,
  profilePreferences,
  profileSecurity,
} from "@/lib/profile";
import { cn } from "@/lib/cn";

type Variant = "desktop" | "mobile";

/**
 * A row with its title and description on the left and a control on the right.
 *
 * On mobile a segmented control drops below the label instead: three segments
 * beside a label does not fit 370px.
 */
function PrefRow({
  title,
  description,
  control,
  stacked,
  first,
}: {
  title: string;
  description: string;
  control: ReactNode;
  stacked?: boolean;
  first?: boolean;
}) {
  return (
    <div
      className={cn(
        "gap-3 py-3",
        first ? "pt-0" : "border-t border-slate-100",
        stacked ? "flex flex-col" : "flex items-center justify-between",
      )}
    >
      <div className="min-w-0">
        <p className="text-[13px] leading-[17px] font-medium text-slate-900">{title}</p>
        <p className="text-[12px] leading-[16px] text-slate-400">{description}</p>
      </div>
      {control}
    </div>
  );
}

/** Name, contact and posting. Role is read-only — the owner manages it. */
export function PersonalInfoCard({ variant = "desktop" }: { variant?: Variant }) {
  const mobile = variant === "mobile";
  const [first, last, email, phone, role, office] = personalInfo.fields;

  return (
    <SettingsCard title={personalInfo.title}>
      <div className="flex flex-col gap-[13px]">
        {/* The two short fields stay paired on mobile; the rest go full width. */}
        <div className="flex gap-3">
          <TextField label={first.label} value={first.value} />
          <TextField label={last.label} value={last.value} />
        </div>

        <div className={cn("flex gap-3", mobile && "flex-col gap-[13px]")}>
          <TextField label={email.label} value={email.value} />
          <TextField label={phone.label} value={phone.value} />
        </div>

        <div className={cn("flex gap-3", mobile && "flex-col gap-[13px]")}>
          <TextField label={role.label} value={role.value} readOnly />
          <SelectField label={office.label} value={office.value} />
        </div>
      </div>
    </SettingsCard>
  );
}

/** Theme, table density and the two notification switches. */
export function ProfilePreferencesCard({ variant = "desktop" }: { variant?: Variant }) {
  const mobile = variant === "mobile";
  const [theme, setTheme] = useState(profilePreferences.theme.value);
  const [density, setDensity] = useState(profilePreferences.density.value);
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(profilePreferences.toggles.map((t) => [t.id, t.on])),
  );

  return (
    <SettingsCard title={profilePreferences.title}>
      <div className="flex flex-col">
        <PrefRow
          first
          stacked={mobile}
          title={profilePreferences.theme.title}
          description={profilePreferences.theme.description}
          control={
            <SegmentedControl
              options={profilePreferences.theme.options}
              value={theme}
              onChange={setTheme}
              label={profilePreferences.theme.title}
              stretch={mobile}
            />
          }
        />
        <PrefRow
          stacked={mobile}
          title={profilePreferences.density.title}
          description={profilePreferences.density.description}
          control={
            <SegmentedControl
              options={profilePreferences.density.options}
              value={density}
              onChange={setDensity}
              label={profilePreferences.density.title}
              stretch={mobile}
            />
          }
        />
        {profilePreferences.toggles.map((toggle) => (
          <PrefRow
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

/** Green status pill with its dot — 2FA and SSO both use it. */
function StatePill({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-[20px] border border-green-200 bg-green-50 px-2.5 py-[3px]">
      <span aria-hidden className="size-[5px] rounded-full bg-green-600" />
      <span className="text-[11.5px] leading-[15px] font-medium whitespace-nowrap text-green-700">
        {label}
      </span>
    </span>
  );
}

export function ProfileSecurityCard() {
  const { password, rows } = profileSecurity;

  return (
    <SettingsCard title={profileSecurity.title}>
      <div className="flex flex-col">
        <PrefRow
          first
          title={password.title}
          description={password.description}
          control={
            <button
              type="button"
              className="h-8 shrink-0 rounded-lg border border-slate-200 bg-white px-[12px] text-[12.5px] font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {password.action}
            </button>
          }
        />
        {rows.map((row) => (
          <PrefRow
            key={row.id}
            title={row.title}
            description={row.description}
            control={<StatePill label={row.pill} />}
          />
        ))}
      </div>
    </SettingsCard>
  );
}

/** Where the account is signed in. The current device cannot sign itself out. */
export function ActiveSessionsCard() {
  return (
    <SettingsCard
      title={activeSessions.title}
      action={
        <button
          type="button"
          className="shrink-0 text-[12.5px] leading-[16px] font-medium text-red-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {activeSessions.signOutAll}
        </button>
      }
    >
      <ul className="flex flex-col">
        {activeSessions.items.map((session, index) => {
          const Icon = session.kind === "phone" ? PhoneIcon : MonitorIcon;

          return (
            <li
              key={session.id}
              className={cn(
                "flex items-center gap-3 py-2",
                index === 0 ? null : "border-t border-slate-100",
              )}
            >
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-slate-100 text-slate-600"
              >
                <Icon className="size-[14px]" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-1.5">
                  <span className="text-[13px] leading-[17px] font-medium text-slate-900">
                    {session.device}
                  </span>
                  {session.current ? (
                    <span className="rounded-[20px] bg-green-50 px-[7px] py-px text-[10.5px] font-semibold text-green-700">
                      {activeSessions.currentBadge}
                    </span>
                  ) : null}
                </div>
                <p className="truncate text-[11.5px] leading-[15px] text-slate-400">
                  {session.meta}
                </p>
              </div>

              {session.current ? null : (
                <button
                  type="button"
                  className="shrink-0 text-[12.5px] font-medium text-slate-500 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {activeSessions.signOut}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </SettingsCard>
  );
}
