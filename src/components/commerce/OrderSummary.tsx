"use client";

import { formatZAR } from "@/lib/format";
import { computeTotals, useCart } from "@/store/cart";
import { site } from "@/data/site";

export function OrderSummary({ showLabel = true }: { showLabel?: boolean }) {
  const { items, promoCode, layBuy } = useCart();
  const totals = computeTotals(items, promoCode, layBuy);

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between text-mist">
        <span>Subtotal</span>
        <span className="text-ink">{formatZAR(totals.subtotal)}</span>
      </div>
      {promoCode && (
        <div className="flex justify-between text-mist">
          <span>
            Code <span className="font-mono text-brand">{promoCode}</span>
          </span>
          <span className="text-ink">
            {site.promo.payNowPercent}/{site.promo.payLaterPercent} split
          </span>
        </div>
      )}
      {layBuy && (
        <div className="flex justify-between text-mist">
          <span>Lay-buy</span>
          <span className="text-ink">Deposit today</span>
        </div>
      )}
      <div className="border-t border-line pt-3">
        <div className="flex items-end justify-between">
          <span className="font-semibold">Due today</span>
          <span className="text-2xl font-extrabold tracking-tight">
            {formatZAR(totals.dueNow)}
          </span>
        </div>
        {totals.dueLater > 0 && (
          <div className="mt-1 flex justify-between text-mist">
            <span>Due later</span>
            <span>{formatZAR(totals.dueLater)}</span>
          </div>
        )}
        {showLabel && totals.label && (
          <p className="mt-2 text-xs text-mist">{totals.label}</p>
        )}
      </div>
    </div>
  );
}
