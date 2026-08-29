"use client";

import { useEffect, useRef } from "react";

/**
 * Closes a popover on Escape or on a pointer press outside of it, and returns
 * the ref to attach to the popover's outermost element.
 *
 * `ignore` is for the trigger button: without it, clicking the trigger while
 * open would close via this handler and immediately reopen via the button's
 * own onClick.
 *
 * An instance whose popover is not visible does nothing — see `onPointerDown`.
 */
export function useDismissable<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
  ignore?: React.RefObject<HTMLElement | null>,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    function onPointerDown(event: PointerEvent) {
      const el = ref.current;

      /*
        Both breakpoints' headers stay mounted — one is only hidden by CSS — so
        two of these can be live against a single piece of open state. The
        hidden one must sit out: its trigger is not the button being pressed, so
        it reads every press as "outside" and closes, and the visible button's
        own onClick then toggles straight back open. The popover appears stuck.

        `getClientRects` is empty for a `display: none` subtree and works for
        fixed elements, where `offsetParent` does not.
      */
      if (!el || el.getClientRects().length === 0) return;

      const target = event.target as Node;
      if (el.contains(target)) return;
      if (ignore?.current?.contains(target)) return;
      onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose, ignore]);

  return ref;
}
