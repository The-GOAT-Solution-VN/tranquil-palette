"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Scroll-linked parallax translateY. `speed` mirrors the original `data-parallax`
 * factor: positive moves with scroll, negative against. Disabled under
 * prefers-reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.05,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Translate across the element's travel through the viewport.
  const range = 220 * speed * 6;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
