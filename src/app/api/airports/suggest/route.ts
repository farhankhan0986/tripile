import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (q.length < 2) return NextResponse.json([]);

  try {
    const res = await fetch(
      `https://api.duffel.com/places/suggestions?query=${encodeURIComponent(q)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
          "Duffel-Version": "v2",
          Accept: "application/json",
        },
        // Cache suggestions for 5 minutes at the edge
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      console.error("Duffel suggestions error:", res.status, await res.text());
      return NextResponse.json([]);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: { data: any[] } = await res.json();

    const seen = new Set<string>();
    const suggestions = (json.data ?? [])
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: any) => p.type === "airport" || p.type === "city",
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((p: any) => ({
        iata_code: p.iata_code ?? p.iata_city_code ?? "",
        name: p.name ?? "",
        city: p.city_name ?? p.city?.name ?? p.name ?? "",
        country: p.country_name ?? p.iata_country_code ?? "",
        type: p.type as "airport" | "city",
      }))
      .filter((s) => {
        if (!s.iata_code || seen.has(s.iata_code)) return false;
        seen.add(s.iata_code);
        return true;
      })
      .slice(0, 7);

    return NextResponse.json(suggestions);
  } catch (err) {
    console.error("Airport suggest failed:", err);
    return NextResponse.json([]);
  }
}
