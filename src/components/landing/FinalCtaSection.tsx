"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="relative py-52 px-6 min-h-[90svh] flex flex-col justify-center items-center bg-[#050505] overflow-hidden">
      
      {/* Immersive Soundless Cinematic Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop" 
            alt="Sunrise above clouds" 
            className="w-full h-full object-cover grayscale brightness-[0.2] contrast-125"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight text-white mb-8 leading-[1.1]"
        >
          The best trips start before you even leave.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-3xl text-white/50 font-light mb-20"
        >
          TripFlow makes getting there effortless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="https://tripflow.live/chat"
            className="inline-flex bg-white text-black font-medium px-12 py-6 rounded-full hover:scale-105 transition-transform duration-500 ease-out text-xl"
          >
            Go Somewhere.
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 text-center w-full z-10">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-medium">
          TripFlow makes travel feel easy again.
        </p>
      </div>
    </section>
  );
}
