"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";
import { formatZAR } from "@/lib/format";
import { useCart } from "@/store/cart";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { OrderSummary } from "./OrderSummary";
import { useHydrated } from "./useHydrated";

export function CartView() {
  const hydrated = useHydrated();
  const { items, promoCode, layBuy, setQty, remove, applyPromo, removePromo, setLayBuy } =
    useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!hydrated) {
    return <div className="glass h-64 animate-pulse rounded-[2rem]" />;
  }

  if (items.length === 0) {
    return (
      <div className="glass rounded-[2rem] p-10 text-center">
        <p className="text-2xl font-bold">Your cart is empty</p>
        <p className="mt-2 text-sm text-mist">
          Add a robot from the store to get started.
        </p>
        <div className="mt-6">
          <ButtonLink href="/store">Browse robots</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <DemoBanner compact />
        <ul className="space-y-4">
          {items.map((i) => {
            const p = getProduct(i.slug)!;
            return (
              <li key={i.slug} className="glass flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center">
                <span
                  className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl text-white"
                  style={{ background: p.color }}
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l5-6 4 4 4-7 5 5" />
                  </svg>
                </span>
                <div className="flex-1">
                  <Link href={`/product/${p.slug}`} className="font-semibold hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-sm text-mist">{p.tagline}</p>
                  <p className="mt-1 text-xs text-mist">3 years access · once-off</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <span className="text-mist">Qty</span>
                    <select
                      value={i.qty}
                      onChange={(e) => setQty(i.slug, Number(e.target.value))}
                      className="rounded-xl border border-line bg-paper-2 px-2 py-1.5 text-sm"
                      aria-label={`Quantity for ${p.name}`}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </label>
                  <span className="w-24 text-right font-semibold">
                    {formatZAR(p.price * i.qty)}
                  </span>
                  <button
                    onClick={() => remove(i.slug)}
                    className="rounded-full p-2 text-mist transition hover:bg-ink/5 hover:text-bear"
                    aria-label={`Remove ${p.name}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="glass rounded-3xl p-5">
          <p className="text-sm font-semibold">Payment plan</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setLayBuy(false)}
              className={`rounded-2xl border p-4 text-left transition ${
                !layBuy ? "border-brand/60 bg-brand/10" : "border-line hover:border-ink/30"
              }`}
            >
              <p className="font-semibold">Pay in full{promoCode ? ` with ${promoCode}` : ""}</p>
              <p className="mt-1 text-xs text-mist">
                Full amount today, or 75% today with code {site.promo.code}.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setLayBuy(true)}
              className={`rounded-2xl border p-4 text-left transition ${
                layBuy ? "border-accent/60 bg-accent/10" : "border-line hover:border-ink/30"
              }`}
            >
              <p className="font-semibold">Lay-buy</p>
              <p className="mt-1 text-xs text-mist">
                Deposit today ({items.map((i) => formatZAR(getProduct(i.slug)!.layBuy.zar)).join(" / ")}), balance before delivery.
              </p>
            </button>
          </div>

          {!layBuy && (
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                const res = applyPromo(code);
                setMsg({ ok: res.ok, text: res.message });
                if (res.ok) setCode("");
              }}
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Promo code (try ${site.promo.code})`}
                className="flex-1 rounded-2xl border border-line bg-paper-2 px-4 py-3 font-mono text-sm uppercase outline-none focus:border-brand/60"
                aria-label="Promo code"
              />
              <Button type="submit" variant="outline">Apply</Button>
              {promoCode && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    removePromo();
                    setMsg(null);
                  }}
                >
                  Remove code
                </Button>
              )}
            </form>
          )}
          {msg && (
            <p className={`mt-2 text-xs ${msg.ok ? "text-bull" : "text-bear"}`}>{msg.text}</p>
          )}
        </div>
      </div>

      <aside className="glass h-fit rounded-[2rem] p-6 lg:sticky lg:top-28">
        <h2 className="text-lg font-bold">Order summary</h2>
        <div className="mt-5">
          <OrderSummary />
        </div>
        <ButtonLink href="/checkout" className="mt-6 w-full">
          Proceed to checkout
        </ButtonLink>
        <Link href="/store" className="mt-3 block text-center text-sm text-mist hover:text-ink">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
