import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import HotelsClient from "./HotelsClient";

export const metadata: Metadata = {
  title: "Search Hotels | Negotiated Rates from a Real Agent",
  description:
    "Find and book hotels at negotiated rates through Tripile's licensed travel advisors. Room blocks, loyalty points, group pricing, and no hidden fees. Call 1-800-963-4330.",
  openGraph: {
    title: "Search Hotels | Tripile - Negotiated Rates, Real Agents",
    description:
      "Hotel search with negotiated group and individual rates. Licensed agents available to help you find the right property for your budget and dates.",
    url: "https://tripile.vercel.app/hotels",
  },
  alternates: { canonical: "https://tripile.vercel.app/hotels" },
};

export default function HotelsPage() {
  return (
    <>
      <Nav />
      <HotelsClient />
    </>
  );
}
