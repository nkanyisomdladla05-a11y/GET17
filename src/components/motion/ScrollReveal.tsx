"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Global GSAP ScrollTrigger: every element with `.reveal` fades and slides in
 * once it enters the viewport. Elements with `data-stagger` reveal their
 * direct children in sequence.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Content stays visible; no hiding class is ever added.
      document.documentElement.classList.remove("has-motion");
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    // Only now do we allow .reveal elements to start hidden.
    document.documentElement.classList.add("has-motion");
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onStart: () => el.classList.add("is-visible"),
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        const children = Array.from(el.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
