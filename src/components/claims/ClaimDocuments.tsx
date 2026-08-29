import { claimDetail, documentStateLabels, type ClaimDocument } from "@/lib/claims";
import { cn } from "@/lib/cn";

const KIND_CLASS: Record<ClaimDocument["kind"], string> = {
  ZIP: "bg-blue-50 text-blue-600",
  PDF: "bg-red-50 text-red-600",
};

/**
 * Supporting documents.
 *
 * Desktop lays the three files across one row, folding status into the muted
 * meta line. Mobile stacks them and lifts the status into a pill on the right,
 * which is why the two states come from separate fields in the data.
 */
export function ClaimDocuments({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";
  const { title, mobileTitle, uploadLabel, items } = claimDetail.documents;

  return (
    <section
      className={cn(
        "flex w-full flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        mobile ? "p-4" : "px-[19px] py-[17px]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          className={cn(
            "font-semibold text-slate-900",
            mobile ? "text-[15px] leading-[20px]" : "text-[14px]",
          )}
        >
          {mobile ? mobileTitle : title}
        </h2>
        <button
          type="button"
          className={cn(
            "font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
            mobile ? "text-[13px]" : "text-[12.5px]",
          )}
        >
          {uploadLabel}
        </button>
      </div>

      <ul className={cn("flex w-full", mobile ? "flex-col gap-2" : "gap-2")}>
        {items.map((doc) => (
          <li
            key={doc.name}
            className={cn(
              "flex min-w-0 items-center rounded-[10px] border border-slate-200",
              mobile
                ? "min-h-[66px] w-full gap-[11px] rounded-[11px] px-[13px] py-4"
                : "flex-1 gap-2.5 px-3 py-2.5",
            )}
          >
            <span
              className={cn(
                "grid shrink-0 place-items-center rounded-lg text-[9px] font-semibold",
                mobile ? "size-8" : "size-[30px]",
                KIND_CLASS[doc.kind],
              )}
            >
              {doc.kind}
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span
                className={cn(
                  "truncate font-medium text-slate-900",
                  mobile ? "text-[13px]" : "text-[12.5px]",
                )}
              >
                {doc.name}
              </span>
              <span
                className={cn(
                  "truncate text-[11px]",
                  mobile
                    ? "text-slate-400"
                    : doc.state === "verified"
                      ? "text-green-700"
                      : "text-amber-700",
                )}
              >
                {mobile ? doc.mobileMeta : doc.meta}
              </span>
            </span>

            {mobile ? (
              <span
                className={cn(
                  "shrink-0 rounded-[20px] px-[7px] py-0.5 text-[10px] font-semibold",
                  doc.state === "verified"
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700",
                )}
              >
                {documentStateLabels[doc.state]}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
