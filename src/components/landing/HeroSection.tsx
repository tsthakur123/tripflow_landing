"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  MoveRight,
  CloudRain,
  Sun,
  Train,
  CheckCircle,
} from "lucide-react";

const placeholders = [
  "somewhere cold...",
  "a beach...",
  "solo trip...",
  "cheap weekend...",
  "mountains...",
  "rainy city...",
  "somewhere quiet...",
];

export function HeroSection() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotate placeholders
  useEffect(() => {
    if (inputValue) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inputValue]);

  // Handle mouse move for cinematic depth
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const isInteracting = inputValue.length > 0;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* 
        ENVIRONMENT BACKDROP 
        Starts almost totally dark. Lights up when user interacts.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base ambient motion (always present but very dark) */}
        <motion.div
          animate={{ scale: [1, 1.05], x: mousePos.x * -1, y: mousePos.y * -1 }}
          transition={{
            scale: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse",
            },
            x: { type: "spring", stiffness: 50 },
            y: { type: "spring", stiffness: 50 },
          }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop"
            alt="Cinematic atmosphere"
            className={`w-full h-full object-cover grayscale transition-all duration-[3000ms] ${isInteracting ? "opacity-30 brightness-[0.4] contrast-150" : "opacity-10 brightness-[0.1] contrast-100"}`}
          />
        </motion.div>

        {/* Dynamic World Elements (Only appear on interaction) */}
        <AnimatePresence>
          {isInteracting && (
            <>
              {/* Cinematic Glows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-primary/5 to-transparent"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-500/10 blur-[120px]"
              />

              {/* Floating Fragments of a Future Memory */}
              <motion.div
                initial={{ opacity: 0, y: 50, x: mousePos.x * 2 }}
                animate={{ opacity: 1, y: 0, x: mousePos.x * 2 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute top-[20%] left-[10%] flex items-center gap-3 text-white/60 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-md"
              >
                <CloudRain className="w-4 h-4 text-blue-400" /> Rain expected
                Saturday.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, x: mousePos.x * -3 }}
                animate={{ opacity: 1, y: 0, x: mousePos.x * -3 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="absolute top-[35%] right-[15%] flex items-center gap-3 text-white/60 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-md"
              >
                <Sun className="w-4 h-4 text-orange-400" /> Best sunset spot
                saved.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20, x: mousePos.x * 1.5 }}
                animate={{ opacity: 1, y: 0, x: mousePos.x * 1.5 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="absolute bottom-[25%] left-[20%] flex items-center gap-3 text-white/60 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-md"
              >
                <Train className="w-4 h-4 text-primary" /> Train leaves 11:40
                PM.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, x: mousePos.x * -2 }}
                animate={{ opacity: 1, y: 0, x: mousePos.x * -2 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="absolute bottom-[15%] right-[25%] flex items-center gap-3 text-white/60 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-md"
              >
                <CheckCircle className="w-4 h-4 text-green-400" /> Packing
                checklist ready.
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 
        FOREGROUND CONTENT 
      */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-[-10vh]">
        {/* Initial Question (Fades out or moves up when interacting) */}
        <motion.h1
          animate={{
            opacity: isInteracting ? 0 : 1,
            y: isInteracting ? -20 : 0,
            scale: isInteracting ? 0.95 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-light tracking-tight text-white/80 mb-12 pointer-events-none"
        >
          Where would you go if you could leave tomorrow?
        </motion.h1>

        {/* The Portal (Input) */}
        <motion.div
          animate={{
            y: isInteracting ? -50 : 0,
            scale: isInteracting ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-2xl"
        >
          <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />
          <div className="relative flex items-center bg-white/10 border border-white/20 rounded-full px-8 py-5 md:py-6 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:bg-white/15 focus-within:bg-white/20 focus-within:border-white/40 group">
            <Search className="w-6 h-6 text-white/40 mr-4 group-focus-within:text-white/80 transition-colors" />

            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent text-white text-xl md:text-2xl font-light placeholder-transparent outline-none z-10"
              />

              {/* Rotating Placeholder (only visible when empty) */}
              {!inputValue && (
                <div className="absolute left-0 pointer-events-none flex items-center h-full">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl md:text-2xl font-light text-white/30"
                    >
                      {placeholders[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* The Reaction: Massive Text & CTAs appear when typing */}
        <AnimatePresence>
          {isInteracting && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="mt-16 flex flex-col items-center"
            >
              <h2 className="text-6xl md:text-[7rem] font-medium tracking-tight text-white leading-[1.1] mb-2 drop-shadow-2xl">
                You should be packing.
              </h2>
              <h2 className="text-6xl md:text-[7rem] font-medium tracking-tight text-white/40 leading-[1.1] mb-16 drop-shadow-2xl">
                Not planning.
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                <Link
                  href="https://tripflow.live/chat"
                  className="group flex items-center justify-center gap-3 bg-white text-black font-medium px-10 py-5 md:px-12 md:py-6 rounded-full hover:scale-105 transition-transform duration-500 ease-out text-lg md:text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  Go Somewhere.
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how-it-feels"
                  className="flex items-center justify-center text-white/50 font-medium px-8 py-4 hover:text-white transition-colors duration-500 text-lg"
                >
                  See What Happens
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
