"use client";

import { Search, Phone, Plane, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: Search,
    title: "Search",
    description:
      "Enter where you want to go and your travel dates. Our search covers flights, hotels, and packages across hundreds of destinations.",
    detail: "Flights · Hotels · Packages",
  },
  {
    number: "02",
    Icon: Phone,
    title: "Call or Book",
    description:
      "Speak directly with a licensed travel agent who knows your destination firsthand, or book online instantly at any hour.",
    detail: "Mon – Sat · 8am – 9pm ET",
  },
  {
    number: "03",
    Icon: Plane,
    title: "Travel",
    description:
      "We handle every detail  from ticketing to hotel check-in. You just show up and enjoy the trip you deserve.",
    detail: "Fully managed · No surprises",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-[64px] lg:py-[110px]" style={{ background: "#FAF7F2" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[24px] mb-[40px] lg:mb-[72px]">
          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[14px]">
              How it works
            </p>
            <h2 className="font-display font-medium text-warm-dark leading-[1.02] tracking-[-0.01em] max-w-[400px]" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
              Simple from start to finish
            </h2>
          </div>
          <p className="font-body text-[15px] text-warm-mid leading-[1.75] max-w-[360px] lg:text-right pb-[4px]">
            Three steps and you&apos;re on your way with a real person available every step of the journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[12px] lg:gap-[2px]" style={{ borderRadius: "20px", overflow: "hidden" }}>
          {steps.map(({ number, Icon, title, description, detail }, i) => {
            const isMiddle = i === 1;
            return (
              <div
                key={title}
                className="relative flex flex-col justify-between p-[24px] lg:p-[40px] gap-[32px] lg:gap-[48px] group"
                style={{
                  background: isMiddle
                    ? "linear-gradient(145deg, #5C1828 0%, #8B2A3F 100%)"
                    : "#fff",
                  border: `1px solid ${isMiddle ? "transparent" : "#EDE0CC"}`,
                  boxShadow: isMiddle ? "0 8px 40px rgba(92,24,40,0.28)" : "0 2px 12px rgba(26,15,13,0.05)",
                }}
              >
                {/* Top row: step number + icon */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-display font-semibold text-[56px] leading-none select-none"
                    style={{ color: isMiddle ? "rgba(255,255,255,0.12)" : "#EDE0CC" }}
                  >
                    {number}
                  </span>
                  <div
                    className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0"
                    style={{
                      background: isMiddle ? "rgba(255,255,255,0.15)" : "#F5EAED",
                      border: isMiddle ? "1px solid rgba(255,255,255,0.20)" : "none",
                    }}
                  >
                    <Icon size={22} style={{ color: isMiddle ? "#fff" : "#5C1828" }} aria-hidden />
                  </div>
                </div>

                {/* Copy */}
                <div className="flex flex-col gap-[14px]">
                  <h3
                    className="font-display font-semibold text-[28px] leading-none"
                    style={{ color: isMiddle ? "#fff" : "#1A0F0D" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="font-body text-[15px] leading-[1.70]"
                    style={{ color: isMiddle ? "rgba(255,255,255,0.68)" : "#6B5244" }}
                  >
                    {description}
                  </p>

                  {/* Detail chip */}
                  <div
                    className="inline-flex items-center gap-[6px] mt-[4px] px-[12px] py-[6px] rounded-full self-start"
                    style={{
                      background: isMiddle ? "rgba(255,255,255,0.10)" : "#FAF7F2",
                      border: `1px solid ${isMiddle ? "rgba(255,255,255,0.18)" : "#EDE0CC"}`,
                    }}
                  >
                    <span
                      className="font-body text-[11px] uppercase tracking-[0.07em]"
                      style={{ color: isMiddle ? "rgba(255,255,255,0.60)" : "#A89282" }}
                    >
                      {detail}
                    </span>
                  </div>
                </div>

                {/* Connector arrow  appears between cards on desktop */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-[18px] -translate-y-1/2 z-10 w-[36px] h-[36px] rounded-full items-center justify-center"
                    style={{ background: "#FAF7F2", border: "1px solid #EDE0CC", boxShadow: "0 2px 8px rgba(26,15,13,0.08)" }}
                  >
                    <ArrowRight size={14} style={{ color: "#A89282" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
