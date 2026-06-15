"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Scroll-reveal wrapper — opacity + 28px rise, matching the original export's
 * IntersectionObserver reveal. Honors prefers-reduced-motion (renders instantly).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.9,
        delay: delay / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
