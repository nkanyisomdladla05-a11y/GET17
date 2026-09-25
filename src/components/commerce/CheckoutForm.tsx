"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { Field } from "./Field";
import { OrderSummary } from "./OrderSummary";
import { useHydrated } from "./useHydrated";
import { getProduct } from "@/data/products";
import { formatZAR } from "@/lib/format";

const countries = ["South Africa", "Nigeria", "Kenya", "Ghana", "United Kingdom", "United States", "Other"];

export function CheckoutForm() {
  const hydrated = useHydrated();
  const router = useRouter();
  const { items, placeOrder } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  if (!hydrated) return <div className="glass h-64 animate-pulse rounded-[2rem]" />;

  if (items.length === 0) {
    return (
      <div className="glass rounded-[2rem] p-10 text-center">
        <p className="text-2xl font-bold">Nothing to check out</p>
        <p className="mt-2 text-sm text-mist">Your cart is empty.</p>
        <div className="mt-6">
          <ButtonLink href="/store">Browse robots</ButtonLink>
        </div>
      </div>
    );
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const country = String(data.get("country") ?? "");
    const agree = data.get("agree") === "on";

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a WhatsApp number so we can deliver your files.";
    if (!agree) next.agree = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    const order = placeOrder({ name, email, phone, country });
    router.push(`/checkout/confirmation?order=${order.id}`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <DemoBanner />

        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-lg font-bold">Billing details</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" autoComplete="name" error={errors.name} />
            <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            <Field label="WhatsApp number" name="phone" type="tel" autoComplete="tel" error={errors.phone} placeholder="+27 ..." />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink/80">Country</span>
              <select
                name="country"
                defaultValue="South Africa"
                className="w-full rounded-2xl border border-line bg-paper-2 px-4 py-3 text-sm outline-none focus:border-brand/60"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-lg font-bold">Delivery</h2>
          <p className="mt-2 text-sm text-mist">
            Robots are delivered digitally. Your EA files, licence and the
            mentorship tutorial videos are sent to your email and WhatsApp
            after payment is confirmed.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => {
              const p = getProduct(i.slug)!;
              return (
                <li key={i.slug} className="flex justify-between">
                  <span>{p.name} × {i.qty}</span>
                  <span className="text-mist">{formatZAR(p.price * i.qty)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-lg font-bold">Payment</h2>
          <p className="mt-2 text-sm text-mist">
            No payment provider is connected in this demo. In production this
            step would hand off to a ZAR-capable gateway such as PayFast or
            Stripe.
          </p>
          <label className="mt-5 flex items-start gap-3 text-sm">
            <input type="checkbox" name="agree" className="mt-1 h-4 w-4 accent-[#4633b9]" />
            <span className="text-ink/80">
              I understand this is a demo order and I accept the{" "}
              <Link href="#" className="text-brand underline">terms and conditions</Link>.
            </span>
          </label>
          {errors.agree && <p className="mt-1 text-xs text-bear">{errors.agree}</p>}
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={busy}>
          {busy ? "Placing order…" : "Place order"}
        </Button>
      </form>

      <aside className="glass h-fit rounded-[2rem] p-6 lg:sticky lg:top-28">
        <h2 className="text-lg font-bold">Order summary</h2>
        <div className="mt-5">
          <OrderSummary />
        </div>
        <Link href="/cart" className="mt-5 block text-center text-sm text-mist hover:text-ink">
          Edit cart
        </Link>
      </aside>
    </div>
  );
}
