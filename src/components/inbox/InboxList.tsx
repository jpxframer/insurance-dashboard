"use client";

import { InboxTagChip } from "./InboxTagChip";
import { inboxMessages, inboxPage, type InboxMessage } from "@/lib/inbox";
import { cn } from "@/lib/cn";

/**
 * The 361px message list, left of the open thread. Desktop only — the mobile
 * frame turns this same list into cards.
 *
 * Selecting a row is real; only Marcus Johnson's thread is designed, so the
 * pane beside it does not change. The four filter chips carry their designed
 * states but do not filter — no frame defines a result set for them.
 */
export function InboxList({
  selectedId,
  onSelect,
  activeFilter,
  onFilterChange,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  activeFilter: string;
  onFilterChange: (id: string) => void;
}) {
  return (
    <div className="hidden h-dvh w-[361px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex flex-col gap-2.5 px-[14px] pt-4 pb-2.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[15px] leading-[20px] font-semibold text-slate-900">
            {inboxPage.title}
          </h2>
          <button
            type="button"
            className="text-[12px] leading-[16px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {inboxPage.markAllRead}
          </button>
        </div>

        <div className="flex gap-[5px]">
          {inboxPage.filters.map((filter) => {
            const active = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange(filter.id)}
                className={cn(
                  "rounded-[20px] border px-[9px] py-[3px] text-[11.5px] leading-[15px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  active
                    ? "border-blue-200 bg-blue-50 font-semibold text-blue-600"
                    : "border-slate-200 font-medium text-slate-600 hover:bg-slate-50",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto border-t border-slate-100">
        {inboxMessages.map((message) => (
          <li key={message.id}>
            <InboxRow
              message={message}
              selected={message.id === selectedId}
              onSelect={() => onSelect(message.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * One row. Read messages drop to slate-600 for the name and subject and
 * slate-400 for the preview; unread hold slate-900 and slate-600.
 *
 * The selected row keeps its unread weight but drops the dot, as the frame
 * draws it — the message you are reading does not also need to be announced.
 */
function InboxRow({
  message,
  selected,
  onSelect,
}: {
  message: InboxMessage;
  selected: boolean;
  onSelect: () => void;
}) {
  const { sender, time, subject, preview, unread, tag, reference } = message;
  const showDot = unread && !selected;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={cn(
        // The 2px left rule is on every row and only its colour changes, so
        // selecting one cannot shift its text sideways.
        "flex w-full flex-col gap-px border-l-2 px-[14px] py-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
        selected
          ? "border-l-blue-600 bg-blue-50"
          : "border-l-transparent hover:bg-slate-50",
      )}
    >
      <span
        className={cn(
          "flex w-full items-start justify-between gap-2",
          showDot ? "leading-[14px]" : "leading-[17px]",
        )}
      >
        <span className="flex items-center gap-[5px]">
          <span
            className={cn(
              "text-[13px] leading-[inherit]",
              unread ? "font-semibold text-slate-900" : "font-medium text-slate-600",
            )}
          >
            {sender}
          </span>
          {showDot ? (
            <span aria-label="Unread" className="size-[7px] rounded-full bg-blue-600" />
          ) : null}
        </span>

        <span className="shrink-0 text-[11px] leading-[inherit] text-slate-400">{time}</span>
      </span>

      <span
        className={cn(
          "w-full truncate pt-px text-[12.5px] leading-[16px] font-medium",
          unread ? "text-slate-900" : "text-slate-600",
        )}
      >
        {subject}
      </span>

      <span
        className={cn(
          "line-clamp-2 w-full text-[12px] leading-[16px]",
          unread ? "text-slate-600" : "text-slate-400",
        )}
      >
        {preview}
      </span>

      {tag ? <InboxTagChip tag={tag} reference={reference} className="pt-1" /> : null}
    </button>
  );
}
