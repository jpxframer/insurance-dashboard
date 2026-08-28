import { PlusIcon } from "@/components/icons/ui-icons";
import { quickActions } from "@/lib/data";

/** The paired CTAs that sit under the stat grid on mobile only. */
export function MobileQuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:hidden">
      <button
        type="button"
        className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-blue-600 text-[15px] font-medium text-white shadow-[0_4px_12px_-2px_rgb(37_99_235/0.35)] transition-colors active:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <PlusIcon className="size-5" />
        {quickActions.primary}
      </button>

      <button
        type="button"
        className="flex h-[52px] items-center justify-center rounded-[14px] border border-slate-200 bg-white text-[15px] font-medium text-slate-700 transition-colors active:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {quickActions.secondary}
      </button>
    </div>
  );
}
