"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "@/components/global/MoodProvider";
import { PlaneTakeoff } from "lucide-react";

export function HeroSection() {
  const { setGlobalMood } = useMood();
  const [isHoveringOrb, setIsHoveringOrb] = useState(false);
  const [mood, setLocalMood] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Backgrounds map to moods
  const backgrounds: Record<string, string> = {
    mountains:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    beach:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
    rainy_city:
      "https://images.unsplash.com/photo-1518281361980-b26bfd556770?q=80&w=2000&auto=format&fit=crop",
    default:
      "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop",
  };

  const bgImage = mood ? backgrounds[mood] : backgrounds.default;

  const handleIntentionClick = (selectedMood: string) => {
    setLocalMood(selectedMood);
    setGlobalMood(selectedMood);
    setIsGenerating(true);

    // Dissolve boarding pass after 3 seconds
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* BRANDING LOGO & ESCAPE TIMER */}
      <div className="absolute top-8 left-6 md:left-12 z-50 flex items-center justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
        <img
          src="/logo.png"
          alt="TripFlow Logo"
          className="h-7 md:h-10 w-auto opacity-80 scale-[1.1]"
        />

        <div className="flex items-center gap-6">
          {/* The Escape Timer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="hidden md:flex text-white/40 text-xs font-mono tracking-widest uppercase items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-red-500/50 animate-pulse" />
            17 long weekends left this year.
          </motion.div>

          <a 
            href="https://tripflow.live" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-primary text-black px-6 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(203,243,110,0.3)]"
          >
            Start Escaping
          </a>
        </div>
      </div>

      {/* AMBIENT CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={bgImage}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{
              opacity: mood ? 0.4 : 0.1,
              scale: [1, 1.05],
              filter: isGenerating
                ? "blur(30px) brightness(0.2)"
                : "blur(0px) brightness(1)",
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2 },
              scale: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "reverse",
              },
              filter: { duration: 1 },
            }}
            src={bgImage}
            alt="Cinematic atmosphere"
            className="w-full h-full object-cover grayscale transition-all duration-[3000ms]"
          />
        </AnimatePresence>

        {/* Dynamic Fog / Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-80" />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!mood ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white/90 mb-2 leading-[1.2]">
                You keep saying
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white/90 mb-12 leading-[1.2]">
                we should go somewhere.
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-primary mb-24 leading-[1.2]">
                So go.
              </h1>

              {/* THE ORB */}
              <div
                className="relative cursor-pointer group"
                onMouseEnter={() => setIsHoveringOrb(true)}
                onMouseLeave={() => setIsHoveringOrb(false)}
              >
                {/* Glowing Aura */}
                <motion.div
                  animate={{
                    scale: isHoveringOrb ? 1.2 : 1,
                    opacity: isHoveringOrb ? 0.5 : 0.2,
                  }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-white rounded-full blur-[40px]"
                />
                <div className="relative w-32 h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center transition-all duration-700">
                  <span className="text-white/60 font-light text-xl transition-colors duration-500 group-hover:text-white">
                    Where to?
                  </span>
                </div>

                {/* Floating Intentions (Reveal on hover) */}
                <AnimatePresence>
                  {isHoveringOrb && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -50, y: -20 }}
                        animate={{ opacity: 1, x: -100, y: -40 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleIntentionClick("mountains")}
                        className="absolute top-0 left-0 whitespace-nowrap text-white/70 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        Mountains
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 50, y: -20 }}
                        animate={{ opacity: 1, x: 100, y: -40 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleIntentionClick("beach")}
                        className="absolute top-0 right-0 whitespace-nowrap text-white/70 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        Beach
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 80 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleIntentionClick("rainy_city")}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/70 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        Rainy City
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : isGenerating ? (
            /* THE HOLY SH*T MOMENT: BOARDING PASS GENERATION */
            <motion.div
              key="boarding-pass"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex items-center justify-center w-full min-h-[50vh] relative z-50"
            >
              <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl shadow-[0_0_100px_rgba(255,255,255,0.1)] relative overflow-hidden text-left">
                {/* Scanning line effect */}
                <motion.div
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-0 w-full h-[2px] bg-white/30 shadow-[0_0_10px_white] z-20"
                />

                <div className="flex justify-between items-start mb-12">
                  <PlaneTakeoff className="w-8 h-8 text-white/50" />
                  <div className="text-right">
                    <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-1">
                      Status
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-primary text-sm font-mono uppercase tracking-widest drop-shadow-[0_0_10px_var(--primary)]"
                    >
                      ESCAPE READY
                    </motion.p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">
                      Destination
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl font-light text-white uppercase tracking-wider"
                    >
                      {mood.replace("_", " ")}
                    </motion.p>
                  </div>

                  <div>
                    <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-2">
                      Departure
                    </p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="text-xl font-light text-white uppercase tracking-wider"
                    >
                      FRIDAY NIGHT
                    </motion.p>
                  </div>
                </div>

                {/* Abstract Barcode */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-12 w-full h-8 flex gap-1 items-center justify-between opacity-30"
                >
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white"
                      style={{
                        width: Math.random() * 4 + 1 + "px",
                        height: Math.random() > 0.5 ? "100%" : "70%",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* GENERATED WORLD */
            <motion.div
              key="generated-world"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2 }}
              className="flex flex-col items-center justify-center w-full min-h-[50vh] relative"
            >
              {/* Trip Fragments specific to mood */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute top-10 left-0 md:left-10 text-white/40 tracking-widest text-xs md:text-sm uppercase"
              >
                Leave Friday night.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-10 right-0 md:right-10 text-white/40 tracking-widest text-xs md:text-sm uppercase"
              >
                Packing checklist ready.
              </motion.div>

              <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tight text-white mb-2 leading-[1.1] drop-shadow-2xl">
                The trip is ready.
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
