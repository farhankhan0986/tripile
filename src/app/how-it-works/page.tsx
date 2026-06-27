import type { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works | Tripile - Book Travel in 3 Simple Steps",
  description:
    "Learn how Tripile's travel booking works. Search your trip, speak with a licensed agent, and travel with confidence. Three simple steps, zero hold music, no hidden fees.",
  openGraph: {
    title: "How Tripile Works | 3 Steps to Your Perfect Trip",
    description:
      "Search online, speak with a real licensed agent, and travel with confidence. Tripile handles every detail so you can focus on the journey.",
    url: "https://tripile.vercel.app/how-it-works",
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
