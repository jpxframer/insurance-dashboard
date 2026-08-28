import Link from "next/link";
import { mobileTabs } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function MobileTabBar({ activeId }: { activeId: string }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex h-[75px] items-stretch">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === activeId;

          return (
            <li key={tab.id} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                  active ? "text-blue-600" : "text-slate-500",
                )}
              >
                <span className="relative">
                  <Icon className="size-6" />
                  {tab.badge ? (
                    <span className="absolute -right-3 -top-2 min-w-[20px] rounded-full bg-blue-600 px-1.5 py-px text-center text-[10px] font-semibold tabular-nums text-white ring-2 ring-white">
                      {tab.badge}
                    </span>
                  ) : null}
                </span>
                <span className="text-[11px] font-medium">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
