"use client";

import { useId } from "react";

type Point = { month: string; value: number };

type AreaChartProps = {
  points: Point[];
  /** Which month labels to print along the x-axis. */
  ticks: string[];
  className?: string;
};

/**
 * The revenue-trend chart: three horizontal rules, a filled area fading to
 * transparent, the line itself, and a dot on the final point.
 *
 * Drawn in a 100x100 viewBox with `preserveAspectRatio="none"` so it fills
 * whatever box it is given. Strokes and the end dot are size-corrected so the
 * horizontal stretch does not distort them.
 */
export function AreaChart({ points, ticks, className }: AreaChartProps) {
  const gradientId = useId();

  const min = Math.min(...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value));
  const span = max - min || 1;
  const top = 8;
  const bottom = 92;

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * 100,
    y: bottom - ((p.value - min) / span) * (bottom - top),
  }));

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(2)} ${c.y.toFixed(2)}`)
    .join(" ");
  const area = `${line} L100 100 L0 100 Z`;
  const last = coords[coords.length - 1];

  return (
    <div className={["flex flex-col", className].filter(Boolean).join(" ")}>
      <div className="relative min-h-0 w-full flex-1">
        {/*
          Absolutely positioned so the box is definite. With only `h-full`, a
          percentage height against a flex-sized parent can fail to resolve and
          the SVG falls back to its 1:1 viewBox ratio — which makes it as tall
          as it is wide and spills out of the card.
        */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[8, 38, 68].map((y) => (
            <line
              key={y}
              x1="0"
              x2="100"
              y1={y}
              y2={y}
              stroke="#f1f5f9"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={area} fill={`url(#${gradientId})`} />
          <path
            d={line}
            fill="none"
            stroke="#2563eb"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/*
          The end dot sits in an overlay rather than the stretched SVG, so it
          stays a circle instead of being squashed into an ellipse.
        */}
        <span
          className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600"
          style={{ left: `${last.x}%`, top: `${last.y}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-3 flex shrink-0 justify-between text-[11px] text-slate-400">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
