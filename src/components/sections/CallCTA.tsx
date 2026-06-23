"use client";

import { Phone, Clock, CheckCircle2, Headphones } from "lucide-react";

const trustPoints = [
  { icon: Clock, text: "Avg. hold time under 2 min" },
  { icon: CheckCircle2, text: "No bots, ever" },
  { icon: Headphones, text: "Mon – Sat, 8am – 9pm ET" },
];

export default function CallCTA() {
  return (
    <section className="relative overflow-hidden py-[64px] lg:py-[110px]"
      style={{ background: "linear-gradient(135deg, #3D0F19 0%, #5C1828 40%, #8B2A3F 100%)" }}
    >
      {/* Soft radial glow in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)"
        }}
      />

      {/* Decorative large blurred circles */}
      <div
        className="absolute -top-[120px] -left-[120px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.03)" }}
      />
      <div
        className="absolute -bottom-[80px] -right-[80px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "rgba(201,168,76,0.06)" }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[40px] lg:gap-[56px]">

          {/* Left  copy */}
          <div className="flex flex-col max-w-[580px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-[8px] mb-[20px]">
              <span
                className="inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-full font-body text-[11px] uppercase tracking-[0.08em]"
                style={{ background: "rgba(201,168,76,0.18)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <span className="w-[6px] h-[6px] rounded-full bg-gold-accent animate-pulse inline-block" />
                Agents standing by
              </span>
            </div>

            <h2 className="font-display font-semibold italic text-white tracking-[-0.01em] leading-[1.05] mb-[18px]" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
              Prefer to speak<br />with someone?
            </h2>

            <p className="font-body text-[17px] leading-[1.75] mb-[40px]" style={{ color: "rgba(255,255,255,0.70)" }}>
              Skip the forms. Our travel agents are real people with real
              destination experience  ready to plan your entire trip in one call.
            </p>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-[12px]">
              {trustPoints.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-[8px] px-[16px] py-[10px] rounded-full font-body text-[13px]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.80)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(6px)"
                  }}
                >
                  <Icon size={14} style={{ color: "#C9A84C" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right  phone number card */}
          <div
            className="flex flex-col items-center lg:items-end gap-[28px] shrink-0"
          >
            {/* Big number card */}
            <div
              className="rounded-[24px] px-[28px] py-[32px] lg:px-[48px] lg:py-[40px] flex flex-col items-center gap-[16px] w-full lg:w-auto"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.25)"
              }}
            >
              {/* Icon ring */}
              <div
                className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-[4px]"
                style={{ background: "rgba(201,168,76,0.18)", border: "1.5px solid rgba(201,168,76,0.35)" }}
              >
                <Phone size={26} style={{ color: "#C9A84C" }} />
              </div>

              <p className="font-body text-[12px] uppercase tracking-[0.10em] text-white/50">
                Call us toll-free
              </p>

              <a
                href="tel:1-800-874-7453"
                className="font-display font-semibold text-white leading-none tracking-[-0.02em] hover:text-gold-accent transition-colors duration-200"
                style={{ fontSize: "clamp(26px, 5vw, 44px)" }}
              >
                1-800-TRIPILE
              </a>

              {/* Divider */}
              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.10)" }} />

              <p className="font-body text-[13px] text-white/50 text-center">
                Mon – Sat &nbsp;·&nbsp; 8am – 9pm Eastern<br />
                <span className="text-white/35 text-[12px]">Average hold time under 2 minutes</span>
              </p>
            </div>

            {/* Or email nudge */}
            <p className="font-body text-[13px] text-white/40 text-center">
              Prefer email?{" "}
              <a href="mailto:hello@tripile.com" className="text-white/60 underline underline-offset-2 hover:text-white transition-colors duration-200">
                hello@tripile.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
