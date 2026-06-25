import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/ui/Nav";
import DealsClient from "./DealsClient";

export const metadata: Metadata = {
  title: "Flight Deals - Tripile",
  description: "Real-time flight deals across popular, budget, luxury, and senior routes. Book with a live agent.",
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
