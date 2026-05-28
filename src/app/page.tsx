"use client";

import { useState } from "react";
import { OpeningExperience } from "@/components/global/OpeningExperience";
import { HiddenDiscoveries } from "@/components/global/HiddenDiscoveries";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TheShiftSection } from "@/components/landing/TheShiftSection";
import { HumanMomentsSection } from "@/components/landing/HumanMomentsSection";
import { StillnessSection } from "@/components/landing/StillnessSection";
import { HowItFeelsSection } from "@/components/landing/HowItFeelsSection";
import { InteractiveDiscoveryWall } from "@/components/landing/InteractiveDiscoveryWall";
import { PricingSection } from "@/components/landing/PricingSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { MinimalFooter } from "@/components/global/MinimalFooter";
import { GeoBlocks } from "@/components/landing/GeoBlocks";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  
  // The Impossible Moment: Night to Sunrise Global Shift
  const { scrollYProgress } = useScroll();
  const globalBgColor = useTransform(scrollYProgress, 
    [0, 0.4, 0.7, 1], 
    ["#050505", "#050505", "#0a1128", "#ffebd6"]
  );
  
  // Inverse text color for the end when it gets too bright
  const globalTextColor = useTransform(scrollYProgress,
    [0, 0.8, 1],
    ["#fafafa", "#fafafa", "#050505"]
  );

  return (
    <>
      <OpeningExperience onComplete={() => setShowApp(true)} />
      <HiddenDiscoveries />
      
      {/* 
        Global background that shifts from night to sunrise.
        All child sections must be bg-transparent.
      */}
      <motion.div 
        style={{ backgroundColor: globalBgColor, color: globalTextColor }}
        className="fixed inset-0 z-[-1] transition-colors duration-700"
      />

      <motion.main 
        className={`flex min-h-[100svh] flex-col text-inherit selection:bg-primary/20 antialiased transition-opacity duration-1000 ${showApp ? 'opacity-100' : 'opacity-0'}`}
      >
        <HeroSection />
        <ProblemSection />
        <TheShiftSection />
        <HumanMomentsSection />
        <StillnessSection />
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
