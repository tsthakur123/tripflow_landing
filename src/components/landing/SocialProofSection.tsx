"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Planned our Goa trip in 15 minutes instead of 3 days.",
    author: "Rohan",
  },
  {
    quote: "We actually booked because planning stopped feeling exhausting.",
    author: "Sneha",
  },
  {
    quote: "This feels like having that one organized friend in the group.",
    author: "Kabir",
  },
];

export function SocialProofSection() {
  return (
    <section className="py-40 px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto flex flex-col gap-32">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${i % 2 === 0 ? "md:items-start text-left" : "md:items-end text-left md:text-right"}`}
          >
            <p className="text-3xl md:text-5xl lg:text-6xl text-white/90 font-light leading-[1.2] mb-8 max-w-3xl">
              "{t.quote}"
            </p>
            <p className="text-white/30 font-medium tracking-[0.2em] uppercase text-sm">
              — {t.author}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
