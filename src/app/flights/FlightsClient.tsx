"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageSearchBox, { type SearchValues } from "@/components/ui/PageSearchBox";
import PhoneBar from "@/components/ui/PhoneBar";
import Button from "@/components/ui/Button";
import FlightResultCard, { type FlightResult } from "@/components/FlightResultCard";
import { SlidersHorizontal, ArrowUpDown, Plane } from "lucide-react";

function SkeletonCard() {
  return (
    <div
      className="rounded-[18px] p-[20px] sm:p-[24px] animate-pulse"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 12px rgba(26,15,13,0.05)" }}
    >
      <div className="flex items-center gap-[12px] mb-[16px]">
        <div className="w-[42px] h-[42px] rounded-[12px] shrink-0" style={{ background: "#EDE0CC" }} />
        <div className="flex-1 flex flex-col gap-[8px]">
          <div className="h-[13px] rounded-full w-[35%]" style={{ background: "#EDE0CC" }} />
          <div className="h-[10px] rounded-full w-[20%]" style={{ background: "#F5EAED" }} />
        </div>
        <div className="h-[22px] w-[70px] rounded-full" style={{ background: "#F5EAED" }} />
      </div>
      <div className="flex items-center gap-[12px] mb-[16px]">
        <div className="flex flex-col gap-[6px]">
          <div className="h-[24px] w-[64px] rounded-full" style={{ background: "#EDE0CC" }} />
          <div className="h-[10px] w-[32px] rounded-full" style={{ background: "#F5EAED" }} />
        </div>
        <div className="flex-1 h-[2px] rounded-full" style={{ background: "#EDE0CC" }} />
        <div className="flex flex-col gap-[6px] items-end">
          <div className="h-[24px] w-[64px] rounded-full" style={{ background: "#EDE0CC" }} />
          <div className="h-[10px] w-[32px] rounded-full" style={{ background: "#F5EAED" }} />
        </div>
      </div>
      <div className="flex items-center justify-between pt-[14px]" style={{ borderTop: "1px solid #EDE0CC" }}>
        <div className="h-[12px] w-[120px] rounded-full" style={{ background: "#F5EAED" }} />
        <div className="flex gap-[8px]">
          <div className="h-[36px] w-[80px] rounded-full" style={{ background: "#EDE0CC" }} />
          <div className="h-[36px] w-[96px] rounded-full" style={{ background: "#F5EAED" }} />
        </div>
      </div>
    </div>
  );
}

function SearchPrompt() {
  return (
    <div
      className="flex flex-col items-center gap-[20px] py-[72px] text-center rounded-[24px]"
      style={{ background: "#fff", border: "1px solid #EDE0CC" }}
    >
      <div
        className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
        style={{ background: "#F5EAED" }}
      >
        <Plane size={28} style={{ color: "#5C1828" }} />
      </div>
      <div>
        <p className="font-display font-medium text-[24px] text-warm-dark mb-[8px]">
          Where are you headed?
        </p>
        <p className="font-body text-[15px] text-warm-mid leading-[1.65] max-w-[360px]">
          Enter your departure city and destination above, then hit search to see real-time fares.
        </p>
      </div>
      <a
        href="tel:1-800-963-4330"
        className="inline-flex items-center gap-[8px] font-body font-medium text-[14px] text-white rounded-[12px] px-[24px] py-[12px]"
        style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 16px rgba(92,24,40,0.30)" }}
      >
        Or call 1-800-963-4330 to book by phone
      </a>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center gap-[24px] py-[80px] text-center rounded-[20px]"
      style={{ background: "#fff", border: "1px solid #EDE0CC" }}
    >
      <div
        className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-[28px]"
        style={{ background: "#F5EAED" }}
      >
        ✈
      </div>
      <div>
        <p className="font-display font-medium text-[24px] text-warm-dark mb-[8px]">No flights found</p>
        <p className="font-body text-[15px] text-warm-mid leading-[1.65] max-w-[360px]">
          Our agents can find options not listed online. Give us a call and we&apos;ll sort it out.
        </p>
      </div>
      <Button variant="phone">Call 1-800-TRIPILE</Button>
    </div>
  );
}

export default function FlightsClient() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab]     = useState<"flights" | "hotels">("flights");
  const [results, setResults]         = useState<FlightResult[]>([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy]           = useState<"price" | "duration">("price");

  // Auto-search when arriving from hero with URL params
  useEffect(() => {
    const origin        = searchParams.get("origin")        ?? "";
    const destination   = searchParams.get("destination")   ?? "";
    const departureDate = searchParams.get("departureDate") ?? "";
    if (origin && destination && departureDate) {
      handleSearch({
        tab:          "flights",
        origin,
        destination,
        departureDate,
        returnDate:   searchParams.get("returnDate")  ?? undefined,
        passengers:   Number(searchParams.get("passengers")  ?? 1),
        cabinClass:   searchParams.get("cabinClass")  ?? "economy",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(values: SearchValues) {
    if (values.tab !== "flights") return;
    if (!values.origin || !values.destination || !values.departureDate) return;

    setLoading(true);
    setError("");
    setHasSearched(true);
     setTimeout(() => {
        window.scrollBy({
          top: 400,
          behavior: "smooth",
        });
      }, 300);
    try {
      const res = await fetch("/api/flights/search", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Search failed: ${res.status}`);
     
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const sorted = [...results].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : a.duration.localeCompare(b.duration),
  );

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* ── Hero / Search ── */}
      <div className="relative pt-[90px] pb-[40px] sm:pt-[110px] sm:pb-[60px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1725408032701-45831d3e6ad0?q=80&w=1169&auto=format&fit=crop')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,6,4,0.72) 0%, rgba(92,24,40,0.55) 60%, rgba(15,6,4,0.80) 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-[10px] w-full px-6">
          <div className="flex items-center gap-[8px] mb-[6px]">
            <span
              className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full font-body text-[11px] uppercase tracking-[0.08em]"
              style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
              Live fares · Duffel
            </span>
          </div>

          <h1
            className="font-display font-semibold text-white leading-[1.05] tracking-[-0.01em] text-center mb-[4px]"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            Find your next flight
          </h1>
          <p className="font-body text-[15px] text-white/65 text-center mb-[24px]">
            Real-time fares from hundreds of airlines, with a real agent one call away.
          </p>

          <PageSearchBox
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="w-full max-w-4xl"
            onSearch={handleSearch}
            initialToIata={searchParams.get("destination") ?? ""}
            initialToDisplay={searchParams.get("destinationCity") ?? ""}
          />
        </div>
      </div>

      <PhoneBar />

      {/* ── Results ── */}
      <div className="flex-1 py-[40px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

          {/* Results header */}
          {!loading && results.length > 0 && (
            <div className="flex items-center justify-between mb-[24px] flex-wrap gap-[12px]">
              <div>
                <h2 className="font-display font-medium text-[24px] text-warm-dark leading-none">
                  {results.length} flight{results.length !== 1 ? "s" : ""} found
                </h2>
                <p className="font-body text-[13px] text-warm-mid mt-[4px]">
                  Per person · taxes &amp; fees included
                </p>
              </div>
              <div className="flex items-center gap-[10px]">
                <button
                  onClick={() => setSortBy("price")}
                  className="flex items-center gap-[7px] font-body text-[13px] px-[14px] py-[8px] rounded-full transition-all duration-200"
                  style={{
                    background: sortBy === "price" ? "#5C1828" : "#fff",
                    color:      sortBy === "price" ? "#fff"    : "#6B5244",
                    border: `1px solid ${sortBy === "price" ? "#5C1828" : "#EDE0CC"}`,
                  }}
                >
                  <ArrowUpDown size={13} />
                  Cheapest
                </button>
                <button
                  onClick={() => setSortBy("duration")}
                  className="flex items-center gap-[7px] font-body text-[13px] px-[14px] py-[8px] rounded-full transition-all duration-200"
                  style={{
                    background: sortBy === "duration" ? "#5C1828" : "#fff",
                    color:      sortBy === "duration" ? "#fff"    : "#6B5244",
                    border: `1px solid ${sortBy === "duration" ? "#5C1828" : "#EDE0CC"}`,
                  }}
                >
                  <SlidersHorizontal size={13} />
                  Fastest
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col gap-[14px]">
              {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div
              className="flex flex-col items-center gap-[16px] py-[64px] text-center rounded-[20px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC" }}
            >
              <p className="font-body text-[15px] text-burg-deep">{error}</p>
              <Button variant="phone">Call 1-800-TRIPILE</Button>
            </div>
          )}

          {!loading && !error && !hasSearched && <SearchPrompt />}
          {!loading && !error && hasSearched && results.length === 0 && <EmptyState />}

          {!loading && !error && sorted.length > 0 && (
            <div className="flex flex-col gap-[12px]">
              {sorted.map((r) => <FlightResultCard key={r.id} result={r} />)}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
