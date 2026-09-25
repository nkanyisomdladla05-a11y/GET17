"use client";

/**
 * Shared motion scale for every 3D scene.
 * Resting motion stays slow. Scrolling the page pushes it up to about 8x.
 * Hover is applied per scene on top of that.
 */

let velocity = 0;
let lastY = 0;
let started = false;

export function bindScrollDrive() {
  if (started || typeof window === "undefined") return;
  started = true;
  lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const kick = Math.min(1, Math.abs(y - lastY) / 12);
      if (kick > velocity) velocity = kick;
      lastY = y;
    },
    { passive: true }
  );
  const decay = () => {
    velocity *= 0.9;
    if (velocity < 0.012) velocity = 0;
    requestAnimationFrame(decay);
  };
  requestAnimationFrame(decay);
}

if (typeof window !== "undefined") bindScrollDrive();

/** 1 at rest, about 8 while the page is scrolling. */
export function scrollScale() {
  return 1 + velocity * 7;
}

/** Hover on this scene jumps the scale to at least 8. */
export function motionScale(hover: boolean) {
  const scroll = scrollScale();
  return hover ? Math.max(8, scroll) : scroll;
}

/** True while the user is actively scrolling. Candle ticks read this. */
export function isScrolling() {
  return velocity > 0.08;
}
