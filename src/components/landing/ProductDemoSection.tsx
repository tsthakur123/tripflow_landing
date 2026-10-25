"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Sparkles, 
  Check, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  Compass, 
  RefreshCw,
  Route,
  Hotel,
  ShieldCheck,
  Radio,
  CloudFog,
  TrendingUp,
  CreditCard
} from "lucide-react";

interface TripData {
  id: "discovery" | "direct";
  modeNumber: string;
  modeLabel: string;
  tag: string;
  title: string;
  location: string;
  coords: string;
  routeCode: string;
  elevation: string;
  weather: string;
  prompt: string;
  heroImage: string;
  whyChosen: string;
  stats: {
    totalBudget: string;
    budgetCeiling: string;
    percentUsed: number;
    bufferRemaining: string;
    driveTime: string;
    stayType: string;
  };
  telemetry: string[];
  days: {
    day: string;
    label: string;
    title: string;
    time: string;
    tag: string;
    highlight: string;
  }[];
}

const TRIPS: Record<"discovery" | "direct", TripData> = {
  discovery: {
    id: "discovery",
    modeNumber: "01",
    modeLabel: "Discover Destination",
    tag: "UNDECIDED ESCAPE",
    title: "Sakleshpur Coffee Ridge",
    location: "Western Ghats, Karnataka",
    coords: "12.9716° N • 75.7885° E",
    routeCode: "BLR ➔ HASSAN ➔ SAKLESHPUR",
    elevation: "956m Above Sea",
    weather: "21°C • Mountain Mist",
    prompt: "5 days from Bengaluru under ₹50k for two. Mountains, secluded stays, authentic food, not touristy.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    whyChosen: "65% quieter than commercial hill stations • Zero bottleneck traffic",
    stats: {
      totalBudget: "₹43,200",
      budgetCeiling: "₹50,000",
      percentUsed: 86,
      bufferRemaining: "₹6,800 buffer intact",
      driveTime: "4h 15m scenic highway",
      stayType: "Private Coffee Chalet",
    },
    telemetry: [
      "Bypassed overcrowded Ooty & Coorg hubs",
      "Secured private estate cottage with local dining",
      "Calculated zero-backtracking mountain curves"
    ],
    days: [
      { day: "01", label: "Day 01", title: "Plantation Arrival & Slow Dusk", time: "Morning Drive", tag: "Arrival", highlight: "Check-in to private coffee estate chalet, guided dusk plantation walk & fireside dinner." },
      { day: "02", label: "Day 02", title: "Star Fort Trek & Secret Waterfall", time: "Full Day", tag: "Adventure", highlight: "Trek to Manjarabad 8-point star fort, secluded natural waterfall dip, sunset ridge." },
      { day: "03", label: "Day 03", title: "Bisle Viewpoint Jeep Expedition", time: "Afternoon", tag: "Scenic", highlight: "Misty off-road jeep trail across Western Ghats cloud cover and valley lookouts." },
      { day: "04", label: "Day 04", title: "Stream Walks & Artisanal Brews", time: "Slow Day", tag: "Relaxed", highlight: "Gentle stream walks, single-origin coffee roasting session, woodfire dining." },
      { day: "05", label: "Day 05", title: "Historic Belur & Smooth Return", time: "Half Day", tag: "Return", highlight: "12th-century Belur stone temple stop, scenic relaxed return highway drive to Bengaluru." },
    ]
  },
  direct: {
    id: "direct",
    modeNumber: "02",
    modeLabel: "Plan Known Destination",
    tag: "CHOSEN JOURNEY",
    title: "Meghalaya Living Roots",
    location: "Cherrapunji & Dawki",
    coords: "25.2986° N • 91.5822° E",
    routeCode: "GAU ➔ SHILLONG ➔ NONGRIAT",
    elevation: "1,484m Above Sea",
    weather: "19°C • Waterfall Breeze",
    prompt: "5 days in Meghalaya for 2 under ₹50k. Waterfalls, root bridges, crystal rivers, relaxed pacing.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop",
    whyChosen: "Clustered geographically to eliminate 8+ hours of zig-zag driving",
    stats: {
      totalBudget: "₹42,600",
      budgetCeiling: "₹50,000",
      percentUsed: 85,
      bufferRemaining: "₹7,400 buffer intact",
      driveTime: "Dedicated Hill Driver",
      stayType: "Eco Heritage Lodge",
    },
    telemetry: [
      "Discovery bypassed • Direct route mapped",
      "Boutique lodges matched near waterfall trailheads",
      "Paced with zero morning rush or airport anxiety"
    ],
    days: [
      { day: "01", label: "Day 01", title: "Guwahati to Shillong Lakefront", time: "Scenic Transit", tag: "Transit", highlight: "Airport pickup, lakefront Umiam cafe break, evening stroll through pine-lined Shillong." },
      { day: "02", label: "Day 02", title: "Double Decker Root Bridge Hike", time: "Trek Day", tag: "Trek", highlight: "Descent to Nongriat, suspension bridges over turquoise pools, natural stone swimming." },
      { day: "03", label: "Day 03", title: "Wei Sawdong & Nohkalikai Cliffs", time: "Full Day", tag: "Waterfalls", highlight: "3-tiered hidden jungle falls, Nohkalikai cliff panorama, authentic Khasi lunch." },
      { day: "04", label: "Day 04", title: "Transparent River Boating", time: "Relaxed", tag: "Riverside", highlight: "Glass-clear Umngot river boating in Dawki, border sunset in Mawlynnong clean village." },
      { day: "05", label: "Day 05", title: "Pine Forest Return to Airport", time: "Morning", tag: "Return", highlight: "Traditional Khasi breakfast, mountain descent to Guwahati airport with zero delays." },
    ]
  }
};

type SimulationState = "typing" | "reasoning" | "ready";

export function ProductDemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  const [activeTab, setActiveTab] = useState<"discovery" | "direct">("discovery");
  const [activeDay, setActiveDay] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [simState, setSimState] = useState<SimulationState>("typing");

  const currentTrip = TRIPS[activeTab];

  // Progressive Choreography: Starts when user reaches section or switches tabs
  useEffect(() => {
    if (!isInView) return;

    let isCancelled = false;
    setSimState("typing");
    setTypedPrompt("");
    setActiveDay(0);

    const fullText = currentTrip.prompt;
    let idx = 0;

    // Step 1: Type out prompt with smooth rhythm
    const interval = setInterval(() => {
      if (isCancelled) return;
      if (idx < fullText.length) {
        setTypedPrompt(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        
        // Step 2: Reasoning & constraint calculation
        if (!isCancelled) {
          setSimState("reasoning");
          
          // Step 3: Reveal payload
          setTimeout(() => {
            if (!isCancelled) {
              setSimState("ready");
            }
          }, 650);
        }
      }
    }, 18);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [isInView, activeTab]);

  const restartSimulation = () => {
    setSimState("typing");
    setTypedPrompt("");
    setActiveDay(0);

    const fullText = currentTrip.prompt;
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTypedPrompt(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        setSimState("reasoning");
        setTimeout(() => {
          setSimState("ready");
        }, 650);
      }
    }, 18);
  };

  return (
    <section 
      ref={sectionRef}
      id="product-demo" 
      className="relative min-h-[100svh] py-10 sm:py-14 lg:py-16 px-3 sm:px-6 md:px-10 lg:px-16 flex flex-col justify-center items-center bg-transparent overflow-hidden"
    >
      {/* Specular Ambient Glow that shifts hue based on active mode */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-[170px] pointer-events-none transition-all duration-1000 ${
          activeTab === "discovery" 
            ? "bg-primary/[0.06]" 
            : "bg-emerald-500/[0.06]"
        }`} 
      />

      <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* HEADER: Ultra-refined Typography & Apple-style Segmented Switcher */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-white/50 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
            <span>Intelligent Decision Engine</span>
          </motion.div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white max-w-3xl leading-[1.15]">
            One prompt. Every detail settled.
          </h2>

          <p className="text-white/40 text-xs sm:text-sm md:text-base max-w-lg font-light leading-relaxed">
            Watch TripFlow coordinate transport, boutique stays, and daily pacing in seconds.
          </p>

          {/* LUXURY FROSTED SEGMENTED CONTROL */}
          <div className="p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl flex items-center gap-1 shadow-2xl max-w-full">
            <button
              onClick={() => setActiveTab("discovery")}
              className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === "discovery"
                  ? "text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {activeTab === "discovery" && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">Mode 1: Discover Where To Go</span>
                <span className="sm:hidden">Mode 1: Discover</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("direct")}
              className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === "direct"
                  ? "text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {activeTab === "direct" && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">Mode 2: Plan Known Destination</span>
                <span className="sm:hidden">Mode 2: Plan Direct</span>
              </span>
            </button>
          </div>
        </div>

        {/* THE CINEMATIC STUDIO COCKPIT */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-[#090909]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] overflow-hidden"
        >
          {/* Specular Top Rim Gradient */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* TOP TELEMETRY BAR: Classified Concierge Header */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 flex items-center justify-between gap-2 bg-white/[0.02]">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className={`w-2 h-2 shrink-0 rounded-full transition-colors ${
                simState === "ready" 
                  ? "bg-primary shadow-[0_0_10px_var(--primary)]" 
                  : "bg-yellow-400 animate-ping"
              }`} />
              <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-[0.2em] uppercase text-white/50 truncate">
                {currentTrip.tag}
                <span className="hidden md:inline"> • {currentTrip.routeCode}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className={`text-[10px] sm:text-[11px] font-mono tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border transition-all ${
                simState === "typing" 
                  ? "text-yellow-300 bg-yellow-500/10 border-yellow-500/20" 
                  : simState === "reasoning" 
                  ? "text-primary bg-primary/10 border-primary/20 animate-pulse" 
                  : "text-primary bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(203,243,110,0.15)]"
              }`}>
                {simState === "typing" ? (
                  <>
                    <span className="sm:hidden">1. Ingesting...</span>
                    <span className="hidden sm:inline">1. Ingesting Constraints...</span>
                  </>
                ) : simState === "reasoning" ? (
                  <>
                    <span className="sm:hidden">2. Calculating...</span>
                    <span className="hidden sm:inline">2. Calculating Curves & Stays...</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">3. Ready (1.2s)</span>
                    <span className="hidden sm:inline">3. Orchestrated in 1.2s</span>
                  </>
                )}
              </span>

              <button
                onClick={restartSimulation}
                className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
                title="Re-play Simulation"
              >
                <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Re-play</span>
              </button>
            </div>
          </div>

          {/* MAIN COCKPIT BODY */}
          <div className="p-4 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            
            {/* LEFT 5 COLS: CINEMATIC DESTINATION ARTIFACT (WITH LASER SCAN REVEAL) */}
            <div className="lg:col-span-5 relative h-[240px] sm:h-[300px] lg:h-[360px] xl:h-[380px] rounded-2xl overflow-hidden group border border-white/10 shadow-2xl bg-[#0c0c0c] flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                {simState !== "ready" ? (
                  /* RADAR / SCANNING STATE DURING TYPING & REASONING */
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-3 sm:space-y-4"
                  >
                    {/* Pulsing Sonar Ring with Concentric Orbits */}
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border border-primary/40 bg-primary/5"
                      />
                      <motion.div
                        animate={{ scale: [1, 2.1, 1], opacity: [0.05, 0.2, 0.05] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.3, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border border-primary/20"
                      />
                      <Radio className="w-6 h-6 sm:w-7 sm:h-7 text-primary/80 animate-pulse" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-primary font-semibold">
                        {simState === "typing" ? "Awaiting Intent Ingestion" : "Solving Route & Stay Feasibility"}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-white/40 font-mono tracking-wide">
                        {simState === "typing" ? "Typing constraints above..." : "Matching verified boutique chalets..."}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* FULL DESTINATION REVEAL WITH SCANNING LASER SWEEP */
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Laser Scan Sweep Light Effect */}
                    <motion.div
                      initial={{ top: "-10%" }}
                      animate={{ top: "110%" }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                      className="absolute left-0 w-full h-[2px] bg-primary/70 shadow-[0_0_15px_var(--primary)] z-30 pointer-events-none"
                    />

                    <img
                      src={currentTrip.heroImage}
                      alt={currentTrip.title}
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />

                    {/* Fog & Vignette Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                    {/* Top Micro Concierge Pill */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex justify-between items-center z-20">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 border border-white/20 text-[9px] sm:text-[10px] font-mono tracking-wider text-white/80 backdrop-blur-md">
                        <CloudFog className="w-3 h-3 text-primary" />
                        <span>{currentTrip.weather}</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-widest uppercase">
                        {currentTrip.elevation}
                      </span>
                    </div>

                    {/* Floating Meta Overlay */}
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 space-y-1.5 sm:space-y-2 z-20"
                    >
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/80 backdrop-blur-md">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                        <span>{currentTrip.location}</span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
                        {currentTrip.title}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-light line-clamp-1 sm:line-clamp-2">
                        {currentTrip.whyChosen}
                      </p>

                      {/* Budget Meter Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-white/50">
                          <span>UTILIZATION: {currentTrip.stats.percentUsed}%</span>
                          <span className="text-primary font-semibold">{currentTrip.stats.bufferRemaining}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${currentTrip.stats.percentUsed}%` }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="h-full bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
                          />
                        </div>
                      </div>

                      {/* Floating Metric Badges */}
                      <div className="flex items-center gap-2 pt-0.5">
                        <div className="flex-1 bg-white/[0.08] border border-white/15 px-2.5 py-1 rounded-xl backdrop-blur-md">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-white/40 block">Total Est.</span>
                          <span className="text-xs sm:text-sm font-semibold text-primary">{currentTrip.stats.totalBudget}</span>
                        </div>
                        <div className="flex-1 bg-white/[0.08] border border-white/15 px-2.5 py-1 rounded-xl backdrop-blur-md">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-white/40 block">Transit Curve</span>
                          <span className="text-xs sm:text-sm font-semibold text-white truncate block">{currentTrip.stats.driveTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* RIGHT 7 COLS: INTERACTIVE TIMELINE & ORCHESTRATION */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
              
              {/* Natural Language Prompt Capsule */}
              <div className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Input Intent
                  </span>
                  <span className="text-primary font-medium">Ceiling: {currentTrip.stats.budgetCeiling}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed min-h-[38px] sm:min-h-[44px]">
                  "{typedPrompt}"
                  {simState === "typing" && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-primary animate-pulse align-middle" />
                  )}
                </p>
              </div>

              {/* Agent Telemetry Highlights (Cascades in after typing) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                {currentTrip.telemetry.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 6 }}
                    animate={simState !== "typing" ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 0 }}
                    transition={{ delay: simState === "reasoning" ? i * 0.15 : 0, duration: 0.35 }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-[10px] sm:text-[11px] transition-colors ${
                      simState === "ready" 
                        ? "bg-white/[0.04] border-white/10 text-white/80" 
                        : "bg-white/[0.01] border-white/5 text-white/30"
                    }`}
                  >
                    <Check className={`w-3 h-3 shrink-0 ${simState === "ready" ? "text-primary stroke-[3]" : "text-white/20"}`} />
                    <span className="truncate">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Day-by-Day Interactive Filmstrip Selector (Cascades in when Ready) */}
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    <span>5-Day Curated Flow</span>
                  </span>
                  <span>
                    Day {activeDay + 1} of 5
                  </span>
                </div>

                {/* Day Selector Buttons with Fluid Animated Active Pill */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {currentTrip.days.map((item, idx) => (
                    <button
                      key={item.day}
                      disabled={simState !== "ready"}
                      onClick={() => setActiveDay(idx)}
                      className={`relative py-1.5 sm:py-2 px-1 rounded-xl text-xs font-mono font-medium transition-all flex flex-col items-center gap-0.5 ${
                        simState !== "ready"
                          ? "opacity-25 cursor-not-allowed bg-white/[0.01] border border-white/5 text-white/20"
                          : activeDay === idx
                          ? "text-black font-bold cursor-pointer"
                          : "bg-white/[0.03] text-white/40 hover:text-white border border-white/5 hover:border-white/20 cursor-pointer"
                      }`}
                    >
                      {simState === "ready" && activeDay === idx && (
                        <motion.div
                          layoutId="activeDayPill"
                          className="absolute inset-0 rounded-xl bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)] z-0"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 text-[8px] sm:text-[9px] opacity-70 tracking-wider">DAY</span>
                      <span className="relative z-10 text-xs sm:text-sm font-semibold">{item.day}</span>
                    </button>
                  ))}
                </div>

                {/* Active Day Card Highlight or Skeleton Loading */}
                <AnimatePresence mode="wait">
                  {simState !== "ready" ? (
                    <motion.div
                      key="skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center min-h-[85px] sm:min-h-[95px]"
                    >
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-white/30 text-center px-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping shrink-0" />
                        <span>Awaiting prompt ingestion to synthesize daily itinerary...</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeDay}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xl"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] sm:text-[10px] font-mono text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                            {currentTrip.days[activeDay].label} • {currentTrip.days[activeDay].time}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest">
                            {currentTrip.days[activeDay].tag}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-medium text-white tracking-tight">
                          {currentTrip.days[activeDay].title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed max-w-md font-light line-clamp-2">
                          {currentTrip.days[activeDay].highlight}
                        </p>
                      </div>

                      <a
                        href="https://web.tripflow.live"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start sm:self-center px-3.5 py-1.5 rounded-full bg-primary text-black text-xs font-medium tracking-wide hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-[0_0_20px_rgba(203,243,110,0.35)] cursor-pointer w-full sm:w-auto"
                      >
                        <span>Launch Flow</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* BOTTOM TELEMETRY BAR: Concierge Integrity Stamp */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-white/40 bg-white/[0.01]">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Coordinated across live flight feeds, boutique stays, and real highway curve constraints.</span>
            </div>

            <a
              href="https://web.tripflow.live"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors font-medium flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Launch TripFlow AI Agent</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
