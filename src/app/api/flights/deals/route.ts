import { NextRequest, NextResponse } from "next/server";
import duffel from "@/lib/duffel";

export interface DealQuery {
  origin: string;
  destination: string;
  daysOut: number;
  cabin: "economy" | "premium_economy" | "business" | "first";
  category: string;
  routeLabel: string;
}

export interface DealResult {
  origin: string;
  destination: string;
  originCity: string;
  destinationCity: string;
  airline: string;
  flightNumber: string;
  logoUrl: string | null;
  price: number;
  currency: string;
  cabin: string;
  stops: number;
  duration: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  category: string;
  routeLabel: string;
}

function parseDuration(iso: string): string {
  const h = iso.match(/(\d+)H/)?.[1] ?? "0";
  const m = iso.match(/(\d+)M/)?.[1] ?? "0";
  if (h === "0") return `${m}m`;
  if (m === "0") return `${h}h`;
  return `${h}h ${m}m`;
}

function fmtTime(iso: string): string {
  if (!iso) return "--:--";
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function addDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchCheapestOffer(query: DealQuery): Promise<DealResult | null> {
  try {
    const departureDate = addDays(query.daysOut);

    const response = await duffel.offerRequests.create({
      slices: [{ origin: query.origin, destination: query.destination, departure_date: departureDate }],
      passengers: [{ type: "adult" }],
      cabin_class: query.cabin,
      return_offers: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const offers: any[] = ((response.data as any).offers ?? []);
    if (offers.length === 0) return null;

    // Pick the cheapest offer
    const offer = offers.sort(
      (a, b) => parseFloat(a.total_amount) - parseFloat(b.total_amount),
    )[0];

    const slice   = offer.slices?.[0] ?? {};
    const segs    = slice.segments ?? [];
    const seg     = segs[0] ?? {};
    const carrier = seg.operating_carrier ?? offer.owner ?? {};

    return {
      origin:          slice.origin?.iata_code      ?? query.origin,
      destination:     slice.destination?.iata_code ?? query.destination,
      originCity:      slice.origin?.city_name      ?? slice.origin?.name      ?? query.origin,
      destinationCity: slice.destination?.city_name ?? slice.destination?.name ?? query.destination,
      airline:         carrier.name                 ?? offer.owner?.name       ?? "Unknown",
      flightNumber:    `${carrier.iata_code ?? ""}${seg.operating_carrier_flight_number ?? ""}`.trim(),
      logoUrl:         carrier.logo_symbol_url ?? offer.owner?.logo_symbol_url ?? null,
      price:           Math.round(parseFloat(offer.total_amount ?? "0")),
      currency:        offer.total_currency ?? "USD",
      cabin:           seg.passengers?.[0]?.cabin_class_marketing_name ?? query.cabin,
      stops:           Math.max(0, segs.length - 1),
      duration:        parseDuration(slice.duration ?? "PT0H0M"),
      departureDate,
      departureTime:   fmtTime(slice.departing_at ?? seg.departing_at),
      arrivalTime:     fmtTime(slice.arriving_at  ?? seg.arriving_at),
      category:        query.category,
      routeLabel:      query.routeLabel,
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { queries }: { queries: DealQuery[] } = await req.json();

    const capped = queries.slice(0, 25);
    const settled = await Promise.allSettled(capped.map(fetchCheapestOffer));

    const deals: DealResult[] = settled
      .map((r) => (r.status === "fulfilled" ? r.value : null))
      .filter((d): d is DealResult => d !== null);

    return NextResponse.json({ deals }, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("Deals fetch error:", err);
    return NextResponse.json({ deals: [] }, { status: 500 });
  }
}
