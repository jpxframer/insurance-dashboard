import { cn } from "@/lib/cn";

type Series = {
  id: string;
  label: string;
  /** Tailwind text colour; the stroke uses `currentColor`. */
  className: string;
  points: number[];
};

/**
 * Multi-series line chart — distinct from `AreaChart`, which fills a single
 * series under its curve. Here the frame draws two bare 1.93px lines over four
 * gridlines, with no fill and no axis rules.
 *
 * Values arrive in the frame's own plot units (0 on the baseline, `height` at
 * the top), so the curve is reproduced rather than re-derived. `vectorEffect`
 * keeps the stroke a true width at any rendered size, as in `Sparkline`.
 */
export function LineChart({
  series,
  height,
  gridlines,
  className,
}: {
  series: Series[];
  height: number;
  gridlines: number[];
  className?: string;
}) {
  const width = 1000;

  const path = (points: number[]) =>
    points
      .map((value, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - value;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("block w-full", className)}
      style={{ height }}
      role="img"
      aria-label={series.map((s) => s.label).join(" and ")}
    >
      {gridlines.map((value) => (
        <line
          key={value}
          x1={0}
          x2={width}
          y1={height - value}
          y2={height - value}
          className="text-slate-100"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {series.map((item) => (
        <path
          key={item.id}
          d={path(item.points)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.93}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={item.className}
        />
      ))}
    </svg>
  );
}
