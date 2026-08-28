type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Minimal class joiner. Deliberately not tailwind-merge — no component here
 * takes a `className` that needs to override its own base utilities.
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }
  return out.join(" ");
}
