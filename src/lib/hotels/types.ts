export type PropertyType       = "hotel" | "resort" | "boutique" | "apartment" | "villa";
export type CancellationPolicy = "free" | "partial" | "non_refundable";
export type HotelBadge         =
  | "Best Seller"
  | "Top Rated"
  | "Luxury"
  | "Family Friendly"
  | "Great Value"
  | "Boutique Gem";
export type SortOption =
  | "recommended"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "popularity";

export interface Hotel {
  id:                 string;
  name:               string;
  city:               string;
  country:            string;
  address:            string;
  stars:              number;           // 3–5
  reviewScore:        number;           // 7.0–9.9
  reviewCount:        number;
  pricePerNight:      number;           // USD
  amenities:          string[];
  description:        string;
  images:             string[];
  lat:                number;
  lng:                number;
  propertyType:       PropertyType;
  cancellationPolicy: CancellationPolicy;
  badge?:             HotelBadge;
}

export interface HotelSearchParams {
  city?:         string;
  checkIn?:      string;
  checkOut?:     string;
  guests?:       number;
  rooms?:        number;
  minPrice?:     number;
  maxPrice?:     number;
  minStars?:     number;
  propertyType?: PropertyType | "all";
  sortBy?:       SortOption;
}

export interface CitySuggestion {
  city:    string;
  country: string;
  count:   number;  // number of hotels
}
