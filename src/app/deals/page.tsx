import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/ui/Nav";
import DealsClient from "./DealsClient";

export const metadata: Metadata = {
  title: "Flight Deals | Curated Fares from Our Travel Agents",
  description:
    "Browse real-time flight deals curated by Tripile's licensed travel advisors. Budget, business, luxury, and senior travel discounts. Price-match guaranteed. Call 1-800-963-4330.",
};

export default function DealsPage() {
  return (
    <>
      <Nav />
      <Suspense>
        <DealsClient />
      </Suspense>
    </>
  );
}
