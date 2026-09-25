export function DemoBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className={`rounded-2xl border border-brand/30 bg-brand/10 text-sm text-brand-2 ${
        compact ? "px-4 py-2" : "px-5 py-3"
      }`}
    >
      Demo checkout. No payment is processed and no card details are requested.
    </div>
  );
}
