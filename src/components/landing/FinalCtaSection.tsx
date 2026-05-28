"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="relative py-64 px-6 min-h-[100svh] flex flex-col justify-center items-center bg-[#050505] overflow-hidden">
      
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
            className="w-full h-full object-cover grayscale brightness-[0.2]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight text-white/70 mb-2 leading-[1.2]">
            Somewhere out there,
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight text-white/70 mb-12 leading-[1.2]">
            your next favorite memory
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight text-white mb-2 leading-[1.2]">
            already exists.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <h2 className="text-5xl md:text-7xl font-medium text-white mb-16 tracking-tight">Go find it.</h2>
          <Link
            href="https://tripflow.live/chat"
            className="inline-flex items-center justify-center bg-white text-black font-medium px-8 md:px-12 py-5 md:py-6 rounded-full hover:scale-[1.02] transition-transform duration-700 ease-out text-lg md:text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)] text-center max-w-full"
          >
            Leave before another plan dies in the group chat.
          </Link>
        </motion.div>
      </div>
      
    </section>
  );
}
