import {
  NotifCheckIcon,
  NotifClockIcon,
  NotifMailIcon,
  NotifShieldIcon,
} from "@/components/icons/figma-icons";
import { notifications, type NotificationTone } from "@/lib/data";
import { cn } from "@/lib/cn";

const ICONS = {
  shield: NotifShieldIcon,
  mail: NotifMailIcon,
  check: NotifCheckIcon,
  clock: NotifClockIcon,
} as const;

/** Tile fill + glyph colour, both taken from the exported SVGs. */
const TONE_CLASS: Record<NotificationTone, string> = {
  amber: "bg-amber-100 text-amber-700", // #fef3c7 / #b45309
  blue: "bg-blue-100 text-blue-600", // #dbeafe / #2563eb
  green: "bg-green-50 text-green-700", // #f0fdf4 / #15803d
  slate: "bg-slate-100 text-slate-600", // #f1f5f9 / #475569
};

export const unreadCount = notifications.items.filter((n) => n.unread).length;

/**
 * Notification list shared by the desktop popover (`20875:30043`) and the
 * mobile sheet (`20875:31146`). The two nodes are byte-identical apart from
 * their width and the badge count, so one component covers both.
 */
export function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const last = notifications.items.length - 1;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-[14px] pb-[13px] pt-[13px]">
        {/* No explicit gap in the frame — the title carries a trailing space. */}
        <div className="flex items-center gap-1">
          <h2 className="text-[14px] font-semibold leading-[18px] text-slate-900">
            {notifications.title}
          </h2>
          <span className="rounded-[20px] bg-blue-100 px-[7px] py-px text-[10.5px] font-semibold leading-[14px] text-blue-600">
            {unreadCount} new
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded text-[12px] font-medium leading-4 text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {notifications.markAllLabel}
        </button>
      </div>

      <ul>
        {notifications.items.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "flex min-h-[78px] w-full gap-[11px] px-[14px] pt-[12px] text-left transition-colors",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                  i < last ? "border-b border-slate-100 pb-[12px]" : "pb-[12px]",
                  item.unread ? "bg-blue-50 hover:bg-blue-100/70" : "hover:bg-slate-50",
                )}
              >
                <span
                  className={cn(
                    "grid size-[34px] shrink-0 place-items-center rounded-[10px]",
                    TONE_CLASS[item.tone],
                  )}
                >
                  <Icon className="size-[15px]" />
                </span>

                <span className="min-w-0 flex-1">
                  {/* Read rows drop the body to slate-600; unread keep it at full contrast. */}
                  <span
                    className={cn(
                      "block text-[13px] leading-[18.2px]",
                      item.unread ? "text-slate-900" : "text-slate-600",
                    )}
                  >
                    <strong className="font-semibold text-slate-900">{item.lead}</strong>
                    {item.body}
                  </span>
                  <span className="mt-px block text-[11.5px] leading-[15px] text-slate-400">
                    {item.time} ·{" "}
                    <span className="font-mono text-[11px]">{item.ref}</span>
                  </span>
                </span>

                {item.unread ? (
                  <span
                    className="mt-[5px] size-2 shrink-0 rounded-full bg-blue-600"
                    aria-label="Unread"
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={onClose}
        className="min-h-[45px] border-t border-slate-100 pb-[13.5px] pt-[13.5px] text-center text-[13px] font-medium leading-[17px] text-blue-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
      >
        {notifications.viewAllLabel}
      </button>
    </div>
  );
}
