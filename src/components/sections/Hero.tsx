"use client";

import { useEffect, useState } from "react";
import SearchBox from "@/components/ui/SearchBox";

interface HeroProps {
  activeTab: "flights" | "hotels";
  setActiveTab: (tab: "flights" | "hotels") => void;
}

export default function Hero({ activeTab, setActiveTab }: HeroProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full h-screen bg-warm-dark overflow-hidden">

      {/* ── Image backgrounds ── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: activeTab === "flights" ? 1 : 0 }}
          src="https://images.unsplash.com/photo-1593182440709-4b7b56482c55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Flights hero background"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: activeTab === "hotels" ? 1 : 0 }}
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotels hero background"
        />
      </div>

      {/* ── Single clean scrim  lets video breathe ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(12,5,3,0.52)" }}
      />
      {/* Vignette  darkens edges, keeps center alive */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(10,4,2,0.55) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow */}
        <p
          className="font-body text-[11px] uppercase tracking-[0.20em] mb-[20px] sm:mb-[32px]"
          style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.20em" }}
        >
          Tripile · Est. 2022
        </p>

        {/* Headline */}
        <h1
          className="font-display font-semibold text-white leading-[0.94] tracking-[-0.025em] mb-[20px] sm:mb-[28px]"
          style={{ fontSize: "clamp(44px, 8vw, 100px)" }}
        >
          Travel the world<br />
          with{" "}
          <em
            className="not-italic"
            style={{
              background: "linear-gradient(90deg, #C9A84C 0%, #e8c97a 50%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            confidence.
          </em>
        </h1>

        {/* Sub-copy */}
        <p
          className="font-body leading-[1.75] mb-[28px] sm:mb-[48px] max-w-[420px]"
          style={{ fontSize: "17px", color: "rgba(255,255,255,0.58)" }}
        >
          Real agents. No bots. No hold music.
          Just expert travel, one phone call away.
        </p>

        {/* SearchBox */}
        <SearchBox
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="w-full max-w-[820px]"
        />

        {/* Stat strip */}
        <div
          className="flex items-center flex-wrap justify-center gap-[20px] sm:gap-[32px] mt-[28px] sm:mt-[48px]"
          style={{ opacity: 0.5 }}
        >
          {[
            { value: "30k+",  label: "trips booked" },
            { value: "4+ yrs", label: "experience" },
            { value: "4.53 ★", label: "rating" },
          ].map(({ value, label }, i) => (
            <span key={label} className="flex items-baseline gap-[6px]">
              {i > 0 && (
                <span className="hidden sm:inline-block w-px h-[14px] bg-white/20 mr-[20px] sm:mr-[32px]" />
              )}
              <span className="font-display font-medium text-[15px] text-white/80">{value}</span>
              <span className="font-body text-[11px] uppercase tracking-[0.08em] text-white/35">{label}</span>
            </span>
          ))}
        </div>

      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-[10px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-[8px] transition-opacity duration-700"
        style={{ opacity: scrolled ? 0 : 0.4 }}
        aria-hidden
      >
        <div
          className="w-[1px] h-[28px]"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
          }}
        />
        <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white">Scroll</p>
      </div>

    </section>
  );
}
