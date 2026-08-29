import { PaperclipIcon, SparkleSmallIcon } from "@/components/icons/figma-icons";

/**
 * The reply box at the foot of the desktop thread.
 *
 * Pinned below the scrolling messages rather than scrolling with them: the
 * frame draws it at the bottom of a pane whose content happens to fit, and a
 * composer that slides out of reach on a long thread would be a regression.
 *
 * Send reply is flat blue, not the gloss treatment used on other primary
 * buttons — the frame gives it a plain fill here.
 */
export function InboxComposer({ replyTo }: { replyTo: string }) {
  return (
    <div className="mt-[14px] shrink-0 rounded-[14px] border border-slate-200 bg-white px-[16px] py-[12px] shadow-[var(--shadow-card)]">
      <label className="block pt-1 pb-2.5">
        <span className="sr-only">Reply</span>
        <textarea
          rows={1}
          placeholder={`Reply to ${replyTo}…`}
          className="block w-full resize-none text-[13px] leading-[17px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
      </label>

      <div className="flex items-center gap-2.5 border-t border-slate-100 pt-[10px]">
        <button
          type="button"
          className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PaperclipIcon className="size-[13px] shrink-0 text-slate-400" />
          Attach
        </button>

        <button
          type="button"
          className="text-[12px] font-medium text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Templates
        </button>

        <button
          type="button"
          className="flex items-center gap-[5px] text-[12px] font-medium text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <SparkleSmallIcon className="size-[12px] shrink-0" />
          AI draft
        </button>

        <button
          type="button"
          className="ml-auto h-8 rounded-lg bg-blue-600 px-[14px] text-[12.5px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Send reply
        </button>
      </div>
    </div>
  );
}
