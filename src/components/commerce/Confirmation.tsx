"use client";

import { useSearchParams } from "next/navigation";
import { useCart } from "@/store/cart";
import { formatZAR } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { useHydrated } from "./useHydrated";

export function Confirmation() {
  const hydrated = useHydrated();
  const params = useSearchParams();
  const id = params.get("order");
  const orders = useCart((s) => s.orders);
  const order = orders.find((o) => o.id === id) ?? orders[0];

  if (!hydrated) return <div className="glass h-64 animate-pulse rounded-[2rem]" />;

  if (!order) {
    return (
      <div className="glass rounded-[2rem] p-10 text-center">
        <p className="text-2xl font-bold">No order found</p>
        <p className="mt-2 text-sm text-mist">Place an order from the store to see a confirmation here.</p>
        <div className="mt-6">
          <ButtonLink href="/store">Browse robots</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="glass rounded-[2rem] p-8 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bull/15 text-bull">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-3xl font-extrabold">Order received</h2>
        <p className="mt-2 text-mist">
          Thanks, {order.customer.name.split(" ")[0]}. Your order number is{" "}
          <span className="font-mono text-brand">{order.id}</span>.
        </p>
        <div className="mt-6">
          <DemoBanner compact />
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 sm:p-8">
        <h3 className="text-lg font-bold">Summary</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {order.items.map((i) => (
            <li key={i.slug} className="flex justify-between">
              <span>{i.name} × {i.qty}</span>
              <span className="text-mist">{formatZAR(i.unitPrice * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-mist">
            <span>Subtotal</span>
            <span className="text-ink">{formatZAR(order.subtotal)}</span>
          </div>
          {order.promoCode && (
            <div className="flex justify-between text-mist">
              <span>Promo code</span>
              <span className="font-mono text-brand">{order.promoCode}</span>
            </div>
          )}
          {order.layBuy && (
            <div className="flex justify-between text-mist">
              <span>Plan</span>
              <span className="text-ink">Lay-buy</span>
            </div>
          )}
          <div className="flex justify-between font-semibold">
            <span>Due today</span>
            <span>{formatZAR(order.dueNow)}</span>
          </div>
          {order.dueLater > 0 && (
            <div className="flex justify-between text-mist">
              <span>Due later</span>
              <span>{formatZAR(order.dueLater)}</span>
            </div>
          )}
        </div>
        <div className="mt-6 grid gap-2 text-sm text-mist sm:grid-cols-2">
          <p><span className="text-ink/60">Email:</span> {order.customer.email}</p>
          <p><span className="text-ink/60">WhatsApp:</span> {order.customer.phone}</p>
          <p><span className="text-ink/60">Country:</span> {order.customer.country}</p>
          <p><span className="text-ink/60">Placed:</span> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/my-account">View my orders</ButtonLink>
        <ButtonLink href="/" variant="outline">Back to home</ButtonLink>
      </div>
    </div>
  );
}
