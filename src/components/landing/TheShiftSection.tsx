"use client";

import { motion } from "framer-motion";

export function TheShiftSection() {
  return (
    <section className="py-40 px-6 relative bg-[#050505]">
      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white mb-32 leading-[1.1]"
        >
          So we rebuilt the entire experience.
        </motion.h2>

        {/* Visual Concept: Everything flowing naturally, no boxes, no borders */}
        <div className="relative w-full flex flex-col items-center justify-center gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-5xl text-white/40 font-light"
          >
            Transport.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-5xl text-white/50 font-light"
          >
            Stays.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-5xl text-white/60 font-light"
          >
            Plans.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-5xl text-white/70 font-light"
          >
            Packing.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 1.0, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-5xl text-white/80 font-light"
          >
            Local discoveries.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 1.5, duration: 2 }}
            className="mt-16 pt-16 relative"
          >
            {/* Extremely subtle glow behind the final realization */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none" />
            <p className="text-3xl md:text-6xl text-white font-medium tracking-tight">
              Finally, all in one place.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
