const zar = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

const zarCents = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatZAR(amount: number, cents = false): string {
  return (cents ? zarCents : zar)
    .format(amount)
    .replace("ZAR", "R")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/^R\s+/, "R");
}

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function formatPrice(amount: number, currency = "usd"): string {
  const digits = amount < 2 ? 4 : amount < 100 ? 2 : 0;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
