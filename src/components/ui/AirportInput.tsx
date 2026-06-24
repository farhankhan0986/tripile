"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, X, Loader2 } from "lucide-react";

export interface AirportSuggestion {
  iata_code: string;
  name: string;
  city: string;
  country: string;
  type: "airport" | "city";
}

interface AirportInputProps {
  label: string;
  placeholder: string;
  iata: string;
  display: string;
  onChange: (iata: string, display: string) => void;
}

export default function AirportInput({
  label,
  placeholder,
  iata,
  display,
  onChange,
}: AirportInputProps) {
  const [inputText, setInputText]       = useState(display);
  const [suggestions, setSuggestions]   = useState<AirportSuggestion[]>([]);
  const [open, setOpen]                 = useState(false);
  const [loading, setLoading]           = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const debounce  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync display from parent (e.g., after reset)
  useEffect(() => {
    setInputText(display);
  }, [display]);

  // Click-outside closes dropdown
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/airports/suggest?q=${encodeURIComponent(q)}`);
      const data: AirportSuggestion[] = await res.json();
      setSuggestions(data);
      setOpen(data.length > 0);
      setHighlightIdx(-1);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(val: string) {
    setInputText(val);
    // Clear the stored IATA when user types again
    if (iata) onChange("", "");
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => fetchSuggestions(val), 280);
  }

  function handleSelect(s: AirportSuggestion) {
    const label = `${s.city} (${s.iata_code})`;
    setInputText(label);
    onChange(s.iata_code, label);
    setSuggestions([]);
    setOpen(false);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    setInputText("");
    onChange("", "");
    setSuggestions([]);
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const isSelected = Boolean(iata);

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-col justify-center px-[16px] py-[12px] sm:px-5 sm:py-4 flex-1 min-w-0 border-b sm:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      {/* Label row */}
      <div className="flex items-center justify-center gap-[5px] mb-[6px]">
        <span
          className="font-body text-[10px] uppercase tracking-[0.12em] select-none"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {label}
        </span>
        {isSelected && (
          <span
            className="font-body text-[9px] font-bold uppercase tracking-[0.08em] px-[5px] py-[1px] rounded-full"
            style={{ background: "rgba(201,168,76,0.25)", color: "#C9A84C" }}
          >
            {iata}
          </span>
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-[6px]">
        {loading ? (
          <Loader2 size={12} className="shrink-0 animate-spin" style={{ color: "rgba(255,255,255,0.35)" }} />
        ) : (
          <MapPin size={12} className="shrink-0" style={{ color: isSelected ? "#C9A84C" : "rgba(255,255,255,0.35)" }} />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
          className="font-body text-[15px] bg-transparent outline-none w-full text-center placeholder:text-white/35 truncate"
          style={{ color: "rgba(255,255,255,0.85)", caretColor: "#fff" }}
          autoComplete="off"
          spellCheck={false}
        />
        {(inputText || iata) && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 opacity-40 hover:opacity-80 transition-opacity"
          >
            <X size={11} style={{ color: "#fff" }} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="absolute left-0 right-0 z-[9999] rounded-[16px] overflow-hidden mt-[2px]"
          style={{
            top: "calc(100% + 8px)",
            background: "rgba(18,7,5,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.55)",
            minWidth: "240px",
          }}
        >
          {suggestions.map((s, i) => (
            <button
              key={`${s.iata_code}-${i}`}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s); }}
              onMouseEnter={() => setHighlightIdx(i)}
              className="w-full flex items-center gap-[12px] px-[16px] py-[11px] text-left transition-colors duration-150"
              style={{
                background: highlightIdx === i ? "rgba(255,255,255,0.06)" : "transparent",
                borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {/* IATA badge */}
              <span
                className="font-display font-bold text-[13px] shrink-0 w-[38px] text-center"
                style={{ color: "#C9A84C" }}
              >
                {s.iata_code}
              </span>
              {/* Name + location */}
              <div className="flex flex-col min-w-0">
                <span className="font-body text-[13px] font-medium text-white truncate">
                  {s.type === "airport" ? s.name : s.city}
                </span>
                <span className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.40)" }}>
                  {s.city}{s.country ? `, ${s.country}` : ""}
                </span>
              </div>
              {/* Type badge */}
              <span
                className="shrink-0 ml-auto font-body text-[9px] uppercase tracking-[0.07em] px-[6px] py-[2px] rounded-full"
                style={{
                  background: s.type === "airport" ? "rgba(92,24,40,0.35)" : "rgba(201,168,76,0.15)",
                  color: s.type === "airport" ? "#F5EAED" : "#C9A84C",
                }}
              >
                {s.type === "airport" ? "Airport" : "City"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
