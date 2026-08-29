import { CheckSmallIcon } from "@/components/icons/figma-icons";
import { claimDetail } from "@/lib/claims";
import { cn } from "@/lib/cn";

/**
 * Claim timeline. The two frames differ in more than size: desktop runs the
 * timestamp inline after the title and carries a body line under it, while
 * mobile stacks a single meta line and drops the body — so the step renders
 * from different fields rather than the same ones scaled.
 */
export function ClaimTimeline({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";
  const { title, mobileTitle, steps } = claimDetail.timeline;

  return (
    <section
      className={cn(
        "flex w-full flex-col rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        mobile ? "gap-3 p-4" : "gap-3 px-[19px] py-[17px]",
      )}
    >
      <h2
        className={cn(
          "font-semibold text-slate-900",
          mobile ? "text-[15px] leading-[20px]" : "text-[14px]",
        )}
      >
        {mobile ? mobileTitle : title}
      </h2>

      <ol className="flex w-full flex-col">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;

          return (
            <li
              key={step.title}
              className={cn("flex w-full items-start", mobile ? "gap-[11px]" : "gap-3")}
            >
              {/* Rail: node, then a connector that stretches to the next row. */}
              <div className="flex shrink-0 flex-col items-center self-stretch">
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-xl border",
                    step.current
                      ? "border-blue-200 bg-blue-50"
                      : "border-green-200 bg-green-50",
                  )}
                >
                  {step.current ? (
                    <span className="size-[7px] rounded-full bg-blue-600" />
                  ) : (
                    <CheckSmallIcon className="size-2.5 text-green-700" />
                  )}
                </span>

                {!last ? (
                  <span className="flex w-[1.5px] flex-1 flex-col py-[3px]">
                    <span className="w-[1.5px] flex-1 bg-slate-200" />
                  </span>
                ) : null}
              </div>

              <div className={cn("flex flex-col gap-px self-stretch", !last && "pb-3")}>
                {mobile ? (
                  <>
                    <p
                      className={cn(
                        "text-[13.5px] leading-[18px] font-semibold",
                        step.current ? "text-blue-600" : "text-slate-900",
                      )}
                    >
                      {step.mobileTitle ?? step.title}
                    </p>
                    <p className="text-[12px] leading-[15px] text-slate-400">{step.mobileMeta}</p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "text-[13px] font-semibold",
                          step.current ? "text-blue-600" : "text-slate-900",
                        )}
                      >
                        {step.title}
                      </span>
                      <span className="text-[11.5px] text-slate-400">{step.time}</span>
                    </p>
                    <p className="text-[12.5px] text-slate-600">
                      {step.body}
                      {step.bodyStrong ? (
                        <span className="font-semibold text-slate-900">{step.bodyStrong}</span>
                      ) : null}
                    </p>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
