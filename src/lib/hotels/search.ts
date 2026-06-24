import type { Hotel, HotelSearchParams, CitySuggestion } from "./types";
import { HOTELS } from "./mockData";

export function searchHotels(params: HotelSearchParams): Hotel[] {
  let results = [...HOTELS];

  // ── Filter by city ────────────────────────────────────────────────────────
  if (params.city && params.city.trim().length > 0) {
    const q = params.city.trim().toLowerCase();
    results = results.filter(
      (h) =>
        h.city.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        h.name.toLowerCase().includes(q),
    );
  }

  // ── Filter by star rating ─────────────────────────────────────────────────
  if (params.minStars && params.minStars > 0) {
    results = results.filter((h) => h.stars >= params.minStars!);
  }

  // ── Filter by price ───────────────────────────────────────────────────────
  if (params.minPrice !== undefined && params.minPrice > 0) {
    results = results.filter((h) => h.pricePerNight >= params.minPrice!);
  }
  if (params.maxPrice !== undefined && params.maxPrice > 0) {
    results = results.filter((h) => h.pricePerNight <= params.maxPrice!);
  }

  // ── Filter by property type ───────────────────────────────────────────────
  if (params.propertyType && params.propertyType !== "all") {
    results = results.filter((h) => h.propertyType === params.propertyType);
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
  switch (params.sortBy) {
    case "price_asc":
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case "price_desc":
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case "rating":
      results.sort((a, b) => b.reviewScore - a.reviewScore);
      break;
    case "popularity":
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      // "recommended" - sort by a composite score
      results.sort(
        (a, b) =>
          (b.reviewScore * 0.5 + b.stars * 0.3 + (b.badge ? 0.2 : 0)) -
          (a.reviewScore * 0.5 + a.stars * 0.3 + (a.badge ? 0.2 : 0)),
      );
  }

  return results;
}

export function getCitySuggestions(query: string): CitySuggestion[] {
  if (!query || query.trim().length < 2) return [];

  const q = query.trim().toLowerCase();
  const cityMap = new Map<string, CitySuggestion>();

  for (const hotel of HOTELS) {
    const key = `${hotel.city}|${hotel.country}`;
    if (
      hotel.city.toLowerCase().startsWith(q) ||
      hotel.country.toLowerCase().startsWith(q)
    ) {
      if (cityMap.has(key)) {
        cityMap.get(key)!.count++;
      } else {
        cityMap.set(key, { city: hotel.city, country: hotel.country, count: 1 });
      }
    }
  }

  return [...cityMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function getAvailableCities(): CitySuggestion[] {
  const cityMap = new Map<string, CitySuggestion>();
  for (const hotel of HOTELS) {
    const key = `${hotel.city}|${hotel.country}`;
    if (cityMap.has(key)) {
      cityMap.get(key)!.count++;
    } else {
      cityMap.set(key, { city: hotel.city, country: hotel.country, count: 1 });
    }
  }
  return [...cityMap.values()].sort((a, b) => b.count - a.count);
}
