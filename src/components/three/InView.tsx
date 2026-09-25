"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mount WebGL only while the block is near the viewport.
 * Off-screen scenes are removed so they stop costing a graphics context.
 */
export function InView({
  children,
  eager = false,
}: {
  children: ReactNode;
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(eager);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    let hideTimer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(hideTimer);
        if (entry.isIntersecting) {
          setShow(true);
          return;
        }
        hideTimer = window.setTimeout(() => setShow(false), 500);
      },
      { rootMargin: "220px" }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(hideTimer);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {show ? children : null}
    </div>
  );
}
