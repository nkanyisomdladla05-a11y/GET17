import Link from "next/link";
import { importantLinks, navLinks, site } from "@/data/site";
import { SocialIcon } from "./SocialIcon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-paper-2/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
            {site.description}
          </p>
          <div className="mt-5 flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition hover:border-brand/60 hover:text-brand"
              >
                <SocialIcon id={s.id} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/60">
            Important Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            {importantLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/60">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="transition hover:text-ink">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{site.copyright}</p>
          <p>
            Trading involves risk. Past performance does not guarantee future
            results.
          </p>
        </div>
      </div>
    </footer>
  );
}
