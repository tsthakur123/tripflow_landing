"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileText, MessageCircle } from "lucide-react";

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
  const tabY1 = useTransform(smoothProgress, [0, 0.33], [300, -100]);
  const tabY2 = useTransform(smoothProgress, [0.1, 0.33], [400, -200]);
  const scene1Opacity = useTransform(smoothProgress, [0, 0.2, 0.33], [1, 1, 0]);

  // Scene 2: The Typo Silence
  const typingOpacity = useTransform(smoothProgress, [0.33, 0.45, 0.55], [0, 1, 0]);
  const deadSilenceOpacity = useTransform(smoothProgress, [0.55, 0.65, 0.75], [0, 1, 0]);

  // Scene 3: The Hard Stop
  const scene3Opacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      
      {/* Sticky Film Frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* SCENE 1: Reality Invades */}
        <motion.div 
          style={{ opacity: scene1Opacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          {/* Micro-Reality Fragments */}
          <motion.div style={{ y: tabY1, rotate: -5 }} className="absolute left-10 md:left-32 flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white/70 text-sm font-medium backdrop-blur-md shadow-2xl">
            <FileText className="w-4 h-4 text-blue-400"/> GOA FINAL FINAL PLAN v6.pdf
          </motion.div>

          <motion.div style={{ y: tabY2, rotate: 8 }} className="absolute right-10 md:right-40 flex items-start gap-4 bg-primary/10 border border-primary/20 p-4 rounded-2xl backdrop-blur-md shadow-2xl max-w-xs">
            <MessageCircle className="w-5 h-5 mt-1 shrink-0 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-1">WhatsApp</p>
              <p className="text-white/80 text-sm">"Bhai leave it, too much planning."</p>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light text-white/30 tracking-tight text-center">
            Planning kills spontaneity.
          </h2>
        </motion.div>

        {/* SCENE 2: The Typing Silence */}
        <motion.div 
          style={{ opacity: typingOpacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex items-center gap-2 bg-white/10 px-6 py-4 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </motion.div>

        <motion.div 
          style={{ opacity: deadSilenceOpacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
           {/* Dead silence. Just empty space to force uncomfortable pacing. */}
           <div className="text-white/40 font-mono tracking-widest text-sm bg-black/50 px-4 py-2 rounded-lg">Read 2:14 AM</div>
        </motion.div>


        {/* SCENE 3: The Freeze */}
        <motion.div 
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
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
