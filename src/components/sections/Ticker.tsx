"use client";

import { useEffect, useState } from "react";
import { tickerFallback, forexTicker } from "@/data/site";
import { formatPrice } from "@/lib/format";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const IDS = tickerFallback.map((c) => c.id).join(",");

export function Ticker() {
  const [coins, setCoins] = useState<Coin[]>(tickerFallback);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${IDS}&vs_currencies=usd&include_24hr_change=true`,
      { signal: controller.signal }
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Record<string, { usd: number; usd_24h_change: number }>) => {
        setCoins(
          tickerFallback.map((c) => ({
            ...c,
            price: data[c.id]?.usd ?? c.price,
            change: data[c.id]?.usd_24h_change ?? c.change,
          }))
        );
        setLive(true);
      })
      .catch(() => {
        /* keep fallback prices; the ribbon still scrolls */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  const row = [...forexTicker, ...coins];
  const items = [...row, ...row];

  return (
    <div className="relative z-40 border-b border-line bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      <div className="overflow-hidden py-2.5">
        <div className="ticker-track px-6">
          {items.map((c, i) => {
            const up = c.change >= 0;
            return (
              <div
                key={`${c.id}-${i}`}
                className="flex shrink-0 items-center gap-2.5 text-sm"
              >
                <span className="font-semibold text-ink">{c.symbol}</span>
                <span className="hidden text-mist sm:inline">{c.name}</span>
                <span className="font-mono text-ink">
                  {formatPrice(c.price)}
                </span>
                <span
                  className={`font-mono text-xs font-semibold ${
                    up ? "text-bull" : "text-bear"
                  }`}
                >
                  {up ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] uppercase tracking-widest text-mist lg:block">
        {live ? "Live · CoinGecko" : "Market feed"}
      </p>
    </div>
  );
}
