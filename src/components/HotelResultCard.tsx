"use client";

import { useState } from "react";
import {
  Star, Phone, MapPin, Wifi, Dumbbell, Coffee, Car,
  Waves, Sparkles, UtensilsCrossed, BedDouble,
  ChevronLeft, ChevronRight, X, Construction, CheckCircle2,
  XCircle, Clock,
} from "lucide-react";
import Button from "@/components/ui/Button";
import type { Hotel } from "@/lib/hotels/types";

export type { Hotel as HotelResult };

const PHONE = "1-800-963-4330";

const AMENITY_ICONS: Record<string, React.ElementType> = {
  "Free Wi-Fi":          Wifi,
  "Pool":                Waves,
  "Spa":                 Sparkles,
  "Gym":                 Dumbbell,
  "Fitness Center":      Dumbbell,
  "Restaurant":          UtensilsCrossed,
  "Breakfast Included":  Coffee,
  "Bar":                 Coffee,
  "Parking":             Car,
  "Free Parking":        Car,
  "Valet Parking":       Car,
  "Room Service":        BedDouble,
};

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  "Luxury":          { bg: "#1A0F0D",  color: "#C9A84C" },
  "Top Rated":       { bg: "#F5EAED",  color: "#5C1828" },
  "Best Seller":     { bg: "#5C1828",  color: "#fff"    },
  "Family Friendly": { bg: "#EDE0CC",  color: "#6B5244" },
  "Great Value":     { bg: "#FAF7F2",  color: "#6B5244" },
  "Boutique Gem":    { bg: "#2a1a35",  color: "#c9a4e0" },
};

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={10} fill={i < stars ? "#C9A84C" : "none"} style={{ color: i < stars ? "#C9A84C" : "#EDE0CC" }} />
      ))}
    </div>
  );
}

function ReviewScore({ score, count }: { score: number; count: number }) {
  const label = score >= 9 ? "Exceptional" : score >= 8.5 ? "Excellent" : score >= 8 ? "Very Good" : score >= 7.5 ? "Good" : "Pleasant";
  return (
    <div className="flex items-center gap-[6px]">
      <span
        className="font-body font-bold text-[13px] px-[8px] py-[3px] rounded-[6px] text-white"
        style={{ background: "#5C1828" }}
      >
        {score.toFixed(1)}
      </span>
      <div>
        <p className="font-body font-medium text-[12px] text-warm-dark leading-none">{label}</p>
        <p className="font-body text-[11px] text-warm-mid">{count.toLocaleString()} reviews</p>
      </div>
    </div>
  );
}

// ── Booking / Call Modal ───────────────────────────────────────────────────────

function HotelModal({
  hotel,
  mode,
  onClose,
}: {
  hotel: Hotel;
  mode: "call" | "book";
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const badgeStyle = hotel.badge ? BADGE_COLORS[hotel.badge] : null;

  const cancelLabel =
    hotel.cancellationPolicy === "free"
      ? "Free cancellation"
      : hotel.cancellationPolicy === "partial"
      ? "Partial refund"
      : "Non-refundable";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(10,4,2,0.70)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-[540px] rounded-t-[28px] sm:rounded-[24px] overflow-hidden"
        style={{
          background: "#FAF7F2",
          boxShadow: "0 24px 80px rgba(10,4,2,0.32)",
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
          className="absolute top-[14px] right-[14px] z-20 w-[32px] h-[32px] rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.40)" }}
        >
          <X size={15} color="#fff" />
        </button>

        {/* ── Image gallery ── */}
        {hotel.images.length > 0 && (
          <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hotel.images[imgIdx]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            {hotel.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setImgIdx((i) => (i - 1 + hotel.images.length) % hotel.images.length)}
                  className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  <ChevronLeft size={16} color="#fff" />
                </button>
                <button
                  type="button"
                  onClick={() => setImgIdx((i) => (i + 1) % hotel.images.length)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  <ChevronRight size={16} color="#fff" />
                </button>
                <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[5px]">
                  {hotel.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImgIdx(i)}
                      className="w-[6px] h-[6px] rounded-full transition-all"
                      style={{ background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.45)" }}
                    />
                  ))}
                </div>
              </>
            )}
            {/* Badge overlay */}
            {hotel.badge && badgeStyle && (
              <span
                className="absolute top-[14px] left-[14px] font-body text-[10px] font-bold uppercase tracking-[0.07em] px-[10px] py-[4px] rounded-full"
                style={{ background: badgeStyle.bg, color: badgeStyle.color }}
              >
                {hotel.badge}
              </span>
            )}
          </div>
        )}

        {/* ── Content ── */}
        <div className="px-[24px] pt-[20px] pb-[8px]">
          <div className="flex items-start justify-between gap-[12px] mb-[8px]">
            <div>
              <h2 className="font-display font-semibold text-[22px] text-warm-dark leading-[1.15]">
                {hotel.name}
              </h2>
              <StarRating stars={hotel.stars} />
            </div>
            <ReviewScore score={hotel.reviewScore} count={hotel.reviewCount} />
          </div>
          <div className="flex items-center gap-[5px] mb-[14px]">
            <MapPin size={12} style={{ color: "#A89282" }} />
            <p className="font-body text-[13px] text-warm-mid">{hotel.address}</p>
          </div>
          <p className="font-body text-[13px] text-warm-mid leading-[1.65] mb-[16px]">
            {hotel.description}
          </p>

          {/* Amenity pills */}
          <div className="flex flex-wrap gap-[6px] mb-[16px]">
            {hotel.amenities.slice(0, 8).map((a) => {
              const Icon = AMENITY_ICONS[a];
              return (
                <span
                  key={a}
                  className="flex items-center gap-[5px] font-body text-[11px] px-[10px] py-[5px] rounded-full"
                  style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#6B5244" }}
                >
                  {Icon && <Icon size={11} style={{ color: "#A89282" }} />}
                  {a}
                </span>
              );
            })}
          </div>

          {/* Price + cancellation */}
          <div
            className="flex items-center justify-between px-[16px] py-[14px] rounded-[14px] mb-[14px]"
            style={{ background: "#fff", border: "1px solid #EDE0CC" }}
          >
            <div>
              <p className="font-body text-[11px] text-warm-mid mb-[2px]">Starting from</p>
              <p className="font-body font-semibold text-[26px] text-burg-deep leading-none tracking-[-0.02em]">
                ${hotel.pricePerNight.toLocaleString()}
                <span className="font-body font-normal text-[13px] text-warm-mid ml-[4px]">/night</span>
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              {hotel.cancellationPolicy === "free" ? (
                <CheckCircle2 size={13} style={{ color: "#5C1828" }} />
              ) : hotel.cancellationPolicy === "partial" ? (
                <Clock size={13} style={{ color: "#C9A84C" }} />
              ) : (
                <XCircle size={13} style={{ color: "#A89282" }} />
              )}
              <span
                className="font-body text-[12px] font-medium"
                style={{
                  color: hotel.cancellationPolicy === "free"
                    ? "#5C1828"
                    : hotel.cancellationPolicy === "partial"
                    ? "#C9A84C"
                    : "#A89282",
                }}
              >
                {cancelLabel}
              </span>
            </div>
          </div>

          {/* WIP notice (book mode only) */}
          {mode === "book" && (
            <div
              className="flex items-start gap-[12px] px-[16px] py-[13px] rounded-[13px] mb-[14px]"
              style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              <Construction size={15} style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-body font-semibold text-[13px]" style={{ color: "#6B5244" }}>
                  Online booking coming soon
                </p>
                <p className="font-body text-[12px] mt-[2px] leading-[1.6]" style={{ color: "#A89282" }}>
                  Our agents can hold and book this exact rate for you over the phone - often with extras not available online.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── CTA footer ── */}
        <div className="px-[24px] pb-[28px] pt-[4px] flex flex-col gap-[10px]">
          <a
            href={`tel:${PHONE}`}
            className="w-full flex items-center justify-center gap-[10px] py-[15px] rounded-[14px] font-body font-semibold text-[15px] text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 20px rgba(92,24,40,0.35)" }}
          >
            <Phone size={16} />
            {mode === "call" ? `Call now - ${PHONE}` : `Call to reserve - ${PHONE}`}
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

export default function HotelResultCard({ result }: { result: Hotel }) {
  const [imgIdx, setImgIdx]     = useState(0);
  const [modalMode, setModal]   = useState<"call" | "book" | null>(null);

  const badgeStyle = result.badge ? BADGE_COLORS[result.badge] : null;

  const cancelColor =
    result.cancellationPolicy === "free"    ? "#5C1828" :
    result.cancellationPolicy === "partial" ? "#C9A84C" : "#A89282";
  const cancelLabel =
    result.cancellationPolicy === "free"    ? "Free cancellation" :
    result.cancellationPolicy === "partial" ? "Partial refund"    : "Non-refundable";

  return (
    <>
      <article
        className="group bg-white rounded-[18px] overflow-hidden flex flex-col sm:flex-row transition-all duration-250 hover:shadow-[0_8px_32px_rgba(26,15,13,0.11)]"
        style={{ border: "1px solid #EDE0CC", boxShadow: "0 2px 10px rgba(26,15,13,0.05)" }}
      >
        {/* ── Image column ── */}
        <div className="relative w-full sm:w-[240px] h-[200px] sm:h-auto shrink-0 overflow-hidden">
          {result.images.length > 0 ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={result.images[imgIdx]}
              alt={result.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "#EDE0CC" }}>
              <BedDouble size={40} style={{ color: "#A89282" }} />
            </div>
          )}

          {/* Badge */}
          {result.badge && badgeStyle && (
            <span
              className="absolute top-[10px] left-[10px] font-body text-[9px] font-bold uppercase tracking-[0.07em] px-[9px] py-[4px] rounded-full"
              style={{ background: badgeStyle.bg, color: badgeStyle.color }}
            >
              {result.badge}
            </span>
          )}

          {/* Image nav dots */}
          {result.images.length > 1 && (
            <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 flex gap-[4px]">
              {result.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImgIdx(i)}
                  className="w-[5px] h-[5px] rounded-full transition-all"
                  style={{ background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.50)" }}
                />
              ))}
            </div>
          )}

          {/* Prev/next arrows */}
          {result.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setImgIdx((i) => (i - 1 + result.images.length) % result.images.length)}
                className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.40)" }}
              >
                <ChevronLeft size={13} color="#fff" />
              </button>
              <button
                type="button"
                onClick={() => setImgIdx((i) => (i + 1) % result.images.length)}
                className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.40)" }}
              >
                <ChevronRight size={13} color="#fff" />
              </button>
            </>
          )}
        </div>

        {/* ── Content column ── */}
        <div className="flex-1 px-[20px] sm:px-[24px] py-[18px] sm:py-[20px] flex flex-col justify-between gap-[10px] min-w-0">

          {/* Top */}
          <div>
            <div className="flex items-start justify-between gap-[8px] mb-[4px]">
              <h3 className="font-display font-semibold text-[20px] sm:text-[22px] text-warm-dark leading-[1.2]">
                {result.name}
              </h3>
              <ReviewScore score={result.reviewScore} count={result.reviewCount} />
            </div>
            <StarRating stars={result.stars} />
            <div className="flex items-center gap-[4px] mt-[5px]">
              <MapPin size={11} style={{ color: "#A89282" }} />
              <p className="font-body text-[12px] text-warm-mid truncate">{result.address}</p>
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-[13px] text-warm-mid leading-[1.6] line-clamp-2 hidden sm:block">
            {result.description}
          </p>

          {/* Amenity chips */}
          <div className="flex items-center gap-[6px] flex-wrap">
            {result.amenities.slice(0, 4).map((a) => {
              const Icon = AMENITY_ICONS[a];
              return (
                <span
                  key={a}
                  className="flex items-center gap-[4px] font-body text-[11px] px-[9px] py-[4px] rounded-full"
                  style={{ background: "#FAF7F2", color: "#6B5244", border: "1px solid #EDE0CC" }}
                >
                  {Icon && <Icon size={10} style={{ color: "#A89282" }} />}
                  {a}
                </span>
              );
            })}
            {result.amenities.length > 4 && (
              <span className="font-body text-[11px] text-warm-mid">+{result.amenities.length - 4} more</span>
            )}
          </div>

          {/* Bottom row */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-[12px] gap-[10px] sm:gap-0"
            style={{ borderTop: "1px solid #EDE0CC" }}
          >
            <div>
              <div className="flex items-baseline gap-[3px]">
                <p className="font-body font-semibold text-[21px] sm:text-[23px] text-burg-deep leading-none tracking-[-0.01em]">
                  ${result.pricePerNight.toLocaleString()}
                </p>
                <span className="font-body text-[12px] text-warm-mid">/night</span>
              </div>
              <p className="font-body text-[11px] mt-[2px]" style={{ color: cancelColor }}>
                {cancelLabel}
              </p>
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
              <Button variant="primary" onClick={() => setModal("book")}>
                Reserve now
              </Button>
            </div>
          </div>

        </div>
      </article>

      {modalMode && (
        <HotelModal hotel={result} mode={modalMode} onClose={() => setModal(null)} />
      )}
    </>
  );
}
