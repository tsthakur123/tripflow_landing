"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-52 px-6 bg-transparent relative overflow-hidden min-h-[100svh] flex items-center justify-center">
      {/* Blurred "Completed Trip" background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[80vw] h-[80vh] border border-white/20 rounded-3xl bg-white/5 backdrop-blur-3xl overflow-hidden relative">
          {/* Abstract shapes representing an itinerary */}
          <div className="absolute top-10 left-10 w-1/2 h-8 bg-white/10 rounded-full" />
          <div className="absolute top-24 left-10 w-1/3 h-4 bg-white/10 rounded-full" />
          <div className="absolute top-40 left-10 w-3/4 h-32 bg-white/10 rounded-2xl" />
          <div className="absolute top-80 left-10 w-2/3 h-20 bg-white/10 rounded-2xl" />

          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <Lock className="w-12 h-12 text-white/40 mb-12 mx-auto" />
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-4 leading-[1.1]">
            Your trip is already ready.
          </h2>
          <h3 className="text-4xl md:text-6xl font-light text-white/50 leading-[1.2]">
            Unlock it for ₹49.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-16 text-white/30 tracking-widest text-sm uppercase font-mono"
        >
          Or use <span className="text-white font-bold">TripEarly10</span> to
          unlock your first escape free.
        </motion.div>
      </div>
    </section>
  );
}
