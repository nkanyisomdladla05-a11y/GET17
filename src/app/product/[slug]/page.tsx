import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products } from "@/data/products";
import { RobotCanvas } from "@/components/three/SceneCanvas";
import { AddToCart } from "@/components/commerce/AddToCart";
import { formatUSD, formatZAR } from "@/lib/format";
import { site } from "@/data/site";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const aggressive = product.slug === "aggressive-semi-automated-robot";
  const other = products.find((p) => p.slug !== product.slug)!;

  return (
    <div className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: product.colorSoft }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-mist">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/store" className="hover:text-ink">Store</Link>
          <span className="mx-2">/</span>
          <span className="text-ink/80">{product.shortName}</span>
        </nav>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative order-first h-[380px] sm:h-[480px] lg:sticky lg:top-28 lg:h-[560px]">
            <div className="glass absolute inset-0 rounded-[2.5rem]" />
            <div className="absolute inset-0">
              <RobotCanvas
                color={product.color}
                aggressive={aggressive}
                variant="hero"
              />
            </div>
            <p className="pointer-events-none absolute bottom-5 left-0 right-0 text-center font-mono text-[11px] uppercase tracking-widest text-mist">
              drag to rotate
            </p>
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: product.color }}
            >
              {product.badge} · Semi-automated EA
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-mist">{product.tagline}</p>

            <div className="mt-8 flex flex-wrap items-end gap-3">
              <span className="text-5xl font-extrabold tracking-tight">
                {formatZAR(product.price)}
              </span>
              <span className="pb-2 text-sm text-mist">
                once-off · 3 years access
              </span>
            </div>
            <p className="mt-2 text-sm text-mist">
              Lay-buy available from{" "}
              <strong className="text-ink">{formatZAR(product.layBuy.zar)}</strong>{" "}
              ({formatUSD(product.layBuy.usd)}) deposit, or use code{" "}
              <strong className="text-brand">{site.promo.code}</strong> to pay
              75% today and 25% after you earn.
            </p>

            <AddToCart slug={product.slug} color={product.color} />

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/60">
                  Overview
                </h2>
                <p className="mt-3 leading-relaxed text-mist">
                  {product.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="glass rounded-3xl p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-ink/60">
                    Trading styles
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {product.styles.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: product.color }}
                        />
                        {s}
                      </li>
                    ))}
                    {!aggressive && (
                      <li className="flex items-center gap-2 text-mist">
                        <span className="h-1.5 w-1.5 rounded-full bg-bear" />
                        No scalping
                      </li>
                    )}
                  </ul>
                </div>
                <div className="glass rounded-3xl p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-ink/60">
                    Included
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: product.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/60">
                  Markets
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.markets.map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-medium"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass flex flex-col gap-3 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-mist">
                    Looking for the other robot?
                  </p>
                  <p className="mt-1 font-semibold">{other.name}</p>
                </div>
                <Link
                  href={`/product/${other.slug}`}
                  className="text-sm font-semibold"
                  style={{ color: other.color }}
                >
                  View {other.shortName} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
