"use client";

import { useEffect, useRef, useState } from "react";
import { HeroEmblemCanvas, MarketCanvas } from "@/components/three/SceneCanvas";
import type { MarketMode } from "@/components/three/MarketScene";
import { PAIRS } from "@/components/three/candles";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";

const headlineLines = [
  { text: "Revolutionize", accent: false },
  { text: "your trading.", accent: true },
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [pairIndex, setPairIndex] = useState(0);
  const [mode, setMode] = useState<MarketMode>("candles");
  const pair = PAIRS[pairIndex];

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-line", { y: 80, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.25")
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.4")
        .from(".hero-chip", { y: 16, opacity: 0, duration: 0.45, stagger: 0.06 }, "-=0.35")
        .from(".hero-emblem", { scale: 0.82, opacity: 0, duration: 1.3, ease: "power2.out" }, "-=1.2")
        .from(".hero-stage", { y: 40, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });

      gsap.to(".hero-parallax-slow", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-parallax-fast", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative overflow-hidden bg-paper-2 pt-36 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="hero-parallax-slow pointer-events-none absolute -top-24 right-[-8%] h-[560px] w-[560px] rounded-full bg-brand/12 blur-[130px]" />
      <div className="hero-parallax-slow pointer-events-none absolute bottom-20 left-[-12%] h-[420px] w-[420px] rounded-full bg-brand-3/18 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-4">
          <div className="hero-parallax-fast relative z-10">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bull" />
                Live · GOLD, NASDAQ &amp; US30
              </p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
                {headlineLines.map((l) => (
                  <span key={l.text} className="block overflow-hidden">
                    <span className={`hero-line block ${l.accent ? "text-gradient" : "text-ink"}`}>
                      {l.text}
                    </span>
                  </span>
                ))}
              </h1>
              <p className="hero-sub mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                {site.subline} Semi-automated robots for GOLD, NASDAQ, US30,
                majors and crypto — plus mentorship videos so you trade exactly
                like we do.
              </p>
              <div className="hero-cta mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/store">
                  Get this offer today
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </ButtonLink>
                <ButtonLink href="#live-trading" variant="outline">
                  Watch the Short
                </ButtonLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["Once-off fee", "3 years access"],
                  ["Mentorship", "videos included"],
                  [site.promo.code, "pay 75% now"],
                ].map(([a, b]) => (
                  <div key={a} className="hero-chip rounded-2xl border border-line bg-white/70 px-3.5 py-2.5">
                    <p className="text-sm font-bold text-ink">{a}</p>
                    <p className="text-xs text-mist">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-emblem relative h-[380px] sm:h-[480px] lg:h-[560px]">
            <HeroEmblemCanvas scrollRef={scrollRef} />
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-mono text-[11px] uppercase tracking-widest text-mist">
              Move your cursor · scroll to spin the Empire gear
            </p>
          </div>
        </div>

        <div className="hero-stage relative mt-8 sm:mt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white/50 shadow-[0_20px_60px_rgba(17,17,17,0.08)] backdrop-blur-md">
            <div className="flex flex-col gap-3 border-b border-line bg-white/70 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Currency pair">
                {PAIRS.map((p, i) => (
                  <button
                    key={p.symbol}
                    role="tab"
                    aria-selected={i === pairIndex}
                    onClick={() => setPairIndex(i)}
                    className={`rounded-full px-3 py-1.5 font-mono text-xs font-semibold transition ${
                      i === pairIndex
                        ? "bg-brand text-white shadow"
                        : "text-mist hover:bg-brand-soft hover:text-brand"
                    }`}
                  >
                    {p.symbol}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 rounded-full border border-line bg-paper-2 p-1 text-xs font-semibold">
                {(
                  [
                    ["candles", "3D Candlesticks"],
                    ["depth", "Depth of Market"],
                  ] as [MarketMode, string][]
                ).map(([m, label]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-full px-3 py-1.5 transition ${
                      mode === m ? "bg-ink text-white" : "text-mist hover:text-ink"
                    }`}
                    aria-pressed={mode === m}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(70,51,185,0.08),transparent_60%)] sm:h-[520px] lg:h-[600px]">
              <MarketCanvas pair={pair} mode={mode} scrollRef={scrollRef} />
              <div className="glass-panel pointer-events-none absolute left-4 top-4 rounded-xl px-3 py-2">
                <p className="font-mono text-xs font-bold text-ink">
                  {pair.symbol} <span className="text-mist">· {pair.label}</span>
                </p>
                <p className="text-[11px] text-mist">
                  {mode === "candles"
                    ? "Live candles · hover for OHLC"
                    : "Order-book depth · bids vs asks"}
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-widest text-mist">
                <span>drag to tilt · scroll to zoom</span>
                <span className="hidden sm:inline">page scroll flies the camera</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16 sm:h-20" />
    </div>
  );
}
