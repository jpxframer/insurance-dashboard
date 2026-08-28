"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons/ui-icons";
import { Card } from "@/components/ui/Card";
import { tasks } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * The card lists four tasks but summarises five — the design shows a truncated
 * list, so `progressLabel` is the whole set's count and stays as authored.
 */
export function TasksCard() {
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(tasks.items.map((task) => [task.id, task.done])),
  );

  return (
    <Card className="p-4 lg:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-slate-900">{tasks.title}</h2>
        <span className="text-[12px] text-slate-400">{tasks.progressLabel}</span>
      </div>

      <ul className="mt-3 flex flex-col">
        {tasks.items.map((task) => {
          const checked = done[task.id];

          return (
            <li
              key={task.id}
              className={cn("py-2.5", task.desktopOnly && "hidden lg:block")}
            >
              <label className="flex cursor-pointer items-center gap-3">
                <span className="relative grid shrink-0 place-items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                      setDone((prev) => ({ ...prev, [task.id]: event.target.checked }))
                    }
                    className="peer size-[18px] cursor-pointer appearance-none rounded-[5px] border border-slate-300 bg-white transition-colors checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  />
                  <CheckIcon
                    className="pointer-events-none absolute size-3 text-white opacity-0 peer-checked:opacity-100"
                    strokeWidth={2.5}
                  />
                </span>

                <span
                  className={cn(
                    "flex-1 text-[13.5px]",
                    checked ? "text-slate-400 line-through" : "text-slate-700",
                  )}
                >
                  {task.label}
                </span>

                {task.due && !checked ? (
                  <>
                    <span className="hidden shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600 lg:inline">
                      {task.due}
                    </span>
                    <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[11.5px] font-medium text-red-600 lg:hidden">
                      {task.mobileDue ?? task.due}
                    </span>
                  </>
                ) : null}
              </label>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
