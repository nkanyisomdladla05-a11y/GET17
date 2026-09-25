import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { PromoBand } from "@/components/sections/PromoBand";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Buy the Aggressive EA or VIP Semi-Automated EA. Once-off fee, 3 years access, lay-buy available.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store"
        title={
          <>
            Two robots. <span className="text-gradient">One once-off fee.</span>
          </>
        }
        intro={`${site.subline} Pick the robot that matches your style, add it to the cart and use ${site.promo.code} to pay 75% today.`}
      />
      <div className="pb-8">
        <Pricing compact />
      </div>
      <PromoBand />
    </>
  );
}
