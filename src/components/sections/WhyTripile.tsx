"use client";

import { Phone, ShieldCheck, Clock3, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";

const STATS = [
  { value: "48k+", label: "Trips booked"  },
  { value: "4.97", label: "Avg. rating"   },
  { value: "24/7", label: "Live support"  },
];

const PILLARS = [
  {
    icon: MapPin,
    title: "Agents who've been there",
    body: "Every agent has personally visited the destinations they recommend. Not a script — lived experience.",
  },
  {
    icon: Phone,
    title: "Real humans, any hour",
    body: "Flight cancelled at midnight? Call us. A real person answers and fixes it, day or night.",
  },
  {
    icon: ShieldCheck,
    title: "Price-match guarantee",
    body: "Find the same itinerary cheaper within 48 hours and we'll match it. No hoops, no fine print.",
  },
  {
    icon: Clock3,
    title: "Built for your pace",
    body: "Full itinerary or just a flight — we fit around how you travel, not the other way around.",
  },
];

export default function WhyTripile() {
  return (
    <section className="bg-ivory py-[72px] lg:py-[110px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

        <div className="grid lg:grid-cols-2 gap-[48px] lg:gap-[80px] items-start">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-[7px] mb-[20px] px-[12px] py-[5px] rounded-full" style={{ background: "rgba(92,24,40,0.07)", border: "1px solid rgba(92,24,40,0.12)" }}>
              <Sparkles size={11} style={{ color: "#5C1828" }} />
              <span className="font-body text-[11px] uppercase tracking-[0.12em]" style={{ color: "#5C1828" }}>Why Tripile</span>
            </div>

            <h2
              className="font-display font-semibold text-warm-dark leading-[1.03] tracking-[-0.01em] mb-[18px]"
              style={{ fontSize: "clamp(30px, 4.5vw, 54px)" }}
            >
              We pick up the phone.<br />Every time.
            </h2>

            <p className="font-body text-[17px] text-warm-mid leading-[1.78] mb-[36px] max-w-[460px]">
              We are not an algorithm. We are a team of travelers who answer every call, know every destination, and make sure nothing goes wrong.
            </p>

            <div
              className="inline-flex rounded-[14px] overflow-hidden mb-[44px]"
              style={{ border: "1px solid #EDE0CC" }}
            >
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-[16px] px-[24px] gap-[3px]"
                  style={{
                    borderRight: i < STATS.length - 1 ? "1px solid #EDE0CC" : "none",
                    background: i === 1 ? "#5C1828" : "transparent",
                  }}
                >
                  <span className="font-display font-semibold text-[28px] leading-none" style={{ color: i === 1 ? "#fff" : "#5C1828" }}>
                    {value}
                  </span>
                  <span className="font-body text-[10px] uppercase tracking-[0.08em]" style={{ color: i === 1 ? "rgba(255,255,255,0.60)" : "#6B5244" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[24px] mb-[40px]">
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-[14px] items-start">
                  <div
                    className="shrink-0 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center mt-[1px]"
                    style={{ background: "#F5EAED" }}
                  >
                    <Icon size={18} style={{ color: "#5C1828" }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[15px] text-warm-dark mb-[4px]">{title}</p>
                    <p className="font-body text-[14px] text-warm-mid leading-[1.70]">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-[12px]">
              <a
                href="tel:1-800-963-4330"
                className="inline-flex items-center gap-[8px] font-body font-semibold text-[14px] text-white px-[22px] py-[12px] rounded-[12px] transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 16px rgba(92,24,40,0.28)" }}
              >
                <Phone size={14} /> Call 1-800-963-4330
              </a>
              <a
                href="/why-tripile"
                className="inline-flex items-center gap-[8px] font-body font-semibold text-[14px] px-[22px] py-[12px] rounded-[12px] transition-all hover:opacity-80"
                style={{ color: "#5C1828", border: "1.5px solid rgba(92,24,40,0.18)", background: "transparent" }}
              >
                See why we are different <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative mt-[8px]">
            <div
              className="relative rounded-[24px] overflow-hidden"
              style={{ height: "clamp(300px, 46vw, 580px)", boxShadow: "0 14px 52px rgba(26,15,13,0.18)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80"
                alt="Happy travelers on a road trip"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(15,6,4,0.60) 0%, transparent 55%)" }}
              />
              <div className="absolute bottom-[24px] left-[24px]">
                <p className="font-display font-semibold text-[22px] text-white leading-tight">
                  Your agents.<br/>Your journey.
                </p>
              </div>
            </div>

            <div
              className="hidden lg:flex absolute bottom-[-24px] left-[-32px] rounded-[18px] p-[20px] flex-col gap-[10px]"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 36px rgba(26,15,13,0.16)",
                border: "1px solid rgba(237,224,204,0.80)",
                width: "228px",
              }}
            >
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} style={{ color: "#C9A84C" }} fill="#C9A84C" />
                ))}
              </div>
              <p className="font-display italic text-[14px] text-warm-dark leading-[1.55]">
                &ldquo;Called Sunday night. Fixed in 20 minutes.&rdquo;
              </p>
              <div className="flex items-center gap-[8px]">
                <div
                  className="w-[28px] h-[28px] bg-cover bg-center rounded-full flex items-center justify-center font-body font-bold text-[10px] shrink-0"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=80&q=80')" }}
                ></div>
                <p className="font-body text-[11px] text-warm-mid">Margaret H., Florida</p>
              </div>
            </div>

            <div
              className="hidden lg:flex absolute top-[28px] right-[-24px] rounded-[16px] px-[20px] py-[16px] flex-col items-center gap-[3px]"
              style={{
                background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                boxShadow: "0 6px 24px rgba(92,24,40,0.35)",
              }}
            >
              <span className="font-display font-semibold text-[30px] text-white leading-none">48k+</span>
              <span className="font-body text-[10px] uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.65)" }}>
                Happy travelers
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
