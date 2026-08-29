import { SystemDotIcon } from "@/components/icons/figma-icons";
import { InboxTagChip } from "./InboxTagChip";
import { avatarToneClass, inboxMessages, type InboxMessage } from "@/lib/inbox";
import { cn } from "@/lib/cn";

/**
 * Mobile Inbox: the same five messages as cards.
 *
 * Where the desktop list is name-first with no tile, the cards lead with an
 * avatar, and the two read messages shed their preview line, their unread dot
 * and their shadow — a read card is a two-line summary, not a truncated one.
 */
export function InboxCardList() {
  return (
    <ul className="flex flex-col gap-2 px-4 py-3 lg:hidden">
      {inboxMessages.map((message) => (
        <li key={message.id}>
          <InboxCard message={message} />
        </li>
      ))}
    </ul>
  );
}

function InboxCard({ message }: { message: InboxMessage }) {
  const {
    sender,
    initials,
    avatarTone,
    systemAvatar,
    time,
    subject,
    mobilePreview,
    unread,
    tag,
    reference,
  } = message;

  return (
    <article
      className={cn(
        // 15/14 in the frame; the border eats 1px on every edge.
        "flex flex-col gap-1.5 rounded-[14px] border border-slate-200 bg-white px-[14px] py-[13px]",
        unread ? "shadow-[var(--shadow-card)]" : null,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold",
            avatarToneClass[avatarTone],
          )}
        >
          {systemAvatar ? <SystemDotIcon className="size-[15px]" /> : initials}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-px">
          <div className="flex items-start justify-between gap-2">
            <span
              className={cn(
                "truncate text-[13.5px] leading-[18px]",
                unread ? "font-semibold text-slate-900" : "font-medium text-slate-600",
              )}
            >
              {sender}
            </span>
            <span className="shrink-0 text-[11px] leading-[18px] text-slate-400">
              {time}
            </span>
          </div>

          <p
            className={cn(
              "truncate text-[12.5px] leading-[16px]",
              unread ? "font-medium text-slate-900" : "text-slate-600",
            )}
          >
            {subject}
          </p>
        </div>

        {unread ? (
          <span aria-label="Unread" className="size-2 shrink-0 rounded-full bg-blue-600" />
        ) : null}
      </div>

      {mobilePreview ? (
        <p className="line-clamp-2 text-[12px] leading-[16px] text-slate-600">
          {mobilePreview}
        </p>
      ) : null}

      {tag ? <InboxTagChip tag={tag} reference={reference} className="pt-px" /> : null}
    </article>
  );
}
