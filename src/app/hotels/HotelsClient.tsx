"use client";

import { useState, useEffect } from "react";
import PageSearchBox, { type SearchValues } from "@/components/ui/PageSearchBox";
import PhoneBar from "@/components/ui/PhoneBar";
import Button from "@/components/ui/Button";
import HotelResultCard, { type HotelResult } from "@/components/HotelResultCard";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

function SkeletonCard() {
  return (
    <div
      className="rounded-[18px] flex flex-col sm:flex-row overflow-hidden animate-pulse"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 12px rgba(26,15,13,0.05)" }}
    >
      <div className="w-full sm:w-[220px] h-[200px] sm:h-auto shrink-0" style={{ background: "#EDE0CC" }} />
      <div className="flex-1 p-[24px] flex flex-col justify-between gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <div className="h-[22px] w-[55%] rounded-full" style={{ background: "#EDE0CC" }} />
          <div className="h-[13px] w-[80px] rounded-full" style={{ background: "#F5EAED" }} />
          <div className="h-[13px] w-[38%] rounded-full" style={{ background: "#EDE0CC" }} />
        </div>
        <div className="flex items-end justify-between">
          <div className="h-[26px] w-[110px] rounded-full" style={{ background: "#F5EAED" }} />
          <div className="flex gap-[8px]">
            <div className="h-[36px] w-[80px] rounded-full" style={{ background: "#EDE0CC" }} />
            <div className="h-[36px] w-[96px] rounded-full" style={{ background: "#F5EAED" }} />
          </div>
        </div>
      </div>
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
        🏨
      </div>
      <div>
        <p className="font-display font-medium text-[24px] text-warm-dark mb-[8px]">No hotels found</p>
        <p className="font-body text-[15px] text-warm-mid leading-[1.65] max-w-[360px]">
          Our agents have access to exclusive inventory not listed online  give us a call and we&apos;ll find the right room.
        </p>
      </div>
      <Button variant="phone">Call 1-800-TRIPILE</Button>
    </div>
  );
}

export default function HotelsClient() {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("hotels");
  const [results, setResults]     = useState<HotelResult[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    handleSearch({ tab: "hotels", city: "", checkIn: "", checkOut: "" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(values: SearchValues) {
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const res = await fetch("/api/hotels/search", {
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
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        {/* Layered gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,6,4,0.72) 0%, rgba(26,15,13,0.50) 55%, rgba(15,6,4,0.82) 100%)" }}
        />
        {/* Subtle warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-[10px] w-full px-6">
          {/* Eyebrow pill */}
          <div className="flex items-center gap-[8px] mb-[6px]">
            <span
              className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full font-body text-[11px] uppercase tracking-[0.08em]"
              style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <span className="w-[5px] h-[5px] rounded-full bg-gold-accent animate-pulse inline-block" />
              Exclusive rates available
            </span>
          </div>

          <h1 className="font-display font-semibold text-white leading-[1.05] tracking-[-0.01em] text-center mb-[4px]" style={{ fontSize: "clamp(28px, 5vw, 44px)" }}>
            Find your perfect hotel
          </h1>
          <p className="font-body text-[15px] text-white/65 text-center mb-[24px]">
            From boutique hideaways to luxury resorts  our agents know them all.
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

          {/* Results header */}
          {!loading && results.length > 0 && (
            <div className="flex items-center justify-between mb-[24px]">
              <div>
                <h2 className="font-display font-medium text-[24px] text-warm-dark leading-none">
                  {results.length} hotel{results.length !== 1 ? "s" : ""} found
                </h2>
                <p className="font-body text-[13px] text-warm-mid mt-[4px]">
                  Nightly rates · taxes may apply
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
            <div className="flex flex-col gap-[14px]">
              {results.map((result) => (
                <HotelResultCard key={result.id} result={result} />
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
