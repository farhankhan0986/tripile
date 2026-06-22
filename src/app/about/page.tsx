import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import CallCTA from "@/components/sections/CallCTA";
import Footer from "@/components/Footer";
import { Shield, Phone, Award, Users, Clock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Tripile",
  description: "4+ years helping travelers over 50 see the world with confidence.",
};

const team = [
  {
    name: "Margaret Chen",
    initials: "MC",
    years: 12,
    specialty: "Caribbean & Mediterranean Cruises",
    trips: 340,
    avatar: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Every trip I plan, I imagine what I would want if it were me traveling.",
  },
  {
    name: "Robert Walsh",
    initials: "RW",
    years: 18,
    specialty: "European River Cruises",
    trips: 510,
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    quote: "The Rhine at dawn is something you never forget. I help people create those moments.",
  },
  {
    name: "Dorothy Santos",
    initials: "DS",
    years: 9,
    specialty: "National Parks & Alaska",
    trips: 220,
    avatar: "https://plus.unsplash.com/premium_photo-1762456150116-bd1679a52c5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    quote: "The best national park experience is one that moves at your pace, not everyone else's.",
  },
];

const stats = [
  { value: "4+", label: "Years in business", icon: Clock },
  { value: "48k+", label: "Trips booked", icon: Globe },
  { value: "4.97", label: "Average rating", icon: Award },
  { value: "12", label: "Expert agents", icon: Users },
];

const values = [
  {
    icon: Phone,
    title: "Real people, every time",
    body: "We don't use chatbots or automated replies. Every inquiry, every booking, every problem  handled by a real licensed agent.",
  },
  {
    icon: Shield,
    title: "We've been there",
    body: "Our agents personally travel to the destinations they recommend. We speak from experience, not from a brochure.",
  },
  {
    icon: Award,
    title: "Your pace, your trip",
    body: "We specialize in thoughtful itineraries designed for comfort  not rushed tours. Your trip should feel like a vacation, not a marathon.",
  },
];

const accreditations = [
  {
    badge: "BBB A+",
    org: "Better Business Bureau",
    since: "Since 2009",
    description:
      "Tripile has held a Better Business Bureau A+ rating for over a decade  the highest possible rating, awarded for transparency, complaint resolution, and ethical business practices.",
  },
  {
    badge: "ASTA Member",
    org: "American Society of Travel Advisors",
    since: "Member since 2004",
    description:
      "ASTA is the largest association of travel professionals in the world. Membership requires adherence to a strict code of ethics and ongoing professional development.",
  },
  {
    badge: "IATA Accredited",
    org: "International Air Transport Association",
    since: "Accredited agency",
    description:
      "IATA accreditation certifies that Tripile meets the global standard for airline ticket sales  allowing us to issue tickets for over 200 airlines at published fares.",
  },
  {
    badge: "SSL Secure",
    org: "256-bit TLS Encryption",
    since: "All transactions protected",
    description:
      "Every page, every form, and every payment on Tripile is protected by industry-standard 256-bit TLS encryption. Your personal and financial data is never stored unencrypted.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,6,4,0.75) 0%, rgba(92,24,40,0.45) 55%, rgba(15,6,4,0.85) 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-20 py-[120px]">
          <p className="font-body text-[11px] uppercase tracking-[0.12em] text-white/50 mb-[20px]">
            Our Company
          </p>
          <h1 className="font-display font-semibold text-[76px] italic text-white leading-[0.98] tracking-[-0.02em] mb-[28px] max-w-[700px]">
            We are<br />Tripile.
          </h1>
          <p className="font-body text-[18px] text-white/75 max-w-[520px] leading-[1.7] mb-[48px]">
            For 4+ years we&apos;ve helped travelers over 50 experience the world with
            confidence, comfort, and a real agent by their side every step of the way.
          </p>

          {/* Stat row in hero */}
          <div className="flex items-center gap-[40px] flex-wrap">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-[12px]">
                <div
                  className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}
                >
                  <Icon size={16} style={{ color: "#C9A84C" }} />
                </div>
                <div>
                  <p className="font-display font-semibold text-[22px] text-white leading-none">{value}</p>
                  <p className="font-body text-[11px] text-white/50 uppercase tracking-[0.07em] mt-[2px]">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-[110px]">
        <div className="max-w-[1280px] mx-auto px-20">
          <div className="grid lg:grid-cols-2 gap-[80px] items-center">

            <div className="flex flex-col gap-[24px]">
              <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid">
                Our Story
              </p>
              <h2 className="font-display font-medium text-[48px] text-warm-dark leading-[1.05] tracking-[-0.01em]">
                Born from a belief<br />in better travel
              </h2>
              <div className="flex flex-col gap-[18px] font-body text-[16px] text-warm-mid leading-[1.75]">
                <p>
                  Tripile was founded in 2022 with one simple belief: booking travel should feel
                  like the beginning of your adventure, not the obstacle before it. Our founders
                  saw that travelers over 50 were being left behind by the growing
                  do-it-yourself booking landscape.
                </p>
                <p>
                  They deserved expert guidance, real phone support, and thoughtfully designed
                  itineraries that matched their pace, their comfort, and their curiosity 
                  not just a search engine and a credit card form.
                </p>
                <p>
                  Today, with more than two decades of experience, we remain committed to that
                  original promise. Every trip is handled personally by a licensed agent who
                  knows your destination from firsthand experience.
                </p>
              </div>

              {/* Values list */}
              <div className="flex flex-col gap-[20px] mt-[8px]">
                {values.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex gap-[14px] items-start">
                    <div
                      className="shrink-0 w-[38px] h-[38px] rounded-[10px] flex items-center justify-center mt-[1px]"
                      style={{ background: "#F5EAED" }}
                    >
                      <Icon size={16} style={{ color: "#5C1828" }} />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-[14px] text-warm-dark mb-[3px]">{title}</p>
                      <p className="font-body text-[13px] text-warm-mid leading-[1.65]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image with overlay card */}
            <div className="relative">
              <div
                className="rounded-[22px] overflow-hidden"
                style={{ height: "560px", boxShadow: "0 12px 48px rgba(26,15,13,0.16)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80"
                  alt="Scenic mountain lake travel destination"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 rounded-[22px]"
                  style={{ background: "linear-gradient(to top, rgba(15,6,4,0.5) 0%, transparent 50%)" }}
                />
              </div>
              {/* Floating established card */}
              <div
                className="absolute bottom-[-20px] right-[-24px] rounded-[18px] px-[24px] py-[20px] flex flex-col items-center gap-[4px]"
                style={{
                  background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                  boxShadow: "0 8px 32px rgba(92,24,40,0.35)",
                }}
              >
                <span className="font-display font-semibold text-[36px] text-white leading-none">2022</span>
                <span className="font-body text-[11px] uppercase tracking-[0.09em] text-white/65">Established</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="py-[110px]" style={{ background: "linear-gradient(160deg, #F5EAED 0%, #FAF7F2 50%, #EDE0CC 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-20">

          <div className="mb-[56px]">
            <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[12px]">
              Our People
            </p>
            <h2 className="font-display font-medium text-[48px] text-warm-dark leading-[1.05]">
              Meet your agents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {team.map((agent) => (
              <div
                key={agent.name}
                className="bg-white rounded-[20px] overflow-hidden flex flex-col"
                style={{ boxShadow: "0 4px 20px rgba(26,15,13,0.07)", border: "1px solid rgba(237,224,204,0.8)" }}
              >
                {/* Photo area */}
                <div className="relative h-[320px] overflow-hidden group">
  {/* Agent Image */}
 <img
  src={agent.avatar}
  alt={agent.name}
  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
/>

  {/* Gradient Overlay */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(to top, rgba(15,6,4,0.85) 0%, rgba(15,6,4,0.25) 45%, transparent 100%)",
    }}
  />

  {/* Trips Badge */}
  <div
    className="absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg"
    style={{
      background: "rgba(201,168,76,0.92)",
      color: "#1A0F0D",
    }}
  >
    <span className="font-body text-[11px] font-semibold tracking-wide">
      {agent.trips}+ Trips Planned
    </span>
  </div>

  {/* Agent Name Overlay */}
  <div className="absolute bottom-0 left-0 right-0 p-5">
    <h3 className="font-display text-[22px] text-white font-medium">
      {agent.name}
    </h3>

    <p className="font-body text-[13px] text-white/75 mt-1">
      Travel Specialist
    </p>
  </div>
</div>

                {/* Content */}
                <div className="p-[24px] flex flex-col gap-[14px] flex-1">
                  <div>
                    <p className="font-display font-semibold text-[22px] text-warm-dark leading-none mb-[4px]">
                      {agent.name}
                    </p>
                    <p className="font-body text-[12px] text-warm-mid uppercase tracking-[0.07em]">
                      {agent.years} years · {agent.specialty}
                    </p>
                  </div>

                  <p className="font-display italic text-[16px] text-warm-mid leading-[1.55] flex-1">
                    &ldquo;{agent.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Accreditations ── */}
      <section
        className="relative overflow-hidden py-[100px]"
        style={{ background: "linear-gradient(160deg, #1A0F0D 0%, #0F0604 100%)" }}
      >
        {/* Gold top rule */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent)" }}
        />

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-[1280px] mx-auto px-20">

          {/* ── Section header ── */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-[40px] items-end mb-[56px]">
            <div>
              <p
                className="font-body text-[11px] uppercase tracking-[0.14em] mb-[14px]"
                style={{ color: "rgba(201,168,76,0.65)" }}
              >
                Trust &amp; accreditation
              </p>
              <h2
                className="font-display font-semibold text-white leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                Verified by the
                <br />
                <em style={{ color: "#C9A84C" }}>industry&apos;s best.</em>
              </h2>
            </div>
            <p
              className="font-body text-[14px] leading-[1.72] max-w-[340px] pb-[4px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Every accreditation below is active and independently verifiable.
              We don&apos;t display badges we haven&apos;t earned.
            </p>
          </div>

          {/* ── Accreditation cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[56px]">
            {accreditations.map(({ badge, org, since, description }) => (
              <div
                key={badge}
                className="flex gap-[20px] rounded-[20px] p-[28px] group transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid rgba(201,168,76,0.55)",
                }}
              >
                {/* Icon */}
                <div
                  className="shrink-0 w-[48px] h-[48px] rounded-[14px] flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,0.10)",
                    border: "1px solid rgba(201,168,76,0.20)",
                  }}
                >
                  <Shield size={20} style={{ color: "#C9A84C" }} />
                </div>

                {/* Copy */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center gap-[10px] flex-wrap">
                    <span
                      className="font-body font-semibold text-[15px]"
                      style={{ color: "#fff" }}
                    >
                      {badge}
                    </span>
                    <span
                      className="font-body text-[10px] uppercase tracking-[0.08em] px-[8px] py-[3px] rounded-full"
                      style={{
                        background: "rgba(201,168,76,0.12)",
                        color: "#C9A84C",
                        border: "1px solid rgba(201,168,76,0.20)",
                      }}
                    >
                      {since}
                    </span>
                  </div>
                  <p
                    className="font-body text-[11px] uppercase tracking-[0.07em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {org}
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.70] mt-[2px]"
                    style={{ color: "rgba(255,255,255,0.50)" }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom trust stats bar ── */}
          <div
            className="rounded-[20px] px-[40px] py-[28px] grid grid-cols-2 sm:grid-cols-4 gap-[32px]"
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.14)",
            }}
          >
            {[
              { value: "A+", label: "BBB Rating", sub: "Highest possible" },
              { value: "48k+", label: "Trips booked", sub: "Since 2022" },
              { value: "4.97", label: "Avg. review score", sub: "2,400+ reviews" },
              { value: "100%", label: "Secure checkout", sub: "256-bit TLS" },
            ].map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-[4px]">
                <span
                  className="font-display font-semibold leading-none"
                  style={{ fontSize: "32px", color: "#C9A84C", letterSpacing: "-0.02em" }}
                >
                  {value}
                </span>
                <span className="font-body font-medium text-[13px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {label}
                </span>
                <span className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.30)" }}>
                  {sub}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Gold bottom rule */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent)" }}
        />
      </section>

      <CallCTA />
      <Footer />
    </div>
  );
}
