import { Hero } from "@/components/sections/Hero";
import { Visuals } from "@/components/sections/Visuals";
import { RobotChooser } from "@/components/sections/RobotChooser";
import { PromoBand } from "@/components/sections/PromoBand";
import { Pricing } from "@/components/sections/Pricing";
import { Benefits } from "@/components/sections/Benefits";
import { Stats } from "@/components/sections/Stats";
import { Calculator } from "@/components/sections/Calculator";
import { SocialProof } from "@/components/sections/SocialProof";
import { Socials } from "@/components/sections/Socials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Visuals />
      <RobotChooser />
      <PromoBand />
      <Pricing />
      <Stats />
      <Calculator />
      <Benefits />
      <SocialProof />
      <Socials />
    </>
  );
}
