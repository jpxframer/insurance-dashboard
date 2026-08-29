import { cn } from "@/lib/cn";
import { tagToneClass, type InboxTag } from "@/lib/inbox";

/**
 * The CLAIM / RENEWAL / INTERNAL chip and its mono reference.
 *
 * Both breakpoints draw this identically, so it is shared.
 *
 * The padding is one value for all three tones on purpose: Figma strokes sit
 * inside the frame, so the bordered tones spend 1px of each edge on their
 * border and land at 17px tall, while unbordered INTERNAL keeps the padding and
 * lands at 15. The 2px difference is the border, not a different chip.
 */
export function InboxTagChip({
  tag,
  reference,
  className,
}: {
  tag: InboxTag;
  reference?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-[5px]", className)}>
      <span
        className={cn(
          "rounded-[5px] px-[6px] py-px text-[10px] leading-[13px] font-semibold",
          tagToneClass[tag.tone],
        )}
      >
        {tag.label}
      </span>

      {reference ? (
        <span className="tnum font-mono text-[10.5px] leading-[14px] text-slate-400">
          {reference}
        </span>
      ) : null}
    </div>
  );
}
