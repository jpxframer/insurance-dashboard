import { ArrowRightIcon, SparkleIcon } from "@/components/icons/ui-icons";
import { aiInsights } from "@/lib/data";

/** Desktop: a tinted panel holding one white card per insight. */
export function AiInsightsCard() {
  return (
    <section className="hidden rounded-[14px] border border-blue-200 bg-blue-50/60 p-4 lg:flex lg:flex-col lg:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <SparkleIcon className="size-4 text-blue-600" />
          {aiInsights.title}
        </h2>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-600">
          {aiInsights.badge}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {aiInsights.items.map((item) => (
          <li
            key={item.id}
            className="rounded-[10px] border border-blue-200/70 bg-white p-3"
          >
            <p className="text-[12.5px] leading-[1.5] text-slate-700">
              {item.body}{" "}
              <a
                href="#"
                className="whitespace-nowrap font-medium text-blue-600 hover:underline"
              >
                {item.action} <ArrowRightIcon className="inline size-3 align-[-1px]" />
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Mobile: one longer-form insight instead of the stack. */
export function MobileAiInsight() {
  return (
    <section className="rounded-[14px] border border-blue-200 bg-blue-50/60 p-4 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <SparkleIcon className="size-4 text-blue-600" />
          {aiInsights.mobile.title}
        </h2>
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11.5px] font-medium text-blue-600">
          {aiInsights.badge}
        </span>
      </div>

      <p className="mt-3 text-[13.5px] leading-[1.55] text-slate-700">
        {aiInsights.mobile.body}
      </p>

      <a
        href="#"
        className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-blue-600"
      >
        {aiInsights.mobile.action}
        <ArrowRightIcon className="size-4" />
      </a>
    </section>
  );
}
