const TONE_CLASS = {
  blue: "text-blue-600",
  green: "text-green-600",
  amber: "text-amber-500",
  slate: "text-slate-400",
} as const;

export type SparkTone = keyof typeof TONE_CLASS;

type SparklineProps = {
  points: number[];
  tone?: SparkTone;
  className?: string;
};

/**
 * The small trend line on each stat tile. Drawn into a fixed 100x32 viewBox and
 * stretched by CSS, with `vectorEffect` keeping the stroke a true 1.5px at any
 * rendered width.
 */
export function Sparkline({ points, tone = "blue", className }: SparklineProps) {
  if (points.length < 2) return null;

  const width = 100;
  const height = 32;
  const pad = 3;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  const d = points
    .map((value, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={[TONE_CLASS[tone], className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
