"use client";

import { useEffect, useRef } from "react";

/**
 * Closes a popover on Escape or on a pointer press outside of it, and returns
 * the ref to attach to the popover's outermost element.
 *
 * `ignore` is for the trigger button: without it, clicking the trigger while
 * open would close via this handler and immediately reopen via the button's
 * own onClick.
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
      const target = event.target as Node;
      if (ref.current?.contains(target)) return;
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
