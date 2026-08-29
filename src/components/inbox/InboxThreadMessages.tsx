import { avatarToneClass, inboxThread, type ThreadMessage } from "@/lib/inbox";
import { cn } from "@/lib/cn";

/** The bubbles in the open thread — one received message and one draft reply. */
export function InboxThreadMessages() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[14px] overflow-y-auto">
      {inboxThread.messages.map((message) => (
        <ThreadBubble key={message.id} message={message} />
      ))}
    </div>
  );
}

/**
 * Avatar plus bubble. The bubble squares off its top-left corner so it points
 * back at the tile beside it, and the draft reply swaps white for blue-50.
 */
function ThreadBubble({ message }: { message: ThreadMessage }) {
  const { author, initials, avatarTone, meta, variant, paragraphs } = message;
  const draft = variant === "draft";

  return (
    <div className="flex shrink-0 items-start gap-3">
      <span
        aria-hidden
        className={cn(
          "grid size-[34px] shrink-0 place-items-center rounded-full text-[12px] font-semibold",
          avatarToneClass[avatarTone],
        )}
      >
        {initials}
      </span>

      <div
        className={cn(
          "flex max-w-[678px] min-w-0 flex-col rounded-[14px] rounded-tl-none border px-[18px] py-[14px]",
          draft
            ? "gap-[5.46px] border-blue-200 bg-blue-50"
            : "gap-[6px] border-slate-200 bg-white shadow-[var(--shadow-card)]",
        )}
      >
        {/*
          The meta sits beside the name, not out at the bubble's right edge —
          the frame shrink-wraps this row to the two labels. It butts them
          together at 0; 8px keeps them from touching.
        */}
        <div className="flex items-start gap-2 self-start">
          <span className="text-[13px] leading-[17px] font-semibold text-slate-900">
            {author}
          </span>
          <span className="shrink-0 text-[11.5px] leading-[17px] text-slate-400">
            {meta}
          </span>
        </div>

        <div className="flex flex-col gap-[20.8px]">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[13.5px] leading-[20.93px] whitespace-pre-line text-slate-600"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
