"use client";

import { useState } from "react";
import { OpeningExperience } from "@/components/global/OpeningExperience";
import { HiddenDiscoveries } from "@/components/global/HiddenDiscoveries";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TheShiftSection } from "@/components/landing/TheShiftSection";
import { HumanMomentsSection } from "@/components/landing/HumanMomentsSection";
import { HowItFeelsSection } from "@/components/landing/HowItFeelsSection";
import { InteractiveDiscoveryWall } from "@/components/landing/InteractiveDiscoveryWall";
import { PricingSection } from "@/components/landing/PricingSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { MinimalFooter } from "@/components/global/MinimalFooter";
import { GeoBlocks } from "@/components/landing/GeoBlocks";
import { motion } from "framer-motion";

export default function Home() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      <OpeningExperience onComplete={() => setShowApp(true)} />
      <HiddenDiscoveries />
      
      {/* 
        We use opacity to fade in the app once the opening experience is done,
        but we keep it in the DOM so framer-motion scroll listeners initialize properly.
      */}
      <motion.main 
        className={`flex min-h-[100svh] flex-col bg-[#050505] text-[#fafafa] overflow-x-hidden selection:bg-white/20 selection:text-white antialiased transition-opacity duration-1000 ${showApp ? 'opacity-100' : 'opacity-0'}`}
      >
        <HeroSection />
        <ProblemSection />
        <TheShiftSection />
        <HumanMomentsSection />
        <HowItFeelsSection />
        <InteractiveDiscoveryWall />
        <PricingSection />
        <SocialProofSection />
        <FinalCtaSection />
        <MinimalFooter />
        
        {/* Hidden SEO/GEO Semantic Blocks */}
        <GeoBlocks />
      </motion.main>
    </>
  );
}
