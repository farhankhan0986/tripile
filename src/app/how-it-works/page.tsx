"use client";

import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import CallCTA from "@/components/sections/CallCTA";
import {
  Search,
  Phone,
  Plane,
  Shield,
  Clock,
  CheckCircle2,
  HeadphonesIcon,
  CreditCard,
  MapPin,
  Star,
  ArrowRight,
  Users,
  Award,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search your trip",
    headline: "Tell us where\nyou want to go.",
    body: "Start on our website or simply call us. Share your destination, travel dates, and any preferences  room type, airline, direct flights, budget. Our agents take notes and start building your options immediately.",
    image:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Person looking at a world map planning a trip",
    details: [
      { icon: MapPin, text: "Flights, hotels, and packages" },
      { icon: CreditCard, text: "No payment required to search" },
      { icon: Clock, text: "Results in minutes, not hours" },
    ],
    quote: null,
    flip: false,
  },
  {
    number: "02",
    icon: Phone,
    title: "Speak with a real agent",
    headline: "A real person\npicks up the phone.",
    body: "Every Tripile agent is a licensed travel professional with firsthand destination experience. We walk you through your options, answer every question, and handle the entire booking on your behalf  no hold music, no bots.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Friendly travel agent speaking on the phone at a desk",
    details: [
      { icon: HeadphonesIcon, text: "Licensed agents with 9–18 years' experience" },
      { icon: Clock, text: "Mon – Sat, 8am – 9pm ET" },
      { icon: CheckCircle2, text: "Average call: under 20 minutes" },
    ],
    quote: {
      text: "I called expecting a long hold. An agent picked up on the second ring and had my entire Rome trip booked within 18 minutes.",
      author: "Barbara, 68  Phoenix, AZ",
    },
    flip: true,
  },
  {
    number: "03",
    icon: Plane,
    title: "Travel with confidence",
    headline: "We handle everything.\nYou just show up.",
    body: "From e-tickets and hotel confirmations to itinerary documents and 24-hour emergency support  every detail is taken care of before your departure. If anything changes, we fix it for you.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Airplane wing above the clouds at golden hour",
    details: [
      { icon: Shield, text: "Full itinerary documents before you fly" },
      { icon: Phone, text: "Agent support if plans change" },
      { icon: Star, text: "No hidden fees  ever" },
    ],
    quote: null,
    flip: false,
  },
];

const features = [
  {
    icon: Users,
    title: "Real licensed agents",
    body: "Every person you speak with is a licensed, ASTA-certified travel advisor with at least nine years of experience.",
  },
  {
    icon: Shield,
    title: "BBB A+ rated",
    body: "We've maintained an A+ rating with the Better Business Bureau since 2008. Our record is public and verifiable.",
  },
  {
    icon: CreditCard,
    title: "No hidden fees",
    body: "Our $50 booking fee is stated upfront. The price we quote is the price you pay  no processing fees, no 'service charges' at checkout.",
  },
  {
    icon: Award,
    title: "22 years in business",
    body: "Founded in 2002, Tripile has booked over 48,000 trips. We've been doing this longer than most travel apps have existed.",
  },
  {
    icon: Clock,
    title: "Fast turnaround",
    body: "Most bookings are confirmed in a single call. Complex itineraries or group travel may take one additional business day.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support when it matters",
    body: "Flight cancelled? Hotel issue? Our agents are reachable by phone during business hours and by email 24 hours a day.",
  },
];

const faqs = [
  {
    q: "Do I have to call, or can I book entirely online?",
    a: "You can start a search online, but all bookings are confirmed through one of our agents  by phone or email. This ensures accuracy and gives you a real person to reach if anything changes.",
  },
  {
    q: "How much does Tripile charge?",
    a: "We charge a one-time $50 service fee per booking. Flight and hotel prices are the same as or better than booking directly. No other fees are added.",
  },
  {
    q: "Is there a minimum trip value or age requirement?",
    a: "No minimum trip value. We serve all American travelers, though we specialize in the 50+ age group. If you love a real agent over a booking app, you'll love Tripile.",
  },
  {
    q: "What if my plans change after booking?",
    a: "Call us. We handle changes, date adjustments, and cancellations on your behalf. We know airline and hotel policies and will find the best outcome for your situation.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,6,4,0.78) 0%, rgba(92,24,40,0.50) 50%, rgba(15,6,4,0.90) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-20 py-[110px]">
          <p className="font-body text-[11px] uppercase tracking-[0.14em] text-white/50 mb-[24px]">
            How it works
          </p>
          <h1
            className="font-display font-semibold text-white leading-[0.96] tracking-[-0.02em] mb-[28px]"
            style={{ fontSize: "clamp(52px, 7vw, 86px)" }}
          >
            Travel made{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>simple.</em>
            <br />
            Three steps.
          </h1>
          <p
            className="font-body text-white/70 leading-[1.75] mb-[48px]"
            style={{ fontSize: "18px", maxWidth: "500px" }}
          >
            No endless tabs. No confusing fare classes. Just a real agent who
            handles everything, start to finish  so you can focus on the trip.
          </p>

          {/* Step indicators */}
          <div className="flex items-center gap-[0px]">
            {steps.map(({ number, title, icon: Icon }, i) => (
              <div key={number} className="flex items-center">
                <div className="flex items-center gap-[12px]">
                  <div
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #C9A84C, #E8C96A)"
                          : "rgba(255,255,255,0.10)",
                      border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.18)",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{ color: i === 0 ? "#1A0F0D" : "rgba(255,255,255,0.65)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-body text-[10px] uppercase tracking-[0.10em]"
                      style={{ color: i === 0 ? "#C9A84C" : "rgba(255,255,255,0.35)" }}
                    >
                      Step {number}
                    </p>
                    <p
                      className="font-body font-medium text-[13px]"
                      style={{ color: i === 0 ? "#fff" : "rgba(255,255,255,0.55)" }}
                    >
                      {title}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="mx-[20px] flex items-center gap-[4px]">
                    <ArrowRight size={14} color="rgba(255,255,255,0.20)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gold rule ── */}
      <div
        className="h-[1px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
        }}
      />

      {/* ── Three steps deep dive ── */}
      {steps.map(({ number, icon: Icon, title, headline, body, image, imageAlt, details, quote, flip }) => (
        <section
          key={number}
          className="py-[100px]"
          style={{
            background:
              number === "02"
                ? "linear-gradient(160deg, #F5EAED 0%, #FAF7F2 50%, #EDE0CC 100%)"
                : "#FAF7F2",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-20">
            <div
              className={`grid lg:grid-cols-2 gap-[80px] items-center ${
                flip ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* ── Image side ── */}
              <div className={flip ? "[direction:ltr]" : ""}>
                <div className="relative">
                  <div
                    className="rounded-[24px] overflow-hidden"
                    style={{
                      height: "520px",
                      boxShadow: "0 16px 64px rgba(26,15,13,0.18)",
                    }}
                  >
                    <img
                      src={image}
                      alt={imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 rounded-[24px]"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(15,6,4,0.45) 0%, transparent 55%)",
                      }}
                    />
                  </div>

                  {/* Step badge floating on image */}
                  <div
                    className="absolute top-[24px] left-[24px] flex items-center gap-[10px] px-[18px] py-[10px] rounded-full"
                    style={{
                      background: "rgba(250,247,242,0.95)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 4px 16px rgba(26,15,13,0.14)",
                      border: "1px solid #EDE0CC",
                    }}
                  >
                    <div
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                      style={{ background: "#F5EAED" }}
                    >
                      <Icon size={14} style={{ color: "#5C1828" }} />
                    </div>
                    <span className="font-body font-medium text-[12px] text-warm-dark">
                      Step {number} · {title}
                    </span>
                  </div>

                  {/* Pull-quote floating card */}
                  {quote && (
                    <div
                      className="absolute bottom-[-28px] right-[-28px] max-w-[280px] rounded-[20px] p-[24px]"
                      style={{
                        background: "linear-gradient(135deg, #5C1828 0%, #3D0E1A 100%)",
                        boxShadow: "0 12px 40px rgba(92,24,40,0.32)",
                      }}
                    >
                      <p className="font-display italic text-[15px] text-white/88 leading-[1.55] mb-[10px]">
                        &ldquo;{quote.text}&rdquo;
                      </p>
                      <p className="font-body text-[11px] uppercase tracking-[0.07em] text-white/45">
                         {quote.author}
                      </p>
                    </div>
                  )}

                  {/* Decorative ghost number */}
                  <span
                    className="absolute -bottom-[16px] -left-[24px] font-display font-semibold leading-none select-none pointer-events-none"
                    style={{ fontSize: "120px", color: "#EDE0CC", zIndex: 0 }}
                  >
                    {number}
                  </span>
                </div>
              </div>

              {/* ── Copy side ── */}
              <div className={`flex flex-col gap-[28px] ${flip ? "[direction:ltr]" : ""}`}>
                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[16px]">
                    Step {number} of {steps.length}
                  </p>
                  <h2
                    className="font-display font-semibold text-warm-dark leading-[1.02] tracking-[-0.02em] mb-[20px] whitespace-pre-line"
                    style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
                  >
                    {headline}
                  </h2>
                  <p className="font-body text-[16px] text-warm-mid leading-[1.78]">{body}</p>
                </div>

                {/* Detail chips */}
                <div className="flex flex-col gap-[12px]">
                  {details.map(({ icon: DIcon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-[14px] rounded-[14px] px-[20px] py-[14px]"
                      style={{
                        background: "#fff",
                        border: "1px solid #EDE0CC",
                        boxShadow: "0 2px 8px rgba(26,15,13,0.04)",
                      }}
                    >
                      <div
                        className="shrink-0 w-[36px] h-[36px] rounded-[10px] flex items-center justify-center"
                        style={{ background: "#F5EAED" }}
                      >
                        <DIcon size={16} style={{ color: "#5C1828" }} />
                      </div>
                      <span className="font-body text-[14px] text-warm-dark">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-[8px] pt-[4px]">
                  {steps.map((s) => (
                    <div
                      key={s.number}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: s.number === number ? "28px" : "8px",
                        height: "8px",
                        background:
                          s.number === number ? "#5C1828" : "#EDE0CC",
                      }}
                    />
                  ))}
                  <span className="font-body text-[12px] text-warm-light ml-[8px]">
                    Step {number} of {steps.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Why Tripile is different  feature grid ── */}
      <section
        className="py-[100px]"
        style={{
          background: "linear-gradient(180deg, #1A0F0D 0%, #0F0604 100%)",
          borderTop: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        {/* Top gold line */}
        <div
          className="h-[1px] w-full mb-[0px] -mt-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-20 pt-[0px]">
          <div className="text-center mb-[64px]">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] mb-[16px]" style={{ color: "rgba(201,168,76,0.7)" }}>
              Why choose Tripile
            </p>
            <h2
              className="font-display font-semibold text-white leading-[1.02] tracking-[-0.02em] mb-[16px]"
              style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
            >
              Not just a booking site.
              <br />
              <em style={{ color: "#C9A84C" }}>A real service.</em>
            </h2>
            <p className="font-body text-[16px] leading-[1.72] mx-auto" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "480px" }}>
              Here&apos;s what makes the experience fundamentally different from
              booking on your own.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]" style={{ borderRadius: "20px", overflow: "hidden" }}>
            {features.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="flex flex-col gap-[16px] p-[32px] group transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "rgba(201,168,76,0.07)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.04)")
                }
              >
                <div
                  className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.20)",
                  }}
                >
                  <Icon size={20} style={{ color: "#C9A84C" }} />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-[15px] text-white mb-[6px]">
                    {title}
                  </h3>
                  <p
                    className="font-body text-[13px] leading-[1.72]"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[100px]" style={{ background: "#FAF7F2" }}>
        <div className="max-w-[860px] mx-auto px-20">
          <div className="text-center mb-[56px]">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[12px]">
              Quick answers
            </p>
            <h2 className="font-display font-semibold text-[44px] text-warm-dark leading-[1.02] tracking-[-0.01em]">
              Common questions
            </h2>
          </div>

          <div
            className="rounded-[24px] overflow-hidden"
            style={{ border: "1px solid #EDE0CC", boxShadow: "0 4px 24px rgba(26,15,13,0.06)" }}
          >
            {faqs.map(({ q, a }, i) => (
              <div
                key={q}
                className="flex gap-[24px] px-[36px] py-[32px]"
                style={{
                  background: "#fff",
                  borderTop: i > 0 ? "1px solid #EDE0CC" : "none",
                }}
              >
                <span
                  className="font-display font-semibold text-[20px] leading-none shrink-0 mt-[3px]"
                  style={{ color: "#EDE0CC" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body font-semibold text-[15px] text-warm-dark mb-[8px]">
                    {q}
                  </h3>
                  <p className="font-body text-[14px] text-warm-mid leading-[1.75]">{a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-[32px]">
            <p className="font-body text-[14px] text-warm-mid">
              More questions?{" "}
              <a href="/faq" className="text-burg-deep font-medium hover:underline underline-offset-2">
                Browse our full FAQ
              </a>
              {" "}or{" "}
              <a href="/contact" className="text-burg-deep font-medium hover:underline underline-offset-2">
                contact us directly
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CallCTA />
      <Footer />
    </div>
  );
}
