import type { ReactNode } from "react";
import { customerDetail } from "@/lib/customers";

/**
 * The 280px left column of the detail: contact, relationship manager, notes.
 * Three cards under one uppercase-label shell, like the claims aside.
 */
function AsideCard({
  label,
  action,
  children,
  grow,
}: {
  label: string;
  action?: string;
  children: ReactNode;
  grow?: boolean;
}) {
  return (
    <section
      className={
        "flex w-full flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white p-[17px] shadow-[var(--shadow-card)]" +
        (grow ? " min-h-0 flex-1" : "")
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11.5px] font-semibold tracking-[0.69px] text-slate-400 uppercase">
          {label}
        </h2>
        {action ? (
          <button
            type="button"
            className="text-[12px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function CustomerAside() {
  const { contact, manager, notes } = customerDetail;
  const contactRows = contact.rows.filter((row) => !row.desktopHidden);

  return (
    <aside className="hidden w-[280px] shrink-0 flex-col gap-4 lg:flex">
      <AsideCard label={contact.label} action={contact.action}>
        <div className="flex flex-col gap-2">
          {contactRows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3">
              <span className="text-[12.5px] whitespace-nowrap text-slate-400">
                {row.label}
              </span>
              <span className="text-right text-[12.5px] font-medium whitespace-nowrap text-slate-900">
                {row.value}
                {row.value2 ? (
                  <>
                    <br />
                    {row.value2}
                  </>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </AsideCard>

      <AsideCard label={manager.label}>
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-100 text-[12px] font-semibold text-slate-600"
          >
            {manager.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-slate-900">
              {manager.name}
            </p>
            <p className="truncate text-[11.5px] text-slate-400">{manager.role}</p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 border-t border-slate-100 pt-3">
          <span className="text-[12px] whitespace-nowrap text-slate-400">
            {manager.touchpointLabel}
          </span>
          <span className="text-[12px] font-medium whitespace-nowrap text-slate-900">
            {manager.touchpointValue}
          </span>
        </div>
      </AsideCard>

      <AsideCard label={notes.label} action={notes.action} grow>
        <div className="flex flex-col gap-2">
          {notes.items.map((note) => (
            <div
              key={note.meta}
              className="flex flex-col gap-1 rounded-[9px] border border-slate-200 bg-slate-50 px-[11px] pt-2 pb-[9px]"
            >
              <p className="text-[12px] leading-[17.4px] text-slate-600">{note.body}</p>
              <p className="text-[10.5px] text-slate-400">{note.meta}</p>
            </div>
          ))}
        </div>
      </AsideCard>
    </aside>
  );
}
