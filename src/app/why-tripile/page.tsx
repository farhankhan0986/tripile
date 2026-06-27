import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import {
  Phone, ShieldCheck, Clock3, MapPin, Star, CheckCircle2,
  XCircle, Sparkles, Users, Award, TrendingUp, HeartHandshake,
  Zap, Globe, ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Book With Tripile | Expert Travel Agents",
  description:
    "Discover why 30,000+ travelers choose Tripile: expert travel agents, price-match guarantee, 24/7 support, and curated experiences you won't find on any algorithm.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "30k+",  label: "Trips booked"      },
  { value: "4.53",  label: "Average rating"     },
  { value: "24/7",  label: "Agent availability" },
  { value: "4+",    label: "Years of expertise" },
];

const BENEFITS = [
  {
    icon: Users,
    title: "Agents who have been there",
    body: "Every agent on our team has personally traveled to the destinations they recommend. We do not read from a script. We share what we have lived, seen, and loved.",
    accent: "#5C1828",
  },
  {
    icon: Phone,
    title: "A real person, any hour",
    body: "When something goes wrong mid-trip, a cancelled flight or hotel mix-up, you call us and a real person answers. Day or night. No automated menus.",
    accent: "#8B2A3F",
  },
  {
    icon: ShieldCheck,
    title: "Price-match guarantee",
    body: "Find the same itinerary cheaper elsewhere within 48 hours of booking and we will match it. No hoops, no fine print. Just fair, honest pricing.",
    accent: "#5C1828",
  },
  {
    icon: HeartHandshake,
    title: "Built around how you travel",
    body: "Whether you want a fully planned itinerary or just a flight and a hotel, we build around your pace, your budget, and your idea of a perfect trip.",
    accent: "#8B2A3F",
  },
  {
    icon: Globe,
    title: "150+ destinations covered",
    body: "From the Caribbean to Southeast Asia, our agents have first-hand knowledge of over 150 destinations and can match you to the right experience.",
    accent: "#5C1828",
  },
  {
    icon: Award,
    title: "No hidden fees, ever",
    body: "The price we quote is the price you pay. No booking surprises, no resort fees dropped in at checkout. Everything is itemized and confirmed upfront.",
    accent: "#8B2A3F",
  },
];

const COMPARISON = [
  { feature: "Personal travel agent assigned",     tripile: true,  ota: false },
  { feature: "24/7 live phone support",            tripile: true,  ota: false },
  { feature: "Price-match guarantee",              tripile: true,  ota: false },
  { feature: "Agent with first-hand destination knowledge", tripile: true, ota: false },
  { feature: "No hidden booking fees",             tripile: true,  ota: false },
  { feature: "Real-time flight search",            tripile: true,  ota: true  },
  { feature: "Hotel inventory",                    tripile: true,  ota: true  },
  { feature: "Mid-trip problem resolution",        tripile: true,  ota: false },
  { feature: "Curated itinerary building",         tripile: true,  ota: false },
];

const TESTIMONIALS = [
  {
    quote: "I called Sunday night when our connecting flight was cancelled. A Tripile agent had us rebooked within 20 minutes. No other service does that.",
    name: "Margaret H.",
    location: "Florida",
    avatar: "MH",
  },
  {
    quote: "I have booked through every major site. Tripile is the only one where someone actually picked up and knew exactly what I needed without me having to explain twice.",
    name: "David K.",
    location: "New York",
    avatar: "DK",
  },
  {
    quote: "Our honeymoon was perfect because the agent had actually been to Maui. She told us things no website would. That personal touch made all the difference.",
    name: "Priya & Arjun S.",
    location: "California",
    avatar: "PS",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function BenefitCard({
  icon: Icon, title, body, accent,
}: {
  icon: React.ElementType; title: string; body: string; accent: string;
}) {
  return (
    <div
      className="rounded-[20px] p-[28px] flex flex-col gap-[16px] group hover:-translate-y-[2px] transition-all duration-300"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 16px rgba(26,15,13,0.05)" }}
    >
      <div
        className="w-[50px] h-[50px] rounded-[15px] flex items-center justify-center shrink-0"
        style={{ background: `${accent}10` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-[20px] text-warm-dark mb-[8px] leading-tight">{title}</h3>
        <p className="font-body text-[15px] text-warm-mid leading-[1.75]">{body}</p>
      </div>
    </div>
  );
}

function CompareRow({
  feature, tripile, ota, shade,
}: {
  feature: string; tripile: boolean; ota: boolean; shade: boolean;
}) {
  return (
    <div
      className="grid grid-cols-[1fr_120px_120px] items-center gap-[12px] px-[20px] py-[14px] rounded-[10px]"
      style={{ background: shade ? "#FAF7F2" : "#fff" }}
    >
      <p className="font-body text-[15px]" style={{ color: "#1A0F0D" }}>{feature}</p>
      <div className="flex justify-center">
        {tripile
          ? <CheckCircle2 size={20} style={{ color: "#2D6A4F" }} />
          : <XCircle      size={20} style={{ color: "#EDE0CC" }} />}
      </div>
      <div className="flex justify-center">
        {ota
          ? <CheckCircle2 size={20} style={{ color: "#A89282" }} />
          : <XCircle      size={20} style={{ color: "#EDE0CC" }} />}
      </div>
    </div>
  );
}

function TestimonialCard({
  quote, name, location, avatar,
}: {
  quote: string; name: string; location: string; avatar: string;
}) {
  return (
    <div
      className="rounded-[20px] p-[28px] flex flex-col gap-[20px]"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 16px rgba(26,15,13,0.05)" }}
    >
      <div className="flex gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} style={{ color: "#C9A84C" }} fill="#C9A84C" />
        ))}
      </div>
      <p className="font-display italic text-[19px] text-warm-dark leading-[1.55] flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-[12px]">
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center font-body font-bold text-[13px] shrink-0"
          style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", color: "#fff" }}
        >
          {avatar}
        </div>
        <div>
          <p className="font-body font-semibold text-[14px]" style={{ color: "#1A0F0D" }}>{name}</p>
          <p className="font-body text-[12px]" style={{ color: "#A89282" }}>{location}</p>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WhyTripilePage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-[120px] pb-[80px] px-6 lg:px-20"
        style={{ background: "linear-gradient(155deg, #0F0806 0%, #1A0F0D 45%, #2e0f19 100%)" }}
      >
        {/* Orbs */}
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(92,24,40,0.30) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-40px] left-[20%] w-[250px] h-[250px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-[1100px] mx-auto relative">
          <div className="inline-flex items-center gap-[8px] mb-[20px] px-[14px] py-[6px] rounded-full" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.22)" }}>
            <Sparkles size={12} style={{ color: "#C9A84C" }} />
            <span className="font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "#C9A84C" }}>Why Tripile</span>
          </div>

          <h1
            className="font-display font-semibold text-white leading-[1.02] mb-[22px]"
            style={{ fontSize: "clamp(36px, 6vw, 70px)" }}
          >
            Travel should feel<br className="hidden sm:block" /> effortless.
          </h1>
          <p className="font-body text-[18px] leading-[1.80] mb-[40px] max-w-[580px]" style={{ color: "rgba(255,255,255,0.60)" }}>
            We are not an algorithm. We are a team of people who love travel, answer every call, and have been to the places they recommend.
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center py-[20px] px-[16px] gap-[4px]"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <span className="font-display font-semibold text-[34px] leading-none text-white">{value}</span>
                <span className="font-body text-[11px] uppercase tracking-[0.08em] text-center" style={{ color: "rgba(255,255,255,0.42)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Benefits grid ── */}
      <section className="py-[80px] lg:py-[100px] px-6 lg:px-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-[52px]">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[14px]">What sets us apart</p>
            <h2 className="font-display font-semibold text-warm-dark leading-[1.05]" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Six reasons 30,000+ travelers<br className="hidden lg:block" /> choose us over booking alone
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {BENEFITS.map((b) => <BenefitCard key={b.title} {...b} />)}
          </div>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-[80px] px-6 lg:px-20" style={{ background: "#fff" }}>
        <div className="max-w-[860px] mx-auto">
          <div className="mb-[44px] text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[14px]">Tripile vs. booking alone</p>
            <h2 className="font-display font-semibold text-warm-dark" style={{ fontSize: "clamp(26px, 4vw, 44px)" }}>
              The difference is real
            </h2>
          </div>

          {/* Header */}
          <div className="grid grid-cols-[1fr_120px_120px] gap-[12px] px-[20px] pb-[12px] mb-[8px]" style={{ borderBottom: "2px solid #EDE0CC" }}>
            <span className="font-body text-[12px] uppercase tracking-[0.10em]" style={{ color: "#A89282" }}>Feature</span>
            <div className="flex flex-col items-center gap-[4px]">
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)" }}
              >
                <Zap size={15} style={{ color: "#fff" }} />
              </div>
              <span className="font-body font-semibold text-[12px]" style={{ color: "#5C1828" }}>Tripile</span>
            </div>
            <div className="flex flex-col items-center gap-[4px]">
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
                style={{ background: "#F5EAED" }}
              >
                <Globe size={15} style={{ color: "#A89282" }} />
              </div>
              <span className="font-body font-semibold text-[12px]" style={{ color: "#A89282" }}>Other sites</span>
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            {COMPARISON.map((row, i) => (
              <CompareRow key={row.feature} {...row} shade={i % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-[80px] lg:py-[100px] px-6 lg:px-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-[48px]">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[14px]">What travelers say</p>
            <h2 className="font-display font-semibold text-warm-dark leading-[1.05]" style={{ fontSize: "clamp(26px, 4vw, 44px)" }}>
              Real stories, real people
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-[80px] px-6 lg:px-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #0F0806 0%, #1A0F0D 50%, #2e0f19 100%)" }}
      >
        <div className="absolute -top-[60px] -right-[60px] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(92,24,40,0.35) 0%, transparent 70%)" }} />

        <div className="max-w-[680px] mx-auto relative">
          <div
            className="inline-flex items-center gap-[8px] mb-[20px] px-[14px] py-[6px] rounded-full"
            style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.22)" }}
          >
            <TrendingUp size={12} style={{ color: "#C9A84C" }} />
            <span className="font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "#C9A84C" }}>Ready to travel?</span>
          </div>

          <h2
            className="font-display font-semibold text-white leading-[1.05] mb-[16px]"
            style={{ fontSize: "clamp(30px, 5vw, 54px)" }}
          >
            Let us plan your perfect trip
          </h2>
          <p className="font-body text-[17px] leading-[1.80] mb-[36px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            One call is all it takes. Our agents handle flights, hotels, and everything in between.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px]">
            <a
              href="tel:1-800-963-4330"
              className="inline-flex items-center gap-[10px] font-body font-semibold text-[15px] text-white px-[28px] py-[14px] rounded-[14px] transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 20px rgba(92,24,40,0.40)" }}
            >
              <Phone size={16} /> 1-800-963-4330
            </a>
            <a
              href="/flights"
              className="inline-flex items-center gap-[10px] font-body font-semibold text-[15px] px-[28px] py-[14px] rounded-[14px] transition-all hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Search flights <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
