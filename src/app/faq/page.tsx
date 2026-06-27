import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ | Tripile - Frequently Asked Travel Questions",
  description:
    "Answers to common questions about booking flights and hotels with Tripile. Cancellations, date changes, travel insurance, passports, visas, fees, and more.",
  openGraph: {
    title: "FAQ | Tripile - Frequently Asked Travel Questions",
    description:
      "Find answers about booking, cancellations, passports, fees, and travel insurance. Or call our agents directly for a personal answer.",
    url: "https://tripile.vercel.app/faq",
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
