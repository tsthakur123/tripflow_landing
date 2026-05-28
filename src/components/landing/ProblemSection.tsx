"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileText, MessageCircle, Map, Cloud, Hotel, Plane } from "lucide-react";

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scene 1: The Invasion of Reality (Tabs flood in)
  const tabY1 = useTransform(smoothProgress, [0, 0.4], [300, -200]);
  const tabY2 = useTransform(smoothProgress, [0.1, 0.5], [400, -300]);
  const tabY3 = useTransform(smoothProgress, [0.2, 0.6], [500, -100]);
  const scene1Opacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.6], [0, 1, 1, 0]);

  // Scene 2: Total Overwhelm
  const chaosScale = useTransform(smoothProgress, [0.4, 0.7], [0.8, 1.2]);
  const scene2Opacity = useTransform(smoothProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);

  // Scene 3: The Hard Stop (Freeze)
  const scene3Opacity = useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      
      {/* Sticky Film Frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        
        {/* SCENE 1: Reality Invades */}
        <motion.div 
          style={{ opacity: scene1Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          {/* Floating UI Elements matching the chaos prompt */}
          <motion.div style={{ y: tabY1, rotate: -5 }} className="absolute left-10 md:left-32 flex items-center gap-2 text-white/50 text-xl font-light">
            <Plane className="w-5 h-5"/> Flights (14 Open)
          </motion.div>
          <motion.div style={{ y: tabY2, rotate: 10 }} className="absolute right-10 md:right-40 flex items-start gap-4 text-white/50 text-xl font-light">
            <MessageCircle className="w-5 h-5 mt-1 shrink-0 text-blue-400" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white/20 mb-1">iMessage</p>
              "bro decide fast"
            </div>
          </motion.div>
          <motion.div style={{ y: tabY3, rotate: -15 }} className="absolute bottom-32 left-1/4 flex items-center gap-2 text-white/50 text-xl font-light">
            <Hotel className="w-5 h-5"/> Airbnb Tabs
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light text-white/30 tracking-tight text-center">
            Planning kills spontaneity.
          </h2>
        </motion.div>


        {/* SCENE 2: The Overwhelm */}
        <motion.div 
          style={{ opacity: scene2Opacity, scale: chaosScale }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 blur-[2px] font-light text-2xl md:text-4xl pointer-events-none mb-12">
            <div className="flex items-center gap-3 text-white"><FileText className="w-8 h-8"/> Budget Sheets</div>
            <div className="flex items-center gap-3 text-white"><Cloud className="w-8 h-8"/> Weather</div>
            <div className="flex items-center gap-3 text-white"><Map className="w-8 h-8"/> Map Switching</div>
          </div>
          <h2 className="text-5xl md:text-8xl font-light text-white/80 tracking-tight text-center">
            "This is getting confusing."
          </h2>
        </motion.div>


        {/* SCENE 3: The Freeze */}
        <motion.div 
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="max-w-5xl text-center">
            <h2 className="text-4xl md:text-7xl font-light text-white/50 tracking-tight leading-[1.2] mb-4">
              Some trips never happen.
            </h2>
            <h2 className="text-4xl md:text-7xl font-light text-white/50 tracking-tight leading-[1.2] mb-4">
              Not because people don't want them.
            </h2>
            <h2 className="text-5xl md:text-8xl font-medium text-white tracking-tight leading-[1.1] mt-8">
              Because planning kills them.
            </h2>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
