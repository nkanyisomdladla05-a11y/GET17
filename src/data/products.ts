export type ProductSlug =
  | "aggressive-semi-automated-robot"
  | "vip-semi-automated-robot";

export interface Product {
  slug: ProductSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Full price in ZAR */
  price: number;
  /** Lay-buy deposit in ZAR and USD as shown on the live site */
  layBuy: { zar: number; usd: number };
  styles: string[];
  markets: string[];
  features: string[];
  /** Accent color used by the 3D emblem and UI */
  color: string;
  colorSoft: string;
  badge?: string;
}

export const products: Product[] = [
  {
    slug: "aggressive-semi-automated-robot",
    name: "Aggressive Semi-Automated Robot",
    shortName: "Aggressive EA",
    tagline: "Swing and scalp across metals, forex, crypto, indices and stocks.",
    description:
      "The Aggressive Robot is a versatile trading solution adept at both swing and scalp trading strategies. It trades a diverse range of assets, including precious metals such as GOLD, SILVER and PLATINUM, major currency pairs like EURUSD, GBPJPY and USDCAD, and ventures into cryptocurrencies, excelling particularly with Bitcoin. It extends its reach to indices such as NASDAQ, US30 and GER30, as well as stocks and synthetic indexes.",
    price: 8800,
    layBuy: { zar: 2000, usd: 110 },
    styles: ["Swing trading", "Scalping"],
    markets: [
      "GOLD",
      "SILVER",
      "PLATINUM",
      "EURUSD",
      "GBPJPY",
      "USDCAD",
      "BITCOIN",
      "NASDAQ",
      "US30",
      "GER30",
      "Stocks",
      "Synthetic indexes",
    ],
    features: [
      "Once-off fee for 3 years access",
      "Online support",
      "Free updates",
      "Mentorship tutorial videos",
    ],
    color: "#4633b9",
    colorSoft: "rgba(70,51,185,0.14)",
    badge: "Most versatile",
  },
  {
    slug: "vip-semi-automated-robot",
    name: "VIP Semi-Automated Robot",
    shortName: "VIP Semi-Automated EA",
    tagline: "Disciplined swing trading on GOLD, NASDAQ and US30.",
    description:
      "The VIP Semi Robot specializes exclusively in swing trading, focusing on three key assets: GOLD, NASDAQ and US30. This meticulously crafted robot is designed solely for swing trading purposes, offering a disciplined approach to trading. It does not support scalping strategies and is limited to trading only the aforementioned assets. Its tailored functionality ensures precision and effectiveness in navigating the market dynamics of these select instruments.",
    price: 4800,
    layBuy: { zar: 1000, usd: 60 },
    styles: ["Swing trading"],
    markets: ["GOLD", "NASDAQ", "US30"],
    features: [
      "Once-off fee for 3 years access",
      "Online support",
      "Free updates",
      "Mentorship tutorial videos",
    ],
    color: "#8b7cf6",
    colorSoft: "rgba(139,124,246,0.16)",
    badge: "Focused",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
