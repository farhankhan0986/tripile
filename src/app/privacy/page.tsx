import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy  Tripile",
  description: "How Tripile collects, uses, and protects your personal information.",
};

const sections = [
  {
    icon: Database,
    title: "Information we collect",
    content: [
      {
        heading: "Information you provide directly",
        body: "When you book a trip, request a quote, or contact us, we collect your name, email address, phone number, mailing address, date of birth (for airline requirements), and payment information. We also collect any preferences or special requirements you share with our agents.",
      },
      {
        heading: "Information collected automatically",
        body: "Our website uses standard web technologies to collect your IP address, browser type, pages visited, and referring URLs. We use this information solely to improve our website performance and your experience. We do not sell this data.",
      },
      {
        heading: "Information from third parties",
        body: "We may receive information from airlines, hotels, and other travel providers as part of the booking process. This is used exclusively to complete and manage your reservations.",
      },
    ],
  },
  {
    icon: Eye,
    title: "How we use your information",
    content: [
      {
        heading: "To fulfill your travel bookings",
        body: "Your personal details are shared with airlines, hotels, cruise lines, and other travel providers as necessary to complete your reservations. This includes name, date of birth, and passport information where legally required.",
      },
      {
        heading: "To communicate with you",
        body: "We use your contact information to send booking confirmations, itinerary updates, important travel alerts, and responses to your inquiries. If you opt in, we may also send travel deals and destination inspiration.",
      },
      {
        heading: "To improve our service",
        body: "We analyze aggregate, anonymized data to understand how our clients use our services and to improve our agent training, website, and booking process. Individual travel details are never used for advertising.",
      },
    ],
  },
  {
    icon: Shield,
    title: "How we protect your information",
    content: [
      {
        heading: "Encryption and security",
        body: "All data transmitted between your browser and our servers is protected with TLS encryption (HTTPS). Payment information is processed through PCI-DSS compliant payment processors and is never stored on our servers.",
      },
      {
        heading: "Access controls",
        body: "Access to your personal information is restricted to agents who need it to service your booking. Our systems log all access to personal data and are subject to regular security audits.",
      },
      {
        heading: "Data retention",
        body: "We retain your booking records for seven years as required by US federal regulations. Account information can be deleted at any time upon request, subject to any outstanding legal obligations.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Your rights and choices",
    content: [
      {
        heading: "Access and correction",
        body: "You may request a copy of all personal information we hold about you at any time. If any information is inaccurate, we will correct it promptly upon your request.",
      },
      {
        heading: "Opt-out of marketing",
        body: "You may unsubscribe from our marketing emails at any time using the unsubscribe link in any email, or by contacting us directly. Transactional emails related to your bookings will continue regardless.",
      },
      {
        heading: "Do Not Sell My Information",
        body: "We do not sell your personal information to third parties, period. We share your data only with travel providers required to fulfill your booking, and we do not participate in data broker markets.",
      },
    ],
  },
];

export default function PrivacyPage() {
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
        <div className="max-w-[1280px] mx-auto px-20 py-[90px]">
          <div
            className="inline-flex items-center gap-[8px] px-[14px] py-[7px] rounded-full mb-[28px]"
            style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}
          >
            <Shield size={13} style={{ color: "#C9A84C" }} />
            <span
              className="font-body text-[11px] uppercase tracking-[0.10em]"
              style={{ color: "#C9A84C" }}
            >
              Your privacy matters
            </span>
          </div>
          <h1 className="font-display font-semibold text-[68px] text-white leading-[0.97] tracking-[-0.02em] mb-[20px]">
            Privacy Policy
          </h1>
          <p className="font-body text-[16px] text-white/65 max-w-[540px] leading-[1.72] mb-[32px]">
            We believe you deserve to know exactly how your information is used.
            This policy is written in plain English  not legalese.
          </p>
          <div className="flex items-center gap-[6px]">
            <span className="font-body text-[12px] text-white/35">Last updated:</span>
            <span className="font-body text-[12px] text-white/55">June 1, 2026</span>
          </div>
        </div>
      </section>

      {/* ── Gold rule ── */}
      <div
        className="h-[1px] w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
      />

      {/* ── Content ── */}
      <section className="py-[96px]">
        <div className="max-w-[900px] mx-auto px-20">

          {/* Intro */}
          <div
            className="rounded-[20px] p-[36px] mb-[64px] flex gap-[20px]"
            style={{
              background: "#fff",
              border: "1px solid #EDE0CC",
              boxShadow: "0 4px 24px rgba(26,15,13,0.06)",
            }}
          >
            <div
              className="shrink-0 w-[48px] h-[48px] rounded-[14px] flex items-center justify-center"
              style={{ background: "#F5EAED" }}
            >
              <Shield size={22} style={{ color: "#5C1828" }} />
            </div>
            <div>
              <h2 className="font-body font-semibold text-[15px] text-warm-dark mb-[6px]">
                Our commitment in plain language
              </h2>
              <p className="font-body text-[14px] text-warm-mid leading-[1.72]">
                Tripile collects only the information necessary to book your travel. We do not sell your data.
                We do not share it for advertising. We protect it with industry-standard security. If you
                have any question about how your information is handled, call or email us directly  a real
                person will answer.
              </p>
            </div>
          </div>

          {/* Policy sections */}
          <div className="flex flex-col gap-[64px]">
            {sections.map(({ icon: Icon, title, content }, si) => (
              <div key={title}>
                {/* Section header */}
                <div className="flex items-center gap-[14px] mb-[32px]">
                  <div
                    className="shrink-0 w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
                    style={{ background: "#F5EAED" }}
                  >
                    <Icon size={20} style={{ color: "#5C1828" }} />
                  </div>
                  <div className="flex items-center gap-[16px]">
                    <span
                      className="font-body text-[11px] text-warm-light"
                      style={{ minWidth: "20px" }}
                    >
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display font-semibold text-[32px] text-warm-dark leading-[1.0]">
                      {title}
                    </h2>
                  </div>
                </div>

                {/* Sub-sections */}
                <div className="flex flex-col gap-[24px] pl-[58px]">
                  {content.map(({ heading, body }) => (
                    <div
                      key={heading}
                      className="rounded-[16px] p-[28px]"
                      style={{
                        background: "#fff",
                        border: "1px solid #EDE0CC",
                      }}
                    >
                      <h3 className="font-body font-semibold text-[14px] text-warm-dark mb-[8px]">
                        {heading}
                      </h3>
                      <p className="font-body text-[14px] text-warm-mid leading-[1.75]">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact box */}
          <div
            className="mt-[64px] rounded-[20px] p-[40px] text-center"
            style={{
              background: "linear-gradient(135deg, #5C1828 0%, #3D0E1A 100%)",
              boxShadow: "0 12px 48px rgba(92,24,40,0.28)",
            }}
          >
            <h3 className="font-display font-semibold text-[28px] text-white mb-[10px]">
              Questions about your privacy?
            </h3>
            <p className="font-body text-[14px] text-white/65 mb-[28px] max-w-[420px] mx-auto leading-[1.7]">
              Our privacy officer is reachable by phone or email. We respond to all
              privacy requests within 2 business days.
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
                href="mailto:privacy@tripile.com"
                className="inline-flex items-center gap-[8px] font-body font-medium text-[14px] text-white rounded-[8px] px-[22px] py-[11px] transition-all duration-200 hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                <Mail size={14} />
                privacy@tripile.com
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
