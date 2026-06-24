"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, X, Loader2, Building2 } from "lucide-react";
import type { CitySuggestion } from "@/lib/hotels/types";

interface HotelCityInputProps {
  label:       string;
  placeholder: string;
  value:       string;
  onChange:    (city: string) => void;
  darkGlass?:  boolean; // true = SearchBox style (white-on-dark), false = light card style
}

export default function HotelCityInput({
  label,
  placeholder,
  value,
  onChange,
  darkGlass = true,
}: HotelCityInputProps) {
  const [inputText, setInputText]       = useState(value);
  const [suggestions, setSuggestions]   = useState<CitySuggestion[]>([]);
  const [open, setOpen]                 = useState(false);
  const [loading, setLoading]           = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setInputText(value); }, [value]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hotels/cities?q=${encodeURIComponent(q)}`);
      const data: CitySuggestion[] = await res.json();
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
    onChange(val);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => fetchSuggestions(val), 240);
  }

  function handleFocus() {
    if (suggestions.length > 0) { setOpen(true); return; }
    fetchSuggestions(inputText);
  }

  function handleSelect(s: CitySuggestion) {
    setInputText(s.city);
    onChange(s.city);
    setSuggestions([]);
    setOpen(false);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    setInputText("");
    onChange("");
    setSuggestions([]);
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && highlightIdx >= 0) { e.preventDefault(); handleSelect(suggestions[highlightIdx]); }
    else if (e.key === "Escape") setOpen(false);
  }

  const labelColor  = darkGlass ? "rgba(255,255,255,0.45)" : "#A89282";
  const inputColor  = darkGlass ? "rgba(255,255,255,0.85)" : "#1A0F0D";
  const iconColor   = darkGlass ? "rgba(255,255,255,0.35)" : "#A89282";
  const borderColor = darkGlass ? "rgba(255,255,255,0.10)" : "#EDE0CC";

  return (
    <div
      ref={wrapRef}
      className="relative flex flex-col justify-center px-[16px] py-[12px] sm:px-5 sm:py-4 flex-1 min-w-0 border-b sm:border-b-0"
      style={{ borderColor }}
    >
      <div className="flex items-center justify-center gap-[5px] mb-[6px]">
        <span
          className="font-body text-[10px] uppercase tracking-[0.12em] select-none"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      </div>

      <div className="flex items-center gap-[6px]">
        {loading ? (
          <Loader2 size={12} className="shrink-0 animate-spin" style={{ color: iconColor }} />
        ) : (
          <MapPin size={12} className="shrink-0" style={{ color: value ? "#C9A84C" : iconColor }} />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={`font-body text-[15px] bg-transparent outline-none w-full text-center truncate ${darkGlass ? "placeholder:text-white/35" : "placeholder:text-warm-light"}`}
          style={{
            color: inputColor,
            caretColor: darkGlass ? "#fff" : "#5C1828",
          }}
          autoComplete="off"
          spellCheck={false}
        />
        {inputText && (
          <button type="button" onClick={handleClear} className="shrink-0 opacity-40 hover:opacity-80 transition-opacity">
            <X size={11} style={{ color: darkGlass ? "#fff" : "#6B5244" }} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="absolute left-0 right-0 z-[9999] rounded-[16px] overflow-hidden"
          style={{
            top: "calc(100% + 8px)",
            background: "rgba(18,7,5,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.55)",
            minWidth: "220px",
          }}
        >
          {suggestions.map((s, i) => (
            <button
              key={`${s.city}-${s.country}`}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s); }}
              onMouseEnter={() => setHighlightIdx(i)}
              className="w-full flex items-center gap-[12px] px-[16px] py-[11px] text-left transition-colors duration-150"
              style={{
                background: highlightIdx === i ? "rgba(255,255,255,0.06)" : "transparent",
                borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <Building2 size={14} style={{ color: "#C9A84C", flexShrink: 0 }} />
              <div className="flex flex-col min-w-0">
                <span className="font-body text-[13px] font-medium text-white truncate">{s.city}</span>
                <span className="font-body text-[11px]" style={{ color: "rgba(255,255,255,0.40)" }}>
                  {s.country} &middot; {s.count} hotel{s.count !== 1 ? "s" : ""}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
