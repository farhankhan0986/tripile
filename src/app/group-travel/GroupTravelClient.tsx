"use client";

import { useState, useRef, useEffect } from "react";
import PageSearchBox, { type SearchValues } from "@/components/ui/PageSearchBox";
import FlightResultCard, { type FlightResult } from "@/components/FlightResultCard";
import {
  Phone, Users, Heart, Star, Anchor, Briefcase,
  GraduationCap, Trophy, Gift, Map, Clock, Gem,
  ChevronDown, ArrowRight, Shield, CreditCard,
  Headphones, CheckCircle2, Plane, Send, UserCheck,
  DollarSign, Wallet, Globe, CalendarCheck, Lock,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const GROUP_TYPES = [
  {
    icon: Users,
    title: "Family Vacations",
    description: "Multi-generational travel crafted for every age, with accessible accommodations and family-friendly itineraries.",
  },
  {
    icon: Heart,
    title: "Family Reunions",
    description: "Coordinate flights, hotels, and group activities so everyone arrives together and nothing falls through the cracks.",
  },
  {
    icon: Gem,
    title: "Wedding Guest Travel",
    description: "Seamless travel arrangements for your wedding guests, including room blocks and group airfare discounts.",
  },
  {
    icon: Star,
    title: "Church & Religious Groups",
    description: "Faith-based journeys to meaningful destinations, planned with care and respect for your community.",
  },
  {
    icon: Anchor,
    title: "Cruise Groups",
    description: "Group cabin reservations, shore excursions, and embarkation logistics handled by one dedicated coordinator.",
  },
  {
    icon: Briefcase,
    title: "Corporate & Business Travel",
    description: "Conference logistics, team retreats, and incentive travel packages that keep your group productive and comfortable.",
  },
  {
    icon: GraduationCap,
    title: "School & Educational Trips",
    description: "Safe, enriching travel for students with supervised itineraries, group rates, and parent communication support.",
  },
  {
    icon: Trophy,
    title: "Sports Teams",
    description: "Coordinated travel for athletic groups, with flexible scheduling around games, tournaments, and equipment needs.",
  },
  {
    icon: Gift,
    title: "Birthday & Anniversary Trips",
    description: "Milestone celebrations transformed into unforgettable journeys, with special touches your group will remember.",
  },
  {
    icon: Clock,
    title: "Friends' Getaways",
    description: "Stress-free escapes for groups of friends, with options for every budget and interest from city breaks to beach retreats.",
  },
  {
    icon: Map,
    title: "Senior Group Tours",
    description: "Comfortable, unhurried travel designed for older adults, with accessibility, slower pacing, and expert local guides.",
  },
  {
    icon: Globe,
    title: "Custom Group Itineraries",
    description: "Unique destinations and experiences built entirely around your group's vision, from first draft to final boarding pass.",
  },
];

const WHY_CHOOSE = [
  {
    icon: UserCheck,
    title: "Dedicated Travel Coordinator",
    description: "One expert handles your entire group from start to finish. One number to call. One person who knows your trip inside and out.",
  },
  {
    icon: DollarSign,
    title: "Competitive Group Pricing",
    description: "Access to group-rate airfare, hotel room blocks, and package discounts unavailable to individual travelers booking online.",
  },
  {
    icon: Wallet,
    title: "Flexible Payment Options",
    description: "Spread the cost across your group with individual billing, deposit plans, or consolidated group invoicing.",
  },
  {
    icon: Plane,
    title: "Flights + Hotels Together",
    description: "We coordinate every element of your trip as one package so nothing is left unbooked or out of sync.",
  },
  {
    icon: Headphones,
    title: "Support Before, During & After",
    description: "Questions before departure, help mid-trip, and post-travel assistance. We stay with your group the entire way.",
  },
  {
    icon: Lock,
    title: "Secure Stripe Payments",
    description: "All group payments are processed securely through Stripe. Your financial information is never stored on our servers.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Contact Our Team",
    description: "Call or fill out our group inquiry form. A travel specialist will respond within one business hour.",
  },
  {
    number: "02",
    title: "Discuss Your Trip",
    description: "We learn about your group, destination preferences, travel dates, budget, and any special requirements.",
  },
  {
    number: "03",
    title: "Receive a Personalized Quote",
    description: "We prepare a detailed, itemized proposal with multiple options and clear pricing for your review.",
  },
  {
    number: "04",
    title: "Confirm & Pay Securely",
    description: "Approve your preferred itinerary and complete payment through our secure Stripe-powered checkout.",
  },
  {
    number: "05",
    title: "Enjoy Your Journey",
    description: "Travel with confidence knowing your coordinator is available before and throughout your trip.",
  },
];

const USA_DESTINATIONS = [
  {
    name: "Orlando, FL",
    description: "Theme parks and sunshine for the whole family",
    img: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Las Vegas, NV",
    description: "Shows, dining, and entertainment at every turn",
    img: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Hawaii",
    description: "Breathtaking islands for relaxation and adventure",
    img: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "New York City",
    description: "Iconic skyline, culture, and cuisine for groups",
    img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Alaska",
    description: "Glaciers, wildlife, and wilderness unlike anywhere else",
    img: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Nashville, TN",
    description: "Music, history, and Southern hospitality",
    img: "https://images.unsplash.com/photo-1545580284-e0c2cedb28a6?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "New Orleans, LA",
    description: "Jazz, cuisine, and culture in the Crescent City",
    img: "https://images.unsplash.com/photo-1568956669884-d8d71064fa5f?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Grand Canyon, AZ",
    description: "One of nature's greatest spectacles, best seen together",
    img: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=75",
  },
];

const INTL_DESTINATIONS = [
  {
    name: "Caribbean",
    description: "Crystal waters and white sands across dozens of islands",
    img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Cancun, Mexico",
    description: "All-inclusive resorts and Mayan heritage combined",
    img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Paris, France",
    description: "Timeless elegance, art, and unforgettable cuisine",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Rome, Italy",
    description: "Ancient history and world-class food at every corner",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Greece",
    description: "Santorini sunsets and the blue Aegean Sea",
    img: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Ireland",
    description: "Rolling green hills, castles, and warm Irish welcome",
    img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "Japan",
    description: "Cherry blossoms, temples, and remarkable hospitality",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=75",
  },
  {
    name: "London, England",
    description: "Royal heritage, museums, and world-class theatre",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=75",
  },
];

const SERVICES = [
  { icon: Plane,         title: "Group Flights",        desc: "Discounted airfare for groups of 10 or more on most major carriers." },
  { icon: Globe,         title: "Hotel Reservations",   desc: "Negotiated room blocks at top-rated hotels worldwide." },
  { icon: Gift,          title: "Vacation Packages",    desc: "Flights, hotels, and transfers bundled at exclusive group rates." },
  { icon: Anchor,        title: "Cruises",               desc: "Group cabin bookings and shore excursion coordination." },
  { icon: Map,           title: "Airport Transfers",    desc: "Coordinated ground transport for your entire group, door to door." },
  { icon: Shield,        title: "Travel Insurance",     desc: "Comprehensive group coverage for cancellations, delays, and emergencies." },
  { icon: CalendarCheck, title: "Tour Packages",        desc: "Guided tours with local experts at major destinations." },
  { icon: Briefcase,     title: "Custom Itineraries",   desc: "Bespoke travel plans built exactly around your group's needs." },
];

const TESTIMONIALS = [
  {
    name: "Patricia Moore",
    location: "Dallas, TX",
    type: "Family Vacation",
    quote: "We had 22 family members traveling from six different states to Hawaii. Tripile coordinated every single flight, arranged the hotel room block, and had someone available by phone the entire trip. Not one hiccup. I cannot recommend them enough.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    name: "Rev. James Carter",
    location: "Atlanta, GA",
    type: "Church Group",
    quote: "Our congregation of 45 traveled to Israel for a faith pilgrimage. The Tripile team handled everything with patience, professionalism, and genuine care. They even arranged special accommodations for members with mobility needs. Truly exceptional service.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
  {
    name: "Sandra Whitfield",
    location: "Chicago, IL",
    type: "Corporate Retreat",
    quote: "Our executive team of 18 needed a seamless retreat experience in Napa Valley. Tripile handled flights from four cities, a private venue, and all transportation. Our team was impressed, and so was I. We will use them again without question.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
  },
  {
    name: "Robert Alvarez",
    location: "Miami, FL",
    type: "Cruise Group",
    quote: "Twelve couples for our 30th anniversary cruise. Tripile got us together on the same ship, same deck, adjoining cabins. The onboard experience was wonderful, but what really stood out was how effortlessly our coordinator managed all the logistics beforehand.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
  },
];

const FAQS = [
  {
    q: "What qualifies as group travel?",
    a: "Generally, groups of 10 or more travelers qualify for group rates and dedicated coordination. However, we can assist groups as small as 6 depending on the destination and travel type. Contact us to discuss your specific situation.",
  },
  {
    q: "Can each traveler pay separately?",
    a: "Yes. We can set up individual billing so each group member pays their own share directly via our secure Stripe-powered checkout. We can also accommodate a single invoice paid by one organizer, or split billing arrangements.",
  },
  {
    q: "Can you book flights and hotels together?",
    a: "Absolutely. Our group coordinators specialize in packaging flights and accommodations together. We negotiate room blocks at hotels and group airfare pricing simultaneously so your entire group arrives and stays in the same place.",
  },
  {
    q: "Do you arrange airport transfers?",
    a: "Yes. We coordinate ground transportation between the airport and your hotel for the entire group, including private coaches for larger groups. Just let your coordinator know your arrival and departure details.",
  },
  {
    q: "Can travel dates or headcount change after booking?",
    a: "We understand that group travel plans evolve. We work with flexible booking policies wherever possible, and your coordinator will advise on any change fees or deadline dates when you receive your quote.",
  },
  {
    q: "Do you provide travel insurance for groups?",
    a: "Yes. We offer comprehensive group travel insurance covering trip cancellations, medical emergencies, travel delays, and lost luggage. We strongly recommend coverage for groups, especially for international destinations.",
  },
  {
    q: "Is phone support available throughout our trip?",
    a: "Yes. Every group is assigned a dedicated coordinator reachable by phone. If something goes wrong during your trip, from a flight delay to a hotel issue, call us and we will resolve it immediately.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="font-body text-[11px] uppercase tracking-[0.14em] mb-[14px]"
      style={{ color: "#8B2A3F" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-semibold text-warm-dark leading-[1.08] tracking-[-0.01em]"
      style={{ fontSize: "clamp(28px, 3.8vw, 48px)" }}
    >
      {children}
    </h2>
  );
}

function GroupTypeCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div
      className="flex flex-col gap-[16px] p-[28px] rounded-[20px] transition-shadow duration-300 hover:shadow-md"
      style={{ background: "#fff", border: "1px solid #EDE0CC" }}
    >
      <div
        className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center shrink-0"
        style={{ background: "#F5EAED" }}
      >
        <Icon size={22} style={{ color: "#5C1828" }} />
      </div>
      <div>
        <p className="font-display font-semibold text-[18px] text-warm-dark mb-[8px] leading-tight">{title}</p>
        <p className="font-body text-[14px] text-warm-mid leading-[1.72]">{description}</p>
      </div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div
      className="flex flex-col gap-[14px] p-[28px] rounded-[20px]"
      style={{ background: "#FAF7F2", border: "1px solid #EDE0CC" }}
    >
      <div
        className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
        style={{ background: "#5C1828" }}
      >
        <Icon size={20} color="#fff" />
      </div>
      <div>
        <p className="font-display font-semibold text-[17px] text-warm-dark mb-[6px]">{title}</p>
        <p className="font-body text-[14px] text-warm-mid leading-[1.70]">{description}</p>
      </div>
    </div>
  );
}

function DestinationCard({ name, description, img }: { name: string; description: string; img: string }) {
  return (
    <div
      className="relative rounded-[18px] overflow-hidden group cursor-pointer"
      style={{ boxShadow: "0 4px 20px rgba(26,15,13,0.10)" }}
    >
      <div className="relative h-[220px] sm:h-[240px]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,4,2,0.72) 0%, rgba(10,4,2,0.10) 55%, transparent 100%)" }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-[20px]">
        <p className="font-display font-semibold text-[18px] text-white leading-tight mb-[4px]">{name}</p>
        <p className="font-body text-[12px] leading-[1.5]" style={{ color: "rgba(255,255,255,0.65)" }}>{description}</p>
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div
      className="flex flex-col gap-[14px] p-[24px] rounded-[18px] transition-all duration-200 hover:shadow-md"
      style={{ background: "#fff", border: "1px solid #EDE0CC" }}
    >
      <div
        className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
        style={{ background: "#F5EAED" }}
      >
        <Icon size={20} style={{ color: "#5C1828" }} />
      </div>
      <div>
        <p className="font-display font-semibold text-[16px] text-warm-dark mb-[6px]">{title}</p>
        <p className="font-body text-[13px] text-warm-mid leading-[1.65]">{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ name, location, type, quote, avatar }: (typeof TESTIMONIALS)[number]) {
  return (
    <div
      className="flex flex-col gap-[20px] p-[32px] rounded-[20px]"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 16px rgba(26,15,13,0.06)" }}
    >
      <div className="flex gap-[1px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} fill="#C9A84C" style={{ color: "#C9A84C" }} />
        ))}
      </div>
      <p className="font-display italic text-[17px] text-warm-dark leading-[1.65]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-[14px] pt-[4px]" style={{ borderTop: "1px solid #EDE0CC" }}>
        <img
          src={avatar}
          alt={name}
          className="w-[48px] h-[48px] rounded-full object-cover shrink-0"
          loading="lazy"
        />
        <div>
          <p className="font-body font-semibold text-[14px] text-warm-dark">{name}</p>
          <p className="font-body text-[12px] text-warm-mid">{location} &middot; {type}</p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #EDE0CC" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-[16px] py-[22px] text-left"
      >
        <span className="font-display font-semibold text-[17px] text-warm-dark leading-snug">{q}</span>
        <ChevronDown
          size={18}
          style={{
            color: "#5C1828",
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.28s ease",
        }}
      >
        <p className="font-body text-[15px] text-warm-mid leading-[1.75] pb-[22px]">{a}</p>
      </div>
    </div>
  );
}

// ── Quote Form ────────────────────────────────────────────────────────────────

const GROUP_TYPES_OPTIONS = [
  "Family Vacation", "Family Reunion", "Wedding Guest Travel",
  "Church / Religious Group", "Cruise Group", "Corporate / Business",
  "School / Educational", "Sports Team", "Birthday / Anniversary",
  "Friends Getaway", "Senior Group Tour", "Other",
];

function QuoteForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", groupType: "",
    destination: "", departureDate: "", returnDate: "",
    travelers: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/group-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputCls = "w-full font-body text-[15px] text-warm-dark bg-white rounded-[12px] px-[16px] py-[13px] outline-none transition-colors duration-150";
  const inputStyle = { border: "1.5px solid #EDE0CC" };
  const focusStyle = { border: "1.5px solid #8B2A3F" };
  const labelCls = "font-body font-medium text-[13px] text-warm-dark mb-[6px] block";

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-[20px] py-[60px] text-center">
        <div
          className="w-[64px] h-[64px] rounded-full flex items-center justify-center"
          style={{ background: "#F5EAED" }}
        >
          <CheckCircle2 size={28} style={{ color: "#5C1828" }} />
        </div>
        <div>
          <p className="font-display font-semibold text-[26px] text-warm-dark mb-[8px]">Quote Request Received</p>
          <p className="font-body text-[15px] text-warm-mid leading-[1.7] max-w-[420px]">
            Thank you, {form.name.split(" ")[0]}. A travel specialist will contact you within one business hour to discuss your group trip.
          </p>
        </div>
        <a
          href="tel:1-800-963-4330"
          className="inline-flex items-center gap-[8px] font-body font-semibold text-[14px] text-white px-[24px] py-[13px] rounded-[14px]"
          style={{ background: "#5C1828" }}
        >
          <Phone size={15} /> Or call us now: 1-800-963-4330
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input
            type="text"
            required
            placeholder="Margaret Johnson"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input
            type="email"
            required
            placeholder="margaret@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className={labelCls}>Phone Number *</label>
          <input
            type="tel"
            required
            placeholder="(555) 000-0000"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className={labelCls}>Group Type *</label>
          <select
            required
            value={form.groupType}
            onChange={(e) => set("groupType", e.target.value)}
            className={inputCls}
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            onFocus={(e) => Object.assign(e.target.style, { ...focusStyle, appearance: "none", cursor: "pointer" })}
            onBlur={(e) => Object.assign(e.target.style, { ...inputStyle, appearance: "none", cursor: "pointer" })}
          >
            <option value="" disabled>Select group type</option>
            {GROUP_TYPES_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Destination</label>
          <input
            type="text"
            placeholder="e.g. Hawaii, Caribbean, Europe"
            value={form.destination}
            onChange={(e) => set("destination", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className={labelCls}>Number of Travelers *</label>
          <input
            type="number"
            required
            min="2"
            placeholder="10"
            value={form.travelers}
            onChange={(e) => set("travelers", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className={labelCls}>Departure Date</label>
          <input
            type="date"
            value={form.departureDate}
            onChange={(e) => set("departureDate", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
        <div>
          <label className={labelCls}>Return Date</label>
          <input
            type="date"
            value={form.returnDate}
            onChange={(e) => set("returnDate", e.target.value)}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>Additional Notes</label>
        <textarea
          rows={4}
          placeholder="Tell us about your group, any special requirements, accessibility needs, or specific preferences..."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className={`${inputCls} resize-none`}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
        />
      </div>
      {status === "error" && (
        <p className="font-body text-[13px] text-red-600">
          Something went wrong. Please try again or call us at 1-800-963-4330.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-[10px] font-body font-semibold text-[15px] text-white py-[15px] rounded-[14px] transition-opacity duration-200 disabled:opacity-70"
        style={{ background: "#5C1828" }}
      >
        {status === "sending" ? (
          "Sending..."
        ) : (
          <><Send size={16} /> Request My Free Quote</>
        )}
      </button>
      <p className="font-body text-[12px] text-warm-mid text-center">
        No payment required. A specialist will contact you within one business hour.
      </p>
    </form>
  );
}

// ── Flight Search ─────────────────────────────────────────────────────────────

function GroupFlightSearch() {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");
  const [results, setResults]     = useState<FlightResult[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [searched, setSearched]   = useState(false);
  const resultsRef                = useRef<HTMLDivElement>(null);

  async function handleSearch(values: SearchValues) {
    if (values.tab !== "flights") return;
    if (!values.origin || !values.destination || !values.departureDate) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res  = await fetch("/api/flights/search", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Search failed: ${res.status}`);
      setResults(data.results ?? []);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ background: "#1A0F0D" }} className="py-[72px] lg:py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

        <div className="text-center mb-[48px]">
          <p className="font-body text-[11px] uppercase tracking-[0.14em] mb-[12px]" style={{ color: "#C9A84C" }}>
            Search Flights
          </p>
          <h2
            className="font-display font-semibold text-white leading-[1.08] mb-[16px]"
            style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
          >
            Find Flights for Your Group
          </h2>
          <p className="font-body text-[16px] leading-[1.75] max-w-[520px] mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Search available flights and continue with our secure booking flow. For groups of 10 or more, call us for exclusive group pricing.
          </p>
        </div>

        <div className="flex justify-center mb-[12px]">
          <PageSearchBox
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="w-full max-w-[900px]"
            onSearch={handleSearch}
          />
        </div>

        <div
          className="mt-[24px] flex flex-col sm:flex-row items-center justify-center gap-[14px] rounded-[16px] px-[24px] py-[18px] text-center"
          style={{ background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.20)" }}
        >
          <Phone size={18} style={{ color: "#C9A84C", flexShrink: 0 }} />
          <p className="font-body text-[14px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.75)" }}>
            <strong style={{ color: "#fff" }}>Need help booking for your group?</strong>{" "}
            Call our travel specialists and we will assist you personally.
          </p>
          <a
            href="tel:1-800-963-4330"
            className="shrink-0 font-body font-semibold text-[13px] px-[18px] py-[9px] rounded-[10px] transition-opacity hover:opacity-90"
            style={{ background: "#C9A84C", color: "#1A0F0D" }}
          >
            1-800-963-4330
          </a>
        </div>

        {/* Results area */}
        <div ref={resultsRef} className="mt-[40px]">
          {loading && (
            <div className="grid gap-[14px]">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[18px] p-[24px] animate-pulse"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <div className="flex items-center gap-[12px] mb-[16px]">
                    <div className="w-[42px] h-[42px] rounded-[12px] shrink-0" style={{ background: "rgba(255,255,255,0.10)" }} />
                    <div className="flex-1 flex flex-col gap-[8px]">
                      <div className="h-[12px] rounded-full w-[35%]" style={{ background: "rgba(255,255,255,0.10)" }} />
                      <div className="h-[10px] rounded-full w-[20%]" style={{ background: "rgba(255,255,255,0.07)" }} />
                    </div>
                  </div>
                  <div className="h-[2px] rounded-full w-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div
              className="rounded-[18px] p-[32px] text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <p className="font-body text-[15px] mb-[16px]" style={{ color: "rgba(255,255,255,0.65)" }}>{error}</p>
              <a
                href="tel:1-800-963-4330"
                className="inline-flex items-center gap-[8px] font-body font-semibold text-[14px] px-[20px] py-[11px] rounded-[12px]"
                style={{ background: "#5C1828", color: "#fff" }}
              >
                <Phone size={14} /> Call 1-800-963-4330
              </a>
            </div>
          )}

          {searched && !loading && !error && results.length === 0 && (
            <div
              className="rounded-[18px] p-[48px] text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <p className="font-display font-medium text-[22px] text-white mb-[10px]">No flights found</p>
              <p className="font-body text-[14px] mb-[20px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                Our agents can find options not listed online. Give us a call and we will sort it out.
              </p>
              <a
                href="tel:1-800-963-4330"
                className="inline-flex items-center gap-[8px] font-body font-semibold text-[14px] px-[20px] py-[11px] rounded-[12px]"
                style={{ background: "#5C1828", color: "#fff" }}
              >
                <Phone size={14} /> Call 1-800-963-4330
              </a>
            </div>
          )}

          {results.length > 0 && !loading && (
            <div className="grid gap-[14px]">
              {results.map((r) => (
                <FlightResultCard key={r.id} result={r} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function GroupTravelClient() {
  const [destTab, setDestTab] = useState<"usa" | "international">("usa");

  return (
    <>

      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "clamp(580px, 80vh, 820px)" }}>
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
          alt="Happy group of travelers"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,4,2,0.56)" }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 35%, rgba(8,3,1,0.60) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 py-[100px] lg:py-[130px]">
          <p
            className="font-body text-[11px] uppercase tracking-[0.20em] mb-[20px]"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Tripile Group Travel
          </p>
          <h1
            className="font-display font-semibold text-white leading-[1.0] tracking-[-0.02em] mb-[22px] max-w-[760px]"
            style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
          >
            Group Travel Made Easy
          </h1>
          <p
            className="font-body leading-[1.78] mb-[36px] max-w-[560px]"
            style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.60)" }}
          >
            Whether you are planning a family vacation, reunion, corporate retreat, church trip, or cruise, our experienced travel advisors handle every detail so your group can travel with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-[12px] mb-[44px]">
            <a
              href="tel:1-800-963-4330"
              className="inline-flex items-center gap-[9px] font-body font-semibold text-[15px] text-white px-[28px] py-[14px] rounded-[14px] transition-opacity hover:opacity-90"
              style={{ background: "#5C1828", boxShadow: "0 4px 20px rgba(92,24,40,0.40)" }}
            >
              <Phone size={16} /> Call a Travel Expert
            </a>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-[9px] font-body font-semibold text-[15px] px-[28px] py-[14px] rounded-[14px] transition-opacity hover:opacity-80"
              style={{ color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)" }}
            >
              Request a Group Quote <ArrowRight size={15} />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-[24px] sm:gap-[36px]">
            {[
              "Dedicated Travel Advisors",
              "Secure Online Payments",
              "Personalized Travel Planning",
              "US Customer Support",
            ].map((t) => (
              <span key={t} className="flex items-center gap-[7px] font-body text-[12px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                <CheckCircle2 size={13} style={{ color: "rgba(255,255,255,0.45)" }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Group Types ── */}
      <section className="py-[80px] lg:py-[110px]" style={{ background: "#FAF7F2" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[56px]">
            <SectionLabel>Types of Group Travel</SectionLabel>
            <SectionHeading>
              We Plan Every Kind of Group Trip
            </SectionHeading>
            <p className="font-body text-[16px] text-warm-mid leading-[1.75] mt-[16px] max-w-[520px] mx-auto">
              From intimate gatherings to large coordinated journeys, our advisors have the experience to manage every detail.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {GROUP_TYPES.map((item) => (
              <GroupTypeCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="py-[80px] lg:py-[110px]" style={{ background: "#fff" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[56px]">
            <SectionLabel>Why Tripile</SectionLabel>
            <SectionHeading>
              Everything Your Group Needs, In One Place
            </SectionHeading>
            <p className="font-body text-[16px] text-warm-mid leading-[1.75] mt-[16px] max-w-[520px] mx-auto">
              Group travel requires a different level of planning. Our dedicated advisors bring the experience to make it seamless.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {WHY_CHOOSE.map((item) => (
              <BenefitCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Process ── */}
      <section className="py-[80px] lg:py-[110px]" style={{ background: "#F5EAED" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[64px]">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>
              From First Call to Final Boarding Pass
            </SectionHeading>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute top-[28px] left-[80px] right-[80px] h-[1px]"
              style={{ background: "#EDE0CC" }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[32px]">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.number} className="flex flex-col items-start lg:items-center gap-[16px]">
                  <div className="relative">
                    <div
                      className="w-[56px] h-[56px] rounded-full flex items-center justify-center font-display font-bold text-[16px]"
                      style={{
                        background: i === 0 ? "#5C1828" : "#fff",
                        color: i === 0 ? "#fff" : "#5C1828",
                        border: "2px solid",
                        borderColor: i === 0 ? "#5C1828" : "#EDE0CC",
                        boxShadow: "0 2px 12px rgba(92,24,40,0.12)",
                      }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="lg:text-center">
                    <p className="font-display font-semibold text-[16px] text-warm-dark mb-[6px]">{step.title}</p>
                    <p className="font-body text-[13px] text-warm-mid leading-[1.70]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px] mt-[56px]">
            <a
              href="tel:1-800-963-4330"
              className="inline-flex items-center gap-[9px] font-body font-semibold text-[14px] text-white px-[24px] py-[13px] rounded-[14px] transition-opacity hover:opacity-90"
              style={{ background: "#5C1828" }}
            >
              <Phone size={15} /> Call 1-800-963-4330 to Start
            </a>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-[9px] font-body font-semibold text-[14px] px-[24px] py-[13px] rounded-[14px] transition-opacity hover:opacity-80"
              style={{ color: "#5C1828", border: "1.5px solid rgba(92,24,40,0.25)", background: "transparent" }}
            >
              Or request a quote <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="py-[80px] lg:py-[110px]" style={{ background: "#FAF7F2" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[48px]">
            <SectionLabel>Popular Destinations</SectionLabel>
            <SectionHeading>
              Where Will Your Group Go?
            </SectionHeading>
            <p className="font-body text-[16px] text-warm-mid leading-[1.75] mt-[16px] max-w-[480px] mx-auto">
              From domestic favorites to international bucket-list destinations, we handle the details wherever you are headed.
            </p>
          </div>

          <div className="flex items-center justify-center gap-[8px] mb-[40px]">
            {(["usa", "international"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setDestTab(tab)}
                className="font-body font-semibold text-[13px] px-[20px] py-[9px] rounded-full transition-all duration-200"
                style={{
                  background: destTab === tab ? "#5C1828" : "#fff",
                  color: destTab === tab ? "#fff" : "#6B5244",
                  border: `1.5px solid ${destTab === tab ? "#5C1828" : "#EDE0CC"}`,
                }}
              >
                {tab === "usa" ? "United States" : "International"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {(destTab === "usa" ? USA_DESTINATIONS : INTL_DESTINATIONS).map((d) => (
              <DestinationCard key={d.name} {...d} />
            ))}
          </div>

          <p className="text-center font-body text-[13px] text-warm-mid mt-[28px]">
            Don&rsquo;t see your destination?{" "}
            <a href="tel:1-800-963-4330" className="font-semibold" style={{ color: "#5C1828" }}>
              Call us
            </a>{" "}
            and we will find the right option for your group.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-[80px] lg:py-[100px]" style={{ background: "#fff" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[52px]">
            <SectionLabel>Featured Services</SectionLabel>
            <SectionHeading>
              Everything Your Group Needs to Travel
            </SectionHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Flight Search ── */}
      <GroupFlightSearch />

      {/* ── Quote Form ── */}
      <section id="quote-form" className="py-[80px] lg:py-[110px]" style={{ background: "#FAF7F2" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-[1fr_480px] gap-[56px] lg:gap-[80px] items-start">

            <div>
              <SectionLabel>Request a Quote</SectionLabel>
              <SectionHeading>
                Tell Us About Your Group Trip
              </SectionHeading>
              <p className="font-body text-[16px] text-warm-mid leading-[1.75] mt-[16px] mb-[36px] max-w-[480px]">
                Fill out the form and a dedicated travel specialist will contact you within one business hour with a personalized quote.
              </p>

              <div className="flex flex-col gap-[20px]">
                {[
                  { icon: UserCheck, text: "No obligation. No credit card required to request a quote." },
                  { icon: CreditCard, text: "Secure Stripe-powered payment when you are ready to confirm." },
                  { icon: Headphones, text: "Your coordinator is reachable by phone throughout your trip." },
                  { icon: Shield, text: "BBB A+ accredited with over 2,100 verified five-star reviews." },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-[14px]">
                    <div
                      className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: "#F5EAED" }}
                    >
                      <Icon size={18} style={{ color: "#5C1828" }} />
                    </div>
                    <p className="font-body text-[14px] text-warm-mid leading-[1.70] pt-[10px]">{text}</p>
                  </div>
                ))}
              </div>

              <div
                className="mt-[44px] p-[28px] rounded-[20px]"
                style={{ background: "#5C1828" }}
              >
                <p className="font-body font-semibold text-[13px] uppercase tracking-[0.10em] mb-[8px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Prefer to call?
                </p>
                <p className="font-display font-semibold text-[28px] text-white mb-[4px]">1-800-963-4330</p>
                <p className="font-body text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Monday through Saturday, 8am to 9pm Eastern
                </p>
              </div>
            </div>

            <div
              className="rounded-[24px] p-[36px] sm:p-[40px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 4px 32px rgba(26,15,13,0.07)" }}
            >
              <p className="font-display font-semibold text-[22px] text-warm-dark mb-[28px]">
                Request My Free Quote
              </p>
              <QuoteForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-[80px] lg:py-[110px]" style={{ background: "#fff" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[56px]">
            <SectionLabel>Testimonials</SectionLabel>
            <SectionHeading>
              Trusted by Groups Across America
            </SectionHeading>
            <p className="font-body text-[16px] text-warm-mid leading-[1.75] mt-[16px] max-w-[440px] mx-auto">
              Real stories from real travelers who let us handle the details so they could enjoy every moment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-[6px] mt-[36px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="#C9A84C" style={{ color: "#C9A84C" }} />
            ))}
            <span className="font-body text-[13px] text-warm-mid ml-[8px]">
              <strong className="text-warm-dark">4.53</strong> from 2,100+ verified reviews
            </span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[80px] lg:py-[100px]" style={{ background: "#FAF7F2" }}>
        <div className="max-w-[860px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-[52px]">
            <SectionLabel>Frequently Asked Questions</SectionLabel>
            <SectionHeading>
              Answers for Group Organizers
            </SectionHeading>
          </div>
          <div style={{ borderTop: "1px solid #EDE0CC" }}>
            {FAQS.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
          <p className="text-center font-body text-[14px] text-warm-mid mt-[36px]">
            Have another question?{" "}
            <a href="tel:1-800-963-4330" className="font-semibold" style={{ color: "#5C1828" }}>
              Call us at 1-800-963-4330
            </a>
            {" "}and a specialist will answer right away.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="py-[90px] lg:py-[120px] text-center"
        style={{ background: "#1A0F0D" }}
      >
        <div className="max-w-[680px] mx-auto px-6">
          <p className="font-body text-[11px] uppercase tracking-[0.18em] mb-[16px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Ready to Travel Together
          </p>
          <h2
            className="font-display font-semibold text-white leading-[1.06] tracking-[-0.01em] mb-[18px]"
            style={{ fontSize: "clamp(30px, 5vw, 58px)" }}
          >
            Planning Your Next Group Adventure?
          </h2>
          <p
            className="font-body leading-[1.78] mb-[40px] max-w-[460px] mx-auto"
            style={{ fontSize: "17px", color: "rgba(255,255,255,0.50)" }}
          >
            Speak with a Tripile travel specialist today and let us take care of every detail, from first call to final destination.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-[14px]">
            <a
              href="tel:1-800-963-4330"
              className="inline-flex items-center gap-[10px] font-body font-semibold text-[15px] text-white px-[28px] py-[15px] rounded-[14px] transition-opacity hover:opacity-90"
              style={{ background: "#5C1828", boxShadow: "0 4px 24px rgba(92,24,40,0.45)" }}
            >
              <Phone size={17} /> Call Now
            </a>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-[10px] font-body font-semibold text-[15px] px-[28px] py-[15px] rounded-[14px] transition-opacity hover:opacity-80"
              style={{ color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)" }}
            >
              Request Quote <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
