"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "@/components/global/MoodProvider";
import { PlaneTakeoff, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const { setGlobalMood } = useMood();
  const [isHoveringOrb, setIsHoveringOrb] = useState(false);
  const [mood, setLocalMood] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTour, setShowTour] = useState(true);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 3-Second Website Tour highlight for "Start Escaping" CTA (starts after OpeningExperience finishes at 3.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTour(false);
    }, 7200); // 3.5s OpeningExperience + 3.7s tour display = 7.2s total from mount
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnterOrb = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHoveringOrb(true);
  };

  const handleMouseLeaveOrb = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoveringOrb(false);
    }, 300);
  };

  const scrollToNextSection = () => {
    const problemSection = document.getElementById("problem-section");
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-28 overflow-hidden bg-transparent">
      {/* BRANDING LOGO & ESCAPE TIMER */}
      <div className="absolute top-8 left-6 md:left-12 z-50 flex items-center justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
        <img
          src="/logo.png"
          alt="TripFlow Logo"
          className="h-7 md:h-10 w-auto opacity-80 scale-[1.1]"
        />

        <div className="flex items-center gap-4 md:gap-6">
          {/* The Escape Timer (Urgency Guide) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="hidden md:flex text-white/50 text-xs font-mono tracking-widest uppercase items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
            <span>17 long weekends left</span>
          </motion.div>

          {/* High-Conversion CTA Group with 2-Second Website Tour Guide */}
          <div className="relative flex items-center gap-3">
            {/* Glowing CTA Button with Beacon Halo */}
            <div className={`relative group ${showTour ? "z-50" : ""}`}>
              <span className={`absolute -inset-1 rounded-full bg-primary/40 blur-md transition-all duration-500 pointer-events-none ${showTour ? "scale-115 bg-primary/80 blur-lg animate-ping" : "group-hover:bg-primary/70 group-hover:blur-lg animate-pulse"}`} />

              <a
                href="https://web.tripflow.live"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowTour(false)}
                className="relative flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-white hover:scale-105 transition-all shadow-[0_0_25px_rgba(203,243,110,0.4)]"
              >
                <span>Start Escaping</span>
                <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>

              {/* 2-Second Website Tour Spotlight & Floating Guide Badge */}
              <AnimatePresence>
                {showTour && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.9 }}
                    transition={{ delay: 3.6, duration: 0.5, type: "spring" }}
                    className="absolute -bottom-12 right-0 whitespace-nowrap flex items-center gap-2 bg-primary text-black px-3.5 py-1.5 rounded-full shadow-[0_0_25px_rgba(203,243,110,0.6)] pointer-events-none z-50"
                  >
                    {/* Pointer Notch pointing up at button */}
                    <div className="absolute -top-1 right-8 w-2.5 h-2.5 bg-primary rotate-45" />
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-black/20 text-black px-1.5 py-0.5 rounded font-bold">
                      TOUR
                    </span>
                    <span className="text-xs font-medium tracking-wide">
                      Click here to start escaping →
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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
              <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-white/90 mb-1 leading-[1.15]">
                You keep saying
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-white/90 mb-4 md:mb-6 leading-[1.15]">
                we should go somewhere.
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-primary mb-8 md:mb-12 leading-[1.15]">
                So go.
              </h1>

              {/* THE ORB */}
              <div
                className="relative cursor-pointer group p-16 -m-16 flex flex-col items-center justify-center"
                onMouseEnter={handleMouseEnterOrb}
                onMouseLeave={handleMouseLeaveOrb}
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
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center transition-all duration-700">
                  <span className="text-white/60 font-light text-lg md:text-xl transition-colors duration-500 group-hover:text-white">
                    Where to?
                  </span>
                </div>

                {/* Floating Intentions (Reveal tightly around the orb on hover) */}
                <AnimatePresence>
                  {isHoveringOrb && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20, y: -10 }}
                        animate={{ opacity: 1, x: -65, y: -25 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleIntentionClick("mountains")}
                        className="absolute top-0 left-0 whitespace-nowrap text-white/70 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        Mountains
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 20, y: -10 }}
                        animate={{ opacity: 1, x: 65, y: -25 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleIntentionClick("beach")}
                        className="absolute top-0 right-0 whitespace-nowrap text-white/70 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                      >
                        Beach
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 50 }}
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

      {/* SCROLL DOWN MARKER */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHoveringOrb ? 0 : 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToNextSection}
        aria-label="Scroll down to explore"
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors duration-300 group cursor-pointer"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 group-hover:text-white/70 transition-colors">
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-white/40 flex items-start justify-center p-1 transition-colors bg-black/20 backdrop-blur-xs">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
          />
        </div>
        <motion.div
          animate={{
            y: [0, 4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
