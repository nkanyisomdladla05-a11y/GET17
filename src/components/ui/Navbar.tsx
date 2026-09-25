"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { useCartCount } from "@/store/cart";
import { Logo } from "./Logo";
import { Ticker } from "@/components/sections/Ticker";

export function Navbar() {
  const pathname = usePathname();
  const count = useCartCount();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_1px_0_#e2e8f0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between py-2 transition-all duration-300 ${
            scrolled ? "py-1.5" : "py-2.5"
          }`}
          aria-label="Primary"
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-ink/10 text-ink"
                        : "text-mist hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              aria-label="View shopping cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink/80 transition hover:bg-ink/10 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {mounted && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/store"
              className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-2 sm:inline-flex"
            >
              Get the robots
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-3xl p-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-ink/90 hover:bg-ink/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/store"
                  className="mt-2 block rounded-2xl bg-brand px-4 py-3 text-center font-semibold text-white"
                >
                  Get the robots
                </Link>
              </li>
            </ul>
            <p className="mt-3 px-4 text-xs text-mist">{site.subline}</p>
          </div>
        )}
      </div>
      <Ticker />
    </header>
  );
}
