"use client";

import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import CallCTA from "@/components/sections/CallCTA";
import {
  Phone, Mail, Zap, Plane, Building2, RotateCcw, Luggage,
  PlusCircle, Users, ChevronDown, Clock, CheckCircle2, Headphones, Shield, Star,
} from "lucide-react";

const faqs = [
  {
    q: "How long will I be on hold?",
    a: "Our average hold time is under 2 minutes. During peak booking seasons (January through March and June through August) it can occasionally reach 5 minutes, but a real agent always answers. No callback queues, no voicemail.",
  },
  {
    q: "Can you modify my existing booking over the phone?",
    a: "Yes. Date changes, seat upgrades, room-type swaps, routing adjustments  everything we originally booked, we can change. In most cases we handle it in the same call and send a revised confirmation within minutes.",
  },
  {
    q: "What happens if my flight gets cancelled?",
    a: "Call us immediately at 1-800-TRIPILE. We have priority rebooking lines with most major carriers and can typically rebook you faster than the airline's own hold queue. For active travellers we also monitor bookings proactively and may call you before you even know there's a problem.",
  },
  {
    q: "Is there any charge for calling support?",
    a: "Never. 1-800-TRIPILE is toll-free from any US or Canadian phone. There is no fee whatsoever for support calls, modification guidance, or general travel advice.",
  },
  {
    q: "What are your exact support hours?",
    a: "Our main line is staffed Monday through Saturday, 8 am to 9 pm Eastern. Travellers who are currently mid-trip receive 24/7 emergency priority routing on the same number.",
  },
  {
    q: "Can you help with a travel insurance claim?",
    a: "We can't file the claim on your behalf, but we'll gather all supporting documentation you need  booking confirmations, cancellation records, medical-accommodation letters, weather-event reports  and walk you through exactly what your policy covers.",
  },
  {
    q: "My passport was lost or stolen abroad. What do I do?",
    a: "Call us first. We'll issue an emergency travel letter, connect you with the nearest US embassy or consulate, and rebook any missed segments while you obtain emergency documents. We've navigated this situation many times before.",
  },
  {
    q: "Can I reach an agent while travelling internationally?",
    a: "Yes. Call 1-800-TRIPILE from any phone (you may need to dial your country's international exit code for toll-free numbers first). You can also reach us via WhatsApp at the same number if international calling rates are a concern.",
  },
];

const topics = [
  {
    icon: Plane,
    title: "Flight changes",
    body: "Date changes, seat upgrades, routing adjustments, missed connections, and same-day rebooking.",
  },
  {
    icon: Building2,
    title: "Hotel modifications",
    body: "Check-in date changes, room-type upgrades, adding or reducing nights, and special requests.",
  },
  {
    icon: RotateCcw,
    title: "Cancellations & refunds",
    body: "Full and partial cancellations, refund timelines, credit vouchers, and airline waiver requests.",
  },
  {
    icon: Luggage,
    title: "Lost or delayed baggage",
    body: "Filing airline claims, tracking reports, reimbursement documentation, and airline liaison.",
  },
  {
    icon: PlusCircle,
    title: "New bookings",
    body: "Flights, hotels, packages, airport transfers, and excursions arranged in a single call.",
  },
  {
    icon: Users,
    title: "Group travel",
    body: "Ten or more travellers? We coordinate group rates, seat blocks, and a single group check-in.",
  },
];

const trustChips = [
  { icon: Clock,        text: "Under 2 min wait"           },
  { icon: CheckCircle2, text: "No bots, ever"              },
  { icon: Headphones,   text: "Mon – Sat, 8am – 9pm ET"    },
  { icon: Shield,       text: "Toll-free from US & Canada" },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-[0px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,6,4,0.78) 0%, rgba(92,24,40,0.52) 50%, rgba(15,6,4,0.90) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-20 py-[80px] lg:py-[120px] flex flex-col items-center text-center">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-[6px] px-[14px] py-[6px] rounded-full font-body text-[11px] uppercase tracking-[0.08em] mb-[28px]"
            style={{
              background: "rgba(201,168,76,0.18)",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.30)",
            }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
            Agents standing by
          </span>

          <h1
            className="font-display font-semibold italic text-white tracking-[-0.025em] leading-[0.97] mb-[22px]"
            style={{ fontSize: "clamp(48px, 7vw, 80px)" }}
          >
            Talk to a real person,
            <br />
            right now.
          </h1>

          <p
            className="font-body text-[17px] text-white/68 leading-[1.75] max-w-[500px] mb-[44px]"
          >
            No bots. No hold music. No overseas call centres. Just experienced
            agents who pick up the phone and sort it out.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-[14px] mb-[44px]">
            <a
              href="tel:1-800-874-7453"
              className="flex items-center gap-[10px] px-[32px] py-[16px] rounded-[14px] font-body font-medium text-[16px] text-white transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                boxShadow: "0 6px 28px rgba(92,24,40,0.55)",
              }}
            >
              <Phone size={18} />
              1-800-TRIPILE
            </a>
            <a
              href="mailto:hello@tripile.com"
              className="flex items-center gap-[10px] px-[28px] py-[16px] rounded-[14px] font-body font-medium text-[16px] transition-all duration-200 hover:bg-white/10"
              style={{
                color: "rgba(255,255,255,0.80)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <Mail size={16} />
              hello@tripile.com
            </a>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap items-center justify-center gap-[10px]">
            {trustChips.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-[7px] px-[14px] py-[8px] rounded-full font-body text-[12px]"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <Icon size={12} style={{ color: "#C9A84C" }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Channels ── */}
      <section className="py-[48px] lg:py-[80px] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">

            {/* Phone  featured */}
            <div
              className="rounded-[22px] p-[36px] flex flex-col gap-[24px]"
              style={{
                background: "linear-gradient(145deg, #3D0F19 0%, #5C1828 55%, #8B2A3F 100%)",
                boxShadow: "0 10px 40px rgba(92,24,40,0.40)",
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center"
                style={{
                  background: "rgba(201,168,76,0.18)",
                  border: "1px solid rgba(201,168,76,0.32)",
                }}
              >
                <Phone size={22} style={{ color: "#C9A84C" }} />
              </div>

              <div className="flex flex-col gap-[6px]">
                <p className="font-body text-[11px] uppercase tracking-[0.10em] text-white/45">
                  Phone support
                </p>
                <a
                  href="tel:1-800-874-7453"
                  className="font-display font-semibold text-[30px] text-white hover:text-gold-accent transition-colors duration-200 leading-none"
                >
                  1-800-TRIPILE
                </a>
              </div>

              <div className="flex flex-col gap-[8px]">
                <span
                  className="self-start inline-flex items-center gap-[5px] px-[10px] py-[4px] rounded-full font-body text-[11px]"
                  style={{
                    background: "rgba(201,168,76,0.20)",
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.28)",
                  }}
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
                  Under 2 min wait
                </span>
                <p className="font-body text-[13px] text-white/50">Mon – Sat · 8am – 9pm ET</p>
              </div>

              <a
                href="tel:1-800-874-7453"
                className="mt-auto flex items-center justify-center gap-[8px] py-[14px] rounded-[12px] font-body font-medium text-[14px] text-white border border-white/18 hover:bg-white/10 transition-colors duration-200"
              >
                <Phone size={14} />
                Call now
              </a>
            </div>

            {/* Email */}
            <div
              className="rounded-[22px] p-[36px] flex flex-col gap-[24px] bg-white"
              style={{ border: "1px solid #EDE0CC", boxShadow: "0 4px 20px rgba(26,15,13,0.05)" }}
            >
              <div
                className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center"
                style={{ background: "#F5EAED" }}
              >
                <Mail size={22} style={{ color: "#5C1828" }} />
              </div>

              <div className="flex flex-col gap-[6px]">
                <p className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">
                  Email support
                </p>
                <a
                  href="mailto:hello@tripile.com"
                  className="font-display font-semibold text-[26px] text-warm-dark hover:text-burg-deep transition-colors duration-200 leading-tight"
                >
                  hello@tripile.com
                </a>
              </div>

              <div className="flex flex-col gap-[8px]">
                <span
                  className="self-start inline-flex items-center gap-[5px] px-[10px] py-[4px] rounded-full font-body text-[11px] text-warm-mid"
                  style={{ background: "#F5EAED", border: "1px solid #EDE0CC" }}
                >
                  Reply within 4 hours
                </span>
                <p className="font-body text-[13px] text-warm-mid">Best for non-urgent enquiries</p>
              </div>

              <a
                href="mailto:hello@tripile.com"
                className="mt-auto flex items-center justify-center gap-[8px] py-[14px] rounded-[12px] font-body font-medium text-[14px] text-burg-deep border border-burg-deep/25 hover:bg-burg-pale transition-colors duration-200"
              >
                <Mail size={14} />
                Send email
              </a>
            </div>

            {/* Emergency */}
            <div
              className="rounded-[22px] p-[36px] flex flex-col gap-[24px]"
              style={{
                background: "linear-gradient(160deg, #1A0F0D 0%, #0F0604 100%)",
                border: "1px solid rgba(201,168,76,0.14)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center"
                style={{
                  background: "rgba(201,168,76,0.10)",
                  border: "1px solid rgba(201,168,76,0.22)",
                }}
              >
                <Zap size={22} style={{ color: "#C9A84C" }} />
              </div>

              <div className="flex flex-col gap-[6px]">
                <p className="font-body text-[11px] uppercase tracking-[0.10em] text-white/40">
                  Mid-trip emergencies
                </p>
                <p className="font-display font-semibold text-[26px] text-white leading-tight">
                  Same number,
                  <br />
                  24 hours a day.
                </p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <span
                  className="self-start inline-flex items-center gap-[5px] px-[10px] py-[4px] rounded-full font-body text-[11px]"
                  style={{
                    background: "rgba(201,168,76,0.12)",
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.22)",
                  }}
                >
                  Around the clock
                </span>
                <p className="font-body text-[13px] text-white/42">
                  Priority routing for active travellers
                </p>
              </div>

              <a
                href="tel:1-800-874-7453"
                className="mt-auto flex items-center justify-center gap-[8px] py-[14px] rounded-[12px] font-body font-medium text-[14px] transition-colors duration-200 hover:bg-white/5"
                style={{ color: "#C9A84C", border: "1px solid rgba(201,168,76,0.28)" }}
              >
                <Phone size={14} />
                Emergency line
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Help With ── */}
      <section
        className="py-[64px] lg:py-[100px]"
        style={{
          background:
            "linear-gradient(160deg, #F5EAED 0%, #FAF7F2 55%, #EDE0CC 100%)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="mb-[56px]">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[12px]">
              How we help
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[16px]">
              <h2 className="font-display font-medium text-warm-dark leading-[1.05] tracking-[-0.01em]" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
                What our agents handle
              </h2>
              <a
                href="tel:1-800-874-7453"
                className="self-start sm:self-auto shrink-0 flex items-center gap-[7px] px-[20px] py-[10px] rounded-[10px] font-body font-medium text-[13px] text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                  boxShadow: "0 4px 14px rgba(92,24,40,0.35)",
                }}
              >
                <Phone size={13} />
                1-800-TRIPILE
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {topics.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-[18px] p-[28px] flex flex-col gap-[14px]"
                style={{
                  border: "1px solid #EDE0CC",
                  boxShadow: "0 2px 12px rgba(26,15,13,0.04)",
                }}
              >
                <div
                  className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: "#F5EAED" }}
                >
                  <Icon size={20} style={{ color: "#5C1828" }} />
                </div>
                <div>
                  <p className="font-body font-semibold text-[16px] text-warm-dark mb-[6px]">
                    {title}
                  </p>
                  <p className="font-body text-[14px] text-warm-mid leading-[1.65]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof strip ── */}
      <section
        className="py-[48px] lg:py-[56px]"
        style={{ background: "linear-gradient(135deg, #3D0F19 0%, #5C1828 50%, #8B2A3F 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[0px]">
            {[
              { value: "2,400+", label: "Verified reviews",    sub: "Average 4.97 / 5"       },
              { value: "48k+",   label: "Trips supported",     sub: "Since 2022"              },
              { value: "< 2 min", label: "Average hold time",  sub: "Real agents, no bots"   },
              { value: "100%",   label: "Free to call",        sub: "No service fees, ever"  },
            ].map(({ value, label, sub }, i, arr) => (
              <div
                key={label}
                className="flex flex-col items-center text-center py-[8px] px-[16px]"
                style={{
                  borderRight:
                    i < arr.length - 1
                      ? "1px solid rgba(255,255,255,0.10)"
                      : "none",
                }}
              >
                <span
                  className="font-display font-semibold leading-none mb-[6px]"
                  style={{ fontSize: "34px", color: "#C9A84C", letterSpacing: "-0.02em" }}
                >
                  {value}
                </span>
                <span className="font-body font-medium text-[13px] text-white/80">{label}</span>
                <span className="font-body text-[11px] text-white/35 mt-[3px]">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[64px] lg:py-[110px] bg-ivory">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-[360px_1fr] gap-[40px] lg:gap-[80px]">

            {/* Sticky left */}
            <div className="flex flex-col lg:sticky lg:top-[100px] lg:self-start">
              <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[12px]">
                FAQ
              </p>
              <h2 className="font-display font-medium text-warm-dark leading-[1.05] tracking-[-0.01em] mb-[20px]" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
                Common questions
              </h2>
              <p className="font-body text-[16px] text-warm-mid leading-[1.75] mb-[36px]">
                Can&apos;t find what you&apos;re looking for? Call us  a real agent
                answers in under 2 minutes.
              </p>

              {/* Mini testimonial */}
              <div
                className="rounded-[16px] p-[22px] flex flex-col gap-[12px]"
                style={{ background: "#F5EAED", border: "1px solid #EDE0CC" }}
              >
                <div className="flex gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="#C9A84C" style={{ color: "#C9A84C" }} />
                  ))}
                </div>
                <p className="font-display italic text-[16px] text-warm-dark leading-[1.55]">
                  &ldquo;Called Sunday night. Flight cancelled, rebooked, confirmed 
                  all in 12 minutes. Incredible.&rdquo;
                </p>
                <div className="flex items-center gap-[9px]">
                  <img
                    src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=40&q=80"
                    alt="Margaret H."
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                  <p className="font-body text-[12px] text-warm-mid">Margaret H., Florida</p>
                </div>
              </div>

              <a
                href="tel:1-800-874-7453"
                className="mt-[28px] self-start flex items-center gap-[8px] px-[22px] py-[13px] rounded-[11px] font-body font-medium text-[14px] text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                  boxShadow: "0 4px 16px rgba(92,24,40,0.35)",
                }}
              >
                <Phone size={14} />
                1-800-TRIPILE
              </a>
            </div>

            {/* Accordion */}
            <div
              className="flex flex-col"
              style={{ borderTop: "1px solid #EDE0CC" }}
            >
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{ borderBottom: "1px solid #EDE0CC" }}
                >
                  <button
                    className="w-full flex items-start justify-between gap-[20px] py-[24px] text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-body font-medium text-[16px] text-warm-dark leading-[1.5]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "#5C1828",
                        flexShrink: 0,
                        marginTop: "3px",
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.22s ease",
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="font-body text-[15px] text-warm-mid leading-[1.78] pb-[24px]">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <CallCTA />
      <Footer />
    </div>
  );
}
