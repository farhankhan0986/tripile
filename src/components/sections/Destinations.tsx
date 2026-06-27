"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Phone, Clock, Calendar, MapPin, Star, ArrowUpRight } from "lucide-react";

type Destination = {
  city: string;
  iata: string;
  region: string;
  country: string;
  price: number;
  hotelsFrom: number;
  bestTime: string;
  flightTime: string;
  image: string;
  snippet: string;
  description: string;
  highlights: string[];
};

const destinations: Destination[] = [
  {
    city: "Miami",
    iata: "MIA",
    region: "Florida",
    country: "USA",
    price: 189,
    hotelsFrom: 149,
    bestTime: "November to April",
    flightTime: "3h from New York",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    snippet: "Sun-soaked beaches, Art Deco charm, and world-class dining in one of America's most vibrant cities.",
    description: "Miami dazzles with iconic South Beach, Art Deco architecture, and a culinary scene blending Caribbean and Latin flavors. Warm winters, world-class hotels, and gentle surf make it a top choice for a refined Florida escape.",
    highlights: ["South Beach", "Art Deco District", "Everglades Day Trip", "Little Havana", "Vizcaya Museum Gardens"],
  },
  {
    city: "Orlando",
    iata: "MCO",
    region: "Florida",
    country: "USA",
    price: 210,
    hotelsFrom: 129,
    bestTime: "January to March",
    flightTime: "2h 30m from New York",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    snippet: "Championship golf, luxury resort spas, and beautiful lakeside dining beyond the theme parks.",
    description: "Orlando is far more than theme parks. Championship golf courses, luxury resort spas, and beautiful lakeside dining make it an ideal destination for a relaxed, sun-filled Florida getaway at any pace.",
    highlights: ["Epcot Flower Festival", "Winter Park", "Lake Eola Park", "Kennedy Space Center", "Spa Resorts"],
  },
  {
    city: "Las Vegas",
    iata: "LAS",
    region: "Nevada",
    country: "USA",
    price: 245,
    hotelsFrom: 99,
    bestTime: "March to May",
    flightTime: "5h from New York",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
    snippet: "Celebrity dining, world-famous shows, and Grand Canyon day trips from one glamorous base.",
    description: "Las Vegas delivers unrivaled entertainment, celebrity chef dining, and world-famous shows. Day trips to the Grand Canyon and Hoover Dam add natural wonder to the neon glamour of the Strip.",
    highlights: ["Grand Canyon Day Trip", "Cirque du Soleil", "Fine Dining", "Hoover Dam", "The Strip at Night"],
  },
  {
    city: "Cancun",
    iata: "CUN",
    region: "Quintana Roo",
    country: "Mexico",
    price: 299,
    hotelsFrom: 179,
    bestTime: "December to April",
    flightTime: "4h from New York",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    snippet: "Turquoise Caribbean waters, ancient Mayan ruins, and all-inclusive resorts on a pristine coastline.",
    description: "Cancun's turquoise Caribbean waters, all-inclusive resorts, and ancient Mayan ruins create the perfect blend of relaxation and discovery. Calm Hotel Zone waters are ideal for a gentle, unhurried vacation.",
    highlights: ["Chichen Itza", "Isla Mujeres", "Tulum Ruins", "Underwater Museum", "Holbox Island"],
  },
  {
    city: "New Orleans",
    iata: "MSY",
    region: "Louisiana",
    country: "USA",
    price: 219,
    hotelsFrom: 139,
    bestTime: "February to May",
    flightTime: "2h 45m from New York",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    snippet: "Jazz, Creole cuisine, and stunning Garden District mansions make this one of America's most soulful cities.",
    description: "New Orleans blends French Creole heritage, world-famous cuisine, and a live music scene unlike anywhere else in the country. Garden District walking tours, riverboat cruises, and legendary jazz bars await.",
    highlights: ["French Quarter", "Garden District", "Jazz Clubs on Frenchmen St", "Riverboat Cruise", "Commander's Palace"],
  },
  {
    city: "Sedona",
    iata: "PHX",
    region: "Arizona",
    country: "USA",
    price: 269,
    hotelsFrom: 189,
    bestTime: "March to May",
    flightTime: "5h from New York",
    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80",
    snippet: "Red rock canyons, world-class spa resorts, and the Grand Canyon just two hours away.",
    description: "Sedona's dramatic red rock landscape and clean desert air make it one of the Southwest's premier wellness destinations. Luxury spa resorts, scenic jeep tours, and a short drive to the Grand Canyon round out the perfect escape.",
    highlights: ["Red Rock State Park", "Grand Canyon Drive", "Luxury Spa Resorts", "Tlaquepaque Arts Village", "Chapel of the Holy Cross"],
  },
  {
    city: "Savannah",
    iata: "SAV",
    region: "Georgia",
    country: "USA",
    price: 198,
    hotelsFrom: 159,
    bestTime: "March to June",
    flightTime: "2h 15m from New York",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    snippet: "Spanish-moss-draped squares, antebellum architecture, and a remarkable dining scene in the South's most charming city.",
    description: "Savannah enchants with its 22 historic squares, cobblestone streets, and antebellum mansions draped in Spanish moss. The city's exceptional restaurants, riverfront promenade, and gentle pace make it perfect for an unhurried Southern escape.",
    highlights: ["Historic District Squares", "Forsyth Park", "River Street", "Bonaventure Cemetery", "Carriage Tours"],
  },
  {
    city: "Maui",
    iata: "OGG",
    region: "Hawaii",
    country: "USA",
    price: 449,
    hotelsFrom: 249,
    bestTime: "April to May",
    flightTime: "10h from New York",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80",
    snippet: "Volcanic peaks, whale watching, the legendary Road to Hana, and some of the world's most beautiful beaches.",
    description: "Maui combines dramatic volcanic landscapes with lush tropical coastline and some of the finest resort hotels in the world. Whale watching from December to April, the spectacular Road to Hana, and glorious sunsets over Haleakala make every day unforgettable.",
    highlights: ["Road to Hana", "Whale Watching", "Haleakala Sunrise", "Wailea Beach", "Lahaina Town"],
  },
  {
    city: "Nashville",
    iata: "BNA",
    region: "Tennessee",
    country: "USA",
    price: 178,
    hotelsFrom: 119,
    bestTime: "April to June",
    flightTime: "2h from New York",
    image: "https://plus.unsplash.com/premium_photo-1670176447319-c5622f2fb996?q=80&w=1170&auto=format&fit=crop",
    snippet: "Live music on every corner, world-class BBQ, and the honky-tonk spirit of Music City.",
    description: "Nashville pulses with live music spilling out of legendary venues on Broadway, Michelin-star dining, and a thriving arts scene. The Bluebird Cafe, Country Music Hall of Fame, and rooftop bars with skyline views make it an electrifying getaway.",
    highlights: ["Broadway Honky-Tonks", "Bluebird Cafe", "Country Music Hall of Fame", "Hot Chicken", "Centennial Park"],
  },
  {
    city: "San Diego",
    iata: "SAN",
    region: "California",
    country: "USA",
    price: 238,
    hotelsFrom: 169,
    bestTime: "May to October",
    flightTime: "5h 30m from New York",
    image: "https://images.unsplash.com/photo-1519954352454-2d5a7353e277?q=80&w=1074&auto=format&fit=crop",
    snippet: "Year-round sunshine, world-class craft beer, and some of California's most beautiful beaches.",
    description: "San Diego offers the perfect California escape with miles of pristine beaches, the world-famous San Diego Zoo, a booming craft beer scene, and the historic Gaslamp Quarter. Mild year-round weather makes every season the right season.",
    highlights: ["Balboa Park", "San Diego Zoo", "Gaslamp Quarter", "Torrey Pines", "La Jolla Cove"],
  },
  {
    city: "Charleston",
    iata: "CHS",
    region: "South Carolina",
    country: "USA",
    price: 195,
    hotelsFrom: 149,
    bestTime: "March to May",
    flightTime: "1h 45m from New York",
    image: "https://images.unsplash.com/photo-1623608103487-3953899aff0b?q=80&w=1074&auto=format&fit=crop",
    snippet: "Pastel antebellum architecture, James Beard-awarded restaurants, and breathtaking plantation gardens.",
    description: "Charleston enchants with its rainbow-colored Rainbow Row, cobblestone streets, and exceptional Lowcountry cuisine. Historic plantations, sailboat tours on the harbor, and the laid-back Southern pace make it one of America's most beloved cities.",
    highlights: ["Rainbow Row", "Fort Sumter", "Magnolia Plantation", "King Street Dining", "Folly Beach"],
  },
  {
    city: "Puerto Rico",
    iata: "SJU",
    region: "Caribbean",
    country: "USA Territory",
    price: 268,
    hotelsFrom: 159,
    bestTime: "December to April",
    flightTime: "3h 30m from New York",
    image: "https://plus.unsplash.com/premium_photo-1661962694871-5422f8c4c506?q=80&w=1170&auto=format&fit=crop",
    snippet: "Bioluminescent bays, Old San Juan's colorful forts, and no passport required for US travelers.",
    description: "Puerto Rico dazzles with the cobblestone streets and colorful fortresses of Old San Juan, bioluminescent bays that glow electric blue at night, and stunning beaches from Condado to Rincon. As a US territory, no passport is required.",
    highlights: ["Old San Juan", "El Yunque Rainforest", "Bioluminescent Bay", "Condado Beach", "El Morro Fort"],
  },
];

// Layout config: 3 featured (large) + 3 medium + 6 small
const FEATURED = 3;
const MEDIUM = 3;

function MobileDestCard({
  dest,
  onClick,
  compact = false,
}: {
  dest: Destination;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 rounded-[16px] overflow-hidden cursor-pointer group snap-start"
      style={{
        width: compact ? "130px" : "162px",
        height: compact ? "178px" : "232px",
        boxShadow: "0 4px 20px rgba(26,15,13,0.14)",
      }}
    >
      <img
        src={dest.image}
        alt={dest.city}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,4,3,0.90) 0%, rgba(10,4,3,0.28) 55%, rgba(10,4,3,0.04) 100%)",
        }}
      />
      {/* Price pill */}
      <div
        className="absolute top-[10px] right-[10px] px-[9px] py-[3px] rounded-full font-body font-semibold"
        style={{
          fontSize: "9px",
          background: "linear-gradient(120deg, #C9A84C 0%, #E8C96A 100%)",
          color: "#1A0F0D",
          letterSpacing: "0.04em",
        }}
      >
        from ${dest.price}
      </div>
      {/* Bottom info */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ padding: compact ? "10px" : "14px" }}
      >
        <p
          className="font-body uppercase tracking-[0.08em] mb-[3px]"
          style={{ fontSize: "8px", color: "rgba(255,255,255,0.45)" }}
        >
          {dest.region}
        </p>
        <p
          className="font-display font-semibold text-white leading-[1.0]"
          style={{ fontSize: compact ? "15px" : "19px", letterSpacing: "-0.01em", marginBottom: compact ? "6px" : "9px" }}
        >
          {dest.city}
        </p>
        {!compact && (
          <p
            className="font-body text-white/60 leading-[1.45] mb-[8px] line-clamp-2"
            style={{ fontSize: "11px" }}
          >
            {dest.snippet}
          </p>
        )}
        <div
          className="inline-flex items-center gap-[3px] font-body font-medium text-white rounded-full"
          style={{
            fontSize: "10px",
            padding: compact ? "3px 8px" : "4px 10px",
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.22)",
          }}
        >
          Explore <ArrowUpRight size={9} />
        </div>
      </div>
    </div>
  );
}

function DestCard({
  dest,
  size,
  onClick,
}: {
  dest: Destination;
  size: "large" | "medium" | "small";
  onClick: () => void;
}) {
  const heights = { large: 480, medium: 360, small: 240 };
  const titleSizes = { large: "32px", medium: "24px", small: "19px" };

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-[20px] cursor-pointer group"
      style={{
        height: `${heights[size]}px`,
        boxShadow: "0 6px 32px rgba(26,15,13,0.14)",
      }}
    >
      {/* Photo */}
      <img
        src={dest.image}
        alt={`${dest.city}, ${dest.region}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Base gradient  always present */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,4,3,0.92) 0%, rgba(10,4,3,0.45) 40%, rgba(10,4,3,0.08) 75%, transparent 100%)",
        }}
      />

      {/* Hover burgundy tint */}
      <div className="absolute inset-0 bg-burg-deep/0 group-hover:bg-burg-deep/12 transition-colors duration-500" />

      {/* Gold price pill  top right */}
      <div
        className="absolute top-[16px] right-[16px] px-[12px] py-[5px] rounded-full font-body font-semibold tracking-[0.06em] uppercase"
        style={{
          fontSize: "10px",
          background: "linear-gradient(120deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
          color: "#1A0F0D",
          boxShadow: "0 2px 10px rgba(201,168,76,0.30)",
        }}
      >
        from ${dest.price}
      </div>

      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ padding: size === "small" ? "14px" : "22px" }}
      >
        {/* Region label  hidden on small cards */}
        {size !== "small" && (
          <p
            className="font-body uppercase tracking-[0.10em] mb-[5px]"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.50)" }}
          >
            {dest.region}, {dest.country}
          </p>
        )}

        {/* City name */}
        <p
          className="font-display font-semibold text-white leading-[1.0] mb-[6px]"
          style={{ fontSize: titleSizes[size], letterSpacing: "-0.01em" }}
        >
          {dest.city}
        </p>

        {/* Snippet  large only always visible, medium on hover */}
        {size !== "small" && (
          <p
            className={`font-body text-white/70 leading-[1.55] mb-[14px] line-clamp-2 transition-all duration-400 ${
              size === "large"
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[52px] overflow-hidden"
            }`}
            style={{ fontSize: "13px" }}
          >
            {dest.snippet}
          </p>
        )}

        {/* Bottom row  full on large/medium, just explore on small */}
        <div className="flex items-center justify-between">
          {size !== "small" ? (
            <div className="flex items-center gap-[5px]">
              <span className="font-body uppercase tracking-[0.05em]" style={{ fontSize: "10px", color: "rgba(255,255,255,0.40)" }}>
                Hotels
              </span>
              <span className="font-display font-medium" style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>
                from ${dest.hotelsFrom}
              </span>
            </div>
          ) : (
            <p
              className="font-body uppercase tracking-[0.06em]"
              style={{ fontSize: "9px", color: "rgba(255,255,255,0.40)" }}
            >
              {dest.region}
            </p>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="flex items-center gap-[4px] font-body font-medium text-white rounded-full transition-all duration-300 backdrop-blur-sm group-hover:bg-white/25"
            style={{
              fontSize: size === "small" ? "11px" : "12px",
              padding: size === "small" ? "4px 10px" : "6px 13px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            Explore
            <ArrowUpRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const router = useRouter();
  const [selected, setSelected] = useState<Destination | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    if (selected) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const featured = destinations.slice(0, FEATURED);
  const medium = destinations.slice(FEATURED, FEATURED + MEDIUM);
  const small = destinations.slice(FEATURED + MEDIUM);

  return (
    <>
      <section
        className="py-[64px] lg:py-[110px]"
        style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F2EBE1 100%)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

          {/* ── Section header ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[20px] mb-[32px] lg:mb-[52px]">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.14em] text-warm-mid mb-[12px]">
                Where we go
              </p>
              <h2
                className="font-display font-medium text-warm-dark leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: "clamp(28px, 5vw, 52px)" }}
              >
                Popular destinations
              </h2>
            </div>
            <p className="font-body text-[14px] text-warm-mid leading-[1.72] max-w-[320px] lg:text-right pb-[2px]">
              Real agents who&apos;ve been there. Every destination,
              personally recommended.
            </p>
          </div>

          {/* ── Mobile: two horizontal scroll rows ── */}
          <div className="lg:hidden flex flex-col gap-[14px]">
            {/* Row 1 - bigger cards (first 6) */}
            <div
              className="flex gap-[10px] overflow-x-auto pb-[2px] -mx-6 px-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {destinations.slice(0, 6).map((dest) => (
                <MobileDestCard
                  key={dest.city}
                  dest={dest}
                  onClick={() => setSelected(dest)}
                />
              ))}
            </div>
            {/* Row 2 - compact cards (last 6) */}
            <div
              className="flex gap-[10px] overflow-x-auto pb-[2px] -mx-6 px-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {destinations.slice(6).map((dest) => (
                <MobileDestCard
                  key={dest.city}
                  dest={dest}
                  compact
                  onClick={() => setSelected(dest)}
                />
              ))}
            </div>
          </div>

          {/* ── Desktop: 3-tier grid ── */}
          <div className="hidden lg:block">
            {/* Featured row: 3 large cards */}
            <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
              {featured.map((dest) => (
                <DestCard
                  key={dest.city}
                  dest={dest}
                  size="large"
                  onClick={() => setSelected(dest)}
                />
              ))}
            </div>

            {/* Medium row: 3 medium cards */}
            <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
              {medium.map((dest) => (
                <DestCard
                  key={dest.city}
                  dest={dest}
                  size="medium"
                  onClick={() => setSelected(dest)}
                />
              ))}
            </div>

            {/* Small row: 6 small cards */}
            <div className="grid grid-cols-6 gap-[14px]">
              {small.map((dest) => (
                <DestCard
                  key={dest.city}
                  dest={dest}
                  size="small"
                  onClick={() => setSelected(dest)}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom trust nudge ── */}
          <div className="flex items-center justify-center gap-[8px] mt-[48px]">
            <div className="flex gap-[2px]">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={13} fill="#C9A84C" color="#C9A84C" />
              ))}
            </div>
            <p className="font-body text-[13px] text-warm-mid">
              <span className="font-semibold text-warm-dark">30,000+</span> trips booked, every one by a real agent
            </p>
          </div>

        </div>
      </section>

      {/* ── Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
          style={{ background: "rgba(8,3,2,0.85)", backdropFilter: "blur(14px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full sm:max-w-[900px] max-h-[96vh] sm:max-h-[88vh] flex flex-col sm:flex-row overflow-hidden"
            style={{
              borderRadius: "28px 28px 0 0",
              ...(typeof window !== "undefined" && window.innerWidth >= 640
                ? { borderRadius: "28px" }
                : {}),
              boxShadow: "0 40px 120px rgba(10,4,3,0.65), 0 0 0 1px rgba(201,168,76,0.14)",
              background: "#FAF7F2",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Left: Photo panel ── */}
            <div className="relative w-full sm:w-[42%] shrink-0 h-[260px] sm:h-auto overflow-hidden">
              <img
                src={selected.image}
                alt={selected.city}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.88)" }}
              />

              {/* Cinematic gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,3,2,0.95) 0%, rgba(8,3,2,0.50) 35%, rgba(8,3,2,0.10) 65%, transparent 100%)",
                }}
              />

              {/* Right edge fade (bleeds into right panel) */}
              {/* <div
                className="absolute inset-y-0 right-0 w-[60px] hidden sm:block"
                style={{
                  background: "linear-gradient(to right, transparent, #FAF7F2)",
                }}
              /> */}

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-[16px] right-[16px] sm:right-[24px] w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.20)",
                }}
              >
                <X size={14} color="#fff" strokeWidth={2.5} />
              </button>

              {/* Gold price badge */}
              <div
                className="absolute top-[16px] left-[16px] flex items-center gap-[5px] px-[12px] py-[6px] rounded-full font-body font-semibold tracking-[0.06em] uppercase"
                style={{
                  fontSize: "10px",
                  background: "linear-gradient(120deg, #C9A84C 0%, #E8C96A 60%, #C9A84C 100%)",
                  color: "#1A0F0D",
                  boxShadow: "0 2px 12px rgba(201,168,76,0.35)",
                }}
              >
                ✦ from ${selected.price}
              </div>

              {/* City name burned into photo */}
              <div className="absolute bottom-0 left-0 right-0 px-[24px] pb-[24px]">
                <p
                  className="font-body uppercase tracking-[0.12em] mb-[5px]"
                  style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)" }}
                >
                  {selected.region} · {selected.country}
                </p>
                <h2
                  className="font-display font-semibold text-white leading-[0.95]"
                  style={{ fontSize: "clamp(30px, 5vw, 44px)", letterSpacing: "-0.02em" }}
                >
                  {selected.city}
                </h2>
              </div>
            </div>

            {/* ── Right: Content panel ── */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Scrollable area */}
              <div className="flex-1 overflow-y-auto px-[28px] pt-[28px] pb-[4px]">

                {/* Snippet */}
                <p
                  className="font-display italic leading-[1.55] mb-[24px]"
                  style={{ fontSize: "17px", color: "#6B5244" }}
                >
                  &ldquo;{selected.snippet}&rdquo;
                </p>

                {/* ── Stat tiles ── */}
                <div className="grid grid-cols-2 gap-[10px] mb-[24px]">
                  {[
                    { icon: MapPin, label: "Flights from", value: `$${selected.price}`, sub: "per person", burg: true },
                    { icon: MapPin, label: "Hotels from", value: `$${selected.hotelsFrom}`, sub: "per night", burg: true },
                    { icon: Calendar, label: "Best time", value: selected.bestTime, sub: null, burg: false },
                    { icon: Clock, label: "Flight time", value: selected.flightTime, sub: null, burg: false },
                  ].map(({ icon: Icon, label, value, sub, burg }) => (
                    <div
                      key={label}
                      className="flex flex-col items-start rounded-[14px] px-[14px] py-[14px] gap-[8px]"
                      style={{
                        background: burg ? "rgba(92,24,40,0.05)" : "#fff",
                        border: `1px solid ${burg ? "rgba(92,24,40,0.10)" : "#EDE0CC"}`,
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0"
                        style={{ background: burg ? "#F5EAED" : "#FAF7F2" }}
                      >
                        <Icon size={12} style={{ color: burg ? "#5C1828" : "#A89282" }} />
                      </div>
                      {/* Label + value stacked */}
                      <div className="flex flex-col gap-[3px]">
                        <p
                          className="font-body uppercase tracking-[0.08em]"
                          style={{ fontSize: "9px", color: "#A89282" }}
                        >
                          {label}
                        </p>
                        <p
                          className="font-display font-semibold leading-[1.1]"
                          style={{
                            fontSize: burg ? "20px" : "12px",
                            color: burg ? "#5C1828" : "#1A0F0D",
                            letterSpacing: burg ? "-0.01em" : "0",
                          }}
                        >
                          {value}
                        </p>
                        {sub && (
                          <p className="font-body" style={{ fontSize: "9px", color: "#A89282" }}>{sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p
                  className="font-body leading-[1.78] mb-[24px]"
                  style={{ fontSize: "14px", color: "#6B5244" }}
                >
                  {selected.description}
                </p>

                {/* Highlights */}
                <div className="mb-[8px]">
                  <div className="flex items-center gap-[10px] mb-[12px]">
                    <span
                      className="font-body uppercase tracking-[0.12em]"
                      style={{ fontSize: "9px", color: "#A89282" }}
                    >
                      Top highlights
                    </span>
                    <div className="flex-1 h-px" style={{ background: "#EDE0CC" }} />
                  </div>
                  <div className="flex flex-wrap gap-[7px]">
                    {selected.highlights.map((h, i) => (
                      <span
                        key={h}
                        className="font-body font-medium flex items-center gap-[6px] px-[13px] py-[7px] rounded-full"
                        style={{
                          fontSize: "12px",
                          background: i === 0
                            ? "linear-gradient(120deg, #5C1828 0%, #8B2A3F 100%)"
                            : "#F5EAED",
                          color: i === 0 ? "#fff" : "#5C1828",
                          boxShadow: i === 0 ? "0 2px 10px rgba(92,24,40,0.28)" : "none",
                          border: i === 0 ? "none" : "1px solid rgba(92,24,40,0.09)",
                        }}
                      >
                        {i === 0 && <span style={{ color: "#C9A84C", fontSize: "10px" }}>★</span>}
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Sticky CTA footer ── */}
              <div
                className="shrink-0 px-[28px] py-[16px]"
                style={{
                  borderTop: "1px solid #EDE0CC",
                  background: "rgba(250,247,242,0.97)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Trust line */}
                <p
                  className="font-body mb-[10px]"
                  style={{ fontSize: "11px", color: "#A89282" }}
                >
                  Real agents · No hidden fees ·{" "}
                  <span style={{ color: "#1A0F0D", fontWeight: 500 }}>1-800-TRIPILE</span>
                  {" "}· Mon–Sat, 8am–9pm ET
                </p>

                {/* Buttons */}
                <div className="flex gap-[10px]">
                  <a
                    href="tel:1-800-963-4330"
                    className="flex-1 inline-flex items-center justify-center gap-[7px] font-body font-medium rounded-[8px] h-[40px] transition-all duration-200 hover:opacity-85"
                    style={{
                      fontSize: "13px",
                      background: "transparent",
                      border: "1px solid #5C1828",
                      color: "#5C1828",
                    }}
                  >
                    <Phone size={13} />
                    Call us
                  </a>
                  <button
                    onClick={() => {
                      router.push(
                        `/flights?destination=${selected.iata}&destinationCity=${encodeURIComponent(selected.city)}`,
                      );
                    }}
                    className="flex-[2] inline-flex items-center justify-center gap-[7px] font-body font-medium text-white rounded-[8px] h-[40px] transition-all duration-200 hover:opacity-90"
                    style={{
                      fontSize: "13px",
                      background: "linear-gradient(120deg, #5C1828 0%, #8B2A3F 100%)",
                      boxShadow: "0 4px 16px rgba(92,24,40,0.28)",
                    }}
                  >
                    Book {selected.city}
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
