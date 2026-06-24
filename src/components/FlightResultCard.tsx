"use client";

import { useState } from "react";
import { Phone, Plane, BaggageClaim, Luggage, X, ArrowRight, Clock, Armchair, Construction } from "lucide-react";
import Button from "@/components/ui/Button";

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  originCity?: string;
  destinationCity?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  cabin: string;
  price: number;
  currency: string;
  logoUrl?: string | null;
  baggageIncluded?: boolean;
}

const PHONE = "1-800-963-4330";

// ── Booking Modal ─────────────────────────────────────────────────────────────

function BookingModal({ result, onClose }: { result: FlightResult; onClose: () => void }) {
  const {
    airline, flightNumber, origin, destination,
    originCity, destinationCity,
    departureTime, arrivalTime, duration, stops, cabin,
    price, logoUrl, baggageIncluded,
  } = result;

  const initials  = airline.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const stopsLabel = stops === 0 ? "Non-stop" : stops === 1 ? "1 stop" : `${stops} stops`;
  const isNonStop  = stops === 0;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(10,4,2,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Sheet / Modal */}
      <div
        className="relative w-full sm:max-w-[520px] rounded-t-[28px] sm:rounded-[24px] overflow-hidden"
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
          className="absolute top-[16px] right-[16px] z-10 w-[34px] h-[34px] rounded-full flex items-center justify-center transition-colors hover:bg-black/8"
          style={{ background: "rgba(0,0,0,0.06)" }}
        >
          <X size={16} style={{ color: "#6B5244" }} />
        </button>

        {/* ── Header band ── */}
        <div
          className="px-[24px] pt-[28px] pb-[24px]"
          style={{ background: "linear-gradient(135deg, #1A0F0D 0%, #3a1320 100%)" }}
        >
          {/* Airline row */}
          <div className="flex items-center gap-[14px] mb-[24px]">
            {logoUrl ? (
              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0 p-[8px]"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt={airline}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = "none";
                    el.parentElement!.innerHTML =
                      `<span style="font-family:serif;font-weight:700;font-size:18px;color:#C9A84C">${initials}</span>`;
                  }}
                />
              </div>
            ) : (
              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0 font-display font-bold text-[18px]"
                style={{ background: "rgba(255,255,255,0.10)", color: "#C9A84C", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                {initials}
              </div>
            )}
            <div>
              <p className="font-body font-semibold text-[16px] text-white leading-none">{airline}</p>
              <p className="font-body text-[13px] mt-[4px]" style={{ color: "rgba(255,255,255,0.50)" }}>
                {flightNumber} &middot; {cabin}
              </p>
            </div>
            {isNonStop && (
              <span
                className="ml-auto font-body text-[10px] font-semibold uppercase tracking-[0.07em] px-[10px] py-[4px] rounded-full"
                style={{ background: "rgba(92,24,40,0.6)", color: "#F5EAED", border: "1px solid rgba(245,234,237,0.2)" }}
              >
                Non-stop
              </span>
            )}
          </div>

          {/* Route display */}
          <div className="flex items-center gap-[12px]">
            {/* Origin */}
            <div className="flex-1">
              <p className="font-body font-semibold text-[28px] text-white leading-none tracking-[-0.02em]">
                {origin}
              </p>
              <p className="font-body text-[13px] mt-[4px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                {departureTime}
              </p>
              {originCity && (
                <p className="font-body text-[12px] mt-[2px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {originCity}
                </p>
              )}
            </div>

            {/* Middle */}
            <div className="flex flex-col items-center gap-[6px] shrink-0">
              <p className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.40)" }}>{duration}</p>
              <div className="flex items-center gap-[6px]">
                <div className="w-[32px] h-[1px]" style={{ background: "rgba(255,255,255,0.20)" }} />
                <div
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                  style={{ background: "rgba(92,24,40,0.5)", border: "1px solid rgba(245,234,237,0.25)" }}
                >
                  <Plane size={12} style={{ color: "#F5EAED" }} />
                </div>
                <div className="w-[32px] h-[1px]" style={{ background: "rgba(255,255,255,0.20)" }} />
              </div>
              <p
                className="font-body text-[11px] font-medium"
                style={{ color: isNonStop ? "#C9A84C" : "rgba(255,255,255,0.40)" }}
              >
                {stopsLabel}
              </p>
            </div>

            {/* Destination */}
            <div className="flex-1 text-right">
              <p className="font-body font-semibold text-[28px] text-white leading-none tracking-[-0.02em]">
                {destination}
              </p>
              <p className="font-body text-[13px] mt-[4px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                {arrivalTime}
              </p>
              {destinationCity && (
                <p className="font-body text-[12px] mt-[2px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {destinationCity}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Details section ── */}
        <div className="px-[24px] py-[20px] flex flex-col gap-[12px]">

          {/* Info pills */}
          <div className="flex flex-wrap gap-[8px]">
            <div
              className="flex items-center gap-[7px] px-[12px] py-[8px] rounded-[10px] font-body text-[13px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#6B5244" }}
            >
              <Clock size={13} style={{ color: "#A89282" }} />
              {duration} flight
            </div>
            <div
              className="flex items-center gap-[7px] px-[12px] py-[8px] rounded-[10px] font-body text-[13px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#6B5244" }}
            >
              <Armchair size={13} style={{ color: "#A89282" }} />
              {cabin}
            </div>
            <div
              className="flex items-center gap-[7px] px-[12px] py-[8px] rounded-[10px] font-body text-[13px]"
              style={{
                background: baggageIncluded ? "#F5EAED" : "#fff",
                border: `1px solid ${baggageIncluded ? "#5C1828" : "#EDE0CC"}`,
                color: baggageIncluded ? "#5C1828" : "#A89282",
              }}
            >
              <BaggageClaim size={13} />
              {baggageIncluded ? "Checked bag included" : "No checked bag"}
            </div>
            <div
              className="flex items-center gap-[7px] px-[12px] py-[8px] rounded-[10px] font-body text-[13px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#6B5244" }}
            >
              <Luggage size={13} style={{ color: "#A89282" }} />
              Carry-on included
            </div>
          </div>

          {/* Price */}
          <div
            className="flex items-center justify-between px-[16px] py-[14px] rounded-[14px]"
            style={{ background: "#fff", border: "1px solid #EDE0CC" }}
          >
            <div>
              <p className="font-body text-[12px] text-warm-mid mb-[2px]">Total per person</p>
              <p className="font-body font-semibold text-[26px] text-burg-deep leading-none tracking-[-0.02em]">
                ${price.toLocaleString()}
              </p>
            </div>
            <span
              className="font-body text-[11px] uppercase tracking-[0.06em] px-[10px] py-[4px] rounded-full"
              style={{ background: "#F5EAED", color: "#5C1828" }}
            >
              Taxes included
            </span>
          </div>

          {/* WIP notice */}
          <div
            className="flex items-start gap-[12px] px-[16px] py-[14px] rounded-[14px]"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <Construction size={16} style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-body font-semibold text-[13px]" style={{ color: "#6B5244" }}>
                Online booking coming soon
              </p>
              <p className="font-body text-[12px] mt-[2px] leading-[1.6]" style={{ color: "#A89282" }}>
                We&apos;re still building the checkout flow. In the meantime, our agents can hold and book
                this exact fare for you over the phone - often with better deals.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA footer ── */}
        <div
          className="px-[24px] pb-[28px] pt-[4px] flex flex-col gap-[10px]"
        >
          <a
            href={`tel:${PHONE}`}
            className="w-full flex items-center justify-center gap-[10px] py-[15px] rounded-[14px] font-body font-semibold text-[15px] text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 20px rgba(92,24,40,0.35)" }}
          >
            <Phone size={16} />
            Call to book &mdash; {PHONE}
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-[13px] rounded-[14px] font-body text-[14px] transition-colors hover:bg-black/5"
            style={{ color: "#A89282" }}
          >
            Maybe later
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

export default function FlightResultCard({ result }: { result: FlightResult }) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    airline, flightNumber, origin, destination,
    originCity, destinationCity,
    departureTime, arrivalTime, duration, stops, cabin,
    price, logoUrl, baggageIncluded,
  } = result;

  const stopsLabel = stops === 0 ? "Non-stop" : stops === 1 ? "1 stop" : `${stops} stops`;
  const isNonStop  = stops === 0;
  const initials   = airline.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <article
        className="group bg-white rounded-[18px] overflow-hidden transition-all duration-250 hover:shadow-[0_6px_28px_rgba(26,15,13,0.10)]"
        style={{ border: "1px solid #EDE0CC", boxShadow: "0 2px 10px rgba(26,15,13,0.05)" }}
      >
        <div className="flex">
          {/* Left accent bar */}
          <div
            className="w-[4px] shrink-0 rounded-l-[18px]"
            style={{ background: isNonStop ? "#5C1828" : "#C9A84C" }}
          />

          <div className="flex-1 px-[20px] sm:px-[24px] py-[18px] sm:py-[20px]">

            {/* ── Top row ── */}
            <div className="flex items-center gap-[10px] mb-[14px] sm:mb-[16px]">
              {logoUrl ? (
                <div
                  className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center shrink-0 p-[6px]"
                  style={{ background: "#F5EAED" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl}
                    alt={airline}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      el.parentElement!.innerHTML =
                        `<span class="font-display font-bold text-[14px]" style="color:#5C1828">${initials}</span>`;
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center shrink-0 font-display font-bold text-[14px] leading-none"
                  style={{ background: "#F5EAED", color: "#5C1828" }}
                >
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-[14px] text-warm-dark leading-none truncate">{airline}</p>
                <p className="font-body text-[12px] text-warm-mid mt-[2px]">{flightNumber}</p>
              </div>

              <div className="flex items-center gap-[6px] shrink-0 flex-wrap justify-end">
                {isNonStop && (
                  <span
                    className="font-body text-[10px] font-semibold uppercase tracking-[0.07em] px-[10px] py-[4px] rounded-full"
                    style={{ background: "#F5EAED", color: "#5C1828" }}
                  >
                    Non-stop
                  </span>
                )}
                <span
                  className="font-body text-[10px] uppercase tracking-[0.07em] px-[10px] py-[4px] rounded-full"
                  style={{ background: "#FAF7F2", color: "#6B5244", border: "1px solid #EDE0CC" }}
                >
                  {cabin}
                </span>
              </div>
            </div>

            {/* ── Route row ── */}
            <div className="flex items-center gap-[8px] sm:gap-[16px] mb-[12px] sm:mb-[16px]">
              <div className="shrink-0">
                <p className="font-body font-semibold text-[18px] sm:text-[21px] text-warm-dark leading-none tracking-[-0.01em]">
                  {departureTime}
                </p>
                <p className="font-body text-[12px] sm:text-[13px] text-warm-dark font-semibold mt-[2px]">{origin}</p>
                {originCity && (
                  <p className="font-body text-[11px] text-warm-mid mt-[1px] hidden sm:block">{originCity}</p>
                )}
              </div>

              <div className="flex flex-col items-center flex-1 min-w-0 gap-[4px] sm:gap-[6px]">
                <p className="font-body text-[11px] sm:text-[12px] text-warm-mid">{duration}</p>
                <div className="flex items-center w-full gap-[4px] sm:gap-[6px]">
                  <div className="h-[1.5px] flex-1 rounded-full" style={{ background: "#EDE0CC" }} />
                  <div
                    className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: isNonStop ? "#F5EAED" : "#FAF7F2",
                      border: `1.5px solid ${isNonStop ? "#5C1828" : "#EDE0CC"}`,
                    }}
                  >
                    <Plane size={10} style={{ color: isNonStop ? "#5C1828" : "#A89282" }} />
                  </div>
                  <div className="h-[1.5px] flex-1 rounded-full" style={{ background: "#EDE0CC" }} />
                </div>
                <p className="font-body text-[11px] font-medium" style={{ color: isNonStop ? "#5C1828" : "#C9A84C" }}>
                  {stopsLabel}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-body font-semibold text-[18px] sm:text-[21px] text-warm-dark leading-none tracking-[-0.01em]">
                  {arrivalTime}
                </p>
                <p className="font-body text-[12px] sm:text-[13px] text-warm-dark font-semibold mt-[2px]">{destination}</p>
                {destinationCity && (
                  <p className="font-body text-[11px] text-warm-mid mt-[1px] hidden sm:block">{destinationCity}</p>
                )}
              </div>
            </div>

            {/* ── Bottom row ── */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-[14px] gap-[12px] sm:gap-0"
              style={{ borderTop: "1px solid #EDE0CC" }}
            >
              <div className="hidden sm:flex items-center gap-[14px]">
                <div
                  className="flex items-center gap-[5px] font-body text-[12px]"
                  style={{ color: baggageIncluded ? "#5C1828" : "#A89282" }}
                >
                  <BaggageClaim size={13} />
                  <span>{baggageIncluded ? "Checked bag included" : "No checked bag"}</span>
                </div>
                <div className="flex items-center gap-[5px] font-body text-[12px] text-warm-mid">
                  <Luggage size={13} style={{ color: "#A89282" }} />
                  <span>Carry-on included</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end sm:gap-[16px]">
                <div>
                  <p className="font-body font-semibold text-[20px] sm:text-[23px] text-burg-deep leading-none tracking-[-0.01em]">
                    ${price.toLocaleString()}
                  </p>
                  <p className="font-body text-[11px] text-warm-mid mt-[2px]">per person</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <Button
  
  variant="ghost"
>
  <a className="flex items-center gap-[5px]" href={`tel:${PHONE}`}>
    <Phone size={13} aria-hidden />
    Call us
  </a>
</Button>
                  <Button variant="primary" onClick={() => setModalOpen(true)}>
                    Book now
                    <ArrowRight size={13} aria-hidden />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>

      {modalOpen && <BookingModal result={result} onClose={() => setModalOpen(false)} />}
    </>
  );
}
