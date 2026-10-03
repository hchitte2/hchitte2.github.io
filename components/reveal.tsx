"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 },
  },
};

interface RevealGridProps {
  children: ReactNode;
  className?: string;
  /** "load" animates immediately (hero); "scroll" waits until in view. */
  trigger?: "load" | "scroll";
}

export function RevealGrid({ children, className, trigger = "scroll" }: RevealGridProps) {
  const reduce = useReducedMotion();

  if (trigger === "load") {
    return (
      <motion.div
        className={className}
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={tile} className={className}>
      {children}
    </motion.div>
  );
}
