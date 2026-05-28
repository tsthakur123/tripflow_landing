"use client";

export function MinimalFooter() {
  return (
    <footer className="w-full bg-[#050505] py-12 px-6 flex flex-col md:flex-row items-center justify-between border-t border-white/5 relative z-10">
      <div className="text-white/20 text-xs font-mono tracking-[0.3em] uppercase mb-4 md:mb-0">
        LAT: 28.6139° N / LON: 77.2090° E
      </div>
      <div className="flex gap-8 text-white/30 text-sm font-light tracking-widest uppercase">
        <span>Leave more often.</span>
        <span>Trips should feel easy.</span>
      </div>
    </footer>
  );
}
