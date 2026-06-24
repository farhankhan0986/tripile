import { NextRequest, NextResponse } from "next/server";
import { getCitySuggestions, getAvailableCities } from "@/lib/hotels/search";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (q.length < 2) {
    // Return popular destinations when no query
    const all = getAvailableCities().slice(0, 8);
    return NextResponse.json(all);
  }
  const suggestions = getCitySuggestions(q);
  return NextResponse.json(suggestions);
}
