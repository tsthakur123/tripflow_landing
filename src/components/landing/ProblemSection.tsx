"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileText, MessageCircle, Map, Cloud, Hotel, Plane } from "lucide-react";

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll sequence that acts like a short film.
  // 300vh total height. 
  // 0-100vh: Scene 1 (Tabs, texts, chaos)
  // 100-200vh: Scene 2 (Budget sheets, comparisons)
  // 200-300vh: Scene 3 (Freeze, silence, realization)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scene 1 Opacities (Visible early, fades out mid)
  const scene1Opacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const tabY = useTransform(smoothProgress, [0, 0.4], [100, -100]);
  const tabRotate = useTransform(smoothProgress, [0, 0.4], [0, 15]);

  // Scene 2 Opacities (Visible mid, fades out late)
  const scene2Opacity = useTransform(smoothProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const sheetY = useTransform(smoothProgress, [0.4, 0.7], [50, -50]);
  const sheetScale = useTransform(smoothProgress, [0.4, 0.6], [0.9, 1.05]);

  // Scene 3 Opacities (Visible at the very end)
  const scene3Opacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const scene3Scale = useTransform(smoothProgress, [0.75, 1], [0.95, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050505]">
      {/* Sticky Container for the "Film" */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Noise / Vibe */}
        <div className="absolute inset-0 bg-[#050505] z-0" />
        
        {/* SCENE 1: The Tabs & Group Chat */}
        <motion.div 
          style={{ opacity: scene1Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6"
        >
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center pointer-events-none">
            <motion.div style={{ y: tabY, rotate: tabRotate }} className="absolute -left-10 md:left-10 top-1/4 flex items-center gap-3 w-64 text-white/40 text-lg">
              <Plane className="w-5 h-5 text-white/50" /> Flights (14 Open)
            </motion.div>
            
            <motion.div style={{ y: useTransform(smoothProgress, [0, 0.4], [50, -150]), rotate: -10 }} className="absolute right-0 md:right-20 top-1/3 flex items-start gap-4 w-72">
              <MessageCircle className="w-5 h-5 text-white/50 mt-1 shrink-0" />
              <div className="text-white/80 text-xl font-light">
                <p className="text-white/30 text-xs mb-2 tracking-widest uppercase">iMessage</p>
                "Bro book fast."
              </div>
            </motion.div>

            <motion.div style={{ y: useTransform(smoothProgress, [0, 0.4], [150, -50]), rotate: 5 }} className="absolute left-10 md:left-32 bottom-1/3 flex items-center gap-3 w-56 text-white/40 text-lg">
              <Hotel className="w-5 h-5 text-white/50" /> Hotel Comparisons
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-light text-white/30 tracking-tight text-center max-w-2xl leading-tight">
              14 Chrome tabs floating.<br/>Flight prices changing.
            </h2>
          </div>
        </motion.div>


        {/* SCENE 2: The Deep Chaos */}
        <motion.div 
          style={{ opacity: scene2Opacity, scale: sheetScale, y: sheetY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6"
        >
          <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center pointer-events-none gap-16">
            
            <div className="flex flex-wrap justify-center gap-10 opacity-40 blur-[1px] text-xl font-light">
              <div className="flex items-center gap-3 text-white"><FileText className="w-5 h-5 text-white/50"/> Budget Sheet</div>
              <div className="flex items-center gap-3 text-white"><Cloud className="w-5 h-5 text-white/50"/> Weather app</div>
              <div className="flex items-center gap-3 text-white"><Map className="w-5 h-5 text-white/50"/> Maps</div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-white/20 tracking-[0.2em] uppercase text-xs font-medium">Someone typing...</p>
              <h2 className="text-5xl md:text-7xl font-light text-white/80 tracking-tight text-center leading-tight">
                "This is getting confusing."
              </h2>
            </div>
          </div>
        </motion.div>

        {/* SCENE 3: The Freeze / Realization */}
        <motion.div 
          style={{ opacity: scene3Opacity, scale: scene3Scale }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505] p-6"
        >
          <div className="max-w-4xl text-center space-y-8">
            <p className="text-primary/60 tracking-[0.3em] uppercase text-sm font-medium">
              Everything freezes.
            </p>
            <h2 className="text-5xl md:text-[5.5rem] font-medium text-white tracking-tight leading-[1.1]">
              You wanted to travel.<br/>
              <span className="text-white/40">Not manage chaos.</span>
            </h2>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
