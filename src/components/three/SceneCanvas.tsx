"use client";

import { useEffect, useState, type MutableRefObject, type ReactNode } from "react";
import { InView } from "./InView";
import { useIsMobile } from "./useIsMobile";
import MarketScene, { type MarketMode } from "./MarketScene";
import RobotCore from "./RobotCore";
import Gear3D from "./Gear3D";
import HeroEmblem from "./HeroEmblem";
import type { Pair } from "./candles";

/** Shown until the browser is ready to start WebGL. */
export function SceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(70,51,185,0.14),transparent_60%)]"
    />
  );
}

function ClientOnly({
  children,
  fallback = <SceneFallback />,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return fallback;
  return children;
}

export function MarketCanvas({
  pair,
  mode,
  scrollRef,
}: {
  pair: Pair;
  mode: MarketMode;
  scrollRef?: MutableRefObject<number>;
}) {
  const mobile = useIsMobile();
  return (
    <InView eager>
      <ClientOnly>
        <MarketScene pair={pair} mode={mode} light={mobile} scrollRef={scrollRef} />
      </ClientOnly>
    </InView>
  );
}

export function RobotCanvas({
  color,
  aggressive,
  variant = "card",
}: {
  color: string;
  aggressive?: boolean;
  variant?: "card" | "hero";
}) {
  return (
    <InView eager={variant === "hero"}>
      <ClientOnly fallback={<div className="h-full w-full" />}>
        <RobotCore color={color} aggressive={aggressive} variant={variant} />
      </ClientOnly>
    </InView>
  );
}

export function GearCanvas({
  color,
  interactive = true,
}: {
  color?: string;
  interactive?: boolean;
}) {
  return (
    <InView>
      <ClientOnly fallback={<div className="h-full w-full" />}>
        <Gear3D color={color} interactive={interactive} />
      </ClientOnly>
    </InView>
  );
}

export function HeroEmblemCanvas({
  scrollRef,
}: {
  scrollRef?: MutableRefObject<number>;
}) {
  return (
    <InView eager>
      <ClientOnly>
        <HeroEmblem scrollRef={scrollRef} />
      </ClientOnly>
    </InView>
  );
}
