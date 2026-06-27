import type { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Travel Support | Tripile - 24/7 Agent Assistance",
  description:
    "Tripile's support team handles flight cancellations, hotel changes, lost baggage, emergencies, and rebooking. Real agents available by phone Mon–Sat 8am–9pm ET, mid-trip 24/7.",
  openGraph: {
    title: "Travel Support | Tripile - Real Agents, Real Help",
    description:
      "Flight cancelled? Hotel issue? Call 1-800-963-4330. Our agents pick up in under 2 minutes and handle everything so you can travel with confidence.",
    url: "https://tripile.vercel.app/support",
  },
};

export default function SupportPage() {
  return <SupportClient />;
}
