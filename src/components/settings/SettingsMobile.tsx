"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ChevronRightIcon,
  CreditCardIcon,
  LockIcon,
  ShieldPlainIcon,
  SystemDotIcon,
  TeamIcon,
} from "@/components/icons/figma-icons";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Toggle } from "@/components/ui/Toggle";
import { settingsMobile } from "@/lib/settings";
import { useThemePreference, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/cn";

const ROW_ICONS = {
  general: SystemDotIcon,
  team: TeamIcon,
  workflow: ShieldPlainIcon,
  security: LockIcon,
  billing: CreditCardIcon,
} as const;

/**
 * Mobile Settings header — the whole thing is the title row, so all of it pins
 * and its rule stays on, exactly as the Claims mobile header does.
 *
 * The back control is the row chevron mirrored; the two exports are the same
 * glyph. It returns to the dashboard, since Settings is reached from the
 * account menu rather than from a tab.
 */
export function SettingsMobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-2.5 border-b border-slate-200 bg-white px-4 pt-[14px] pb-[14px] lg:hidden">
      <Link
        href="/"
        aria-label="Back"
        className="grid size-[46px] shrink-0 place-items-center rounded-[12px] border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <ChevronRightIcon className="size-[15px] rotate-180" />
      </Link>
      <h1 className="text-[17px] leading-[22px] font-semibold text-slate-900">
        {settingsMobile.title}
      </h1>
    </header>
  );
}

/** A group heading over its card. */
function Group({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="flex flex-col">
      <h2 className="px-1 pb-2 text-[11px] leading-[15px] font-semibold tracking-[0.06em] text-slate-400 uppercase">
        {heading}
      </h2>
      <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
        {children}
      </div>
    </section>
  );
}

/** One row inside a group. The last row in a card drops its rule. */
function Row({
  children,
  last,
  as = "div",
  href,
}: {
  children: ReactNode;
  last?: boolean;
  as?: "div" | "link";
  href?: string;
}) {
  const className = cn(
    "flex min-h-[72px] w-full items-center gap-3 px-4 py-5 text-left",
    last ? null : "border-b border-slate-100",
    as === "link"
      ? "active:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
      : null,
  );

  if (as === "link" && href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
}

export function SettingsMobile() {
  const { account, preferences, workspace, support } = settingsMobile;
  const { preference, choose } = useThemePreference();
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(preferences.toggles.map((t) => [t.id, t.on])),
  );

  return (
    <div className="flex flex-col gap-3 px-4 pt-[14px] pb-6 lg:hidden">
      {/* The account card is the way into the profile — the only route out of
          this screen the frame draws. */}
      <Link
        href="/profile"
        className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-4 py-[14px] shadow-[var(--shadow-card)] active:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-100 text-[15px] font-semibold text-blue-600"
        >
          {account.initials}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[15px] leading-[20px] font-semibold text-slate-900">
              {account.name}
            </span>
            <span className="shrink-0 rounded-full bg-blue-50 px-1.5 py-px text-[10px] leading-[13px] font-semibold text-blue-600">
              {account.role}
            </span>
          </div>
          <p className="truncate text-[12.5px] leading-[16px] text-slate-400">
            {account.email}
          </p>
        </div>

        <ChevronRightIcon className="size-[14px] shrink-0 text-slate-400" />
      </Link>

      <Group heading={preferences.heading}>
        <Row>
          <span className="flex-1 text-[14px] font-medium text-slate-900">
            {preferences.themeLabel}
          </span>
          <SegmentedControl
            options={preferences.themeOptions}
            value={preference}
            onChange={(id) => choose(id as ThemePreference)}
            label={preferences.themeLabel}
          />
        </Row>

        {preferences.toggles.map((toggle, index) => (
          <Row key={toggle.id} last={index === preferences.toggles.length - 1}>
            <span className="flex-1 text-[14px] font-medium text-slate-900">
              {toggle.label}
            </span>
            <Toggle
              size="mobile"
              checked={toggles[toggle.id]}
              onChange={(next) => setToggles((prev) => ({ ...prev, [toggle.id]: next }))}
              label={toggle.label}
            />
          </Row>
        ))}
      </Group>

      <Group heading={workspace.heading}>
        {workspace.rows.map((row, index) => {
          const Icon = ROW_ICONS[row.icon as keyof typeof ROW_ICONS];
          const blue = row.tone === "blue";

          return (
            <Row key={row.id} last={index === workspace.rows.length - 1}>
              <span
                aria-hidden
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-[9px]",
                  blue ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-600",
                )}
              >
                <Icon className="size-[14px]" />
              </span>

              <span className="flex-1 truncate text-[14px] font-medium text-slate-900">
                {row.label}
              </span>

              {row.value ? (
                <span className="shrink-0 text-[12px] text-slate-400">{row.value}</span>
              ) : null}
              {row.pill ? (
                <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                  {row.pill}
                </span>
              ) : null}

              <ChevronRightIcon className="size-[14px] shrink-0 text-slate-400" />
            </Row>
          );
        })}
      </Group>

      <Group heading={support.heading}>
        {support.rows.map((row, index) => (
          <Row key={row.id} last={index === support.rows.length - 1}>
            <span className="flex-1 text-[14px] font-medium text-slate-900">
              {row.label}
            </span>
            <ChevronRightIcon className="size-[14px] shrink-0 text-slate-400" />
          </Row>
        ))}
      </Group>

      <button
        type="button"
        className="h-[50px] w-full rounded-[12px] border border-red-200 bg-white text-[14px] font-semibold text-red-600 active:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {settingsMobile.signOut}
      </button>

      <p className="text-center text-[11.5px] leading-[15px] text-slate-400">
        {settingsMobile.version}
      </p>
    </div>
  );
}
