import { useLayoutEffect, useRef, type RefObject } from "react";

const modalStack: HTMLElement[] = [];
let originalOverflow = "";

/** Isolate an open modal, contain focus, and restore the invoking control. */
export function useModalFocus(
  open: boolean,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useLayoutEffect(() => {
    const modal = ref.current;
    if (!open || !modal) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const isolated: { element: HTMLElement; inert: boolean }[] = [];
    // Isolate siblings at every ancestor, without making the dialog itself inert.
    for (let node: HTMLElement = modal; node.parentElement; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling !== node && sibling instanceof HTMLElement && sibling.getAttribute("aria-hidden") !== "true") {
          isolated.push({ element: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      }
    }
    if (!modalStack.length) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    modalStack.push(modal);
    const isTop = () => modalStack.at(-1) === modal;
    const controls = () => Array.from(modal.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]',
    )).filter(element => element.tabIndex >= 0 && !element.matches(':disabled') &&
      !element.closest('[inert], [hidden], [aria-hidden="true"]') &&
      element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
    const focusFirst = () => (controls()[0] ?? modal).focus({ preventScroll: true });
    const available = controls();
    const preferred = initialFocus?.current;
    (preferred && available.includes(preferred) ? preferred : available[0] ?? modal)
      .focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (!isTop()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeRef.current();
      } else if (event.key === "Tab") {
        const items = controls();
        const first = items[0];
        const last = items.at(-1);
        if (!first) {
          event.preventDefault();
          modal.focus();
        } else if (!modal.contains(document.activeElement) || document.activeElement === modal ||
          (event.shiftKey && document.activeElement === first) ||
          (!event.shiftKey && document.activeElement === last)) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (isTop() && !modal.contains(event.target as Node)) focusFirst();
    };
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocus);
      modalStack.splice(modalStack.indexOf(modal), 1);
      isolated.forEach(({ element, inert }) => { element.inert = inert; });
      if (!modalStack.length) document.body.style.overflow = originalOverflow;
      if (trigger?.isConnected && !trigger.closest("[inert]")) trigger.focus({ preventScroll: true });
    };
  }, [open, initialFocus]);

  return ref;
}
