"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

const links: { label: string; href: string }[] = [
  { label: "Flights",      href: "/flights"       },
  { label: "Hotels",       href: "/hotels"        },
  { label: "About",        href: "/about"         },
  { label: "Contact",      href: "/contact"       },
  { label: "Sign In",      href: "/login"         },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-20 h-[72px] transition-all duration-300",
          scrolled ? "bg-white/15 backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <a
          href="/"
          className={[
            "font-display font-semibold text-[24px] leading-none transition-colors duration-300",
            scrolled ? "text-burg-deep" : "text-white",
          ].join(" ")}
        >
          Tripile
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                "font-body text-[14px] transition-colors duration-300",
                scrolled
                  ? "text-warm-dark opacity-75 hover:opacity-100"
                  : "text-white/80 hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </a>
          ))}
          <Button variant="phone">Call Us</Button>
        </div>

        {/* Mobile right controls */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="tel:1-800-874-7453"
            className="flex items-center gap-[6px] font-body font-medium text-[13px] h-[38px] px-[14px] rounded-[6px] bg-burg-deep text-white transition-opacity duration-200 hover:opacity-90"
          >
            <Phone size={13} aria-hidden />
            Call Us
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] transition-colors duration-200"
            style={{ color: scrolled ? "#5C1828" : "#fff" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col"
          style={{
            background: "rgba(12,5,3,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="h-[72px] shrink-0" />

          <div className="flex-1 flex flex-col items-center justify-center px-6">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center font-body text-[20px] text-white/75 hover:text-white py-[18px] transition-colors duration-200"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="px-6 pb-[44px] flex flex-col items-center gap-[10px]">
            <a
              href="tel:1-800-874-7453"
              className="w-full flex items-center justify-center gap-[8px] h-[54px] rounded-[10px] font-body font-semibold text-[16px] text-white transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#5C1828" }}
            >
              <Phone size={16} aria-hidden />
              Call 1-800-TRIPILE
            </a>
            <p className="font-body text-[12px] text-white/30 text-center">
              Mon &ndash; Sat &nbsp;&middot;&nbsp; 8am &ndash; 9pm Eastern
            </p>
          </div>
        </div>
      )}
    </>
  );
}
