import { Card } from "@/components/ui/Card";
import { upcomingRenewals } from "@/lib/data";

export function UpcomingRenewalsCard() {
  return (
    <Card className="p-4 lg:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-slate-900 lg:text-[15px]">
          {upcomingRenewals.title}
        </h2>
        <a
          href="#"
          className="text-[12.5px] font-medium text-blue-600 hover:underline"
        >
          {upcomingRenewals.allLabel}
        </a>
      </div>

      <ul className="mt-3 flex flex-col">
        {upcomingRenewals.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0 last:pb-0"
          >
            <span className="grid size-[38px] shrink-0 place-content-center rounded-[9px] border border-slate-200 text-center leading-none">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.04em] text-slate-400">
                {item.month}
              </span>
              <span className="tnum mt-0.5 block text-[13px] font-semibold text-slate-900">
                {item.day}
              </span>
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-medium text-slate-900">
                {item.name}
              </p>
              <p className="truncate text-[12px] text-slate-400">{item.kind}</p>
            </div>

            <span className="tnum shrink-0 text-[13px] font-semibold text-slate-900">
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
