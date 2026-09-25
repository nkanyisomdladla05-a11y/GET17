"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatZAR } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { Field } from "./Field";
import { useHydrated } from "./useHydrated";

export function AccountView() {
  const hydrated = useHydrated();
  const orders = useCart((s) => s.orders);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setEmail(value);
  };

  if (!hydrated) return <div className="glass h-64 animate-pulse rounded-[2rem]" />;

  if (!email) {
    return (
      <div className="mx-auto max-w-md">
        <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-[2rem] p-8">
          <h2 className="text-2xl font-bold">Sign in</h2>
          <p className="text-sm text-mist">
            Demo account area. Enter any email to view orders placed in this
            browser. No password or real authentication is used.
          </p>
          <Field label="Email" name="email" type="email" autoComplete="email" error={error} />
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <DemoBanner compact />
      <div className="glass flex flex-col gap-3 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Signed in as</p>
          <p className="font-semibold">{email}</p>
        </div>
        <Button variant="outline" onClick={() => setEmail(null)}>Sign out</Button>
      </div>

      <div className="glass rounded-[2rem] p-6 sm:p-8">
        <h2 className="text-lg font-bold">Order history</h2>
        {orders.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-mist">No orders yet.</p>
            <div className="mt-4">
              <ButtonLink href="/store">Browse robots</ButtonLink>
            </div>
          </div>
        ) : (
          <ul className="mt-5 divide-y divide-line">
            {orders.map((o) => (
              <li key={o.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-sm text-brand">{o.id}</p>
                  <p className="text-sm text-mist">
                    {new Date(o.createdAt).toLocaleDateString()} ·{" "}
                    {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-mist">
                    {o.layBuy ? "Lay-buy" : o.promoCode ? `Code ${o.promoCode}` : "Paid in full"}
                  </span>
                  <span className="font-semibold">{formatZAR(o.dueNow)}</span>
                  <Link href={`/checkout/confirmation?order=${o.id}`} className="text-brand hover:underline">
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
