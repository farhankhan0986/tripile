"use client";

import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";

const categories = [
  {
    label: "Booking & Pricing",
    faqs: [
      {
        q: "How do I book a flight or hotel with Tripile?",
        a: "The easiest way is to call us at 1-800-TRIPILE (Mon–Sat, 8am–9pm ET). One of our licensed agents will walk you through all available options for your dates and destination, and confirm your booking in a single call. You can also start a search on our website and we'll follow up to finalize details.",
      },
      {
        q: "Are your prices the same as booking directly with an airline or hotel?",
        a: "We have access to the same fares and rates as booking directly, plus negotiated rates with many hotel partners. Our agents can also apply loyalty points, find unadvertised deals, and advise on the best timing to book. There is no markup on travel costs  our service fee is $50 per booking.",
      },
      {
        q: "Do you charge a booking fee?",
        a: "Yes. We charge a one-time service fee of $50 per booking. This covers the full service of our licensed agents: itinerary planning, booking management, and support if anything changes before or during your trip. The fee is non-refundable in the event of voluntary cancellation.",
      },
      {
        q: "Can I use my airline miles or hotel points through Tripile?",
        a: "Absolutely. Let your agent know your loyalty program membership numbers when you call and we will apply them to your booking. We work with all major US airline and hotel loyalty programs.",
      },
      {
        q: "How far in advance should I book?",
        a: "For domestic flights, 4–6 weeks in advance is typically optimal. International travel benefits from 3–6 months lead time. For peak periods like Thanksgiving, Christmas, or spring break, we recommend booking as early as possible. Call us and we'll advise based on your specific route and dates.",
      },
    ],
  },
  {
    label: "Cancellations & Changes",
    faqs: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellation policies depend on the airline, hotel, or tour operator you've booked with. Our agents clearly explain all restrictions before confirming your booking. We always aim to book refundable or flexible fares when they make financial sense. Tripile's $50 service fee is non-refundable.",
      },
      {
        q: "What if my flight is cancelled by the airline?",
        a: "We handle airline cancellations and disruptions on your behalf. Simply call us and we will rebook you on the next available flight, request a refund, or pursue compensation as appropriate under your fare rules. This is exactly the kind of situation where having a real agent makes all the difference.",
      },
      {
        q: "Can I change my travel dates after booking?",
        a: "Most bookings allow date changes subject to availability and any fare difference. Call us as soon as you know you need to change  the sooner the better, as change fees and fare differences often increase closer to departure. We will always present you with all your options.",
      },
      {
        q: "Do you recommend travel insurance?",
        a: "Strongly. We recommend comprehensive travel insurance for every trip, especially for international travel and for travelers over 60. It covers trip cancellation, medical emergencies, evacuation, and lost luggage. We can provide quotes from our preferred insurance partners  just ask when you call.",
      },
    ],
  },
  {
    label: "Passports & Documents",
    faqs: [
      {
        q: "Does my passport need to be valid for 6 months after my trip?",
        a: "Yes, most countries require your passport to be valid for at least 6 months beyond your return date. Some require only 3 months. Our agents will confirm the specific requirement for your destination and flag any issues. Renewing a passport typically takes 6–8 weeks, or 3 weeks with expedited processing.",
      },
      {
        q: "Do I need a visa for my destination?",
        a: "Visa requirements vary by destination and your nationality. For US citizens, many popular destinations (Europe, Mexico, most Caribbean countries) require no advance visa. Others like India, Vietnam, and Australia require advance visas. We will let you know exactly what is required when you book.",
      },
      {
        q: "Is a passport required to travel to Puerto Rico, Hawaii, or the US Virgin Islands?",
        a: "No passport is required for US citizens traveling to Puerto Rico, Hawaii, Guam, or the US Virgin Islands  they are US territories. A valid government-issued photo ID (driver's license or state ID) is sufficient.",
      },
    ],
  },
  {
    label: "About Tripile",
    faqs: [
      {
        q: "Is Tripile a licensed travel agency?",
        a: "Yes. Tripile is a fully licensed and accredited travel agency, an ASTA (American Society of Travel Advisors) member, and IATA accredited. We have been in business since 2002 and hold a BBB A+ rating. Our agents are licensed and undergo regular training.",
      },
      {
        q: "Who are your typical customers?",
        a: "We specialize in serving American travelers aged 50 and older who prefer the confidence of working with a real agent over booking online. We serve individuals, couples, and small groups. Many of our clients have been traveling with us for over a decade.",
      },
      {
        q: "What types of travel do you book?",
        a: "We book flights, hotels, vacation packages, cruise lines, car rentals, guided tours, and travel insurance. We have particular depth of experience in Caribbean, Hawaii, Europe, and domestic US travel  the destinations our clients love most.",
      },
      {
        q: "Do you have a physical office I can visit?",
        a: "Our agents work from offices in New York, but we serve clients nationwide by phone and email. We have never required in-person visits  most of our clients prefer the convenience of booking from home by phone.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b last:border-b-0 transition-colors duration-200"
      style={{ borderColor: "#EDE0CC" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-[16px] py-[22px] text-left"
      >
        <span
          className="font-body font-medium leading-[1.45]"
          style={{ fontSize: "15px", color: "#1A0F0D" }}
        >
          {q}
        </span>
        <span
          className="shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center transition-transform duration-300 mt-[1px]"
          style={{
            background: open ? "#5C1828" : "#F5EAED",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={14} color={open ? "#fff" : "#5C1828"} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p
          className="font-body leading-[1.78] pb-[22px] pr-[44px]"
          style={{ fontSize: "14px", color: "#6B5244" }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,6,4,0.82) 0%, rgba(92,24,40,0.55) 55%, rgba(15,6,4,0.90) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-20 py-[72px] lg:py-[100px] text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.12em] text-white/50 mb-[20px]">
            Frequently asked questions
          </p>
          <h1 className="font-display font-semibold italic text-white leading-[0.97] tracking-[-0.02em] mb-[24px]" style={{ fontSize: "clamp(36px, 7vw, 72px)" }}>
            We&apos;ve got<br />
            <span style={{ color: "#C9A84C" }}>answers.</span>
          </h1>
          <p className="font-body text-[17px] text-white/65 max-w-[460px] mx-auto leading-[1.72]">
            Can&apos;t find what you&apos;re looking for? Call us  our agents
            are happy to answer any question, no booking required.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-[48px] lg:py-[96px]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-[260px_1fr] gap-[32px] lg:gap-[48px] items-start">

            {/* ── Sidebar: category nav ── */}
            <div className="lg:sticky lg:top-[96px] flex flex-col gap-[8px]">
              <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-light mb-[8px]">
                Categories
              </p>
              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className="text-left font-body font-medium text-[14px] px-[16px] py-[11px] rounded-[10px] transition-all duration-200"
                  style={{
                    background: activeCategory === i ? "#5C1828" : "transparent",
                    color: activeCategory === i ? "#fff" : "#6B5244",
                  }}
                >
                  {cat.label}
                  <span
                    className="ml-[8px] font-body text-[11px]"
                    style={{ opacity: 0.55 }}
                  >
                    ({cat.faqs.length})
                  </span>
                </button>
              ))}

              {/* Divider */}
              <div className="my-[8px] h-px" style={{ background: "#EDE0CC" }} />

              {/* Still have questions */}
              <div
                className="rounded-[16px] p-[20px] flex flex-col gap-[12px]"
                style={{
                  background: "linear-gradient(135deg, #5C1828 0%, #3D0E1A 100%)",
                }}
              >
                <div className="flex items-center gap-[8px]">
                  <MessageCircle size={14} color="#C9A84C" />
                  <p className="font-body font-semibold text-[12px] text-white">
                    Still have questions?
                  </p>
                </div>
                <p className="font-body text-[12px] text-white/60 leading-[1.6]">
                  Our agents answer every question personally. No wait time.
                </p>
                <a
                  href="tel:1-800-874-7453"
                  className="inline-flex items-center gap-[7px] font-body font-medium text-[12px] text-warm-dark rounded-[8px] px-[14px] py-[9px] transition-all duration-200 hover:opacity-85"
                  style={{ background: "#C9A84C" }}
                >
                  <Phone size={12} />
                  Call 1-800-TRIPILE
                </a>
              </div>
            </div>

            {/* ── FAQ list ── */}
            <div>
              <div className="mb-[8px]">
                <h2 className="font-display font-semibold text-warm-dark leading-[1.0] mb-[4px]" style={{ fontSize: "clamp(24px, 5vw, 40px)" }}>
                  {categories[activeCategory].label}
                </h2>
                <p className="font-body text-[13px] text-warm-light">
                  {categories[activeCategory].faqs.length} questions
                </p>
              </div>

              <div
                className="rounded-[20px] overflow-hidden"
                style={{
                  background: "#fff",
                  border: "1px solid #EDE0CC",
                  boxShadow: "0 4px 24px rgba(26,15,13,0.06)",
                }}
              >
                <div className="px-[16px] lg:px-[32px]">
                  {categories[activeCategory].faqs.map(({ q, a }) => (
                    <FAQItem key={q} q={q} a={a} />
                  ))}
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
