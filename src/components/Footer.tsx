"use client";

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const bookLinks = [
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Vacation Packages", href: "#" },
  { label: "Group Travel", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Support", href: "/support" },
  { label: "How It Works", href: "/how-it-works" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "FAQ", href: "/faq" },
];

function ColHeading({ children }: { children: string }) {
  return (
    <p className="font-body font-semibold text-[11px] text-white/40 uppercase tracking-[0.12em] mb-[20px]">
      {children}
    </p>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="font-body text-[14px] text-white/65 hover:text-white transition-colors duration-200 inline-flex items-center gap-[6px] group"
      >
        {children}
      </a>
    </li>
  );
}

export default function Footer() {
  return (
    <footer
      style={{ background: "linear-gradient(180deg, #1A0F0D 0%, #0F0604 100%)" }}
    >
      {/* Top decorative band */}
      <div
        className="h-[1px] w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 pt-[48px] lg:pt-[72px] pb-[48px]">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[36px] lg:gap-[56px]">

          {/* Col 1  Brand */}
          <div className="flex flex-col gap-[0px] sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              className="font-display font-semibold text-[32px] text-white leading-none mb-[14px] hover:text-gold-accent transition-colors duration-200"
            >
              Tripile
            </a>
            <p className="font-body text-[14px] text-white/55 leading-[1.7] mb-[32px] max-w-[280px]">
              Real people. Real experience. We've been booking travel that matters
              for over 22 years  one call at a time.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-[14px] mb-[36px]">
              <a
                href="tel:1-800-874-7453"
                className="flex items-center gap-[10px] font-body text-[14px] text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <span
                  className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: "rgba(201,168,76,0.15)" }}
                >
                  <Phone size={14} style={{ color: "#C9A84C" }} />
                </span>
                1-800-TRIPILE
              </a>
              <a
                href="mailto:hello@tripile.com"
                className="flex items-center gap-[10px] font-body text-[14px] text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <span
                  className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: "rgba(201,168,76,0.15)" }}
                >
                  <Mail size={14} style={{ color: "#C9A84C" }} />
                </span>
                hello@tripile.com
              </a>
              <div className="flex items-center gap-[10px] font-body text-[14px] text-white/45">
                <span
                  className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <MapPin size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                </span>
                Mon – Sat, 8am – 9pm ET
              </div>
            </div>

            {/* Newsletter nudge */}
            <div
              className="rounded-[14px] p-[20px]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="font-body text-[12px] text-white/50 mb-[12px] uppercase tracking-[0.08em]">
                Travel deals to your inbox
              </p>
              <div className="flex gap-[8px]">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-[8px] px-[12px] py-[8px] font-body text-[13px] text-white/80 placeholder:text-white/25 outline-none focus:border-gold-accent/50 transition-colors duration-200"
                />
                <button
                  className="shrink-0 w-[36px] h-[36px] rounded-[8px] flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{ background: "#C9A84C" }}
                >
                  <ArrowRight size={15} color="#1A0F0D" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 2  Book */}
          <div>
            <ColHeading>Book</ColHeading>
            <ul className="flex flex-col gap-[14px]">
              {bookLinks.map(({ label, href }) => (
                <NavLink key={label} href={href}>{label}</NavLink>
              ))}
            </ul>
          </div>

          {/* Col 3  Company */}
          <div>
            <ColHeading>Company</ColHeading>
            <ul className="flex flex-col gap-[14px]">
              {companyLinks.map(({ label, href }) => (
                <NavLink key={label} href={href}>{label}</NavLink>
              ))}
            </ul>
          </div>

          {/* Col 4  Legal */}
          <div>
            <ColHeading>Legal</ColHeading>
            <ul className="flex flex-col gap-[14px]">
              {legalLinks.map(({ label, href }) => (
                <NavLink key={label} href={href}>{label}</NavLink>
              ))}
            </ul>

            {/* Trust badge */}
            <div
              className="mt-[36px] rounded-[12px] px-[16px] py-[14px] flex flex-col gap-[4px]"
              style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <p className="font-display italic text-[15px] text-white/80 leading-[1.4]">
                "Real agents, real answers."
              </p>
              <div className="flex gap-[2px] mt-[4px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="#C9A84C">
                    <polygon points="5.5,0.5 7.1,3.8 10.8,4.3 8.1,6.9 8.8,10.5 5.5,8.8 2.2,10.5 2.9,6.9 0.2,4.3 3.9,3.8" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[11px] text-white/35">2,400+ verified reviews</p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div
          className="mt-[56px] mb-[28px] h-[1px]"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-[12px]">
          <p className="font-body text-[12px] text-white/30">
            © 2026 Tripile, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-[20px]">
            {legalLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-body text-[12px] text-white/30 hover:text-white/60 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
