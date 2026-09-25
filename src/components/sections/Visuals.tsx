"use client";

import { TiltCard } from "@/components/motion/TiltCard";
import { Section } from "@/components/ui/Section";
import { GearCanvas } from "@/components/three/SceneCanvas";
import { photos } from "@/data/photos";

const shots = [
  {
    src: photos.charts,
    alt: "Forex candlestick charts on a trading screen",
    caption: "Live candlestick tape",
    tag: "XAUUSD",
  },
  {
    src: photos.markets,
    alt: "Digital market data and crypto price boards",
    caption: "Multi-asset coverage",
    tag: "BTC · NAS100",
  },
  {
    src: photos.desk,
    alt: "Trader reviewing financial charts",
    caption: "Mentorship in the session",
    tag: "US30",
  },
];

export function Visuals() {
  return (
    <Section
      id="visuals"
      eyebrow="The floor, in 3D"
      title={
        <>
          Markets you can <span className="text-gradient">see and spin.</span>
        </>
      }
      intro="Interactive 3D emblems sit next to real trading photography. Hover or drag the gear, tilt the cards, then drop into the hero chart to fly through live candles and order-book depth."
    >
      <div className="grid gap-5 lg:grid-cols-12" data-stagger>
        <TiltCard className="glass relative overflow-hidden rounded-[2rem] lg:col-span-5">
          <div className="relative h-72 sm:h-80">
            <GearCanvas />
            <p className="pointer-events-none absolute bottom-5 left-0 right-0 text-center text-xs font-semibold uppercase tracking-widest text-mist">
              Drag the Empire gear
            </p>
          </div>
        </TiltCard>

        {shots.map((s, i) => (
          <TiltCard
            key={s.src}
            className={`glass group relative overflow-hidden rounded-[2rem] ${
              i === 0 ? "lg:col-span-7" : "lg:col-span-4"
            }`}
            max={6}
          >
            <div className={`relative ${i === 0 ? "h-72 sm:h-80" : "h-64"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                  {s.tag}
                </p>
                <p className="mt-1 text-lg font-bold">{s.caption}</p>
              </div>
            </div>
          </TiltCard>
        ))}

        <TiltCard className="glass relative overflow-hidden rounded-[2rem] lg:col-span-4">
          <div className="relative h-64">
            <GearCanvas color="#8b7cf6" />
          </div>
        </TiltCard>
      </div>
    </Section>
  );
}
