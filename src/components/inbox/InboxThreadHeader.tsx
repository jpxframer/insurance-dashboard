import { InboxTagChip } from "./InboxTagChip";
import type { InboxThread } from "@/lib/inbox";

/**
 * The open thread's header: subject, its tag, its actions, and the addressing
 * line beneath.
 *
 * The actions vary with the tag — a claim opens a claim, a renewal opens a
 * policy, and a thread with neither offers only Archive — but they carry their
 * designed states only.
 */
export function InboxThreadHeader({ thread }: { thread: InboxThread }) {
  const { subject, tag, actions, metaLead, metaReference } = thread;

  return (
    // pb is 17px in the frame; the border-b eats one, per the stroke-inside rule.
    <header className="flex shrink-0 flex-col gap-1 border-b border-slate-200 bg-white px-6 pt-4 pb-4">
      <div className="flex items-center gap-2.5">
        <h1 className="truncate text-[17px] leading-[22px] font-semibold text-slate-900">
          {subject}
        </h1>

        {tag ? <InboxTagChip tag={tag} className="shrink-0" /> : null}

        <div className="ml-auto flex shrink-0 gap-2">
          {actions.map((action) => (
            <button
              key={action}
              type="button"
              className="h-[34px] rounded-lg border border-slate-200 bg-white px-[12px] text-[12.5px] font-medium whitespace-nowrap text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <p className="truncate text-[12px] leading-[16px] text-slate-400">
        {metaLead}
        {metaReference ? (
          <span className="tnum font-mono text-[11.5px] text-blue-600">{metaReference}</span>
        ) : null}
      </p>
    </header>
  );
}
