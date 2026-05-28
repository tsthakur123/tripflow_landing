"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useMood } from "@/components/global/MoodProvider";

export function FinalCtaSection() {
  const { setGlobalMood } = useMood();
  const [isHoveringOrb, setIsHoveringOrb] = useState(false);

  const resetJourney = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setGlobalMood(null);
    }, 1000);
  };

  return (
    <section className="relative py-64 px-6 min-h-[100svh] flex flex-col justify-center items-center bg-transparent overflow-hidden">
      
      {/* Immersive Soundless Cinematic Visual: Airplane wing above clouds / Sunrise */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop" 
            alt="Sunrise above clouds" 
            className="w-full h-full object-cover mix-blend-screen opacity-20"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/50" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight opacity-70 mb-2 leading-[1.2]">
            Somewhere out there,
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight opacity-70 mb-12 leading-[1.2]">
            your next favorite memory
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight opacity-100 mb-2 leading-[1.2]">
            already exists.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl font-medium opacity-100 mb-16 tracking-tight max-w-3xl leading-[1.3]">
            Where would you leave for if nobody stopped you?
          </h2>
          
          {/* THE ORB LOOP */}
          <div className="relative cursor-pointer group" onMouseEnter={() => setIsHoveringOrb(true)} onMouseLeave={() => setIsHoveringOrb(false)} onClick={resetJourney}>
            <motion.div 
              animate={{ scale: isHoveringOrb ? 1.2 : 1, opacity: isHoveringOrb ? 0.2 : 0.05 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-current rounded-full blur-[40px]"
            />
            <div className="relative w-32 h-32 rounded-full border border-current/20 bg-current/5 backdrop-blur-xl flex items-center justify-center transition-all duration-700">
              <span className="opacity-60 font-light text-xl transition-opacity duration-500 group-hover:opacity-100">Restart</span>
            </div>
          </div>

          <a 
            href="https://tripflow.live" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-8 bg-[#050505] text-white px-10 py-4 rounded-full text-lg font-medium tracking-wide hover:bg-primary hover:text-black hover:scale-105 transition-all shadow-2xl"
          >
            Book Your Trip Now
          </a>
        </motion.div>
      </div>
      
    </section>
  );
}
