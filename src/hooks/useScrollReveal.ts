import { useEffect, useRef, useState } from "react";

/**
 * Hook that triggers a reveal animation when an element enters the viewport.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 *
 * @param options.threshold – fraction of element visible before triggering (0 → 1)
 * @param options.rootMargin – CSS margin around root (e.g. "0px 0px -80px 0px")
 * @param options.once – if true (default), stays revealed after first intersection
 */
export function useScrollReveal({
  threshold = 0,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion preference — show immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * Lightweight wrapper for staggered children.
 * Caps the maximum index to prevent extremely long delays on long lists.
 * Returns className + style for a child at a given index.
 */
export function staggerDelay(index: number, _passedDelay?: number) {
  // Ignore any passed delay and force a fast stagger of 50ms.
  // Cap at 8 items to prevent elements waiting more than 400ms to appear.
  const clampedIndex = Math.min(index, 8);
  const strictBaseDelay = 50;
  return {
    style: { transitionDelay: `${clampedIndex * strictBaseDelay}ms` } as React.CSSProperties,
  };
}
