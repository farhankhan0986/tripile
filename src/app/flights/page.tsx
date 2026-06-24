import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/ui/Nav";
import FlightsClient from "./FlightsClient";

export const metadata: Metadata = {
  title: "Flights - Tripile",
  description: "Search flights with a real agent standing by.",
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
