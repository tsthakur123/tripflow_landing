"use client";

import { motion } from "framer-motion";

export function StillnessSection() {
  return (
    <section className="h-[100svh] w-full flex items-center justify-center bg-transparent relative z-20">
      
      {/* Absolute Stillness. No motion. */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="text-center px-6"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/50 tracking-[0.2em] uppercase leading-relaxed max-w-4xl mx-auto">
          The world is bigger than your routine.
        </h2>
      </motion.div>

    </section>
  );
}
