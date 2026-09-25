"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/motion/TiltCard";
import { products } from "@/data/products";
import { formatUSD, formatZAR } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useRouter } from "next/navigation";

export function Pricing({ compact = false }: { compact?: boolean }) {
  const add = useCart((s) => s.add);
  const router = useRouter();

  return (
    <Section
      id="pricing"
      eyebrow="Our robots"
      title={compact ? undefined : "Once-off fee. Three years of access."}
      intro={
        compact
          ? undefined
          : "No subscriptions and no hidden fees. Lay-buy is available on both robots, or use GIVEN-25 to split the payment 75/25."
      }
      className={compact ? "py-0 sm:py-0" : undefined}
    >
      <div className="grid gap-6 lg:grid-cols-2" data-stagger>
        {products.map((p) => {
          const aggressive = p.slug === "aggressive-semi-automated-robot";
          return (
            <TiltCard
              key={p.slug}
              className={`relative overflow-hidden rounded-[2rem] border p-8 sm:p-10 ${
                aggressive
                  ? "border-brand/30 bg-gradient-to-b from-brand/10 to-transparent"
                  : "glass"
              }`}
            >
              <span
                className="absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white"
                style={{ background: p.color }}
              >
                New
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mist">
                Semi-automated EA
              </p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{p.shortName}</h3>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                  {formatZAR(p.price)}
                </span>
                <span className="pb-2 text-sm text-mist">once-off</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-white"
                      style={{ background: p.color }}
                    >
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span className="text-ink/90">{f}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-line text-[10px] font-bold text-mist">
                    L
                  </span>
                  <span className="text-ink/90">
                    Lay-buy from{" "}
                    <strong>{formatZAR(p.layBuy.zar)}</strong> /{" "}
                    {formatUSD(p.layBuy.usd)} deposit
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    add(p.slug);
                    router.push("/cart");
                  }}
                  variant={aggressive ? "primary" : "outline"}
                >
                  Buy {p.shortName}
                </Button>
                <Link
                  href={`/product/${p.slug}`}
                  className="inline-flex items-center px-3 text-sm font-semibold text-mist transition hover:text-ink"
                >
                  Details
                </Link>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}
