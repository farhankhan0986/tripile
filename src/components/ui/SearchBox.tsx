"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar as CalendarIcon,
  ChevronDown,
  Users,
  ArrowLeftRight,
  BedDouble,
} from "lucide-react";
import { Calendar } from "@/components/ui/Calendar";
import AirportInput from "@/components/ui/AirportInput";
import HotelCityInput from "@/components/ui/HotelCityInput";

// ── Types ─────────────────────────────────────────────────────────────────────

type FlightValues = {
  tab:           "flights";
  origin:        string;
  destination:   string;
  departureDate: string;
  returnDate?:   string;
  passengers:    number;
  cabinClass:    string;
};
type HotelValues = {
  tab:      "hotels";
  city:     string;
  checkIn:  string;
  checkOut: string;
  guests:   number;
  rooms:    number;
};
export type SearchValues = FlightValues | HotelValues;

interface SearchBoxProps {
  activeTab:    "flights" | "hotels";
  setActiveTab: (tab: "flights" | "hotels") => void;
  className?:   string;
  onSearch?:    (values: SearchValues) => void;
}

const CABIN_OPTIONS = [
  { value: "economy",         label: "Economy"         },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business",        label: "Business"        },
  { value: "first",           label: "First Class"     },
];

// ── Separator ─────────────────────────────────────────────────────────────────

function Separator() {
  return (
    <div
      className="hidden sm:block w-px self-stretch my-4"
      style={{ background: "rgba(255,255,255,0.12)" }}
    />
  );
}

// ── CounterField (guests / rooms) ─────────────────────────────────────────────

function CounterField({
  label, icon: Icon, value, onChange, min = 1, max = 10,
}: {
  label: string;
  icon: React.ElementType;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div
      className="flex flex-col justify-center px-[16px] py-[12px] sm:px-5 sm:py-4 min-w-0 border-b sm:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <span
        className="font-body text-[10px] text-center uppercase tracking-[0.12em] mb-[6px] select-none"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </span>
      <div className="flex items-center justify-center gap-[8px]">
        <Icon size={12} style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="font-body text-[16px] font-bold leading-none w-[18px] text-center hover:opacity-80 transition-opacity"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          −
        </button>
        <span className="font-body text-[14px] font-semibold w-[16px] text-center" style={{ color: "#fff" }}>
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="font-body text-[16px] font-bold leading-none w-[18px] text-center hover:opacity-80 transition-opacity"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          +
        </button>
      </div>
    </div>
  );
}



// ── DateField - smart flip (opens up when near bottom of viewport) ─────────────

function DateField({
  label, value, onChange, minDate,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  minDate?: Date;
}) {
  const [open, setOpen]     = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function handleToggle() {
    if (!open && wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect();
      setOpenUp(rect.bottom + 320 > window.innerHeight && rect.top > 200);
    }
    setOpen((o) => !o);
  }

  const display = value
    ? value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-col justify-center px-[16px] py-[12px] sm:px-5 sm:py-4 flex-1 min-w-0 border-b sm:border-b-0 cursor-pointer select-none"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
      onClick={handleToggle}
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
          {display ?? "date"}
        </span>
      </div>
      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[9999] rounded-[18px] overflow-hidden"
          style={{
            ...(openUp ? { bottom: "calc(100% + 10px)" } : { top: "calc(100% + 10px)" }),
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
            onSelect={(d) => { onChange(d); setOpen(false); }}
            disabled={{ before: minDate ?? new Date() }}
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

// ── Main component ────────────────────────────────────────────────────────────

export default function SearchBox({
  activeTab, setActiveTab, className, onSearch,
}: SearchBoxProps) {
  const router = useRouter();

  // Flight state
  const [fromIata, setFromIata]       = useState("");
  const [fromDisplay, setFromDisplay] = useState("");
  const [toIata, setToIata]           = useState("");
  const [toDisplay, setToDisplay]     = useState("");
  const [departure, setDeparture]     = useState<Date | undefined>();
  const [returnDate, setReturnDate]   = useState<Date | undefined>();
  const [tripType, setTripType]       = useState<"one_way" | "return">("one_way");
  const [passengers, setPassengers]   = useState(1);
  const [cabinClass, setCabinClass]   = useState("economy");
  const [cabinOpen, setCabinOpen]     = useState(false);
  const cabinRef = useRef<HTMLDivElement>(null);

  // Hotel state
  const [city, setCity]         = useState("");
  const [checkIn, setCheckIn]   = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests]     = useState(2);
  const [rooms, setRooms]       = useState(1);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (cabinRef.current && !cabinRef.current.contains(e.target as Node)) setCabinOpen(false);
    }
    if (cabinOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cabinOpen]);

  function handleSearch() {
    if (onSearch) {
      if (activeTab === "flights") {
        onSearch({
          tab:          "flights",
          origin:        fromIata,
          destination:   toIata,
          departureDate: fmt(departure),
          returnDate:    tripType === "return" ? fmt(returnDate) : undefined,
          passengers,
          cabinClass,
        });
      } else {
        onSearch({ tab: "hotels", city, checkIn: fmt(checkIn), checkOut: fmt(checkOut), guests, rooms });
      }
    } else if (activeTab === "flights") {
      // Navigate to /flights with search params so FlightsClient auto-searches
      const params = new URLSearchParams();
      if (fromIata)  params.set("origin",        fromIata);
      if (toIata)    params.set("destination",   toIata);
      if (departure) params.set("departureDate", fmt(departure));
      if (tripType === "return" && returnDate) params.set("returnDate", fmt(returnDate));
      params.set("passengers", String(passengers));
      params.set("cabinClass", cabinClass);
      router.push(`/flights?${params.toString()}`);
    } else {
      // Navigate to /hotels with all params
      const params = new URLSearchParams();
      if (city)     params.set("city",     city);
      if (checkIn)  params.set("checkIn",  fmt(checkIn));
      if (checkOut) params.set("checkOut", fmt(checkOut));
      params.set("guests", String(guests));
      params.set("rooms",  String(rooms));
      router.push(`/hotels?${params.toString()}`);
    }
  }

  const cabinLabel = CABIN_OPTIONS.find((o) => o.value === cabinClass)?.label ?? "Economy";

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
        {/* ── Top row: tabs + flight options ── */}
        <div className="flex flex-wrap items-center justify-between gap-[8px] px-[16px] pt-[14px] pb-[2px]">

          {/* Both tabs visible */}
          <div className="flex gap-[4px]">
            {(["flights", "hotels"] as const).map((tab) => (
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

          {/* Flight-only options */}
          {activeTab === "flights" && (
            <div className="flex items-center gap-[6px] flex-wrap">

              {/* One-way / Return */}
              <div
                className="flex rounded-full overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.16)" }}
              >
                {(["one_way", "return"] as const).map((t) => (
                 <button
  key={t}
  type="button"
  onClick={() => {
    setTripType(t);
    if (t === "one_way") setReturnDate(undefined);
  }}
  className="
    relative
    px-4 py-2
    rounded-full
    text-xs
    font-medium
    transition-all
    duration-200
    hover:scale-[1.02]
    active:scale-[0.98]
  "
  style={{
    background:
      tripType === t
        ? "rgba(255,255,255,0.18)"
        : "transparent",
    color:
      tripType === t
        ? "#FFFFFF"
        : "rgba(255,255,255,0.65)",
    border:
      tripType === t
        ? "1px solid rgba(255,255,255,0.18)"
        : "1px solid transparent",
    backdropFilter:
      tripType === t ? "blur(8px)" : "none",
    boxShadow:
      tripType === t
        ? "0 4px 16px rgba(0,0,0,0.15)"
        : "none",
  }}
>
                    {t === "one_way" ? "Oneway" : "Return"}
                  </button>
                ))}
              </div>

              {/* Passengers */}
              <div
                className="flex items-center gap-[6px] px-[10px] py-[8px] rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.16)" }}
              >
                <Users size={11} style={{ color: "rgba(255,255,255,0.55)" }} />
                <button
                  type="button"
                  onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                  className="font-body text-[14px] font-bold leading-none w-[16px] text-center hover:opacity-80 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  −
                </button>
                <span
                  className="font-body text-[12px] font-medium w-[10px] text-center"
                  style={{ color: "#fff" }}
                >
                  {passengers}
                </span>
                <button
                  type="button"
                  onClick={() => setPassengers((p) => Math.min(9, p + 1))}
                  className="font-body text-[14px] font-bold leading-none w-[16px] text-center hover:opacity-80 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  +
                </button>
              </div>

              {/* Cabin class */}
              <div ref={cabinRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCabinOpen((o) => !o)}
                  className="flex items-center gap-[5px] px-[10px] py-[8px] rounded-full font-body text-[11px] transition-colors duration-150"
                  style={{
                    border:     "1px solid rgba(255,255,255,0.16)",
                    color:      "rgba(255,255,255,0.75)",
                    background: cabinOpen ? "rgba(255,255,255,0.10)" : "transparent",
                  }}
                >
                  {cabinLabel}
                  <ChevronDown size={11} style={{ opacity: 0.6 }} />
                </button>
                {cabinOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+6px)] z-[9999] rounded-[12px] overflow-hidden py-[4px]"
                    style={{
                      background:     "rgba(18,7,5,0.97)",
                      backdropFilter: "blur(20px)",
                      border:         "1px solid rgba(255,255,255,0.10)",
                      boxShadow:      "0 12px 40px rgba(0,0,0,0.55)",
                      minWidth:       "160px",
                    }}
                  >
                    {CABIN_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => { setCabinClass(o.value); setCabinOpen(false); }}
                        className="w-full text-left px-[14px] py-[9px] font-body text-[13px] transition-colors duration-150"
                        style={{
                          color:      cabinClass === o.value ? "#C9A84C" : "rgba(255,255,255,0.75)",
                          background: cabinClass === o.value ? "rgba(201,168,76,0.10)" : "transparent",
                          fontWeight: cabinClass === o.value ? 600 : 400,
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* ── Fields row ── */}
        <div className="flex flex-col sm:flex-row items-stretch">
          {activeTab === "flights" ? (
            <>
              <AirportInput
                label="From"
                placeholder="City or airport"
                iata={fromIata}
                display={fromDisplay}
                onChange={(iata, display) => { setFromIata(iata); setFromDisplay(display); }}
              />
              {/* <Separator /> */}
              {/* Swap button - desktop only */}
              <div className="hidden sm:flex items-center justify-center w-0 overflow-visible z-10">
                <button
                  type="button"
                  title="Swap airports"
                  onClick={() => {
                    setFromIata(toIata);       setToIata(fromIata);
                    setFromDisplay(toDisplay); setToDisplay(fromDisplay);
                  }}
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 transition-all duration-200 hover:rotate-180"
                  style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)" }}
                >
                  <ArrowLeftRight size={12} style={{ color: "#fff" }} />
                </button>
              </div>
              <Separator />
              <AirportInput
                label="To"
                placeholder="City or airport"
                iata={toIata}
                display={toDisplay}
                onChange={(iata, display) => { setToIata(iata); setToDisplay(display); }}
              />
              <Separator />
              <DateField label="Departure" value={departure} onChange={setDeparture} />
              {tripType === "return" && (
                <>
                  <Separator />
                  <DateField
                    label="Return"
                    value={returnDate}
                    onChange={setReturnDate}
                    minDate={departure ?? new Date()}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <HotelCityInput label="Destination" placeholder="City or hotel" value={city} onChange={setCity} />
              <Separator />
              <DateField label="Check-in"  value={checkIn}  onChange={setCheckIn}  />
              <Separator />
              <DateField label="Check-out" value={checkOut} onChange={setCheckOut} minDate={checkIn} />
              <Separator />
              <CounterField label="Guests" icon={Users}     value={guests} onChange={setGuests} max={10} />
              <Separator />
              <CounterField label="Rooms"  icon={BedDouble} value={rooms}  onChange={setRooms}  max={5} />
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
                boxShadow:  "0 4px 16px rgba(92,24,40,0.45)",
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
