"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";

type FlightValues = { tab: "flights"; from: string; to: string; departure: string };
type HotelValues  = { tab: "hotels"; city: string; checkIn: string; checkOut: string };
export type SearchValues = FlightValues | HotelValues;

interface PageSearchBoxProps {
  activeTab: "flights" | "hotels";
  setActiveTab: (tab: "flights" | "hotels") => void;
  className?: string;
  onSearch?: (values: SearchValues) => void;
}

function Separator() {
  return (
    <div
      className="hidden sm:block w-px self-stretch my-4"
      style={{ background: "rgba(255,255,255,0.12)" }}
    />
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="flex flex-col justify-center px-[16px] py-[12px] sm:px-5 sm:py-4 flex-1 min-w-0 border-b sm:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <span
        className="font-body text-[10px] text-center uppercase tracking-[0.12em] mb-[6px] select-none"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-body text-[15px] bg-transparent outline-none w-full text-center placeholder:text-white/35"
        style={{ color: "rgba(255,255,255,0.82)", caretColor: "#fff" }}
      />
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const display = value
    ? value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-col justify-center px-[16px] py-[12px] sm:px-5 sm:py-4 flex-1 min-w-0 border-b sm:border-b-0 cursor-pointer select-none"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
      onClick={() => setOpen((o) => !o)}
    >
      <span
        className="font-body text-[10px] text-center uppercase tracking-[0.12em] mb-[6px]"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </span>

      <div className="flex items-center justify-center gap-[7px]">
        <CalendarIcon size={13} style={{ color: "rgba(255,255,255,0.50)", flexShrink: 0 }} />
        <span
          className="font-body text-[15px] text-center"
          style={{ color: display ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)" }}
        >
          {display ?? "mm / dd / yyyy"}
        </span>
      </div>

      {/* Calendar always drops below the search bar */}
      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[9999] rounded-[18px] overflow-hidden"
          style={{
            top: "calc(100% + 10px)",
            background: "rgba(22,10,8,0.94)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.50)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
}

function fmt(d: Date | undefined) {
  if (!d) return "";
  return d.toISOString().split("T")[0];
}

export default function PageSearchBox({
  activeTab,
  setActiveTab,
  className,
  onSearch,
}: PageSearchBoxProps) {
  const router = useRouter();

  const [from, setFrom]           = useState("");
  const [to, setTo]               = useState("");
  const [departure, setDeparture] = useState<Date | undefined>();
  const [city, setCity]           = useState("");
  const [checkIn, setCheckIn]     = useState<Date | undefined>();
  const [checkOut, setCheckOut]   = useState<Date | undefined>();

  function handleSearch() {
    if (onSearch) {
      if (activeTab === "flights") {
        onSearch({ tab: "flights", from, to, departure: fmt(departure) });
      } else {
        onSearch({ tab: "hotels", city, checkIn: fmt(checkIn), checkOut: fmt(checkOut) });
      }
    } else {
      router.push(activeTab === "flights" ? "/flights" : "/hotels");
    }
  }

  return (
    <div className={className ?? "w-full max-w-4xl"}>
      <div
        className="rounded-[20px] border shadow-[0_8px_40px_rgba(15,6,4,0.28)]"
        style={{
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.15)",
        }}
      >
        {/* Tab row */}
        <div className="flex gap-[6px] px-[16px] pt-[14px]">
          {(["flights", "hotels"] as const).filter((tab) => tab === activeTab).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="capitalize px-[16px] py-[6px] rounded-full font-body font-medium text-[13px] transition-all duration-200"
              style={
                activeTab === tab
                  ? { background: "#5C1828", color: "#fff", boxShadow: "0 2px 8px rgba(92,24,40,0.40)" }
                  : { background: "transparent", color: "rgba(255,255,255,0.55)" }
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Fields row */}
        <div className="flex flex-col sm:flex-row items-stretch">
          {activeTab === "flights" ? (
            <>
              <TextField label="From" placeholder="City or airport" value={from} onChange={setFrom} />
              <Separator />
              <TextField label="To" placeholder="City or airport" value={to} onChange={setTo} />
              <Separator />
              <DateField label="Departure" value={departure} onChange={setDeparture} />
            </>
          ) : (
            <>
              <TextField label="City" placeholder="Where to?" value={city} onChange={setCity} />
              <Separator />
              <DateField label="Check-in" value={checkIn} onChange={setCheckIn} />
              <Separator />
              <DateField label="Check-out" value={checkOut} onChange={setCheckOut} />
            </>
          )}

          {/* Search button */}
          <div className="flex items-center justify-center py-[12px] sm:py-0 sm:pr-[14px] sm:pl-[8px]">
            <button
              type="button"
              aria-label="Search"
              onClick={handleSearch}
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shrink-0"
              style={{
                background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
                boxShadow: "0 4px 16px rgba(92,24,40,0.45)",
              }}
            >
              <Search size={18} color="#fff" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
