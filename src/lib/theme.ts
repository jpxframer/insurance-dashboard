"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

/**
 * Theme preference, shared by the Settings and Profile pickers.
 *
 * The two frames label the third option differently — "Auto" on mobile,
 * "System" on desktop — but it is one preference, so both write `system`.
 */
export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "surebase-theme";

/** Fired when the picker writes, so every mounted picker re-reads at once. */
const THEME_EVENT = "surebase:theme";

const media = () =>
  typeof window === "undefined" ? null : window.matchMedia("(prefers-color-scheme: dark)");

/** Resolves `system` against the OS setting; the other two are literal. */
export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference !== "system") return preference;
  return media()?.matches ? "dark" : "light";
}

export function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Private browsing and blocked site data both throw here; the default holds.
  }
  return "system";
}

/** Stamps the resolved theme on `<html>`, which is what the CSS keys off. */
export function applyTheme(preference: ThemePreference) {
  document.documentElement.dataset.theme = resolveTheme(preference);
}

/**
 * Reads the stored preference, keeps `<html>` in step, and re-resolves when the
 * OS flips while `system` is selected.
 *
 * `useSyncExternalStore` rather than state in an effect: the preference lives
 * in localStorage, which is an external store, and this is what reads one
 * without a hydration mismatch. The server snapshot is `system`, so the markup
 * matches; the inline script in `layout.tsx` has already painted the right
 * theme by then, so nothing flashes.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  const mq = media();
  mq?.addEventListener("change", onChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    mq?.removeEventListener("change", onChange);
  };
}

export function useThemePreference() {
  const preference = useSyncExternalStore(
    subscribe,
    readThemePreference,
    () => "system" as ThemePreference,
  );

  // The OS can flip while `system` is selected, and `subscribe` already wakes
  // us for it — re-stamping here keeps the attribute honest without a second
  // listener.
  useEffect(() => {
    applyTheme(preference);
  }, [preference]);

  const choose = useCallback((next: ThemePreference) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Not being able to remember it should not stop it applying now.
    }
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { preference, choose };
}

/**
 * Runs before first paint, inlined in `<head>`. Reads the same key and stamps
 * the same attribute as `applyTheme`, so the page never paints light and then
 * flips.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var p=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(p!=="light"&&p!=="dark")p=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=p;}catch(e){}})();`;
