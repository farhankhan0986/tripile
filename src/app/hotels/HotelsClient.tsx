"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal, ArrowUpDown, ChevronDown, ChevronUp,
  Star, Hotel as HotelIcon, X,
} from "lucide-react";
import PhoneBar from "@/components/ui/PhoneBar";
import Button from "@/components/ui/Button";
import HotelResultCard, { type HotelResult } from "@/components/HotelResultCard";
import SearchBox, { type SearchValues } from "@/components/ui/SearchBox";
import type { HotelSearchParams, SortOption, PropertyType } from "@/lib/hotels/types";

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-[18px] flex flex-col sm:flex-row overflow-hidden animate-pulse" style={{ background: "#fff", border: "1px solid #EDE0CC" }}>
      <div className="w-full sm:w-[240px] h-[200px] sm:h-auto shrink-0" style={{ background: "#EDE0CC" }} />
      <div className="flex-1 p-[24px] flex flex-col justify-between gap-[16px]">
        <div className="flex flex-col gap-[8px]">
          <div className="h-[22px] w-[55%] rounded-full" style={{ background: "#EDE0CC" }} />
          <div className="h-[12px] w-[32%] rounded-full" style={{ background: "#F5EAED" }} />
          <div className="h-[12px] w-[45%] rounded-full" style={{ background: "#EDE0CC" }} />
        </div>
        <div className="flex items-end justify-between">
          <div className="h-[28px] w-[120px] rounded-full" style={{ background: "#F5EAED" }} />
          <div className="flex gap-[8px]">
            <div className="h-[36px] w-[80px] rounded-full" style={{ background: "#EDE0CC" }} />
            <div className="h-[36px] w-[100px] rounded-full" style={{ background: "#F5EAED" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-[24px] py-[80px] text-center rounded-[20px]" style={{ background: "#fff", border: "1px solid #EDE0CC" }}>
      <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center" style={{ background: "#F5EAED" }}>
        <HotelIcon size={28} style={{ color: "#5C1828" }} />
      </div>
      <div>
        <p className="font-display font-medium text-[24px] text-warm-dark mb-[8px]">No hotels found</p>
        <p className="font-body text-[15px] text-warm-mid leading-[1.65] max-w-[360px]">
          Try a different city or adjust your filters. Our agents also have access to exclusive inventory not listed here.
        </p>
      </div>
      <Button variant="phone">Call 1-800-963-4330</Button>
    </div>
  );
}

// ── Sort Button ───────────────────────────────────────────────────────────────

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended"        },
  { value: "price_asc",   label: "Price: Low to High" },
  { value: "price_desc",  label: "Price: High to Low" },
  { value: "rating",      label: "Top Rated"          },
  { value: "popularity",  label: "Most Popular"       },
];

const PROPERTY_TYPES: { value: PropertyType | "all"; label: string }[] = [
  { value: "all",       label: "All Types"  },
  { value: "hotel",     label: "Hotel"      },
  { value: "resort",    label: "Resort"     },
  { value: "boutique",  label: "Boutique"   },
  { value: "apartment", label: "Apartment"  },
  { value: "villa",     label: "Villa"      },
];

// ── Filter panel (desktop sidebar / mobile sheet) ─────────────────────────────

function FilterPanel({
  params,
  setParams,
  onClose,
}: {
  params: HotelSearchParams;
  setParams: (p: HotelSearchParams) => void;
  onClose?: () => void;
}) {
  const [priceMax, setPriceMax] = useState(String(params.maxPrice ?? ""));

  function set(patch: Partial<HotelSearchParams>) {
    setParams({ ...params, ...patch });
  }

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-body font-semibold text-[15px] text-warm-dark">Filters</p>
        {onClose && (
          <button type="button" onClick={onClose} className="hover:opacity-70 transition-opacity">
            <X size={18} style={{ color: "#6B5244" }} />
          </button>
        )}
      </div>

      {/* Star rating */}
      <div>
        <p className="font-body font-medium text-[12px] uppercase tracking-[0.08em] text-warm-mid mb-[10px]">Star Rating</p>
        <div className="flex gap-[6px] flex-wrap">
          {[0, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set({ minStars: params.minStars === s ? 0 : s })}
              className="flex items-center gap-[4px] px-[12px] py-[7px] rounded-full font-body text-[12px] transition-all"
              style={{
                background: params.minStars === s ? "#5C1828" : "#fff",
                color:      params.minStars === s ? "#fff"    : "#6B5244",
                border:     `1px solid ${params.minStars === s ? "#5C1828" : "#EDE0CC"}`,
              }}
            >
              {s === 0 ? "Any" : (
                <>{s}<Star size={10} fill={params.minStars === s ? "#fff" : "#C9A84C"} style={{ color: params.minStars === s ? "#fff" : "#C9A84C" }} />+</>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Property type */}
      <div>
        <p className="font-body font-medium text-[12px] uppercase tracking-[0.08em] text-warm-mid mb-[10px]">Property Type</p>
        <div className="flex flex-col gap-[4px]">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => set({ propertyType: t.value })}
              className="text-left px-[12px] py-[8px] rounded-[8px] font-body text-[13px] transition-colors"
              style={{
                background: (params.propertyType ?? "all") === t.value ? "#F5EAED" : "transparent",
                color:      (params.propertyType ?? "all") === t.value ? "#5C1828" : "#6B5244",
                fontWeight: (params.propertyType ?? "all") === t.value ? 600 : 400,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <p className="font-body font-medium text-[12px] uppercase tracking-[0.08em] text-warm-mid mb-[10px]">
          Max Price / Night
        </p>
        <div className="flex items-center gap-[8px]">
          <span className="font-body text-[14px] text-warm-mid">$</span>
          <input
            type="number"
            placeholder="Any"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            onBlur={() => set({ maxPrice: priceMax ? Number(priceMax) : undefined })}
            className="flex-1 font-body text-[14px] px-[12px] py-[8px] rounded-[8px] outline-none"
            style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#1A0F0D" }}
          />
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={() => {
          setParams({ city: params.city, checkIn: params.checkIn, checkOut: params.checkOut, guests: params.guests, rooms: params.rooms, sortBy: params.sortBy });
          setPriceMax("");
        }}
        className="font-body text-[13px] text-warm-mid hover:text-warm-dark transition-colors text-center"
      >
        Reset filters
      </button>
    </div>
  );
}

// ── Main client ───────────────────────────────────────────────────────────────

function HotelsInner() {
  const searchParams = useSearchParams();

  const [results, setResults]     = useState<HotelResult[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [sortOpen, setSortOpen]       = useState(false);

  const [params, setParams] = useState<HotelSearchParams>({
    city:      searchParams.get("city")    ?? "",
    checkIn:   searchParams.get("checkIn") ?? "",
    checkOut:  searchParams.get("checkOut") ?? "",
    guests:    Number(searchParams.get("guests") ?? 2),
    rooms:     Number(searchParams.get("rooms")  ?? 1),
    sortBy:    "recommended",
    propertyType: "all",
    minStars:  0,
  });

  async function runSearch(p: HotelSearchParams) {
    setLoading(true);
    setError("");
    setHasSearched(true);
    setSortOpen(false);
    setFilterOpen(false);
    try {
      const res = await fetch("/api/hotels/search", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(p),
      });
      if (!res.ok) throw new Error(`Search failed: ${res.status}`);
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setError("Something went wrong. Please try again or call us.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  // Auto-search on mount (show all hotels or filter by city from URL)
  useEffect(() => {
    runSearch(params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearchBoxSearch(values: SearchValues) {
    if (values.tab !== "hotels") return;
    const updated: HotelSearchParams = {
      ...params,
      city:     values.city,
      checkIn:  values.checkIn,
      checkOut: values.checkOut,
      guests:   values.guests,
      rooms:    values.rooms,
    };
    setParams(updated);
    runSearch(updated);
  }

  function handleParamChange(patch: Partial<HotelSearchParams>) {
    const updated = { ...params, ...patch };
    setParams(updated);
    runSearch(updated);
  }

  const sortLabel = SORT_OPTIONS.find((s) => s.value === params.sortBy)?.label ?? "Recommended";

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* ── Hero / Search Header ── */}
      <div className="relative pt-[90px] pb-[32px] sm:pt-[110px] sm:pb-[56px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2000&auto=format&fit=crop')" }}
        />
        {/* Overlays - identical to Hero.tsx */}
        <div className="absolute inset-0" style={{ background: "rgba(12,5,3,0.52)" }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(10,4,2,0.55) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-[12px] w-full px-6">
          {/* Eyebrow */}
          <p
            className="font-body text-[11px] uppercase tracking-[0.20em] mb-[4px]"
            style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.20em" }}
          >
            Tripile · Hotels
          </p>

          {/* Headline */}
          <h1
            className="font-display font-semibold text-white leading-[0.94] tracking-[-0.025em] text-center mb-[12px]"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Find your{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(90deg, #C9A84C 0%, #e8c97a 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              perfect stay.
            </em>
          </h1>

          {/* Sub-copy */}
          <p
            className="font-body leading-[1.75] mb-[24px] max-w-[420px] text-center"
            style={{ fontSize: "17px", color: "rgba(255,255,255,0.58)" }}
          >
            Boutique hideaways to luxury resorts - our agents know them all.
          </p>

          {/* Same SearchBox as home hero, locked to hotels tab */}
          <SearchBox
            activeTab="hotels"
            setActiveTab={() => {}}
            onSearch={handleSearchBoxSearch}
            className="w-full max-w-[820px]"
          />
        </div>
      </div>


      <PhoneBar />

      {/* ── Results area ── */}
      <div className="flex-1 py-[32px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex gap-[24px] items-start">

            {/* ── Desktop filter sidebar ── */}
            <div
              className="hidden lg:block w-[220px] shrink-0 rounded-[16px] p-[20px] sticky top-[84px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC" }}
            >
              <FilterPanel params={params} setParams={handleParamChange} />
            </div>

            {/* ── Results column ── */}
            <div className="flex-1 min-w-0">

              {/* Results header */}
              {!loading && (
                <div className="flex items-center justify-between mb-[16px] flex-wrap gap-[10px]">
                  <div>
                    {hasSearched && (
                      <h2 className="font-display font-medium text-[22px] text-warm-dark leading-none">
                        {results.length} hotel{results.length !== 1 ? "s" : ""}
                        {params.city ? ` in ${params.city}` : " worldwide"}
                      </h2>
                    )}
                    <p className="font-body text-[12px] text-warm-mid mt-[3px]">Per night · taxes may apply</p>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    {/* Mobile filter */}
                    <button
                      type="button"
                      onClick={() => setFilterOpen(true)}
                      className="lg:hidden flex items-center gap-[6px] font-body text-[13px] px-[14px] py-[8px] rounded-full transition-all"
                      style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#6B5244" }}
                    >
                      <SlidersHorizontal size={13} /> Filter
                    </button>

                    {/* Sort */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSortOpen((o) => !o)}
                        className="flex items-center gap-[6px] font-body text-[13px] px-[14px] py-[8px] rounded-full transition-all"
                        style={{ background: "#fff", border: "1px solid #EDE0CC", color: "#6B5244" }}
                      >
                        <ArrowUpDown size={13} />
                        {sortLabel}
                        {sortOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                      {sortOpen && (
                        <div
                          className="absolute right-0 top-[calc(100%+6px)] z-[999] rounded-[12px] overflow-hidden py-[4px]"
                          style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 12px 40px rgba(26,15,13,0.12)", minWidth: "190px" }}
                        >
                          {SORT_OPTIONS.map((s) => (
                            <button
                              key={s.value}
                              type="button"
                              onClick={() => handleParamChange({ sortBy: s.value })}
                              className="w-full text-left px-[14px] py-[9px] font-body text-[13px] transition-colors hover:bg-black/4"
                              style={{
                                color:      params.sortBy === s.value ? "#5C1828" : "#6B5244",
                                fontWeight: params.sortBy === s.value ? 600 : 400,
                                background: params.sortBy === s.value ? "#F5EAED" : "transparent",
                              }}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex flex-col gap-[14px]">
                  {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              )}

              {!loading && error && (
                <div className="flex flex-col items-center gap-[16px] py-[64px] text-center rounded-[20px]" style={{ background: "#fff", border: "1px solid #EDE0CC" }}>
                  <p className="font-body text-[15px] text-burg-deep">{error}</p>
                  <Button variant="phone">Call 1-800-963-4330</Button>
                </div>
              )}

              {!loading && !error && hasSearched && results.length === 0 && <EmptyState />}

              {!loading && !error && results.length > 0 && (
                <div className="flex flex-col gap-[14px]">
                  {results.map((r) => <HotelResultCard key={r.id} result={r} />)}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile filter sheet ── */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-[9998] lg:hidden flex items-end"
          style={{ background: "rgba(10,4,2,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="w-full rounded-t-[24px] px-[24px] pt-[24px] pb-[40px] max-h-[85dvh] overflow-y-auto"
            style={{ background: "#FAF7F2" }}
            onClick={(e) => e.stopPropagation()}
          >
            <FilterPanel params={params} setParams={handleParamChange} onClose={() => setFilterOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
}

export default function HotelsClient() {
  return (
    <Suspense>
      <HotelsInner />
    </Suspense>
  );
}
