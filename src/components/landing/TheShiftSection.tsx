"use client";

import { motion } from "framer-motion";

export function TheShiftSection() {
  return (
    <section className="py-52 px-6 relative min-h-[100svh] flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full z-10 relative flex flex-col lg:flex-row items-center justify-between gap-16">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight text-white leading-[1.1]">
            So we rebuilt the experience.
          </h2>
        </motion.div>

        {/* The Relief Dopamine Payload */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="flex-1 w-full"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl flex flex-col gap-6 font-mono text-sm tracking-widest uppercase text-white/50">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="text-white">Leave Friday 11:40 PM</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
            </div>
            
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="text-white">Reach by sunrise</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="text-white">Café saved</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="text-white">Rain expected Sunday</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white">Budget fits</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
