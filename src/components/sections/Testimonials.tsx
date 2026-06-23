"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Booking with Tripile was the first time I felt like someone actually listened to what I wanted. They found us a hotel we never would have discovered on our own right on the water, half the price of what we'd seen.",
    name: "Margaret H.",
    age: 67,
    city: "Phoenix, AZ",
    trip: "Cancun, Mexico",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "I called at 7pm on a Sunday when my connection was cancelled. Someone picked up in two rings and had me rebooked before I even reached the gate.",
    name: "Robert K.",
    age: 71,
    city: "Tampa, FL",
    trip: "Miami, Florida",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "My wife has mobility needs. They arranged everything wheelchair assistance, the right room, aisle seats without me having to ask twice. Pure peace of mind.",
    name: "David M.",
    age: 64,
    city: "Denver, CO",
    trip: "Sedona, Arizona",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "Three generations, one trip. Tripile handled everything from car seats to senior meal preferences. Our grandkids still talk about that vacation.",
    name: "Patricia L.",
    age: 69,
    city: "Charlotte, NC",
    trip: "Orlando, Florida",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "I've used every online booking site. Nothing compares to having a real person who knows your preferences. It felt like calling a friend who happens to be a travel expert.",
    name: "James T.",
    age: 72,
    city: "Scottsdale, AZ",
    trip: "Maui, Hawaii",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className="text-gold-accent"
          fill="currentColor"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section
      className="py-[64px] lg:py-[100px]"
      style={{ background: "linear-gradient(160deg, #F5EAED 0%, #FAF7F2 50%, #EDE0CC 100%)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

        {/* Heading */}
        <div className="mb-[36px] lg:mb-[56px]">
          <p className="font-body text-[11px] uppercase tracking-[0.12em] text-warm-mid mb-[12px]">
            Real stories
          </p>
          <div className="flex items-end justify-between">
            <h2 className="font-display font-medium text-warm-dark leading-[1.05] tracking-[-0.01em]" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
              What our travelers say
            </h2>
            {/* Aggregate trust badge */}
            <div className="hidden lg:flex flex-col items-end gap-[4px] pb-[6px]">
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-gold-accent" fill="currentColor" />
                ))}
              </div>
              <p className="font-body text-[13px] text-warm-mid">
                <span className="font-medium text-warm-dark">4.97</span> · 2,400+ verified reviews
              </p>
            </div>
          </div>
        </div>

        {/* Cards layout: 1 large featured + 4 in a 2×2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[14px] lg:gap-[20px]">

          {/* Featured card left */}
          <div
            className="relative rounded-[20px] p-[24px] lg:p-[36px] flex flex-col justify-between overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #5C1828 0%, #8B2A3F 100%)",
              boxShadow: "0 8px 40px rgba(92,24,40,0.28)"
            }}
          >
            {/* Large decorative quote */}
            <Quote
              size={80}
              className="absolute top-[24px] right-[28px] opacity-[0.08]"
              style={{ color: "#fff", transform: "rotate(180deg)" }}
            />

            <div className="flex flex-col gap-[24px] relative z-10">
              <StarRating count={featured.stars} />

              <p className="font-display italic text-white leading-[1.55]" style={{ fontSize: "clamp(18px, 3.5vw, 26px)" }}>
                &ldquo;{featured.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-[14px] mt-[32px] relative z-10">
              <img
                src={featured.avatar}
                alt={featured.name}
                className="w-[52px] h-[52px] rounded-full object-cover border-[2px] border-white/30"
              />
              <div>
                <p className="font-body font-medium text-[15px] text-white leading-none mb-[4px]">
                  {featured.name}, {featured.age}
                </p>
                <p className="font-body text-[12px] text-white/60 leading-none">
                  {featured.city}
                </p>
              </div>
              <div
                className="ml-auto px-[12px] py-[6px] rounded-full font-body text-[11px] font-medium tracking-[0.05em] uppercase"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                ✈ {featured.trip}
              </div>
            </div>
          </div>

          {/* Right side 2×2 grid of remaining cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            {rest.map(({ quote, name, age, city, trip, stars, avatar }) => (
              <div
                key={name}
                className="rounded-[18px] p-[24px] flex flex-col gap-[16px] bg-white"
                style={{ boxShadow: "0 2px 16px rgba(26,15,13,0.07)", border: "1px solid rgba(237,224,204,0.8)" }}
              >
                <div className="flex items-center justify-between">
                  <StarRating count={stars} />
                  <span
                    className="font-body text-[10px] uppercase tracking-[0.06em] px-[10px] py-[4px] rounded-full"
                    style={{ background: "#F5EAED", color: "#8B2A3F" }}
                  >
                    ✈ {trip}
                  </span>
                </div>

                <p className="font-display text-[17px] italic text-warm-dark leading-[1.6] flex-1">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="flex items-center gap-[10px] pt-[12px]" style={{ borderTop: "1px solid #EDE0CC" }}>
                  <img
                    src={avatar}
                    alt={name}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    style={{ border: "2px solid #EDE0CC" }}
                  />
                  <div>
                    <p className="font-body font-medium text-[13px] text-warm-dark leading-none mb-[3px]">
                      {name}, {age}
                    </p>
                    <p className="font-body text-[11px] text-warm-mid leading-none">
                      {city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
