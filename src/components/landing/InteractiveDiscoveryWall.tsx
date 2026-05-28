"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = [
  { id: "rainy", label: "Rainy city", visual: "https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=2000&auto=format&fit=crop", copy: "Best late-night ramen spots already saved." },
  { id: "luxury", label: "Luxury escape", visual: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop", copy: "Infinity pool reserved. Driver waiting." },
  { id: "mountain", label: "Mountains", visual: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop", copy: "Wake up above the clouds." },
  { id: "solo", label: "Solo journey", visual: "https://images.unsplash.com/photo-1476900543704-4312b78632f8?q=80&w=2000&auto=format&fit=crop", copy: "Zero compromises. Total freedom." }
];

export function InteractiveDiscoveryWall() {
  const [activeMood, setActiveMood] = useState(moods[0]);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-32 px-6 overflow-hidden bg-transparent">
      
      {/* Dynamic Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMood.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.5, scale: [1, 1.05] }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5 }, scale: { duration: 20, repeat: Infinity, ease: "linear", repeatType: "reverse" } }}
            src={activeMood.visual}
            alt={activeMood.label}
            className="w-full h-full object-cover grayscale brightness-50 mix-blend-screen"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-16">
        
        {/* Dynamic Copy */}
        <div className="flex-1 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeMood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.2]"
            >
              {activeMood.copy}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Discovery Wall Selector */}
        <div className="flex flex-wrap gap-4 justify-end max-w-lg">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setActiveMood(mood)}
              className={`px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-700 text-lg md:text-xl font-light ${
                activeMood.id === mood.id 
                  ? "bg-white text-black border-white" 
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
