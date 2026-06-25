"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plane, Phone, X, Construction, TrendingUp, DollarSign,
  Sparkles, Heart, Zap, Clock, ArrowRight, CheckCircle,
} from "lucide-react";
import type { DealResult } from "@/app/api/flights/deals/route";

// ── Constants ─────────────────────────────────────────────────────────────────

const PHONE = "1-800-963-4330";

type CabinType = "economy" | "premium_economy" | "business" | "first";

interface DealQuery {
  origin: string;
  destination: string;
  daysOut: number;
  cabin: CabinType;
  category: string;
  routeLabel: string;
}

const DEAL_CATEGORIES: {
  id: string;
  title: string;
  subtitle: string;
  Icon: React.ElementType;
  accentColor: string;
  queries: DealQuery[];
}[] = [
  {
    id: "popular",
    title: "Most Popular Routes",
    subtitle: "Thousands of Tripile travelers fly these every week",
    Icon: TrendingUp,
    accentColor: "#5C1828",
    queries: [
      { origin: "JFK", destination: "LAX", daysOut: 35, cabin: "economy",  category: "popular", routeLabel: "New York → Los Angeles"  },
      { origin: "ORD", destination: "MIA", daysOut: 35, cabin: "economy",  category: "popular", routeLabel: "Chicago → Miami"           },
      { origin: "LAX", destination: "NRT", daysOut: 45, cabin: "economy",  category: "popular", routeLabel: "Los Angeles → Tokyo"       },
      { origin: "JFK", destination: "LHR", daysOut: 40, cabin: "economy",  category: "popular", routeLabel: "New York → London"         },
    ],
  },
  {
    id: "budget",
    title: "Budget Deals",
    subtitle: "Maximum value, minimum spend — economy done right",
    Icon: DollarSign,
    accentColor: "#2D6A4F",
    queries: [
      { origin: "JFK", destination: "MCO", daysOut: 30, cabin: "economy",  category: "budget",  routeLabel: "New York → Orlando"        },
      { origin: "ORD", destination: "DEN", daysOut: 28, cabin: "economy",  category: "budget",  routeLabel: "Chicago → Denver"          },
      { origin: "ATL", destination: "BOS", daysOut: 32, cabin: "economy",  category: "budget",  routeLabel: "Atlanta → Boston"          },
      { origin: "LAX", destination: "LAS", daysOut: 14, cabin: "economy",  category: "budget",  routeLabel: "Los Angeles → Las Vegas"   },
    ],
  },
  {
    id: "luxury",
    title: "Business & First Class",
    subtitle: "Premium cabins at the best rates we could find today",
    Icon: Sparkles,
    accentColor: "#C9A84C",
    queries: [
      { origin: "JFK", destination: "CDG", daysOut: 45, cabin: "business", category: "luxury",  routeLabel: "New York → Paris"          },
      { origin: "LAX", destination: "NRT", daysOut: 50, cabin: "business", category: "luxury",  routeLabel: "Los Angeles → Tokyo"       },
      { origin: "JFK", destination: "DXB", daysOut: 42, cabin: "business", category: "luxury",  routeLabel: "New York → Dubai"          },
      { origin: "ORD", destination: "LHR", daysOut: 48, cabin: "business", category: "luxury",  routeLabel: "Chicago → London"          },
    ],
  },
  {
    id: "senior",
    title: "Senior Favorites",
    subtitle: "Top routes chosen by our 60+ traveling community",
    Icon: Heart,
    accentColor: "#8B2A3F",
    queries: [
      { origin: "ORD", destination: "PHX", daysOut: 35, cabin: "economy",  category: "senior",  routeLabel: "Chicago → Phoenix"         },
      { origin: "JFK", destination: "TPA", daysOut: 38, cabin: "economy",  category: "senior",  routeLabel: "New York → Tampa"          },
      { origin: "LAX", destination: "HNL", daysOut: 42, cabin: "economy",  category: "senior",  routeLabel: "Los Angeles → Hawaii"      },
      { origin: "ORD", destination: "FLL", daysOut: 36, cabin: "economy",  category: "senior",  routeLabel: "Chicago → Fort Lauderdale" },
    ],
  },
  {
    id: "weekend",
    title: "Weekend Escapes",
    subtitle: "Short getaways departing in the next two weeks",
    Icon: Zap,
    accentColor: "#5C1828",
    queries: [
      { origin: "JFK", destination: "BOS", daysOut: 10, cabin: "economy",  category: "weekend", routeLabel: "New York → Boston"         },
      { origin: "LAX", destination: "SFO", daysOut: 8,  cabin: "economy",  category: "weekend", routeLabel: "Los Angeles → San Francisco"},
      { origin: "ORD", destination: "MSP", daysOut: 9,  cabin: "economy",  category: "weekend", routeLabel: "Chicago → Minneapolis"     },
      { origin: "DFW", destination: "MIA", daysOut: 11, cabin: "economy",  category: "weekend", routeLabel: "Dallas → Miami"            },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function cabinLabel(raw: string): string {
  const map: Record<string, string> = {
    economy: "Economy", premium_economy: "Premium Economy",
    business: "Business", first: "First Class",
  };
  return map[raw.toLowerCase()] ?? raw;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function DealSkeleton() {
  return (
    <div
      className="shrink-0 w-[280px] sm:w-[300px] rounded-[18px] overflow-hidden animate-pulse"
      style={{ background: "#FAF7F2", border: "1px solid #EDE0CC", boxShadow: "0 2px 16px rgba(26,15,13,0.06)" }}
    >
      <div className="p-[20px] flex flex-col gap-[14px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[36px] h-[36px] rounded-[10px]" style={{ background: "#EDE0CC" }} />
          <div className="flex-1 flex flex-col gap-[6px]">
            <div className="h-[11px] rounded-full w-[55%]" style={{ background: "#EDE0CC" }} />
            <div className="h-[9px] rounded-full w-[30%]"  style={{ background: "#F5EAED" }} />
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="h-[30px] w-[48px] rounded-[6px]" style={{ background: "#EDE0CC" }} />
          <div className="flex-1 h-[2px] rounded-full"      style={{ background: "#EDE0CC" }} />
          <div className="h-[30px] w-[48px] rounded-[6px]" style={{ background: "#EDE0CC" }} />
        </div>
        <div className="flex gap-[6px]">
          <div className="h-[22px] w-[80px] rounded-full"  style={{ background: "#F5EAED" }} />
          <div className="h-[22px] w-[60px] rounded-full"  style={{ background: "#F5EAED" }} />
        </div>
        <div className="h-[1px] w-full"                    style={{ background: "#EDE0CC" }} />
        <div className="flex items-center justify-between">
          <div className="h-[26px] w-[80px] rounded-[6px]" style={{ background: "#EDE0CC" }} />
          <div className="flex gap-[8px]">
            <div className="h-[34px] w-[68px] rounded-full" style={{ background: "#EDE0CC" }} />
            <div className="h-[34px] w-[56px] rounded-full" style={{ background: "#F5EAED" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Booking Modal ─────────────────────────────────────────────────────────────

function DealModal({ deal, mode, onClose }: { deal: DealResult; mode: "book" | "call"; onClose: () => void }) {
  const initials = deal.airline.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const stopsLabel = deal.stops === 0 ? "Nonstop" : deal.stops === 1 ? "1 stop" : `${deal.stops} stops`;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(10,4,2,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-[500px] rounded-t-[28px] sm:rounded-[24px] overflow-hidden"
        style={{
          background: "#FAF7F2",
          boxShadow: "0 24px 80px rgba(10,4,2,0.30)",
          maxHeight: "92dvh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[14px] right-[14px] z-10 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <X size={15} style={{ color: "rgba(255,255,255,0.80)" }} />
        </button>

        {/* ── Dark header ── */}
        <div
          className="px-[24px] pt-[28px] pb-[24px]"
          style={{ background: "linear-gradient(135deg, #1A0F0D 0%, #3a1320 100%)" }}
        >
          {/* Airline row */}
          <div className="flex items-center gap-[14px] mb-[24px]">
            {deal.logoUrl ? (
              <div
                className="w-[48px] h-[48px] rounded-[13px] flex items-center justify-center shrink-0 p-[7px]"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={deal.logoUrl} alt={deal.airline} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div
                className="w-[48px] h-[48px] rounded-[13px] flex items-center justify-center shrink-0"
                style={{ background: "rgba(201,168,76,0.18)", border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <span className="font-body font-bold text-[15px]" style={{ color: "#C9A84C" }}>{initials}</span>
              </div>
            )}
            <div>
              <p className="font-body font-semibold text-[14px]" style={{ color: "rgba(255,255,255,0.90)" }}>
                {deal.airline}
              </p>
              {deal.flightNumber && (
                <p className="font-body text-[11px] mt-[2px]" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {deal.flightNumber}
                </p>
              )}
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-[16px] mb-[20px]">
            <div className="text-center">
              <p className="font-body font-bold text-[28px] leading-none tracking-[-0.02em]" style={{ color: "#fff" }}>
                {deal.origin}
              </p>
              <p className="font-body text-[11px] mt-[5px] truncate max-w-[90px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {deal.originCity}
              </p>
              <p className="font-body text-[13px] font-semibold mt-[4px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                {deal.departureTime}
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-[4px]">
              <div className="w-full flex items-center gap-[6px]">
                <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.18)" }} />
                <Plane size={14} style={{ color: "rgba(255,255,255,0.50)", transform: "rotate(90deg) scaleX(-1) translateX(-1px)" }} />
                <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.18)" }} />
              </div>
              <p className="font-body text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                {deal.duration} · {stopsLabel}
              </p>
            </div>
            <div className="text-center">
              <p className="font-body font-bold text-[28px] leading-none tracking-[-0.02em]" style={{ color: "#fff" }}>
                {deal.destination}
              </p>
              <p className="font-body text-[11px] mt-[5px] truncate max-w-[90px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                {deal.destinationCity}
              </p>
              <p className="font-body text-[13px] font-semibold mt-[4px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                {deal.arrivalTime}
              </p>
            </div>
          </div>

          {/* Date + cabin pills */}
          <div className="flex flex-wrap gap-[8px]">
            <span
              className="font-body text-[11px] px-[10px] py-[4px] rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {fmtDate(deal.departureDate)}
            </span>
            <span
              className="font-body text-[11px] px-[10px] py-[4px] rounded-full"
              style={{ background: "rgba(201,168,76,0.14)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.22)" }}
            >
              {cabinLabel(deal.cabin)}
            </span>
            <span
              className="font-body text-[11px] px-[10px] py-[4px] rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              {stopsLabel}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-[24px] py-[22px] flex flex-col gap-[16px]">
          {/* Price */}
          <div
            className="flex items-center justify-between px-[18px] py-[14px] rounded-[14px]"
            style={{ background: "#F5EAED", border: "1px solid #EDE0CC" }}
          >
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.10em]" style={{ color: "#A89282" }}>
                From
              </p>
              <p className="font-body font-bold text-[28px] leading-none tracking-[-0.02em] mt-[3px]" style={{ color: "#5C1828" }}>
                ${deal.price.toLocaleString()}
              </p>
              <p className="font-body text-[11px] mt-[4px]" style={{ color: "#A89282" }}>
                Per person · taxes included
              </p>
            </div>
            <CheckCircle size={28} style={{ color: "#5C1828", opacity: 0.25 }} />
          </div>

          {/* WIP notice (book mode only) */}
          {mode === "book" && (
            <div
              className="flex items-start gap-[12px] px-[16px] py-[13px] rounded-[12px]"
              style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.20)" }}
            >
              <Construction size={16} style={{ color: "#C9A84C", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p className="font-body font-semibold text-[13px]" style={{ color: "#6B5244" }}>
                  Online booking coming soon
                </p>
                <p className="font-body text-[12px] mt-[2px]" style={{ color: "#A89282" }}>
                  Call our agents to lock in this price right now.
                </p>
              </div>
            </div>
          )}

          {/* Call CTA */}
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-[10px] w-full py-[15px] rounded-[14px] font-body font-semibold text-[15px] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", color: "#fff", boxShadow: "0 4px 18px rgba(92,24,40,0.30)" }}
          >
            <Phone size={16} />
            Call {PHONE}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="font-body text-[13px] text-center transition-colors hover:opacity-70"
            style={{ color: "#A89282" }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Deal Card ─────────────────────────────────────────────────────────────────

function DealCard({ deal, accentColor }: { deal: DealResult; accentColor: string }) {
  const [modal, setModal] = useState<"book" | "call" | null>(null);

  const initials   = deal.airline.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const stopsLabel = deal.stops === 0 ? "Nonstop" : deal.stops === 1 ? "1 stop" : `${deal.stops} stops`;
  const isLuxury   = ["business", "first"].includes(deal.cabin.toLowerCase());

  return (
    <>
      <div
        className="shrink-0 w-[280px] sm:w-[300px] rounded-[18px] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-[2px]"
        style={{
          background: "#FAF7F2",
          border: "1px solid #EDE0CC",
          boxShadow: "0 2px 16px rgba(26,15,13,0.06)",
        }}
      >
        {/* ── Card header ── */}
        <div
          className="px-[16px] pt-[14px] pb-[12px] flex items-center gap-[10px]"
          style={{ borderBottom: "1px solid #EDE0CC" }}
        >
          {deal.logoUrl ? (
            <div
              className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 p-[5px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={deal.logoUrl} alt={deal.airline} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div
              className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0"
              style={{ background: isLuxury ? "rgba(201,168,76,0.12)" : "#F5EAED", border: "1px solid #EDE0CC" }}
            >
              <span className="font-body font-bold text-[11px]" style={{ color: isLuxury ? "#C9A84C" : "#5C1828" }}>
                {initials}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-body text-[12px] font-semibold truncate" style={{ color: "#1A0F0D" }}>
              {deal.airline}
            </p>
            {deal.flightNumber && (
              <p className="font-body text-[10px]" style={{ color: "#A89282" }}>
                {deal.flightNumber}
              </p>
            )}
          </div>
          {isLuxury && (
            <span
              className="font-body text-[10px] font-semibold px-[8px] py-[3px] rounded-full shrink-0"
              style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.22)" }}
            >
              {cabinLabel(deal.cabin)}
            </span>
          )}
        </div>

        {/* ── Route ── */}
        <div className="px-[16px] pt-[16px] pb-[14px]">
          <div className="flex items-center gap-[8px] mb-[8px]">
            <div className="flex flex-col items-center">
              <span className="font-body font-bold text-[22px] leading-none tracking-[-0.01em]" style={{ color: "#1A0F0D" }}>
                {deal.origin}
              </span>
              <span className="font-body text-[10px] mt-[3px]" style={{ color: "#A89282" }}>
                {deal.originCity}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-[3px]">
              <div className="w-full flex items-center gap-[4px]">
                <div className="flex-1 h-[1px]" style={{ background: "#EDE0CC" }} />
                <Plane size={11} style={{ color: accentColor, transform: "rotate(90deg) scaleX(-1)" }} />
                <div className="flex-1 h-[1px]" style={{ background: "#EDE0CC" }} />
              </div>
              <span className="font-body text-[9px]" style={{ color: "#A89282" }}>
                {deal.duration} · {stopsLabel}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-body font-bold text-[22px] leading-none tracking-[-0.01em]" style={{ color: "#1A0F0D" }}>
                {deal.destination}
              </span>
              <span className="font-body text-[10px] mt-[3px]" style={{ color: "#A89282" }}>
                {deal.destinationCity}
              </span>
            </div>
          </div>

          {/* Time row */}
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] font-medium" style={{ color: "#6B5244" }}>
              {deal.departureTime}
            </span>
            {!isLuxury && (
              <span
                className="font-body text-[10px] px-[7px] py-[2px] rounded-full"
                style={{ background: "#F5EAED", color: "#8B2A3F" }}
              >
                Economy
              </span>
            )}
            <span className="font-body text-[12px] font-medium" style={{ color: "#6B5244" }}>
              {deal.arrivalTime}
            </span>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="px-[16px] pt-[12px] pb-[14px] mt-auto flex items-center justify-between"
          style={{ borderTop: "1px solid #EDE0CC" }}
        >
          <div>
            <p
              className="font-body font-bold text-[20px] leading-none tracking-[-0.02em]"
              style={{ color: accentColor }}
            >
              ${deal.price.toLocaleString()}
            </p>
            <p className="font-body text-[10px] mt-[3px]" style={{ color: "#A89282" }}>
              {fmtDate(deal.departureDate)}
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <button
              type="button"
              onClick={() => setModal("call")}
              className="flex items-center gap-[5px] px-[10px] py-[7px] rounded-full font-body text-[11px] font-medium transition-all duration-150 hover:opacity-80"
              style={{ background: "#F5EAED", color: "#5C1828", border: "1px solid #EDE0CC" }}
            >
              <Phone size={11} />
              Call
            </button>
            <button
              type="button"
              onClick={() => setModal("book")}
              className="flex items-center gap-[5px] px-[12px] py-[7px] rounded-full font-body text-[11px] font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", color: "#fff", boxShadow: "0 3px 10px rgba(92,24,40,0.28)" }}
            >
              Book
              <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>

      {modal && <DealModal deal={deal} mode={modal} onClose={() => setModal(null)} />}
    </>
  );
}

// ── Category Section ──────────────────────────────────────────────────────────

function CategorySection({
  category, deals, loading,
}: {
  category: (typeof DEAL_CATEGORIES)[number];
  deals: DealResult[];
  loading: boolean;
}) {
  const { Icon, accentColor, title, subtitle, queries } = category;
  const catDeals = deals.filter((d) => d.category === category.id);

  return (
    <section id={category.id} className="py-[48px] sm:py-[64px]">
      <div className="max-w-[1200px] mx-auto px-[20px] sm:px-[40px]">
        {/* Section header */}
        <div className="flex items-start gap-[14px] mb-[28px]">
          <div
            className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 mt-[2px]"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}28` }}
          >
            <Icon size={20} style={{ color: accentColor }} />
          </div>
          <div>
            <h2
              className="font-display font-semibold text-[26px] sm:text-[30px] leading-none"
              style={{ color: "#1A0F0D" }}
            >
              {title}
            </h2>
            <p className="font-body text-[14px] mt-[6px]" style={{ color: "#6B5244" }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Cards — horizontal scroll */}
        <div className="flex gap-[14px] overflow-x-auto pb-[8px] snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {loading
            ? queries.map((_, i) => <DealSkeleton key={i} />)
            : catDeals.length > 0
            ? catDeals.map((deal, i) => (
                <div key={i} className="snap-start">
                  <DealCard deal={deal} accentColor={accentColor} />
                </div>
              ))
            : (
              <div
                className="w-full min-h-[140px] rounded-[18px] flex items-center justify-center"
                style={{ background: "#F5EAED", border: "1px dashed #EDE0CC" }}
              >
                <div className="text-center">
                  <p className="font-display font-medium text-[18px]" style={{ color: "#A89282" }}>
                    No deals found right now
                  </p>
                  <p className="font-body text-[13px] mt-[4px]" style={{ color: "#A89282" }}>
                    Call us and we will find you a great rate
                  </p>
                  <a
                    href={`tel:${PHONE}`}
                    className="inline-flex items-center gap-[6px] mt-[12px] px-[16px] py-[8px] rounded-full font-body text-[13px] font-semibold transition-opacity hover:opacity-80"
                    style={{ background: "#5C1828", color: "#fff" }}
                  >
                    <Phone size={13} /> {PHONE}
                  </a>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function DealsClient() {
  const [deals, setDeals]     = useState<DealResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [activeId, setActiveId] = useState("popular");
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const queries: DealQuery[] = DEAL_CATEGORIES.flatMap((c) => c.queries);

    fetch("/api/flights/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queries }),
    })
      .then((r) => r.json())
      .then((data) => {
        setDeals(data.deals ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Sync active category with scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    for (const cat of DEAL_CATEGORIES) {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>
      {/* ── Hero ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "400px", background: "linear-gradient(160deg, #1A0F0D 0%, #3a1320 50%, #1A0F0D 100%)" }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,15,13,0.30) 0%, rgba(26,15,13,0.85) 100%)" }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-[20px] sm:px-[40px] pt-[120px] pb-[64px]">
          {/* Live badge */}
          <div className="flex items-center gap-[8px] mb-[20px]">
            <span
              className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full font-body text-[11px] font-semibold uppercase tracking-[0.08em]"
              style={{ background: "rgba(201,168,76,0.16)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.28)" }}
            >
              <span className="w-[6px] h-[6px] rounded-full animate-pulse" style={{ background: "#C9A84C" }} />
              Live Prices
            </span>
            <span className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Updated just now from Duffel
            </span>
          </div>

          <h1
            className="font-display font-semibold text-[42px] sm:text-[58px] leading-[1.08] mb-[16px]"
            style={{ color: "#fff" }}
          >
            Exclusive Flight
            <br />
            <span style={{ color: "#C9A84C" }}>Deals</span>
          </h1>
          <p className="font-body text-[16px] sm:text-[17px] max-w-[520px] mb-[28px]" style={{ color: "rgba(255,255,255,0.60)" }}>
            Real-time fares across 20+ handpicked routes. Budget escapes, luxury business class, senior getaways, and more.
          </p>

          <div className="flex flex-wrap items-center gap-[10px]">
            {[
              { icon: DollarSign, label: "Best prices guaranteed" },
              { icon: Phone,      label: "Agent booked in minutes"  },
              { icon: Clock,      label: "24/7 support"             },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-[7px] px-[12px] py-[7px] rounded-full font-body text-[12px]"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <Icon size={12} style={{ color: "rgba(255,255,255,0.50)" }} />
                {label}
              </div>
            ))}
          </div>

          {error && (
            <div
              className="mt-[20px] inline-flex items-center gap-[8px] px-[14px] py-[10px] rounded-[10px] font-body text-[13px]"
              style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.20)" }}
            >
              Could not load live prices. Call us at {PHONE} for current deals.
            </div>
          )}
        </div>
      </div>

      {/* ── Sticky category nav ── */}
      <div
        className="sticky top-[72px] z-40 border-b overflow-x-auto"
        style={{
          background: "rgba(250,247,242,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "#EDE0CC",
          scrollbarWidth: "none",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-[16px] sm:px-[40px]">
          <div className="flex items-center gap-[4px] py-[10px]">
            {DEAL_CATEGORIES.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollTo(cat.id)}
                  className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-full font-body text-[12px] font-medium whitespace-nowrap transition-all duration-150 shrink-0"
                  style={{
                    background: isActive ? "#5C1828"                    : "transparent",
                    color:      isActive ? "#fff"                       : "#6B5244",
                    border:     isActive ? "1px solid #5C1828"          : "1px solid transparent",
                  }}
                >
                  <cat.Icon size={12} style={{ color: isActive ? "#fff" : cat.accentColor }} />
                  {cat.title.split(" ")[0]}{" "}
                  {cat.title.split(" ").length > 1 ? cat.title.split(" ")[1] : ""}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Deal sections ── */}
      <div>
        {DEAL_CATEGORIES.map((cat, i) => (
          <div
            key={cat.id}
            style={{ background: i % 2 === 0 ? "#FAF7F2" : "#fff" }}
          >
            <CategorySection category={cat} deals={deals} loading={loading} />
          </div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div
        className="py-[56px]"
        style={{ background: "linear-gradient(135deg, #1A0F0D 0%, #3a1320 100%)" }}
      >
        <div className="max-w-[600px] mx-auto px-[20px] text-center">
          <h2 className="font-display font-semibold text-[30px] sm:text-[36px] mb-[12px]" style={{ color: "#fff" }}>
            Don&apos;t see what you need?
          </h2>
          <p className="font-body text-[15px] mb-[28px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            Our agents search every airline and have access to unpublished fares not shown online.
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-[10px] px-[28px] py-[15px] rounded-full font-body font-semibold text-[15px] transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", color: "#fff", boxShadow: "0 6px 24px rgba(92,24,40,0.40)" }}
          >
            <Phone size={17} />
            Call {PHONE}
          </a>
          <p className="font-body text-[12px] mt-[14px]" style={{ color: "rgba(255,255,255,0.30)" }}>
            Available 24/7 · No hold music · Real humans
          </p>
        </div>
      </div>
    </div>
  );
}
