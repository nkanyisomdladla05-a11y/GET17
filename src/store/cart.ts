"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products, type ProductSlug } from "@/data/products";
import { site } from "@/data/site";

export interface CartItem {
  slug: ProductSlug;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: { slug: ProductSlug; name: string; qty: number; unitPrice: number }[];
  subtotal: number;
  promoCode: string | null;
  layBuy: boolean;
  dueNow: number;
  dueLater: number;
  customer: { name: string; email: string; phone: string; country: string };
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  layBuy: boolean;
  orders: Order[];
  add: (slug: ProductSlug, qty?: number) => void;
  remove: (slug: ProductSlug) => void;
  setQty: (slug: ProductSlug, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  removePromo: () => void;
  setLayBuy: (on: boolean) => void;
  placeOrder: (customer: Order["customer"]) => Order;
}

export function priceFor(slug: ProductSlug): number {
  return products.find((p) => p.slug === slug)?.price ?? 0;
}

export function layBuyDepositFor(slug: ProductSlug): number {
  return products.find((p) => p.slug === slug)?.layBuy.zar ?? 0;
}

export interface Totals {
  subtotal: number;
  dueNow: number;
  dueLater: number;
  label: string;
}

export function computeTotals(
  items: CartItem[],
  promoCode: string | null,
  layBuy: boolean
): Totals {
  const subtotal = items.reduce((s, i) => s + priceFor(i.slug) * i.qty, 0);
  if (items.length === 0) {
    return { subtotal: 0, dueNow: 0, dueLater: 0, label: "" };
  }
  if (layBuy) {
    const deposit = items.reduce(
      (s, i) => s + layBuyDepositFor(i.slug) * i.qty,
      0
    );
    return {
      subtotal,
      dueNow: deposit,
      dueLater: subtotal - deposit,
      label: "Lay-buy deposit today, balance before delivery",
    };
  }
  if (promoCode === site.promo.code) {
    const dueNow = Math.round((subtotal * site.promo.payNowPercent) / 100);
    return {
      subtotal,
      dueNow,
      dueLater: subtotal - dueNow,
      label: `${site.promo.payNowPercent}% today, ${site.promo.payLaterPercent}% after you earn`,
    };
  }
  return { subtotal, dueNow: subtotal, dueLater: 0, label: "Pay in full today" };
}

function makeOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `GEF-${stamp}${rand}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      layBuy: false,
      orders: [],
      add: (slug, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.slug === slug ? { ...i, qty: Math.min(5, i.qty + qty) } : i
              ),
            };
          }
          return { items: [...s.items, { slug, qty }] };
        }),
      remove: (slug) =>
        set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      setQty: (slug, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.slug === slug ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [], promoCode: null, layBuy: false }),
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (normalized === site.promo.code) {
          set({ promoCode: normalized, layBuy: false });
          return {
            ok: true,
            message: `${site.promo.code} applied: pay ${site.promo.payNowPercent}% today, ${site.promo.payLaterPercent}% after you earn.`,
          };
        }
        return { ok: false, message: "That code is not valid." };
      },
      removePromo: () => set({ promoCode: null }),
      setLayBuy: (on) =>
        set((s) => ({ layBuy: on, promoCode: on ? null : s.promoCode })),
      placeOrder: (customer) => {
        const { items, promoCode, layBuy } = get();
        const totals = computeTotals(items, promoCode, layBuy);
        const order: Order = {
          id: makeOrderId(),
          createdAt: new Date().toISOString(),
          items: items.map((i) => ({
            slug: i.slug,
            name: products.find((p) => p.slug === i.slug)?.name ?? i.slug,
            qty: i.qty,
            unitPrice: priceFor(i.slug),
          })),
          subtotal: totals.subtotal,
          promoCode,
          layBuy,
          dueNow: totals.dueNow,
          dueLater: totals.dueLater,
          customer,
        };
        set((s) => ({
          orders: [order, ...s.orders],
          items: [],
          promoCode: null,
          layBuy: false,
        }));
        return order;
      },
    }),
    {
      name: "gef-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        items: s.items,
        promoCode: s.promoCode,
        layBuy: s.layBuy,
        orders: s.orders,
      }),
    }
  )
);

export function useCartCount(): number {
  return useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
}
