// Generic UI icons, drawn to match the 24x24 / 1.5px-stroke geometry of the
// Figma set in ./figma-icons.tsx so the two read as one family.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </Stroke>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M18.5 10.5a6.5 6.5 0 1 0-13 0c0 3-1.5 4.2-1.5 5.5h16c0-1.3-1.5-2.5-1.5-5.5Z" />
      <path d="M9.5 19a2.6 2.6 0 0 0 5 0" />
    </Stroke>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Stroke>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.3 2" />
    </Stroke>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 21.5c4.3-1.9 7-5.6 7-9.6V5.6L12 2.5 5 5.6v6.3c0 4 2.7 7.7 7 9.6Z" />
    </Stroke>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="3" />
      <path d="m4.5 8 6.2 4.3a2.3 2.3 0 0 0 2.6 0L19.5 8" />
    </Stroke>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" />
    </Stroke>
  );
}

export function SignOutIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M15 4.5h2.5A2.5 2.5 0 0 1 20 7v10a2.5 2.5 0 0 1-2.5 2.5H15" />
      <path d="M10.5 15.5 14 12l-3.5-3.5M14 12H4" />
    </Stroke>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </Stroke>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Stroke>
  );
}

/** Diagonal up-right arrow used by the "+3.2%" deltas and the claims-trend line. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </Stroke>
  );
}

/** Four-point sparkle marking the AI insight panels. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.5c.35 3.9 1.9 5.9 5.7 6.6-3.8.7-5.35 2.7-5.7 6.6-.35-3.9-1.9-5.9-5.7-6.6 3.8-.7 5.35-2.7 5.7-6.6Z" />
      <path d="M18.5 14.5c.2 2 1 3 2.9 3.4-1.9.4-2.7 1.4-2.9 3.4-.2-2-1-3-2.9-3.4 1.9-.4 2.7-1.4 2.9-3.4Z" />
    </svg>
  );
}
