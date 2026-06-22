"use client";

import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import {
  Phone, Mail, Clock, CheckCircle2, Send, Star,
  Headphones, Shield, MapPin,
} from "lucide-react";

const topics = [
  "Flight booking",
  "Hotel reservation",
  "Vacation package",
  "Group travel (6+ people)",
  "Existing booking change",
  "General question",
];

const steps = [
  {
    num: "01",
    title: "Reach out",
    body: "Fill in the form below or call us directly  your choice.",
  },
  {
    num: "02",
    title: "We respond",
    body: "An agent reads your message and follows up within 4 hours.",
  },
  {
    num: "03",
    title: "Trip sorted",
    body: "We handle everything from booking to boarding, personally.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", topic: "", message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const fieldBase =
    "font-body text-[15px] text-warm-dark placeholder:text-warm-light rounded-[12px] px-[18px] py-[14px] outline-none transition-all duration-200 w-full";
  const fieldStyle = { background: "#FAF7F2", border: "1px solid #EDE0CC" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#8B2A3F";
    e.target.style.background = "#fff";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#EDE0CC";
    e.target.style.background = "#FAF7F2";
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-[]  overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,6,4,0.82) 0%, rgba(92,24,40,0.52) 55%, rgba(15,6,4,0.90) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-20 py-[110px]">
          {/* Eyebrow */}
          <div className="mb-[24px]">
            <span
              className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full font-body text-[11px] uppercase tracking-[0.08em]"
              style={{
                background: "rgba(201,168,76,0.18)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.28)",
              }}
            >
              <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
              Agents standing by
            </span>
          </div>

          <h1 className="font-display font-semibold text-[72px] italic text-white leading-[0.97] tracking-[-0.02em] mb-[24px] max-w-[640px]">
            We&apos;re here<br />
            <em className="not-italic" style={{ color: "#C9A84C" }}>every step.</em>
          </h1>

          <p className="font-body text-[17px] text-white/70 max-w-[460px] leading-[1.72] mb-[40px]">
            Real agents answer every call personally. No hold music, no bots 
            just people who love travel as much as you do.
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-[10px]">
            {[
              { icon: Clock,        text: "Under 2 min wait"          },
              { icon: Headphones,   text: "No bots, ever"             },
              { icon: Phone,        text: "Mon – Sat, 8am – 9pm ET"   },
              { icon: Shield,       text: "Toll-free · 1-800-TRIPILE" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-[7px] px-[14px] py-[8px] rounded-full font-body text-[12px]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.75)",
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

      {/* ── What to expect strip ── */}
      <div style={{ background: "#EDE0CC", borderBottom: "1px solid rgba(92,24,40,0.08)" }}>
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {steps.map(({ num, title, body }, i) => (
              <div
                key={num}
                className="flex items-start gap-[16px] py-[28px] px-[8px]"
                style={{
                  borderRight: i < steps.length - 1 ? "1px solid rgba(92,24,40,0.10)" : "none",
                  paddingLeft: i === 0 ? "0" : "32px",
                  paddingRight: i === steps.length - 1 ? "0" : "32px",
                }}
              >
                <span
                  className="font-display font-semibold text-[22px] leading-none shrink-0 mt-[2px]"
                  style={{ color: "#C9A84C" }}
                >
                  {num}
                </span>
                <div>
                  <p className="font-body font-semibold text-[14px] text-warm-dark mb-[3px]">{title}</p>
                  <p className="font-body text-[13px] text-warm-mid leading-[1.6]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="py-[96px]">
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="grid lg:grid-cols-[1fr_400px] gap-[48px] items-start">

            {/* ── Left: Form ── */}
            <div
              className="rounded-[24px] p-[48px]"
              style={{
                background: "#fff",
                border: "1px solid #EDE0CC",
                boxShadow: "0 8px 40px rgba(26,15,13,0.07)",
              }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-[48px] gap-[24px]">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
                    style={{ background: "#F5EAED" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#5C1828" }} />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-[34px] text-warm-dark mb-[10px]">
                      Message received
                    </h2>
                    <p className="font-body text-[15px] text-warm-mid leading-[1.72] max-w-[340px] mx-auto">
                      One of our agents will reach out within 4 hours.
                      Or call us now  we&apos;re available.
                    </p>
                  </div>
                  <a
                    href="tel:1-800-874-7453"
                    className="inline-flex items-center gap-[8px] font-body font-medium text-[14px] text-white rounded-[12px] px-[28px] py-[14px] transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                      boxShadow: "0 4px 18px rgba(92,24,40,0.30)",
                    }}
                  >
                    <Phone size={14} />
                    Call 1-800-TRIPILE
                  </a>
                </div>
              ) : (
                <>
                  {/* Form header */}
                  <div className="flex items-start justify-between mb-[36px]">
                    <div>
                      <h2 className="font-display font-semibold text-[34px] text-warm-dark leading-[1.05] mb-[6px]">
                        Send us a message
                      </h2>
                      <p className="font-body text-[14px] text-warm-mid leading-[1.65]">
                        An agent will follow up personally within 4 hours.
                      </p>
                    </div>
                    <a
                      href="tel:1-800-874-7453"
                      className="hidden sm:flex items-center gap-[7px] px-[16px] py-[9px] rounded-[10px] font-body text-[13px] font-medium text-burg-deep shrink-0 border border-burg-deep/18 hover:bg-burg-pale transition-colors duration-200"
                    >
                      <Phone size={12} />
                      Or call us
                    </a>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-[16px]">
                      <div className="flex flex-col gap-[7px]">
                        <label htmlFor="contact-name" className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">
                          Full name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Margaret Johnson"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={fieldBase}
                          style={{ ...fieldStyle }}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </div>
                      <div className="flex flex-col gap-[7px]">
                        <label htmlFor="contact-email" className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">
                          Email address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={fieldBase}
                          style={{ ...fieldStyle }}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-[7px]">
                      <label htmlFor="contact-phone" className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid flex items-center gap-[6px]">
                        Phone number
                        <span className="normal-case tracking-normal font-normal text-warm-light">(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={fieldBase}
                        style={{ ...fieldStyle }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>

                    {/* Topic pills */}
                    <div className="flex flex-col gap-[10px]">
                      <p className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">
                        How can we help?
                      </p>
                      <div className="flex flex-wrap gap-[8px]">
                        {topics.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, topic: t })}
                            className="font-body text-[13px] font-medium px-[14px] py-[9px] rounded-full transition-all duration-200"
                            style={{
                              background: form.topic === t ? "#5C1828" : "#F5EAED",
                              color: form.topic === t ? "#fff" : "#5C1828",
                              border: `1.5px solid ${form.topic === t ? "#5C1828" : "rgba(92,24,40,0.12)"}`,
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-[7px]">
                      <label htmlFor="contact-message" className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">
                        Your message
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        placeholder="Tell us where you'd like to go, your travel dates, or any questions you have…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="font-body text-[15px] text-warm-dark placeholder:text-warm-light rounded-[12px] px-[18px] py-[14px] outline-none resize-none transition-all duration-200 w-full"
                        style={{ ...fieldStyle }}
                        onFocus={onFocus as React.FocusEventHandler<HTMLTextAreaElement>}
                        onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-[16px] flex-wrap">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-[9px] font-body font-medium text-[15px] text-white rounded-[12px] px-[32px] py-[15px] transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: "linear-gradient(135deg, #5C1828 0%, #8B2A3F 100%)",
                          boxShadow: "0 4px 20px rgba(92,24,40,0.32)",
                        }}
                      >
                        <Send size={14} />
                        Send message
                      </button>
                      <p className="font-body text-[12px] text-warm-light">
                        Or call us now at{" "}
                        <a href="tel:1-800-874-7453" className="text-burg-deep hover:underline">
                          1-800-TRIPILE
                        </a>
                      </p>
                    </div>

                  </form>
                </>
              )}
            </div>

            {/* ── Right sidebar ── */}
            <div className="flex flex-col gap-[18px] lg:pt-[8px]">

              {/* Featured phone card */}
              <div
                className="rounded-[22px] p-[36px] flex flex-col gap-[22px]"
                style={{
                  background: "linear-gradient(145deg, #3D0F19 0%, #5C1828 55%, #8B2A3F 100%)",
                  boxShadow: "0 12px 44px rgba(92,24,40,0.42)",
                }}
              >
                <div
                  className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,0.18)",
                    border: "1px solid rgba(201,168,76,0.32)",
                  }}
                >
                  <Phone size={24} style={{ color: "#C9A84C" }} />
                </div>

                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.10em] text-white/40 mb-[8px]">
                    Call us toll-free
                  </p>
                  <a
                    href="tel:1-800-874-7453"
                    className="font-display font-semibold text-[34px] text-white hover:text-gold-accent transition-colors duration-200 leading-none block"
                  >
                    1-800-TRIPILE
                  </a>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <span
                    className="self-start inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-full font-body text-[11px]"
                    style={{
                      background: "rgba(201,168,76,0.20)",
                      color: "#C9A84C",
                      border: "1px solid rgba(201,168,76,0.28)",
                    }}
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
                    Under 2 min wait
                  </span>
                  <p className="font-body text-[13px] text-white/50">
                    Mon – Sat · 8am – 9pm ET
                  </p>
                </div>

                <a
                  href="tel:1-800-874-7453"
                  className="flex items-center justify-center gap-[8px] py-[14px] rounded-[12px] font-body font-medium text-[14px] text-white border border-white/18 hover:bg-white/10 transition-colors duration-200"
                >
                  <Phone size={14} />
                  Call now
                </a>
              </div>

              {/* Email card */}
              <div
                className="rounded-[20px] p-[24px] flex items-start gap-[16px] bg-white"
                style={{ border: "1px solid #EDE0CC", boxShadow: "0 4px 16px rgba(26,15,13,0.05)" }}
              >
                <div
                  className="shrink-0 w-[48px] h-[48px] rounded-[14px] flex items-center justify-center"
                  style={{ background: "#F5EAED" }}
                >
                  <Mail size={20} style={{ color: "#5C1828" }} />
                </div>
                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.08em] text-warm-light mb-[4px]">
                    Email us
                  </p>
                  <a
                    href="mailto:hello@tripile.com"
                    className="font-body font-semibold text-[15px] text-warm-dark hover:text-burg-deep transition-colors duration-200 block"
                  >
                    hello@tripile.com
                  </a>
                  <p className="font-body text-[12px] text-warm-light mt-[3px]">
                    Reply within 4 business hours
                  </p>
                </div>
              </div>

              {/* Hours + location row */}
              <div className="grid grid-cols-2 gap-[12px]">
                <div
                  className="rounded-[18px] p-[20px] flex flex-col gap-[8px] bg-white"
                  style={{ border: "1px solid #EDE0CC", boxShadow: "0 2px 10px rgba(26,15,13,0.04)" }}
                >
                  <div
                    className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center"
                    style={{ background: "#F5EAED" }}
                  >
                    <Clock size={16} style={{ color: "#5C1828" }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[13px] text-warm-dark">Mon – Sat</p>
                    <p className="font-body text-[12px] text-warm-light mt-[1px]">8am – 9pm ET</p>
                  </div>
                </div>
                <div
                  className="rounded-[18px] p-[20px] flex flex-col gap-[8px] bg-white"
                  style={{ border: "1px solid #EDE0CC", boxShadow: "0 2px 10px rgba(26,15,13,0.04)" }}
                >
                  <div
                    className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center"
                    style={{ background: "#F5EAED" }}
                  >
                    <MapPin size={16} style={{ color: "#5C1828" }} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[13px] text-warm-dark">New York, NY</p>
                    <p className="font-body text-[12px] text-warm-light mt-[1px]">Serving all USA</p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div
                className="rounded-[20px] px-[24px] py-[22px] flex flex-col gap-[14px]"
                style={{
                  background: "linear-gradient(135deg, #5C1828 0%, #3D0E1A 100%)",
                  boxShadow: "0 8px 32px rgba(92,24,40,0.25)",
                }}
              >
                <div className="flex gap-[3px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#C9A84C" style={{ color: "#C9A84C" }} />
                  ))}
                </div>
                <p className="font-display italic text-[16px] text-white/88 leading-[1.55]">
                  &ldquo;I called expecting to leave a message. An agent picked up on the second ring and had me booked in 20 minutes.&rdquo;
                </p>
                <div className="flex items-center gap-[10px]">
                  <img
                    src="https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=40&q=80"
                    alt="Barbara"
                    className="w-[32px] h-[32px] rounded-full object-cover"
                  />
                  <p className="font-body text-[12px] text-white/50">Barbara, 68 · Phoenix, AZ</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
