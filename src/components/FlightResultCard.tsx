"use client";

import { Phone, Plane, Wifi, Utensils, BaggageClaim } from "lucide-react";
import Button from "@/components/ui/Button";

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  cabin: string;
  price: number;
  currency: string;
}

export default function FlightResultCard({ result }: { result: FlightResult }) {
  const {
    airline, flightNumber, origin, destination,
    departureTime, arrivalTime, duration, stops, cabin, price, currency,
  } = result;

  const stopsLabel = stops === 0 ? "Non-stop" : stops === 1 ? "1 stop" : `${stops} stops`;
  const isNonStop  = stops === 0;
  const initials   = airline.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <article
      className="group bg-white rounded-[18px] overflow-hidden transition-all duration-250 hover:shadow-[0_6px_28px_rgba(26,15,13,0.10)]"
      style={{ border: "1px solid #EDE0CC", boxShadow: "0 2px 10px rgba(26,15,13,0.05)" }}
    >
      {/* Colored left accent bar */}
      <div className="flex">
        <div
          className="w-[4px] shrink-0 rounded-l-[18px]"
          style={{ background: isNonStop ? "#5C1828" : "#C9A84C" }}
        />

        <div className="flex-1 px-[24px] py-[20px]">

          {/* ── Top row: airline + cabin + non-stop badge ── */}
          <div className="flex items-center gap-[10px] mb-[16px]">
            {/* Airline initials bubble */}
            <div
              className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center shrink-0 font-display font-bold text-[14px] leading-none"
              style={{ background: "#F5EAED", color: "#5C1828" }}
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-body font-medium text-[14px] text-warm-dark leading-none truncate">
                {airline}
              </p>
              <p className="font-body text-[12px] text-warm-mid mt-[2px]">{flightNumber}</p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-[6px] shrink-0">
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

          {/* ── Main route row ── */}
          <div className="flex items-center gap-[8px] sm:gap-[16px] mb-[12px] sm:mb-[16px]">

            {/* Departure */}
            <div className="shrink-0">
              <p className="font-display font-semibold text-[22px] sm:text-[30px] text-warm-dark leading-none">
                {departureTime}
              </p>
              <p className="font-body text-[12px] sm:text-[13px] text-warm-mid mt-[3px] sm:mt-[4px] font-medium">
                {origin}
              </p>
            </div>

            {/* Flight path */}
            <div className="flex flex-col items-center flex-1 min-w-0 gap-[4px] sm:gap-[6px]">
              <p className="font-body text-[11px] sm:text-[12px] text-warm-mid">
                {duration}
              </p>
              <div className="flex items-center w-full gap-[4px] sm:gap-[6px]">
                <div className="h-[1.5px] flex-1 rounded-full" style={{ background: "#EDE0CC" }} />
                <div
                  className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] rounded-full flex items-center justify-center shrink-0"
                  style={{ background: isNonStop ? "#F5EAED" : "#FAF7F2", border: `1.5px solid ${isNonStop ? "#5C1828" : "#EDE0CC"}` }}
                >
                  <Plane size={10} style={{ color: isNonStop ? "#5C1828" : "#A89282" }} />
                </div>
                <div className="h-[1.5px] flex-1 rounded-full" style={{ background: "#EDE0CC" }} />
              </div>
              <p
                className="font-body text-[11px] font-medium"
                style={{ color: isNonStop ? "#5C1828" : "#C9A84C" }}
              >
                {stopsLabel}
              </p>
            </div>

            {/* Arrival */}
            <div className="text-right shrink-0">
              <p className="font-display font-semibold text-[22px] sm:text-[30px] text-warm-dark leading-none">
                {arrivalTime}
              </p>
              <p className="font-body text-[12px] sm:text-[13px] text-warm-mid mt-[3px] sm:mt-[4px] font-medium">
                {destination}
              </p>
            </div>

          </div>

          {/* ── Bottom row: amenities + price + CTA ── */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-[14px] gap-[12px] sm:gap-0"
            style={{ borderTop: "1px solid #EDE0CC" }}
          >
            {/* Amenity icons — hidden on mobile */}
            <div className="hidden sm:flex items-center gap-[14px]">
              <div className="flex items-center gap-[5px] font-body text-[12px] text-warm-mid">
                <Wifi size={13} style={{ color: "#A89282" }} />
                <span>Wi-Fi</span>
              </div>
              <div className="flex items-center gap-[5px] font-body text-[12px] text-warm-mid">
                <BaggageClaim size={13} style={{ color: "#A89282" }} />
                <span>Bag included</span>
              </div>
              <div className="flex items-center gap-[5px] font-body text-[12px] text-warm-mid">
                <Utensils size={13} style={{ color: "#A89282" }} />
                <span>Meal</span>
              </div>
            </div>

            {/* Price + actions */}
            <div className="flex items-center justify-between sm:justify-end sm:gap-[16px]">
              <div>
                <p className="font-display font-semibold text-[22px] sm:text-[26px] text-burg-deep leading-none">
                  {currency} {price}
                </p>
                <p className="font-body text-[11px] text-warm-mid mt-[2px]">per person</p>
              </div>
              <div className="flex items-center gap-[8px]">
                <Button variant="ghost">
                  <Phone size={13} aria-hidden />
                  Call us
                </Button>
                <Button variant="primary">Book now</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
