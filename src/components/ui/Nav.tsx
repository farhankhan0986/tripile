"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 h-[72px] transition-all duration-300",
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

      <div className="flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={[
              "hidden md:block font-body text-[14px] transition-colors duration-300",
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
    </nav>
  );
}
