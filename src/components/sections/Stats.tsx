"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/data/site";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

export function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const nodes = root.current.querySelectorAll<HTMLElement>("[data-count]");
    if (prefersReducedMotion()) {
      nodes.forEach((n) => (n.textContent = n.dataset.count ?? ""));
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      nodes.forEach((n) => {
        const target = Number(n.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
          onUpdate: () => {
            n.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="glass grid gap-6 rounded-[2rem] p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              <span data-count={s.value}>0</span>
              <span className="text-brand">{s.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-mist">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-mist">
        Figures describe the product package, not trading results. Trading involves risk.
      </p>
    </div>
  );
}
