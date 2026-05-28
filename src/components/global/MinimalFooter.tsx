"use client";

export function MinimalFooter() {
  return (
    <footer className="w-full bg-black py-12 px-6 flex flex-col md:flex-row items-center justify-between border-t border-current/10 relative z-10 opacity-60">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 md:mb-0">
        <img
          src="/logo.png"
          alt="TripFlow Logo"
          className="h-5 md:h-6 w-auto opacity-50 transition-opacity hover:opacity-100"
        />
        <div className="text-xs font-mono tracking-[0.3em] uppercase opacity-70">
          LAT: 28.6139° N / LON: 77.2090° E
        </div>
      </div>
      <div className="flex gap-8">
        <a
          href="#"
          className="hover:opacity-100 opacity-60 text-sm transition-opacity"
        >
          Twitter
        </a>
        <a
          href="#"
          className="hover:opacity-100 opacity-60 text-sm transition-opacity"
        >
          Instagram
        </a>
        <a
          href="#"
          className="hover:opacity-100 opacity-60 text-sm transition-opacity"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
