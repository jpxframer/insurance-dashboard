import { activityDotClass, customerDetail } from "@/lib/customers";
import { cn } from "@/lib/cn";

/** Small tinted glyph tile on each communication row. */
const COMMS_ICON = {
  email: { tile: "bg-blue-50 text-blue-600", path: "M2 4h12v8H2z M2 4l6 4.5L14 4" },
  sms: { tile: "bg-green-50 text-green-700", path: "M14 10.5A1.5 1.5 0 0 1 12.5 12H5l-3 2.5V3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5z" },
  call: { tile: "bg-slate-100 text-slate-600", path: "M11 10.5a5.5 5.5 0 0 1-5.5-5.5 2 2 0 0 0-2-2H3a1 1 0 0 0-1 1.1A11 11 0 0 0 12.4 14a1 1 0 0 0 1.1-1v-.5a2 2 0 0 0-2-2z" },
} as const;

/** The activity feed — a dot rail with one line of text and a meta line. */
export function CustomerActivityCard() {
  const { activity } = customerDetail;

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white px-[17px] py-[15px] shadow-[var(--shadow-card)]">
      <h2 className="text-[14px] font-semibold text-slate-900">{activity.title}</h2>

      <ol className="flex w-full flex-col">
        {activity.items.map((item, index) => {
          const last = index === activity.items.length - 1;

          return (
            <li key={item.meta} className="flex w-full items-start gap-2.5">
              <span className="flex shrink-0 flex-col items-center self-stretch">
                <span className="flex h-[11px] w-[7px] items-start pt-1">
                  <span
                    className={cn("size-[7px] rounded-full", activityDotClass[item.dot])}
                  />
                </span>
                {!last ? (
                  <span className="flex w-[1.5px] flex-1 flex-col py-[3px]">
                    <span className="w-[1.5px] flex-1 bg-slate-200" />
                  </span>
                ) : null}
              </span>

              <span className={cn("flex flex-col gap-px self-stretch", !last && "pb-2.5")}>
                <span className="text-[12.5px] leading-[17.5px] text-slate-900">
                  {item.parts.map((part, i) =>
                    "mono" in part && part.mono ? (
                      <span key={i} className="tnum font-mono text-[11.5px] text-slate-600">
                        {part.text}
                      </span>
                    ) : "strong" in part && part.strong ? (
                      <span key={i} className="font-semibold">
                        {part.text}
                      </span>
                    ) : (
                      <span key={i}>{part.text}</span>
                    ),
                  )}
                </span>
                <span className="text-[11px] text-slate-400">{item.meta}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Bordered rows, each a tinted glyph tile plus label and date. */
export function CustomerCommunicationCard() {
  const { communication } = customerDetail;

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white px-[17px] py-[15px] shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-semibold text-slate-900">{communication.title}</h2>
        <button
          type="button"
          className="text-[12px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {communication.action}
        </button>
      </div>

      <div className="flex w-full flex-col gap-[7px]">
        {communication.items.map((item) => {
          const icon = COMMS_ICON[item.kind];

          return (
            <div
              key={item.label}
              className="flex w-full items-center gap-[9px] rounded-[10px] border border-slate-200 px-3 py-[9px]"
            >
              <span
                className={cn("grid size-[26px] shrink-0 place-items-center rounded-[7px]", icon.tile)}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-3"
                >
                  <path d={icon.path} />
                </svg>
              </span>

              <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-slate-900">
                {item.label}
              </span>
              <span className="shrink-0 text-[11px] text-slate-400">{item.date}</span>
            </div>
          );
        })}

        <button
          type="button"
          className="pt-px text-left text-[12px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {communication.viewAll}
        </button>
      </div>
    </section>
  );
}
