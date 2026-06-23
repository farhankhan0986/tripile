"use client";

import { Star, Phone, Wifi, Coffee, Car, Dumbbell, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

export interface HotelResult {
  id: string;
  name: string;
  stars: number;
  location: string;
  pricePerNight: number;
  currency: string;
  imageUrl: string;
}

// Deterministic amenity icons per hotel id (just cycles through)
const amenityGroups = [
  [Wifi, Coffee, Car],
  [Wifi, Dumbbell, Car],
  [Coffee, Car, Dumbbell],
  [Wifi, Coffee, Dumbbell],
];
const amenityLabels: Record<string, string> = {
  Wifi: "Free Wi-Fi",
  Coffee: "Breakfast",
  Car: "Free parking",
  Dumbbell: "Fitness center",
};

function getRating(id: string) {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return (4.1 + (seed % 9) * 0.1).toFixed(1);
}

export default function HotelResultCard({ result }: { result: HotelResult }) {
  const { id, name, stars, location, pricePerNight, currency, imageUrl } = result;

  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const Amenities = amenityGroups[seed % amenityGroups.length];
  const rating = getRating(id);

  return (
    <article
      className="group bg-white rounded-[18px] overflow-hidden flex flex-col sm:flex-row transition-all duration-250 hover:shadow-[0_8px_32px_rgba(26,15,13,0.10)]"
      style={{ border: "1px solid #EDE0CC", boxShadow: "0 2px 10px rgba(26,15,13,0.05)" }}
    >
      {/* ── Hotel image ── */}
      <div className="relative w-full sm:w-[220px] h-[200px] sm:h-auto shrink-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {/* Star count badge on image */}
        <div
          className="absolute top-[12px] left-[12px] flex items-center gap-[4px] px-[10px] py-[5px] rounded-full"
          style={{ background: "rgba(201,168,76,0.92)", backdropFilter: "blur(6px)" }}
        >
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} size={10} fill="gold" style={{ color: "gold" }} />
          ))}
        </div>
        {/* Rating badge bottom */}
        <div
          className="absolute bottom-[12px] left-[12px] px-[10px] py-[5px] rounded-full font-body font-semibold text-[12px]"
          style={{ background: "rgba(15,6,4,0.75)", color: "#fff", backdropFilter: "blur(6px)" }}
        >
          ★ {rating}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-[24px] py-[20px] flex flex-col justify-between gap-[12px]">

        {/* Top: name + location */}
        <div>
          <h3 className="font-display font-semibold text-[22px] text-warm-dark leading-[1.2] mb-[6px]">
            {name}
          </h3>
          <div className="flex items-center gap-[5px]">
            <MapPin size={12} style={{ color: "#A89282" }} />
            <p className="font-body text-[13px] text-warm-mid">{location}</p>
          </div>
        </div>

        {/* Amenity chips */}
        <div className="flex items-center gap-[8px] flex-wrap">
          {Amenities.map((Icon) => {
            const label = amenityLabels[Icon.displayName ?? ""] ?? amenityLabels[
              Icon === Wifi ? "Wifi" :
              Icon === Coffee ? "Coffee" :
              Icon === Car ? "Car" : "Dumbbell"
            ];
            return (
              <span
                key={label}
                className="flex items-center gap-[5px] font-body text-[12px] px-[10px] py-[5px] rounded-full"
                style={{ background: "#FAF7F2", color: "#6B5244", border: "1px solid #EDE0CC" }}
              >
                <Icon size={12} style={{ color: "#A89282" }} />
                {label}
              </span>
            );
          })}
        </div>

        {/* Bottom: price + CTA */}
        <div
          className="flex items-center justify-between pt-[14px]"
          style={{ borderTop: "1px solid #EDE0CC" }}
        >
          <div>
            <div className="flex items-baseline gap-[4px]">
              <p className="font-display font-semibold text-[28px] text-burg-deep leading-none">
                {currency} {pricePerNight}
              </p>
              <span className="font-body text-[13px] text-warm-mid">/night</span>
            </div>
            <p className="font-body text-[11px] text-warm-mid mt-[3px]">
              Taxes may apply/Free cancellation
            </p>
          </div>

          <div className="flex items-center gap-[8px]">
            <Button variant="ghost">
              <Phone size={13} aria-hidden />
              Call
            </Button>
            <Button variant="primary">Book</Button>
          </div>
        </div>

      </div>
    </article>
  );
}
