import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import { FileText, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service  Tripile",
  description: "The terms and conditions that govern use of Tripile's travel booking services.",
};

const terms = [
  {
    number: "01",
    title: "Acceptance of terms",
    body: "By using Tripile's website or booking any travel service through our agents, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and customers.",
  },
  {
    number: "02",
    title: "Booking and payment",
    body: "All bookings are subject to availability at the time of confirmation. Prices are quoted in US dollars and are not guaranteed until full payment is received. A deposit may be required to hold certain reservations. Final prices are subject to airline, hotel, or cruise line pricing at time of ticketing.",
  },
  {
    number: "03",
    title: "Cancellations and changes",
    body: "Cancellation and change policies vary by airline, hotel, and tour operator. Our agents will clearly communicate any restrictions before your booking is confirmed. Tripile's service fee of $50 per booking is non-refundable in the event of cancellation. We strongly recommend travel insurance.",
  },
  {
    number: "04",
    title: "Travel insurance",
    body: "Tripile strongly recommends that all travelers purchase comprehensive travel insurance including trip cancellation, medical coverage, and evacuation. We can provide travel insurance quotes through our preferred partners. Decisions about travel insurance are made solely by the customer.",
  },
  {
    number: "05",
    title: "Passports, visas, and health requirements",
    body: "It is the traveler's sole responsibility to ensure they hold valid travel documents for their destination, including passport validity requirements (many countries require 6 months beyond your travel dates), visas, and any health requirements. Tripile agents can advise, but are not liable for denied boarding due to documentation issues.",
  },
  {
    number: "06",
    title: "Limitation of liability",
    body: "Tripile acts as an agent for airlines, hotels, cruise lines, and other travel service providers. We are not responsible for the acts or omissions of these suppliers, including delays, cancellations, overbooking, strikes, force majeure events, or changes to services. Our liability is limited to the service fees paid to Tripile.",
  },
  {
    number: "07",
    title: "Accuracy of information",
    body: "We make every effort to ensure the accuracy of information provided on our website and by our agents. However, errors occasionally occur. In the event of a pricing error or inaccuracy, Tripile reserves the right to cancel the booking and issue a full refund, or offer the corrected price as an alternative.",
  },
  {
    number: "08",
    title: "Governing law",
    body: "These Terms of Service are governed by the laws of the State of New York, United States of America. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of New York County, New York.",
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#FAF7F2" }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="pt-[72px]"
        style={{
          background: "linear-gradient(160deg, #1A0F0D 0%, #5C1828 55%, #3D0E1A 100%)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-[56px] lg:py-[90px]">
          <div
            className="inline-flex items-center gap-[8px] px-[14px] py-[7px] rounded-full mb-[28px]"
            style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <FileText size={13} style={{ color: "#C9A84C" }} />
            <span
              className="font-body text-[11px] uppercase tracking-[0.10em]"
              style={{ color: "#C9A84C" }}
            >
              Legal
            </span>
          </div>
          <h1 className="font-display font-semibold text-white leading-[0.97] tracking-[-0.02em] mb-[20px]" style={{ fontSize: "clamp(36px, 6vw, 68px)" }}>
            Terms of Service
          </h1>
          <p className="font-body text-[16px] text-white/65 max-w-[540px] leading-[1.72] mb-[32px]">
            These terms govern the use of Tripile&apos;s website and travel booking
            services. We&apos;ve written them to be clear and straightforward.
          </p>
          <div className="flex items-center gap-[6px]">
            <span className="font-body text-[12px] text-white/35">Effective date:</span>
            <span className="font-body text-[12px] text-white/55">January 1, 2026</span>
          </div>
        </div>
      </section>

      {/* ── Gold rule ── */}
      <div
        className="h-[1px] w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
      />

      {/* ── Content ── */}
      <section className="py-[48px] lg:py-[96px]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-20">

          {/* Intro note */}
          <div
            className="rounded-[20px] p-[20px] lg:p-[32px] mb-[40px] lg:mb-[56px] flex flex-col sm:flex-row gap-[14px] sm:gap-[20px]"
            style={{
              background: "#fff",
              border: "1px solid #EDE0CC",
              boxShadow: "0 4px 24px rgba(26,15,13,0.06)",
            }}
          >
            <div
              className="shrink-0 w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
              style={{ background: "#F5EAED" }}
            >
              <FileText size={20} style={{ color: "#5C1828" }} />
            </div>
            <p className="font-body text-[14px] text-warm-mid leading-[1.75]">
              These terms apply when you use our website or purchase any travel service through Tripile.
              Questions about a specific booking? Call us at <strong className="text-warm-dark">1-800-TRIPILE</strong>  our agents
              are happy to clarify any of the terms below in plain language.
            </p>
          </div>

          {/* Terms list */}
          <div className="flex flex-col gap-[2px] rounded-[20px] overflow-hidden" style={{ border: "1px solid #EDE0CC" }}>
            {terms.map(({ number, title, body }, i) => (
              <div
                key={number}
                className="flex gap-[14px] lg:gap-[24px] p-[20px] lg:p-[32px]"
                style={{
                  background: "#fff",
                  borderTop: i > 0 ? "1px solid #EDE0CC" : "none",
                }}
              >
                <span
                  className="font-display font-semibold shrink-0 leading-none mt-[2px]"
                  style={{ fontSize: "22px", color: "#EDE0CC" }}
                >
                  {number}
                </span>
                <div>
                  <h2 className="font-display font-semibold text-[22px] text-warm-dark leading-[1.1] mb-[10px]">
                    {title}
                  </h2>
                  <p className="font-body text-[14px] text-warm-mid leading-[1.78]">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact box */}
          <div
            className="mt-[40px] lg:mt-[56px] rounded-[20px] p-[24px] lg:p-[40px] text-center"
            style={{
              background: "linear-gradient(135deg, #5C1828 0%, #3D0E1A 100%)",
              boxShadow: "0 12px 48px rgba(92,24,40,0.28)",
            }}
          >
            <h3 className="font-display font-semibold text-[28px] text-white mb-[10px]">
              Need to clarify something?
            </h3>
            <p className="font-body text-[14px] text-white/65 mb-[28px] max-w-[380px] mx-auto leading-[1.7]">
              Our agents are available by phone or email and can walk you through
              any of these terms before you book.
            </p>
            <div className="flex items-center justify-center gap-[16px] flex-wrap">
              <a
                href="tel:1-800-874-7453"
                className="inline-flex items-center gap-[8px] font-body font-medium text-[14px] text-warm-dark rounded-[8px] px-[22px] py-[11px] transition-all duration-200 hover:opacity-85"
                style={{ background: "#C9A84C" }}
              >
                <Phone size={14} />
                1-800-TRIPILE
              </a>
              <a
                href="mailto:hello@tripile.com"
                className="inline-flex items-center gap-[8px] font-body font-medium text-[14px] text-white rounded-[8px] px-[22px] py-[11px] transition-all duration-200 hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                <Mail size={14} />
                hello@tripile.com
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
