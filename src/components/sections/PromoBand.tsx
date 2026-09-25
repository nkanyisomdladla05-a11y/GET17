import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { GearCanvas } from "@/components/three/SceneCanvas";

export function PromoBand() {
  return (
    <section className="relative overflow-hidden bg-paper-2 py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 opacity-70">
        <GearCanvas interactive={false} />
      </div>
      <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 opacity-50">
        <GearCanvas color="#8b7cf6" interactive={false} />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Success-based pricing
          </p>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            Use code{" "}
            <span className="inline-block rounded-2xl border border-brand/20 bg-white px-4 py-1 font-mono text-brand">
              {site.promo.code}
            </span>{" "}
            to pay {site.promo.payNowPercent}% today and{" "}
            {site.promo.payLaterPercent}% after you earn.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-mist sm:text-lg">
            {site.promo.body}
          </p>
        </div>

        <div className="reveal mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { step: "01", title: "Pick your robot", body: "VIP or Aggressive, once-off fee." },
            { step: "02", title: "Pay 75% today", body: "Enter GIVEN-25 at checkout." },
            { step: "03", title: "Pay 25% when in profit", body: "We win when you win." },
          ].map((s) => (
            <div key={s.step} className="glass rounded-3xl p-5 text-left">
              <p className="font-mono text-xs text-brand">{s.step}</p>
              <p className="mt-2 font-semibold text-ink">{s.title}</p>
              <p className="mt-1 text-sm text-mist">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-10">
          <ButtonLink href="/store">Claim the offer</ButtonLink>
        </div>
      </div>
    </section>
  );
}
