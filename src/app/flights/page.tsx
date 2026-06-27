import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/ui/Nav";
import FlightsClient from "./FlightsClient";

export const metadata: Metadata = {
  title: "Search Flights | Book with a Real Travel Agent",
  description:
    "Search and book flights with a licensed Tripile travel advisor. Real-time fares on 500+ airlines, price-match guarantee, group discounts. Call 1-800-963-4330 or book online.",
  openGraph: {
    title: "Search Flights | Tripile - Real Agents, Real Fares",
    description:
      "Real-time flight search across hundreds of airlines. A licensed agent is standing by to help with pricing, routing, and booking.",
    url: "https://tripile.vercel.app/flights",
  },
  alternates: { canonical: "https://tripile.vercel.app/flights" },
};

export default function FlightsPage() {
  return (
    <>
      <Nav />
      <Suspense>
        <FlightsClient />
      </Suspense>
    </>
  );
}
