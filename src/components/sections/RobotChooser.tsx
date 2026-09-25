import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { RobotCanvas } from "@/components/three/SceneCanvas";
import { photos } from "@/data/photos";
import { products } from "@/data/products";
import { TiltCard } from "@/components/motion/TiltCard";

export function RobotChooser() {
  return (
    <Section
      id="robots"
      eyebrow="Choose your edge"
      title={
        <>
          Choose between the <span className="text-accent">VIP</span> Semi-Automated
          EA and our <span className="text-brand">Aggressive</span> EA
        </>
      }
      intro="Two robots, one philosophy: disciplined, rules-based execution on your own MetaTrader account. Once-off fee for 3 years access."
    >
      <div className="grid gap-6 lg:grid-cols-2" data-stagger>
        {products.map((p) => (
          <TiltCard key={p.slug} className="glass group relative overflow-hidden rounded-[2rem] p-0">
            <div className="relative h-40 overflow-hidden sm:h-48">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  p.slug === "aggressive-semi-automated-robot"
                    ? photos.markets
                    : photos.charts
                }
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            </div>
            <div className="relative p-7 sm:p-9">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: p.colorSoft, opacity: 0.6 }}
            />
            <div className="relative grid gap-6 sm:grid-cols-[1fr_180px] sm:items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.3em]"
                  style={{ color: p.color }}
                >
                  {p.badge}
                </p>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  {p.shortName}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {p.tagline}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.markets.slice(0, 6).map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-ink/80"
                    >
                      {m}
                    </li>
                  ))}
                  {p.markets.length > 6 && (
                    <li className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-mist">
                      +{p.markets.length - 6} more
                    </li>
                  )}
                </ul>
              </div>
              <div className="relative mx-auto h-44 w-44 sm:h-[180px] sm:w-[180px]">
                <RobotCanvas
                  color={p.color}
                  aggressive={p.slug === "aggressive-semi-automated-robot"}
                />
              </div>
            </div>
            <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-mist">
                {p.styles.join(" · ")}
              </p>
              <Link
                href={`/product/${p.slug}`}
                className="text-sm font-semibold transition hover:underline"
                style={{ color: p.color }}
              >
                Explore {p.shortName} →
              </Link>
            </div>
            </div>
          </TiltCard>
        ))}
      </div>
      <div className="reveal mt-10 flex flex-col items-center gap-4 text-center">
        <ButtonLink href="/store">Get this offer today</ButtonLink>
        <p className="max-w-lg text-sm font-semibold text-ink/80">
          All of our packages come with mentorship tutorial videos to ensure you
          trade exactly like us.
        </p>
      </div>
    </Section>
  );
}
