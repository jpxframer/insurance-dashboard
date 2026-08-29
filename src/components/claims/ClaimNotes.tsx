import Image from "next/image";
import { claimDetail } from "@/lib/claims";
import { cn } from "@/lib/cn";

/**
 * Internal notes. Desktop carries the composer under the thread and grows to
 * fill the column; the mobile frame shows the thread alone, since the action
 * bar owns the bottom of that screen.
 */
export function ClaimNotes({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";
  const { title, badge, items, composerPlaceholder, composerInitials } = claimDetail.notes;

  return (
    <section
      className={cn(
        "flex w-full flex-col rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        mobile ? "p-4" : "min-h-0 flex-1 px-[19px] py-[17px]",
      )}
    >
      <div className="flex items-center justify-between gap-3 pb-2.5">
        <h2
          className={cn(
            "font-semibold text-slate-900",
            mobile ? "text-[15px] leading-[20px]" : "text-[14px]",
          )}
        >
          {title}
        </h2>
        <span className="rounded-md bg-slate-100 px-[7px] py-0.5 text-[10.5px] font-semibold text-slate-600">
          {badge}
        </span>
      </div>

      <div className="flex w-full flex-col gap-[9px]">
        {items.map((note) => (
          <div key={note.author + note.date} className="flex w-full items-start gap-[9px]">
            <Image
              src={note.avatar}
              alt=""
              width={26}
              height={26}
              className={cn(
                "shrink-0 rounded-xl object-cover",
                mobile ? "size-[26px]" : "size-6",
              )}
            />

            {/* Square top-left corner points the bubble at its author. */}
            <div className="flex min-w-0 flex-1 flex-col gap-px rounded-[10px] rounded-tl-none border border-slate-200 bg-slate-50 px-3 py-[9px]">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[12px] leading-4 font-semibold text-slate-900">
                  {note.author}
                </span>
                <span className="shrink-0 text-[11px] text-slate-400">{note.date}</span>
              </div>
              <p className="text-[12.5px] leading-[18.33px] text-slate-600">
                {mobile ? note.mobileBody : note.body}
              </p>
            </div>
          </div>
        ))}

        {!mobile ? (
          <div className="flex w-full items-center gap-[9px]">
            <span className="grid size-6 shrink-0 place-items-center rounded-xl bg-blue-100 text-[10px] font-semibold text-blue-600">
              {composerInitials}
            </span>
            <label className="min-w-0 flex-1">
              <span className="sr-only">Add a note</span>
              <input
                type="text"
                placeholder={composerPlaceholder}
                className="h-9 w-full rounded-[9px] border border-slate-200 px-3 text-[12.5px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
              />
            </label>
          </div>
        ) : null}
      </div>
    </section>
  );
}
