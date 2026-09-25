"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className = "", max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !ref.current || e.pointerType === "touch") return;
    const { gsap } = getGsap();
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, {
      rotateY: px * max,
      rotateX: -py * max,
      y: -6,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    const { gsap } = getGsap();
    gsap.to(ref.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
