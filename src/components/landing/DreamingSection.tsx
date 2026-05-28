"use client";

import { motion } from "framer-motion";

const memories = [
  { text: "Spontaneous Goa trip", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop" },
  { text: "Mountains after exams", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" },
  { text: "Solo airport walk", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop" },
  { text: "Cafe hopping in another city", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop" },
];

export function DreamingSection() {
  return (
    <section className="py-40 px-6 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 pl-4 md:pl-8 border-l border-white/10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white leading-[1.1]">
            Every trip starts with a feeling.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {memories.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group overflow-hidden aspect-[4/3] md:aspect-[3/4] flex items-end p-8 md:p-12"
            >
              <div className="absolute inset-0 bg-[#050505]">
                <motion.img 
                  animate={{ scale: [1, 1.05] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
                  src={item.img} 
                  alt={item.text} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 grayscale group-hover:grayscale-0 mix-blend-screen"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-90" />
              
              <h3 className="relative z-10 text-3xl md:text-5xl text-white font-medium leading-tight">
                {item.text}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
