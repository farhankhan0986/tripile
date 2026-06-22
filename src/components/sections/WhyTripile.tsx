"use client";

import { Phone, ShieldCheck, Clock3, MapPin, Star } from "lucide-react";
import Button from "@/components/ui/Button";

const stats = [
  { value: "4+", label: "Years in business" },
  { value: "48k+", label: "Trips booked" },
  { value: "4.97", label: "Average rating" },
];

const features = [
  {
    icon: MapPin,
    title: "Agents who've been there",
    body: "Every agent on our team has personally traveled to the destinations they recommend. We don't read from a script we share what we've lived.",
  },
  {
    icon: Phone,
    title: "Real humans, any hour",
    body: "When something goes wrong mid-trip a cancelled flight, a hotel mix-up you call us and a real person picks up, day or night.",
  },
  {
    icon: ShieldCheck,
    title: "Price-match guarantee",
    body: "Find the same itinerary cheaper within 48 hours and we'll match it. No hoops, no fine print. Just fair pricing.",
  },
  {
    icon: Clock3,
    title: "Built for your pace",
    body: "Whether you want a fully planned itinerary or just a flight and a hotel, we fit around how you like to travel not the other way around.",
  },
];

export default function WhyTripile() {
  return (
    <section className="bg-ivory py-[100px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-20">

        <div className="grid lg:grid-cols-2 gap-[64px] items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[16px]">
              Why Tripile
            </p>

            {/* Headline */}
            <h2 className="font-display font-medium text-[52px] text-warm-dark tracking-[-0.01em] leading-[1.05] mb-[20px]">
              4+ years of getting it right
            </h2>

            {/* Sub-copy */}
            <p className="font-body text-[17px] text-warm-mid leading-[1.75] mb-[40px]">
              We're not an algorithm. We're a team of people who love travel and
              pick up the phone every time.
            </p>

            {/* Stat strip */}
            <div
              className="flex items-center gap-[0px] rounded-[16px] mb-[44px] overflow-hidden"
              style={{ border: "1px solid #EDE0CC" }}
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center py-[20px] px-[16px] gap-[4px]"
                  style={{
                    borderRight: i < stats.length - 1 ? "1px solid #EDE0CC" : "none",
                    background: i === 1 ? "#5C1828" : "transparent",
                  }}
                >
                  <span
                    className="font-display font-semibold text-[30px] leading-none"
                    style={{ color: i === 1 ? "#fff" : "#5C1828" }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-body text-[11px] uppercase tracking-[0.08em] text-center"
                    style={{ color: i === 1 ? "rgba(255,255,255,0.65)" : "#6B5244" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature rows */}
            <div className="flex flex-col gap-[28px] mb-[44px]">
              {features.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-[16px] items-start">
                  {/* Icon bubble */}
                  <div
                    className="shrink-0 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center mt-[1px]"
                    style={{ background: "#F5EAED" }}
                  >
                    <Icon size={18} style={{ color: "#5C1828" }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[15px] text-warm-dark mb-[4px]">
                      {title}
                    </p>
                    <p className="font-body text-[14px] text-warm-mid leading-[1.7]">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Button variant="phone">Call 1-800-TRIPILE</Button>
            </div>

          </div>

          {/* ── Right column image with overlaid cards ── */}
          <div className="relative">

            {/* Main image */}
            <div
              className="rounded-[22px] overflow-hidden"
              style={{ height: "560px", boxShadow: "0 12px 48px rgba(26,15,13,0.18)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80"
                alt="Scenic road trip destination"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 rounded-[22px]"
                style={{ background: "linear-gradient(to top, rgba(15,6,4,0.55) 0%, transparent 55%)" }}
              />
            </div>

            {/* Floating review card bottom-left */}
            <div
              className="absolute bottom-[-20px] left-[-28px] rounded-[18px] p-[20px] flex flex-col gap-[10px]"
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(26,15,13,0.16)",
                border: "1px solid rgba(237,224,204,0.8)",
                width: "220px",
              }}
            >
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="text-gold-accent" fill="currentColor" />
                ))}
              </div>
              <p className="font-display italic text-[15px] text-warm-dark leading-[1.5]">
                "Called Sunday night. Fixed in minutes."
              </p>
              <div className="flex items-center gap-[8px]">
                <img
                  src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=40&q=80"
                  alt="Margaret H."
                  className="w-[28px] h-[28px] rounded-full object-cover"
                />
                <p className="font-body text-[11px] text-warm-mid">Margaret H., 67</p>
              </div>
            </div>

            {/* Floating stat badge top-right */}
            <div
              className="absolute top-[24px] right-[-20px] rounded-[16px] px-[20px] py-[16px] flex flex-col items-center gap-[2px]"
              style={{
                background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                boxShadow: "0 6px 24px rgba(92,24,40,0.35)",
              }}
            >
              <span className="font-display font-semibold text-[28px] text-white leading-none">48k+</span>
              <span className="font-body text-[10px] uppercase tracking-[0.08em] text-white/70">Happy travelers</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
