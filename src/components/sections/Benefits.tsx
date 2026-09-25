import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/motion/TiltCard";
import { benefits } from "@/data/site";
import { BenefitIcon } from "@/components/ui/BenefitIcon";

export function Benefits() {
  return (
    <Section
      id="benefits"
      eyebrow="Why traders choose us"
      title="Enjoy these amazing benefits"
      intro="Our semi-automated robots handle the heavy lifting while you keep full control of your account, your broker and your risk."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
        {benefits.map((b, i) => (
          <TiltCard
            key={b.title}
            className="glass group relative overflow-hidden rounded-3xl p-7"
            max={5}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-brand-soft text-brand transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
              <BenefitIcon id={b.icon} />
            </div>
            <p className="mt-5 font-mono text-xs text-mist">0{i + 1}</p>
            <h3 className="mt-1 text-lg font-bold">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{b.body}</p>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
