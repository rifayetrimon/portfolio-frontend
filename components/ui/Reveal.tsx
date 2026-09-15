"use client";

import React, { useEffect, useRef } from "react";

/**
 * Entrance motion, driven by CSS in globals.css.
 *
 * - `up` / `down` / `left` / `right` — slide in along an axis
 * - `scale` — settle in from slightly small
 * - `pop`   — scale + lift with a springy overshoot
 * - `blur`  — focus-pull, for hero-weight content
 * - `rule`  — a divider that draws itself out from its origin
 */
export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "pop"
  | "blur"
  | "rule";

type Tag = "div" | "section" | "li" | "article" | "span" | "p" | "h2" | "h3";

const reveal = (el: Element) => el.setAttribute("data-revealed", "true");

/* ------------------------------------------------------------------ *
 * Safety sweep
 *
 * IntersectionObserver with threshold 0 only fires when the intersection
 * ratio actually changes. An element that sits below the fold and ends up
 * above it within a single frame — dragging the scrollbar to the bottom,
 * pressing End, a hard `scrollTo` — never reports a change, so it would
 * stay at opacity 0 forever. One shared, debounced listener re-checks any
 * still-pending elements after scrolling settles, then detaches itself
 * once everything has been revealed.
 * ------------------------------------------------------------------ */

const pending = new Set<Element>();
let sweepTimer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

const sweep = () => {
  const limit = window.innerHeight;
  for (const el of [...pending]) {
    if (el.getBoundingClientRect().top < limit) {
      reveal(el);
      pending.delete(el);
    }
  }
  if (pending.size === 0) stopSweeping();
};

const onScroll = () => {
  if (sweepTimer) clearTimeout(sweepTimer);
  sweepTimer = setTimeout(sweep, 150);
};

const startSweeping = () => {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
};

const stopSweeping = () => {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (sweepTimer) clearTimeout(sweepTimer);
  sweepTimer = null;
};

/**
 * Watches `ref` and flips `data-revealed` the first time it reaches the
 * viewport. Shared by Reveal (animates itself) and Stagger (animates its
 * children in sequence).
 */
function useRevealOnce(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour the OS setting, and degrade gracefully on very old browsers.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      reveal(el);
      return;
    }

    const done = () => {
      reveal(el);
      pending.delete(el);
      observer.disconnect(); // reveal once, don't re-hide on scroll back up
      if (pending.size === 0) stopSweeping();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past, for the frames where
          // the observer does report a change but the element is above the fold.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) done();
        }
      },
      // Trigger a little before the element is fully on screen.
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    pending.add(el);
    startSweeping();

    return () => {
      observer.disconnect();
      pending.delete(el);
      if (pending.size === 0) stopSweeping();
    };
  }, [ref]);
}

const motionVars = (delay: number, duration?: number): React.CSSProperties | undefined => {
  if (!delay && !duration) return undefined;
  const style: Record<string, string> = {};
  if (delay) style["--reveal-delay"] = `${delay}ms`;
  if (duration) style["--reveal-duration"] = `${duration}ms`;
  return style as React.CSSProperties;
};

/* ==================== Reveal ==================== */

type RevealProps = {
  /** Optional: a `rule` divider renders nothing inside. */
  children?: React.ReactNode;
  /** Entrance style. Defaults to a lift from below. */
  variant?: RevealVariant;
  /** Hold before starting, in ms. */
  delay?: number;
  /** Override the transition length, in ms. */
  duration?: number;
  as?: Tag;
  className?: string;
};

/**
 * Animates itself into place the first time it scrolls into view.
 *
 * The hidden state lives in CSS behind a `.has-js` class on <html> (set by the
 * pre-paint script in layout.tsx), so if scripts fail the content simply renders
 * visible instead of being stuck at opacity 0. Reduced-motion users skip the
 * animation entirely — see globals.css.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  variant = "up",
  delay = 0,
  duration,
  as: Tag = "div",
  className = "",
}) => {
  const ref = useRef<HTMLElement>(null);
  useRevealOnce(ref);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={variant}
      style={motionVars(delay, duration)}
      className={className}
    >
      {children}
    </Tag>
  );
};

/* ==================== Stagger ==================== */

type StaggerProps = {
  children: React.ReactNode;
  /** Entrance style applied to each direct child. */
  variant?: Exclude<RevealVariant, "rule">;
  /** Gap between consecutive children, in ms. */
  step?: number;
  /** Hold before the first child starts, in ms. */
  delay?: number;
  duration?: number;
  as?: Tag;
  className?: string;
};

/**
 * Animates its DIRECT CHILDREN in sequence when the group reaches the viewport.
 *
 * The container is the only thing observed, and the per-child offset comes from
 * `:nth-child` rules in CSS — so children need no wrapper elements and don't
 * have to forward a style prop. That matters because these sit directly inside
 * CSS grids, where an extra wrapper div would break the layout.
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  variant = "up",
  step = 90,
  delay = 0,
  duration,
  as: Tag = "div",
  className = "",
}) => {
  const ref = useRef<HTMLElement>(null);
  useRevealOnce(ref);

  const style: Record<string, string> = {};
  if (step !== 90) style["--stagger-step"] = `${step}ms`;
  if (delay) style["--stagger-base"] = `${delay}ms`;
  if (duration) style["--reveal-duration"] = `${duration}ms`;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-stagger={variant}
      style={Object.keys(style).length ? (style as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
