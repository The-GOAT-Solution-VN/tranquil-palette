"use client";

import { useEffect, useState } from "react";

/**
 * Reliable prefers-reduced-motion hook. Reads the media query on mount and
 * subscribes to changes. (motion's own useReducedMotion did not reflect the
 * query consistently at first paint, so we own this to keep reveals honest.)
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Syncing React state from a browser API (matchMedia) on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduce;
}
