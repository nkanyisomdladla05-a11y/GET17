import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

export function LiveTrading() {
  const instagram = site.socials.find((s) => s.id === "instagram")!;
  return (
    <Section
      id="live-trading"
      eyebrow="Transparency first"
      title="Watch our live trading videos"
      align="left"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal">
          <p className="text-base leading-relaxed text-mist sm:text-lg">
            Transparency is our cornerstone. We share live trading videos to give
            you a firsthand look into the legitimacy and effectiveness of our
            strategies. These real-time demonstrations let you witness the
            authenticity of our performance and the potential benefits of
            partnering with us.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={instagram.href} target="_blank" rel="noreferrer">
              Watch the video
            </ButtonLink>
            <ButtonLink
              href={site.socials.find((s) => s.id === "youtube")!.href}
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              YouTube channel
            </ButtonLink>
          </div>
        </div>
        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/25 via-transparent to-accent/25 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-2">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.6rem] bg-paper-3">
              <iframe
                title={site.liveTradingTitle}
                src={`https://www.youtube-nocookie.com/embed/${site.liveTradingVideoId}`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
