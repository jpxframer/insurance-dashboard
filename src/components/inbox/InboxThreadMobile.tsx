import Link from "next/link";
import { PaperclipIcon, SparkleSmallIcon } from "@/components/icons/figma-icons";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { InboxTagChip } from "./InboxTagChip";
import { ThreadBubble } from "./InboxThreadMessages";
import type { InboxThread } from "@/lib/inbox";

/**
 * The mobile thread — the one view in this app with no frame behind it.
 *
 * Nothing is invented that the designed screens do not already say. It is the
 * desktop thread's own three parts (header, bubbles, composer) rebuilt with the
 * mobile shell's established vocabulary:
 *
 * - The header follows Claims mobile exactly: a 46px back control, a two-line
 *   title block, a 46px overflow, with the title row pinned and the rest
 *   scrolling — the pattern every mobile screen now uses.
 * - The desktop's three header actions cannot sit on a 402px row, so they
 *   become a horizontally scrolling row of the same outline buttons, using the
 *   `-mx-4 px-4` bleed the filter chips already use. They stay one tap away
 *   rather than disappearing into the overflow menu.
 * - The composer is fixed above the tab bar, where Claims mobile puts its
 *   actions. Reply is the reason you opened the thread, so it should not be
 *   something you scroll to find.
 *
 * Bubbles stay left-aligned for both sides, as the desktop draws them, rather
 * than adopting the right-aligned chat idiom — no frame in this product
 * establishes that, and the fill already tells the two apart.
 */
export function InboxThreadMobile({ thread }: { thread: InboxThread }) {
  const { subject, tag, reference, actions, mobileMetaLead, metaReference, replyTo } =
    thread;
  const sender = thread.messages[0].author;

  return (
    <div className="lg:hidden">
      <MobileStickyBar className="px-4 pt-3.5 pb-[15px]">
        <div className="flex items-center gap-2.5">
          <Link
            href="/inbox"
            aria-label="Back to inbox"
            className="grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ArrowLeftIcon className="size-[15px]" />
          </Link>

          <div className="flex min-w-0 flex-col gap-[3px]">
            <h1 className="truncate text-[15px] leading-[20px] font-semibold text-slate-900">
              {subject}
            </h1>

            {/*
              The second line always carries something, so the bar holds one
              height across threads: the tag and its reference where there is
              one, the correspondent's name where there is not.
            */}
            {tag ? (
              <InboxTagChip tag={tag} reference={reference} />
            ) : (
              <p className="truncate text-[11.5px] leading-[15px] text-slate-400">
                {sender}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label="More actions"
            className="ml-auto grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-[16px] text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            ⋯
          </button>
        </div>
      </MobileStickyBar>

      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 pb-3">
        <p className="truncate text-[12px] leading-[16px] text-slate-400">
          {mobileMetaLead}
          {metaReference ? (
            <span className="tnum font-mono text-[11.5px] text-blue-600">
              {metaReference}
            </span>
          ) : null}
        </p>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              className="h-9 shrink-0 rounded-[10px] border border-slate-200 bg-white px-[13px] text-[12.5px] font-medium whitespace-nowrap text-slate-600 active:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Clears the fixed composer (85px) on top of the shell's tab-bar padding. */}
      <div className="flex flex-col gap-3 px-4 pt-3 pb-[85px]">
        {thread.messages.map((message) => (
          <ThreadBubble key={message.id} message={message} variant="mobile" />
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-[75px] z-30 border-t border-slate-200 bg-white px-4 pt-3 pb-[26px]">
        {replyTo ? (
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <label className="block">
                <span className="sr-only">Reply</span>
                <textarea
                  rows={1}
                  placeholder={`Reply to ${replyTo}…`}
                  className="block h-[46px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-[13px] pr-[44px] pl-[44px] text-[13.5px] leading-[18px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </label>

              {/*
                Both glyphs are real controls, and both get a 40px hit area
                rather than the size of the mark inside them — Attach is a
                button on desktop and must not become decoration here.
              */}
              <button
                type="button"
                aria-label="Attach a file"
                className="absolute top-1/2 left-[3px] grid size-10 -translate-y-1/2 place-items-center rounded-lg text-slate-400 active:bg-slate-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
              >
                <PaperclipIcon className="size-[14px]" />
              </button>

              <button
                type="button"
                aria-label="Draft this reply with AI"
                className="absolute top-1/2 right-[3px] grid size-10 -translate-y-1/2 place-items-center rounded-lg text-blue-600 active:bg-blue-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
              >
                <SparkleSmallIcon className="size-[13px]" />
              </button>
            </div>

            <button
              type="button"
              className="h-[46px] shrink-0 rounded-xl bg-blue-600 px-[17px] text-[13.5px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Send
            </button>
          </div>
        ) : (
          /*
            A digest has nobody to answer. Rather than drop the bar and let the
            page end on an unexplained edge, it says so — and the layout keeps
            one shape across every thread.
          */
          <p className="flex h-[46px] items-center justify-center text-[12.5px] text-slate-400">
            Automated digest · no reply
          </p>
        )}
      </div>
    </div>
  );
}
