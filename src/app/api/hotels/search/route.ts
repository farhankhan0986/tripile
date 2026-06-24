import { NextRequest, NextResponse } from "next/server";
import { searchHotels } from "@/lib/hotels/search";
import type { HotelSearchParams } from "@/lib/hotels/types";

export async function POST(req: NextRequest) {
  try {
    const body: HotelSearchParams = await req.json();
    const hotels = searchHotels(body);
    return NextResponse.json({ results: hotels, total: hotels.length });
  } catch {
    return NextResponse.json({ results: [], total: 0 }, { status: 500 });
  }
}
