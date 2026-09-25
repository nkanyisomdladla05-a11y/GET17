import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Semi-Automated Forex Trading Robots`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-paper text-ink">
      <body className="bg-paper text-ink antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <WhatsAppFab />
        <ScrollReveal />
      </body>
    </html>
  );
}
