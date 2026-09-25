import { site } from "@/data/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Socials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal glass flex flex-col items-center justify-between gap-6 rounded-[2rem] p-8 sm:flex-row">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Follow the journey
            </p>
            <p className="mt-2 text-xl font-bold">
              Daily setups, live sessions and student results
            </p>
          </div>
          <div className="flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink/80 transition hover:border-brand/60 hover:text-brand"
              >
                <SocialIcon id={s.id} />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
