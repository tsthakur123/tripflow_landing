"use client";

import { motion } from "framer-motion";

export function HowItFeelsSection() {
  return (
    <section id="how-it-feels" className="py-52 px-6 relative bg-[#050505] min-h-[100svh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        
        <div className="space-y-40">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="text-white/20 text-xl font-mono tracking-widest">01</div>
            <div className="text-4xl md:text-6xl text-white font-light max-w-2xl leading-[1.2]">
              Think about leaving.
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="text-white/20 text-xl font-mono tracking-widest">02</div>
            <div className="text-4xl md:text-6xl text-white font-light max-w-2xl leading-[1.2]">
              TripFlow handles the chaos.
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="text-primary/40 text-xl font-mono tracking-widest">03</div>
            <div className="text-4xl md:text-6xl text-white font-medium max-w-2xl leading-[1.2] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              You start looking forward to the trip again.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
