import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Tripile - Talk to a Real Travel Agent",
  description:
    "Reach Tripile's licensed travel agents by phone at 1-800-963-4330, by email at hello@tripile.com, or via our online form. Available Monday through Saturday, 8am to 9pm ET.",
  openGraph: {
    title: "Contact Tripile | Real Travel Agents Standing By",
    description:
      "Call 1-800-963-4330 or send a message. Our agents respond within 4 hours and pick up the phone in under 2 minutes.",
    url: "https://tripile.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
