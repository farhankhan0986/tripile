"use client";

import { useState, useEffect } from "react";
import PageSearchBox, { type SearchValues } from "@/components/ui/PageSearchBox";
import PhoneBar from "@/components/ui/PhoneBar";
import Button from "@/components/ui/Button";
import FlightResultCard, { type FlightResult } from "@/components/FlightResultCard";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

function SkeletonCard() {
  return (
    <div
      className="rounded-[18px] px-[28px] py-[24px] flex items-center gap-[24px] animate-pulse"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 12px rgba(26,15,13,0.05)" }}
    >
      <div className="w-[52px] h-[52px] rounded-[14px] shrink-0" style={{ background: "#EDE0CC" }} />
      <div className="flex-1 flex flex-col gap-[10px]">
        <div className="h-[14px] rounded-full w-[40%]" style={{ background: "#EDE0CC" }} />
        <div className="h-[28px] rounded-full w-[70%]" style={{ background: "#F5EAED" }} />
      </div>
      <div className="w-[90px] h-[44px] rounded-[12px]" style={{ background: "#EDE0CC" }} />
      <div className="w-[130px] h-[64px] rounded-[14px]" style={{ background: "#F5EAED" }} />
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
          Our agents can find options that aren&apos;t listed online  give us a call and we&apos;ll sort it out.
        </p>
      </div>
      <Button variant="phone">Call 1-800-TRIPILE</Button>
    </div>
  );
}

export default function FlightsClient() {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");
  const [results, setResults]     = useState<FlightResult[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    handleSearch({ tab: "flights", from: "", to: "", departure: "" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(values: SearchValues) {
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* ── Hero / Search Header ── */}
      <div className="relative pt-[90px] pb-[40px] sm:pt-[110px] sm:pb-[60px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1725408032701-45831d3e6ad0?q=80&w=1169&auto=format&fit=crop')",
          }}
        />
        {/* Layered gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,6,4,0.72) 0%, rgba(92,24,40,0.55) 60%, rgba(15,6,4,0.80) 100%)" }}
        />
        {/* Subtle radial warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-[10px] w-full px-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-[8px] mb-[6px]">
            <span
              className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full font-body text-[11px] uppercase tracking-[0.08em]"
              style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
              Agents standing by
            </span>
          </div>

          <h1 className="font-display font-semibold text-white leading-[1.05] tracking-[-0.01em] text-center mb-[4px]" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
            Find your next flight
          </h1>
          <p className="font-body text-[15px] text-white/65 text-center mb-[24px]">
            Search, compare, and book with a real person just one call away.
          </p>

          <PageSearchBox
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="w-full max-w-4xl"
            onSearch={handleSearch}
          />
        </div>
      </div>

      <PhoneBar />

      {/* ── Results area ── */}
      <div className="flex-1 py-[40px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">

          {/* Results header bar */}
          {!loading && results.length > 0 && (
            <div className="flex items-center justify-between mb-[24px]">
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
                  className="flex items-center gap-[7px] font-body text-[13px] text-warm-mid px-[14px] py-[8px] rounded-full transition-all duration-200 hover:text-warm-dark"
                  style={{ background: "#fff", border: "1px solid #EDE0CC" }}
                >
                  <SlidersHorizontal size={14} />
                  Filter
                </button>
                <button
                  className="flex items-center gap-[7px] font-body text-[13px] text-warm-mid px-[14px] py-[8px] rounded-full transition-all duration-200 hover:text-warm-dark"
                  style={{ background: "#fff", border: "1px solid #EDE0CC" }}
                >
                  <ArrowUpDown size={14} />
                  Best value
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col gap-[14px]">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
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

          {!loading && !error && hasSearched && results.length === 0 && (
            <EmptyState />
          )}

          {!loading && !error && results.length > 0 && (
            <div className="flex flex-col gap-[12px]">
              {results.map((result) => (
                <FlightResultCard key={result.id} result={result} />
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
