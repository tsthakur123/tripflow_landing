import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TheShiftSection } from "@/components/landing/TheShiftSection";
import { DreamingSection } from "@/components/landing/DreamingSection";
import { HowItFeelsSection } from "@/components/landing/HowItFeelsSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { GeoBlocks } from "@/components/landing/GeoBlocks";

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col bg-[#050505] text-[#fafafa] overflow-x-hidden selection:bg-white/20 selection:text-white antialiased">
      <HeroSection />
      <ProblemSection />
      <TheShiftSection />
      <DreamingSection />
      <HowItFeelsSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCtaSection />
      
      {/* Hidden SEO/GEO Semantic Blocks */}
      <GeoBlocks />
    </main>
  );
}
