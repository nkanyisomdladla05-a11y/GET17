import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stats } from "@/components/sections/Stats";
import { Socials } from "@/components/sections/Socials";
import { ButtonLink } from "@/components/ui/Button";
import { RobotCanvas } from "@/components/three/SceneCanvas";
import { photos } from "@/data/photos";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Get Empire Forex builds semi-automated trading robots and teaches traders to use them with discipline.",
};

const pillars = [
  {
    title: "Built by traders",
    body: "Every rule inside our robots was traded manually first. We automate what already works, nothing more.",
  },
  {
    title: "Semi-automated by design",
    body: "The robot finds and manages the trade. You stay in control of the account, the broker and the final say.",
  },
  {
    title: "Mentorship included",
    body: "Each package comes with tutorial videos so you understand the logic, not just the buy button.",
  },
  {
    title: "We win when you win",
    body: "Our GIVEN-25 pricing defers a quarter of the fee until you are in profit. Our incentives are aligned with yours.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            Trading discipline, <span className="text-gradient">automated.</span>
          </>
        }
        intro="Get Empire Forex started with a simple frustration: good strategies fail when emotions take over. So we encoded our rules into semi-automated robots and paired them with mentorship, so every trader can execute like a professional."
      />

      <div className="mx-auto mb-8 grid max-w-7xl grid-cols-3 gap-3 px-4 sm:px-6">
        {[photos.charts, photos.desk, photos.markets].map((src) => (
          <div key={src} className="h-24 overflow-hidden rounded-2xl sm:h-36">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <Section align="left" className="pt-0 sm:pt-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2" data-stagger>
            {pillars.map((p, i) => (
              <div key={p.title} className="glass rounded-3xl p-6">
                <p className="font-mono text-xs text-brand">0{i + 1}</p>
                <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="reveal relative h-[380px] sm:h-[460px]">
            <div className="glass absolute inset-0 rounded-[2.5rem]" />
            <div className="absolute inset-0 grid grid-cols-2">
              {products.map((p) => (
                <div key={p.slug} className="relative">
                  <RobotCanvas
                    color={p.color}
                    aggressive={p.slug === "aggressive-semi-automated-robot"}
                  />
                  <p
                    className="pointer-events-none absolute bottom-5 left-0 right-0 text-center text-xs font-semibold uppercase tracking-widest"
                    style={{ color: p.color }}
                  >
                    {p.shortName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Stats />

      <Section
        eyebrow="How it works"
        title="From download to first trade in an afternoon"
        intro="A semi-automated EA runs on MetaTrader alongside your existing account. Here is the path every client follows."
      >
        <ol className="grid gap-5 md:grid-cols-4" data-stagger>
          {[
            ["Choose", "Pick VIP for focused swing trades or Aggressive for swing and scalp across markets."],
            ["Install", "Follow the mentorship videos to attach the EA to your MetaTrader charts."],
            ["Configure", "Set lot sizes, sessions and instruments to match your risk tolerance."],
            ["Trade", "Let the robot monitor 24/7 while you review and approve the plan."],
          ].map(([title, body], i) => (
            <li key={title} className="glass relative rounded-3xl p-6">
              <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-2 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-mist">{body}</p>
            </li>
          ))}
        </ol>
        <div className="reveal mt-10 text-center">
          <ButtonLink href="/store">See the robots</ButtonLink>
        </div>
      </Section>

      <Socials />
    </>
  );
}
