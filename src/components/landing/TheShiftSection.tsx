"use client";

import { motion } from "framer-motion";

export function TheShiftSection() {
  return (
    <section className="py-52 px-6 relative bg-[#050505] min-h-[100svh] flex flex-col justify-center">
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

        {/* Visual Flowing Concept */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="flex-1 w-full flex flex-col items-start lg:items-end gap-6 text-3xl md:text-5xl font-light text-white/40"
        >
          <motion.div whileHover={{ x: 20, color: "#fff" }} className="transition-all duration-500 cursor-default">Routes</motion.div>
          <motion.div whileHover={{ x: 20, color: "#fff" }} className="transition-all duration-500 cursor-default">Stays</motion.div>
          <motion.div whileHover={{ x: 20, color: "#fff" }} className="transition-all duration-500 cursor-default">Weather</motion.div>
          <motion.div whileHover={{ x: 20, color: "#fff" }} className="transition-all duration-500 cursor-default">Itineraries</motion.div>
          <motion.div whileHover={{ x: 20, color: "#fff" }} className="transition-all duration-500 cursor-default">Local spots</motion.div>
          
          <div className="w-full h-px bg-white/10 my-8" />
          
          <div className="text-4xl md:text-6xl text-white font-medium">One journey.</div>
        </motion.div>

      </div>
    </section>
  );
}
