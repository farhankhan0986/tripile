import { NextRequest, NextResponse } from "next/server";
import duffel from "@/lib/duffel";
import type { FlightResult } from "@/components/FlightResultCard";

function parseDuration(iso: string): string {
  const h = iso.match(/(\d+)H/)?.[1] ?? "0";
  const m = iso.match(/(\d+)M/)?.[1] ?? "0";
  if (h === "0") return `${m}m`;
  if (m === "0") return `${h}h`;
  return `${h}h ${m}m`;
}

function fmtTime(iso: string): string {
  if (!iso) return "--:--";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOffer(offer: any): FlightResult {
  const slice   = offer.slices?.[0] ?? {};
  const segs    = slice.segments ?? [];
  const seg     = segs[0] ?? {};
  const paxSeg  = seg.passengers?.[0] ?? {};
  const carrier = seg.operating_carrier ?? offer.owner ?? {};

  const baggageIncluded = (paxSeg.baggages ?? []).some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (b: any) => b.type === "checked" && b.quantity > 0,
  );

  return {
    id:              offer.id ?? "",
    airline:         carrier.name ?? offer.owner?.name ?? "Unknown",
    flightNumber:    `${carrier.iata_code ?? ""}${seg.operating_carrier_flight_number ?? ""}`.trim(),
    origin:          slice.origin?.iata_code ?? "",
    destination:     slice.destination?.iata_code ?? "",
    originCity:      slice.origin?.city_name ?? slice.origin?.name ?? "",
    destinationCity: slice.destination?.city_name ?? slice.destination?.name ?? "",
    departureTime:   fmtTime(slice.departing_at ?? seg.departing_at),
    arrivalTime:     fmtTime(slice.arriving_at  ?? seg.arriving_at),
    duration:        parseDuration(slice.duration ?? "PT0H0M"),
    stops:           Math.max(0, segs.length - 1),
    cabin:           paxSeg.cabin_class_marketing_name ?? "Economy",
    price:           Math.round(parseFloat(offer.total_amount ?? "0")),
    currency:        offer.total_currency ?? "USD",
    logoUrl:         carrier.logo_symbol_url ?? offer.owner?.logo_symbol_url ?? null,
    baggageIncluded,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      passengers = 1,
      cabinClass  = "economy",
    } = body as {
      origin:        string;
      destination:   string;
      departureDate: string;
      returnDate?:   string;
      passengers:    number;
      cabinClass:    string;
    };

    if (!origin || !destination || !departureDate) {
      return NextResponse.json({ results: [] });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slices: any[] = [
      { origin, destination, departure_date: departureDate },
      ...(returnDate
        ? [{ origin: destination, destination: origin, departure_date: returnDate }]
        : []),
    ];

    const passengerList = Array.from(
      { length: Math.min(Math.max(passengers, 1), 9) },
      () => ({ type: "adult" as const }),
    );

    const validCabins = ["economy", "premium_economy", "business", "first"] as const;
    type CabinClass = (typeof validCabins)[number];
    const cabin: CabinClass = validCabins.includes(cabinClass as CabinClass)
      ? (cabinClass as CabinClass)
      : "economy";

    const response = await duffel.offerRequests.create({
      slices,
      passengers: passengerList,
      cabin_class: cabin,
      return_offers: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const offers: any[] = (response.data as any).offers ?? [];

    const results: FlightResult[] = offers
      .slice(0, 20)
      .map(mapOffer)
      .filter((r) => r.origin && r.destination);

    return NextResponse.json({ results });
  } catch (err: unknown) {
    console.error("Duffel search error:", err);
    const message = err instanceof Error ? err.message : "Flight search failed";
    return NextResponse.json({ error: message, results: [] }, { status: 500 });
  }
}
