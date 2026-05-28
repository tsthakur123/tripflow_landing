"use client";

import { motion } from "framer-motion";

const outcomes = [
  "Planning stopped being exhausting.",
  "We actually booked instead of talking about it for weeks.",
  "This feels like having the organized friend in the group."
];

export function SocialProofSection() {
  return (
    <section className="py-40 px-6 bg-[#050505] flex items-center justify-center">
      <div className="max-w-4xl mx-auto flex flex-col gap-32">
        {outcomes.map((quote, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-3xl md:text-5xl lg:text-6xl text-white/80 font-light leading-[1.3]">
              "{quote}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
