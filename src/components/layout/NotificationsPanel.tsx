import { notifications, type NotificationTone } from "@/lib/data";
import { CheckIcon, ClockIcon, MailIcon, ShieldIcon } from "@/components/icons/ui-icons";

const ICONS = {
  shield: ShieldIcon,
  mail: MailIcon,
  check: CheckIcon,
  clock: ClockIcon,
} as const;

const TONE_CLASS: Record<NotificationTone, string> = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-50 text-green-600",
  slate: "bg-slate-100 text-slate-500",
};

export const unreadCount = notifications.items.filter((n) => n.unread).length;

/**
 * Notification list shared by the desktop popover and the mobile sheet — the
 * two frames differ only in the panel chrome around this content.
 */
export function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-semibold text-slate-900">
            {notifications.title}
          </h2>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-600">
            {unreadCount} new
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded text-[12px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {notifications.markAllLabel}
        </button>
      </div>

      <ul className="border-t border-slate-100">
        {notifications.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={onClose}
                className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 ${
                  item.unread ? "bg-blue-50/70 hover:bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${TONE_CLASS[item.tone]}`}
                >
                  <Icon className="size-[18px]" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-[1.35] text-slate-700">
                    <strong className="font-semibold text-slate-900">{item.lead}</strong>
                    {item.body}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-slate-400">
                    {item.meta}
                  </span>
                </span>

                {item.unread ? (
                  <span
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-600"
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
        className="rounded-b-[14px] px-4 py-3.5 text-center text-[13px] font-medium text-blue-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
      >
        {notifications.viewAllLabel}
      </button>
    </div>
  );
}
