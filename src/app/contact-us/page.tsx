import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/commerce/ContactForm";
import { site } from "@/data/site";
import { SocialIcon } from "@/components/ui/SocialIcon";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to the Get Empire Forex team on WhatsApp or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title={
          <>
            Questions before you <span className="text-gradient">automate?</span>
          </>
        }
        intro="Ask about the robots, brokers, installation or the GIVEN-25 payment plan. The fastest route is WhatsApp; the form below reaches the same team."
      />

      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5" data-stagger>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-4 rounded-3xl p-6 transition hover:border-[#25D366]/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a12 12 0 0 0 5.6 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold">{site.whatsapp.label}</p>
                <p className="text-sm text-mist">Fastest reply. Usually within the hour during market sessions.</p>
              </div>
            </a>

            <div className="glass rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">
                Social
              </p>
              <ul className="mt-4 space-y-3">
                {site.socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-mist transition hover:text-ink"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line">
                        <SocialIcon id={s.id} />
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">
                Support hours
              </p>
              <p className="mt-3 text-sm text-mist">
                Monday to Friday, London and New York sessions. Weekend messages
                are answered before the Sunday open.
              </p>
            </div>
          </div>

          <div className="reveal glass rounded-[2rem] p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
