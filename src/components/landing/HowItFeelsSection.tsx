"use client";

import { motion } from "framer-motion";

export function HowItFeelsSection() {
  return (
    <section id="how-it-feels" className="py-40 px-6 relative bg-[#050505] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 pl-4 md:pl-8 border-l border-white/10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white leading-[1.1]">
            It feels effortless.
          </h2>
        </motion.div>

        <div className="space-y-40">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24"
          >
            <div className="text-white/10 text-[8rem] md:text-[14rem] font-light leading-none -mt-8 md:mt-0 select-none">1</div>
            <div className="text-3xl md:text-5xl lg:text-6xl text-white font-light max-w-2xl leading-[1.2]">
              Tell TripFlow where you want to go.
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24"
          >
            <div className="text-white/10 text-[8rem] md:text-[14rem] font-light leading-none -mt-8 md:mt-0 select-none">2</div>
            <div className="text-3xl md:text-5xl lg:text-6xl text-white font-light max-w-2xl leading-[1.2]">
              It figures out the messy part.
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24 relative"
          >
            <div className="text-primary text-[8rem] md:text-[14rem] font-medium leading-none -mt-8 md:mt-0 select-none drop-shadow-[0_0_80px_rgba(203,243,110,0.15)]">3</div>
            <div className="text-3xl md:text-5xl lg:text-6xl text-white font-medium max-w-2xl leading-[1.2]">
              You focus on the trip.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
