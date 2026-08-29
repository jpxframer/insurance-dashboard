import { avatarToneClass, type InboxThread, type ThreadMessage } from "@/lib/inbox";
import { cn } from "@/lib/cn";

/** The bubbles in an open thread. */
export function InboxThreadMessages({ thread }: { thread: InboxThread }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[14px] overflow-y-auto">
      {thread.messages.map((message) => (
        <ThreadBubble key={message.id} message={message} />
      ))}
    </div>
  );
}

/**
 * Avatar plus bubble. The bubble squares off its top-left corner so it points
 * back at the tile beside it, and a draft reply swaps white for blue-50.
 */
export function ThreadBubble({
  message,
  variant = "desktop",
}: {
  message: ThreadMessage;
  variant?: "desktop" | "mobile";
}) {
  const { author, initials, avatarTone, meta, variant: kind, paragraphs } = message;
  const draft = kind === "draft";
  const mobile = variant === "mobile";

  return (
    <div className={cn("flex shrink-0 items-start", mobile ? "gap-2.5" : "gap-3")}>
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-full font-semibold",
          mobile ? "size-8 text-[11.5px]" : "size-[34px] text-[12px]",
          avatarToneClass[avatarTone],
        )}
      >
        {initials}
      </span>

      <div
        className={cn(
          "flex min-w-0 flex-col rounded-[14px] rounded-tl-none border",
          mobile ? "flex-1 px-[14px] py-[12px]" : "max-w-[678px] px-[18px] py-[14px]",
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
        <div className="flex flex-wrap items-baseline gap-x-2 self-start">
          <span
            className={cn(
              "font-semibold text-slate-900",
              mobile ? "text-[12.5px] leading-[16px]" : "text-[13px] leading-[17px]",
            )}
          >
            {author}
          </span>
          <span
            className={cn(
              "text-slate-400",
              mobile ? "text-[11px] leading-[16px]" : "text-[11.5px] leading-[17px]",
            )}
          >
            {meta}
          </span>
        </div>

        <div className={cn("flex flex-col", mobile ? "gap-[16px]" : "gap-[20.8px]")}>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className={cn(
                "whitespace-pre-line text-slate-600",
                mobile ? "text-[13.5px] leading-[20px]" : "text-[13.5px] leading-[20.93px]",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
