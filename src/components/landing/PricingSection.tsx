"use client";

import { motion } from "framer-motion";

export function PricingSection() {
  return (
    <section className="py-40 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white mb-6 leading-[1.1]">
            Less than a coffee.
          </h2>
          <h3 className="text-2xl md:text-4xl font-light text-white/50 leading-[1.2]">
            Worth hours of planning stress.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full"
        >
          <div className="text-left md:pl-16 border-l-0 md:border-l border-white/10 space-y-8">
            <p className="text-2xl text-white font-light">Unlock your complete trip:</p>
            
            <ul className="text-white/60 space-y-4 text-xl font-light">
              <li>Transport</li>
              <li>Stays</li>
              <li>Day-wise plans</li>
              <li>Weather packing</li>
              <li>Local spots</li>
            </ul>

            <div className="pt-12">
              <span className="text-white/40 text-xl block mb-2">For</span>
              <span className="text-7xl font-medium text-white tracking-tighter">₹49</span>
            </div>

            <div className="pt-12 text-white/30 text-sm tracking-widest uppercase">
              Or use <span className="text-white font-medium">TripEarly10</span> to unlock your first one free.
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
