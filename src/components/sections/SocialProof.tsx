"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/photos";
import { site } from "@/data/site";

const posts = [
  {
    src: photos.charts,
    caption: "Gold, Nasdaq, Silver — three days on the tape.",
    likes: "214",
  },
  {
    src: photos.markets,
    caption: "Aggressive EA covering metals, FX and crypto.",
    likes: "168",
  },
  {
    src: photos.desk,
    caption: "Mentorship session: risk first, then entries.",
    likes: "192",
  },
  {
    src: photos.floor,
    caption: "US30 swing setup shared with VIP members.",
    likes: "141",
  },
  {
    src: photos.bitcoin,
    caption: "Bitcoin session on the Aggressive robot.",
    likes: "203",
  },
];

export function SocialProof() {
  const [active, setActive] = useState(0);
  const instagram = site.socials.find((s) => s.id === "instagram")!;

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % posts.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Section
      id="live-trading"
      eyebrow="From the desk"
      title={
        <>
          Live trading on <span className="text-gradient">YouTube &amp; Instagram</span>
        </>
      }
      intro="Watch the same Gold / Nasdaq / Silver session we publish, then swipe the Empire feed. Official account: @getempireforex."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="reveal mx-auto w-full max-w-[380px]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-brand/20 via-transparent to-brand-3/25 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-2">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.55rem] bg-ink">
                <iframe
                  title={site.liveTradingTitle}
                  src={`https://www.youtube-nocookie.com/embed/${site.liveTradingVideoId}?rel=0`}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-mist">{site.liveTradingTitle}</p>
        </div>

        <div className="reveal">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Instagram
              </p>
              <p className="mt-1 text-lg font-bold text-ink">@getempireforex</p>
            </div>
            <ButtonLink href={instagram.href} target="_blank" rel="noreferrer" variant="outline">
              Open Instagram
            </ButtonLink>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-line bg-white">
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posts[active].src}
                alt={posts[active].caption}
                className="h-[280px] w-full object-cover sm:h-[340px]"
              />
            </a>
            <div className="flex items-center justify-between px-5 py-3">
              <p className="text-sm font-semibold text-ink">♥ {posts[active].likes}</p>
              <p className="text-xs text-mist">
                {active + 1} / {posts.length}
              </p>
            </div>
            <p className="border-t border-line px-5 py-4 text-sm text-mist">
              <span className="font-semibold text-ink">getempireforex </span>
              {posts[active].caption}
            </p>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {posts.map((p, i) => (
              <button
                key={p.src}
                onClick={() => setActive(i)}
                aria-label={`Show Instagram slide ${i + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  i === active ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-mist">
            Gallery links to the official Instagram. Drop in an Elfsight or Juicer
            widget later if you want a live-synced feed.
          </p>
        </div>
      </div>
    </Section>
  );
}
