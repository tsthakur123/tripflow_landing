"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OpeningExperience({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hold the preloader for a few seconds to build tension
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 1000); // Wait for fade out animation before unmounting
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Flickering GPS Coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 0.8, 0] }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute top-1/4 left-1/4 text-white/20 text-xs font-mono tracking-[0.3em]"
          >
            LAT: 28.6139° N
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.2, 1, 0] }}
            transition={{ duration: 3, delay: 0.5, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 text-white/20 text-xs font-mono tracking-[0.3em]"
          >
            LON: 77.2090° E
          </motion.div>

          {/* Subtle Airplane Path */}
          <div className="relative w-full max-w-2xl h-[1px]">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute top-[-2px] left-0 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
