export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  index: number;
}

export interface Pair {
  symbol: string;
  label: string;
  seed: number;
  base: number;
  decimals: number;
  /** relative volatility, 1 = gold */
  vol: number;
}

export const PAIRS: Pair[] = [
  { symbol: "XAUUSD", label: "Gold", seed: 7, base: 2385, decimals: 2, vol: 1 },
  { symbol: "NAS100", label: "Nasdaq", seed: 19, base: 18420, decimals: 1, vol: 1.3 },
  { symbol: "US30", label: "Dow", seed: 31, base: 39610, decimals: 0, vol: 0.9 },
  { symbol: "EURUSD", label: "Euro", seed: 43, base: 1.0842, decimals: 5, vol: 0.5 },
  { symbol: "GBPJPY", label: "Pound/Yen", seed: 59, base: 198.42, decimals: 3, vol: 1.1 },
  { symbol: "BTCUSD", label: "Bitcoin", seed: 71, base: 76923, decimals: 0, vol: 1.8 },
];

export function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Deterministic pseudo-random walk in a normalised 100-based price space, so
 * every pair renders identically on server, client and between reloads.
 */
export function generateCandles(count: number, seed = 7, vol = 1): Candle[] {
  const rand = makeRng(seed);
  const candles: Candle[] = [];
  let price = 100;
  let trend = 0.35;
  for (let i = 0; i < count; i++) {
    if (i % 9 === 0) trend = (rand() - 0.42) * 1.6 * vol;
    const open = price;
    const move = trend + (rand() - 0.5) * 2.4 * vol;
    const close = Math.max(60, open + move);
    const wick = (0.4 + rand() * 1.6) * vol;
    const high = Math.max(open, close) + wick * rand();
    const low = Math.min(open, close) - wick * rand();
    candles.push({ open, high, low, close, index: i });
    price = close;
  }
  return candles;
}

/** Advance the series by one tick: nudge the last close, occasionally roll a new candle. */
export function tickCandles(
  candles: Candle[],
  rand: () => number,
  vol: number,
  rollNew: boolean
): Candle[] {
  const next = candles.slice();
  const last = { ...next[next.length - 1] };
  const move = (rand() - 0.5) * 0.9 * vol;
  last.close = Math.max(60, last.close + move);
  last.high = Math.max(last.high, last.close);
  last.low = Math.min(last.low, last.close);
  next[next.length - 1] = last;
  if (rollNew) {
    next.shift();
    next.push({
      open: last.close,
      high: last.close,
      low: last.close,
      close: last.close,
      index: last.index + 1,
    });
  }
  return next;
}

/** Map normalised price to a display price for the chosen pair. */
export function displayPrice(normalised: number, pair: Pair): string {
  const price = pair.base * (normalised / 100);
  return price.toLocaleString("en-US", {
    minimumFractionDigits: pair.decimals,
    maximumFractionDigits: pair.decimals,
  });
}

export function candleLabel(c: Candle, pair: Pair): string {
  return `${pair.symbol}  O ${displayPrice(c.open, pair)}  H ${displayPrice(
    c.high,
    pair
  )}  L ${displayPrice(c.low, pair)}  C ${displayPrice(c.close, pair)}`;
}
