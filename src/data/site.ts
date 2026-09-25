export const site = {
  name: "Get Empire Forex",
  tagline:
    "Revolutionize Your Trading with Our Cutting-Edge Semi-Automated Trading Robots",
  subline: "Just for a once-off fee you get 3 years access.",
  description:
    "Semi-automated forex trading robots for GOLD, NASDAQ, US30, major pairs and crypto. Once-off fee, 3 years access, mentorship videos included.",
  currency: "ZAR",
  copyright: `Copyright © ${new Date().getFullYear()} Get Empire Forex`,
  whatsapp: {
    label: "WhatsApp us",
    // The live site uses the Click to Chat plugin; number is not exposed publicly.
    href: "https://wa.me/",
  },
  socials: [
    {
      id: "youtube",
      label: "YouTube",
      href: "https://youtube.com/@getempireforex2795",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/getempireforex",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/getmillionaires",
    },
  ],
  liveTradingVideoId: "6UbzsWK_Aoo",
  liveTradingTitle: "I traded Gold Nasdaq Silver | 3 days",
  promo: {
    code: "GIVEN-25",
    payNowPercent: 75,
    payLaterPercent: 25,
    headline:
      "Success-based pricing: use code GIVEN-25 to pay 75% today and 25% after you earn.",
    body: "We win when you win. That is why we defer 25% of the cost until you are in the green. Your success is our guarantee.",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/my-account", label: "My Account" },
];

export const importantLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Shipping Details" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "Media Kit" },
];

export const benefits = [
  {
    title: "Optimized Efficiency",
    body: "Automate the repetitive parts of your trading plan so entries, exits and risk are handled consistently, freeing you to focus on strategy.",
    icon: "bolt",
  },
  {
    title: "Convenience",
    body: "Run the robot on your own MetaTrader account and let it work alongside you. No need to sit in front of charts all day.",
    icon: "clock",
  },
  {
    title: "Continuous 24/7 Market Monitoring",
    body: "Markets never sleep and neither does the robot. Opportunities are tracked around the clock across every session.",
    icon: "globe",
  },
  {
    title: "Data-Driven Decision-Making",
    body: "Signals are based on tested rules and market data, not gut feeling, so every trade follows the same disciplined logic.",
    icon: "chart",
  },
  {
    title: "Customizable Strategies",
    body: "Tailor lot sizes, sessions and instruments to your own preferences and risk tolerance for optimal results.",
    icon: "sliders",
  },
  {
    title: "Emotion-Free Trading",
    body: "Fear and greed are removed from the equation. The robot executes the plan exactly as designed, every time.",
    icon: "shield",
  },
];

export const stats = [
  { label: "Markets covered", value: 12, suffix: "+" },
  { label: "Years of access", value: 3, suffix: "" },
  { label: "Market monitoring", value: 24, suffix: "/7" },
  { label: "Paid upfront with GIVEN-25", value: 75, suffix: "%" },
];

export const tickerFallback = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 76923, change: -2.12 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 3412, change: -1.4 },
  { id: "solana", symbol: "SOL", name: "Solana", price: 168.2, change: 0.8 },
  { id: "ripple", symbol: "XRP", name: "XRP", price: 2.14, change: -0.6 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", price: 611, change: 0.3 },
];

/** Static FX / index quotes so the ribbon always has a long, scrolling feed */
export const forexTicker = [
  { id: "xauusd", symbol: "XAUUSD", name: "Gold", price: 2385.4, change: 0.42 },
  { id: "nas100", symbol: "NAS100", name: "Nasdaq", price: 18420, change: 0.18 },
  { id: "us30", symbol: "US30", name: "Dow", price: 39610, change: -0.11 },
  { id: "eurusd", symbol: "EURUSD", name: "Euro", price: 1.0842, change: 0.06 },
  { id: "gbpusd", symbol: "GBPUSD", name: "Cable", price: 1.2714, change: -0.08 },
  { id: "usdjpy", symbol: "USDJPY", name: "Yen", price: 151.28, change: 0.21 },
  { id: "gbpjpy", symbol: "GBPJPY", name: "Pound/Yen", price: 198.42, change: 0.33 },
  { id: "usdcad", symbol: "USDCAD", name: "Loonie", price: 1.3612, change: -0.04 },
];
