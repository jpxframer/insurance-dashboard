import {
  ActiveSessionsCard,
  PersonalInfoCard,
  ProfilePreferencesCard,
  ProfileSecurityCard,
} from "./ProfileCards";
import { profilePage } from "@/lib/profile";

/**
 * Desktop Profile — Figma `22783-3126`.
 *
 * A 97px identity header over two 2x2 rows of cards. Unlike Settings there is
 * no section rail: the page owns everything right of the sidebar.
 *
 * Change photo and Save changes are both 36px tall. The frame draws them at 36
 * and 34; at equal heights they align optically, which is the call already made
 * for the Policies toolbar.
 */
export function ProfileDesktop() {
  return (
    <div className="hidden h-dvh min-w-0 flex-col bg-slate-50 lg:flex">
      <header className="flex h-[97px] shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-7">
        <span
          aria-hidden
          className="grid size-14 shrink-0 place-items-center rounded-full bg-blue-100 text-[18px] font-semibold text-blue-600"
        >
          {profilePage.initials}
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="truncate text-[19px] leading-[26px] font-semibold text-slate-900">
              {profilePage.name}
            </h1>
            <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] leading-[14px] font-semibold text-blue-600">
              {profilePage.roleBadge}
            </span>
          </div>
          <p className="truncate text-[12px] leading-[16px] text-slate-400">
            {profilePage.meta}
          </p>
        </div>

        <div className="ml-auto flex shrink-0 gap-2">
          <button
            type="button"
            className="h-9 rounded-lg border border-slate-200 bg-white px-[12px] text-[12.5px] font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {profilePage.changePhoto}
          </button>
          <button
            type="button"
            className="h-9 rounded-lg bg-blue-600 px-[14px] text-[12.5px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {profilePage.save}
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-7 py-5">
        <div className="grid grid-cols-2 items-stretch gap-[14px]">
          <PersonalInfoCard />
          <ProfilePreferencesCard />
          <ProfileSecurityCard />
          <ActiveSessionsCard />
        </div>
      </div>
    </div>
  );
}
