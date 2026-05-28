"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HiddenDiscoveries() {
  const [discoveries, setDiscoveries] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const triggers = [
    "Window seat preferred.",
    "2:13 AM — Goa booked.",
    "Some trips change everything.",
    "The world is still out there.",
    "You should be packing."
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let count = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn a tiny discovery randomly when mouse moves fast or pauses
      if (Math.random() > 0.99 && count < 5) {
        const newDiscovery = {
          id: Date.now(),
          text: triggers[Math.floor(Math.random() * triggers.length)],
          x: e.clientX + (Math.random() * 100 - 50),
          y: e.clientY + (Math.random() * 100 - 50)
        };
        
        setDiscoveries(prev => [...prev, newDiscovery]);
        count++;

        // Remove the discovery after a few seconds
        setTimeout(() => {
          setDiscoveries(prev => prev.filter(d => d.id !== newDiscovery.id));
          count--;
        }, 4000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <AnimatePresence>
        {discoveries.map(d => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-white/30 text-[10px] font-mono tracking-widest uppercase pointer-events-none"
            style={{ left: d.x, top: d.y }}
          >
            {d.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
