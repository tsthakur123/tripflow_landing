"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const moments = [
  { text: "The group trip that finally happened.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop" },
  { text: "Your group chat almost killed this trip.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop" },
  { text: "Don't let another long weekend disappear.", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop" },
];

function MomentItem({ moment, index }: { moment: { text: string; img: string }, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"]
  });

  const filter = useTransform(scrollYProgress, [0, 1], ["grayscale(100%)", "grayscale(0%)"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 w-full aspect-[4/3] md:aspect-[16/9] relative overflow-hidden rounded-xl">
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#050505]/50 mix-blend-overlay z-10" />
        <motion.div style={{ filter, opacity: imageOpacity }} className="w-full h-full absolute inset-0">
          <motion.img 
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
            src={moment.img} 
            alt={moment.text} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-[1.1]">
          {moment.text}
        </h3>
      </div>
    </motion.div>
  );
}

export function HumanMomentsSection() {
  return (
    <section className="py-40 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {moments.map((moment, i) => (
          <MomentItem key={i} moment={moment} index={i} />
        ))}
      </div>
    </section>
  );
}
