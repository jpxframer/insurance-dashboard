import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons/figma-icons";
import {
  ActiveSessionsCard,
  PersonalInfoCard,
  ProfilePreferencesCard,
  ProfileSecurityCard,
} from "./ProfileCards";
import { profilePage } from "@/lib/profile";

/**
 * The mobile profile — designed here. There is no frame for it; the mobile set
 * stops at Settings, whose account row leads to this screen and nothing else.
 * If a frame arrives later, it wins.
 *
 * Nothing is invented that the designed screens do not already say. It is the
 * desktop profile's own four cards in the mobile shell's vocabulary:
 *
 * - The header is the Settings-mobile header: a 46px back control and a 17px
 *   title, pinned with its rule always on. Back goes to Settings, the only
 *   route in that any frame draws.
 * - The desktop's 97px identity bar cannot also hold two buttons at 402px, so
 *   the identity becomes a block that scrolls and Change photo goes full width
 *   beneath it.
 * - Save changes is fixed above the tab bar, where Claims mobile puts its
 *   actions — it is the reason you edited anything, so it should not be
 *   something you scroll to find.
 * - The cards take `variant="mobile"`, which stacks the paired fields and drops
 *   each segmented control below its label. Three segments beside a label does
 *   not fit 370px.
 */
export function ProfileMobile() {
  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-30 flex items-center gap-2.5 border-b border-slate-200 bg-white px-4 pt-[14px] pb-[14px]">
        <Link
          href="/settings"
          aria-label="Back to settings"
          className="grid size-[46px] shrink-0 place-items-center rounded-[12px] border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ChevronRightIcon className="size-[15px] rotate-180" />
        </Link>
        <h1 className="text-[17px] leading-[22px] font-semibold text-slate-900">Profile</h1>
      </header>

      {/* Clears the fixed save bar (85px) on top of the shell's tab-bar padding. */}
      <div className="flex flex-col gap-4 px-4 pt-[14px] pb-[85px]">
        <div className="flex flex-col gap-3 rounded-[14px] border border-slate-200 bg-white px-4 py-[14px] shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-full bg-blue-100 text-[18px] font-semibold text-blue-600"
            >
              {profilePage.initials}
            </span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-[17px] leading-[22px] font-semibold text-slate-900">
                  {profilePage.name}
                </span>
                <span className="shrink-0 rounded-full bg-blue-50 px-1.5 py-px text-[10px] leading-[13px] font-semibold text-blue-600">
                  {profilePage.roleBadge}
                </span>
              </div>
              <p className="truncate text-[12.5px] leading-[16px] text-slate-400">
                {profilePage.mobileMeta}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="h-[42px] w-full rounded-[10px] border border-slate-200 bg-white text-[13.5px] font-medium text-slate-600 active:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {profilePage.changePhoto}
          </button>
        </div>

        <PersonalInfoCard variant="mobile" />
        <ProfilePreferencesCard variant="mobile" />
        <ProfileSecurityCard />
        <ActiveSessionsCard />
      </div>

      <div className="fixed inset-x-0 bottom-[75px] z-30 border-t border-slate-200 bg-white px-4 pt-3 pb-[26px]">
        <button
          type="button"
          className="h-[46px] w-full rounded-xl bg-blue-600 text-[14px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {profilePage.save}
        </button>
      </div>
    </div>
  );
}
