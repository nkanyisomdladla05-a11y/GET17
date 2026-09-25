"use client";

import { useEffect, useMemo, useState } from "react";
import { InView } from "@/components/three/InView";
import RiskDial from "@/components/three/RiskDial";
import { Section } from "@/components/ui/Section";
import { formatUSD } from "@/lib/format";

function DialMount({ turns }: { turns: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-full w-full" />;
  return <RiskDial turns={turns} />;
}

export function Calculator() {
  const [balance, setBalance] = useState(10000);
  const [risk, setRisk] = useState(1.5);
  const [stop, setStop] = useState(25);

  const result = useMemo(() => {
    const riskUsd = (balance * risk) / 100;
    const pipValuePerLot = 10;
    const lots = stop > 0 ? riskUsd / (stop * pipValuePerLot) : 0;
    return { riskUsd, lots };
  }, [balance, risk, stop]);

  return (
    <Section
      id="calculator"
      eyebrow="Risk first"
      title={
        <>
          Spin the <span className="text-gradient">3D risk dial</span>
        </>
      }
      intro="A simple lot-size estimator. Drag the risk slider — the Empire knob turns with it. Illustrative only, not a live broker quote."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass relative overflow-hidden rounded-[2rem] p-4">
          <div className="h-64 sm:h-80">
            <InView>
              <DialMount turns={risk / 5} />
            </InView>
          </div>
          <p className="text-center font-mono text-xs uppercase tracking-widest text-mist">
            Risk {risk.toFixed(1)}%
          </p>
        </div>

        <div className="glass space-y-5 rounded-[2rem] p-6 sm:p-8">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Account balance (USD)</span>
            <input
              type="number"
              min={100}
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value) || 0)}
              className="w-full rounded-2xl border border-line px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="mb-2 flex justify-between text-sm font-medium text-ink">
              Risk per trade <span className="text-brand">{risk.toFixed(1)}%</span>
            </span>
            <input
              type="range"
              min={0.25}
              max={5}
              step={0.25}
              value={risk}
              onChange={(e) => setRisk(Number(e.target.value))}
              className="w-full accent-[#4633b9]"
            />
          </label>
          <label className="block">
            <span className="mb-2 flex justify-between text-sm font-medium text-ink">
              Stop loss <span className="text-mist">{stop} pips</span>
            </span>
            <input
              type="range"
              min={5}
              max={80}
              step={1}
              value={stop}
              onChange={(e) => setStop(Number(e.target.value))}
              className="w-full accent-[#4633b9]"
            />
          </label>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-2xl bg-paper-2 p-4">
              <p className="text-xs uppercase tracking-widest text-mist">Risk $</p>
              <p className="mt-1 text-2xl font-extrabold text-ink">
                {formatUSD(result.riskUsd)}
              </p>
            </div>
            <div className="rounded-2xl bg-brand-soft p-4">
              <p className="text-xs uppercase tracking-widest text-brand">Suggested lots</p>
              <p className="mt-1 text-2xl font-extrabold text-brand">
                {result.lots.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
