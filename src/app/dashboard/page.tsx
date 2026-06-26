"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Plane, Hotel, Tag, Phone, Mail, LogOut,
  Calendar, Clock, CreditCard, Settings,
  Star, MapPin, ChevronRight, Sparkles,
  ArrowUpRight,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type TripileSession = {
  user: {
    name?: string | null;
    email?: string | null;
    id?: string;
    role?: string;
    emailVerified?: boolean;
    phone?: string | null;
    createdAt?: string | null;
  };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name?: string | null): string {
  if (!name) return "?";
  return name.trim().split(/\s+/).map((w) => w[0]?.toUpperCase() ?? "").slice(0, 2).join("");
}

function fmtMemberSince(iso?: string | null): string {
  if (!iso) return "Recently";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function firstName(name?: string | null): string {
  return name?.trim().split(/\s+/)[0] ?? "Traveler";
}

// ── Quick action card ─────────────────────────────────────────────────────────

function BookCard({
  icon: Icon, title, tagline, href, bg, iconColor, badge,
}: {
  icon: React.ElementType;
  title: string;
  tagline: string;
  href: string;
  bg: string;
  iconColor: string;
  badge?: string;
}) {
  return (
    <a
      href={href}
      className="relative rounded-[20px] overflow-hidden flex flex-col justify-between p-[24px] min-h-[160px] group transition-all duration-300 hover:-translate-y-[2px]"
      style={{ background: bg, boxShadow: "0 4px 24px rgba(26,15,13,0.12)" }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>
        {badge && (
          <span
            className="font-body text-[10px] font-semibold uppercase tracking-[0.10em] px-[10px] py-[4px] rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.80)" }}
          >
            {badge}
          </span>
        )}
        <ArrowUpRight
          size={18}
          style={{ color: "rgba(255,255,255,0.40)" }}
          className="transition-all duration-200 group-hover:text-white group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      </div>

      {/* Bottom row */}
      <div>
        <p className="font-display font-semibold text-[22px] text-white leading-[1.1] mb-[4px]">{title}</p>
        <p className="font-body text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>{tagline}</p>
      </div>

      {/* Decorative orb */}
      <div
        className="absolute -bottom-[30px] -right-[30px] w-[120px] h-[120px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    </a>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────

function HeroStat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col gap-[2px]">
      <span className="font-display font-semibold text-[28px] leading-none text-white">{value}</span>
      <span className="font-body text-[11px] uppercase tracking-[0.10em]" style={{ color: "rgba(255,255,255,0.42)" }}>{label}</span>
    </div>
  );
}

// ── Empty trips ───────────────────────────────────────────────────────────────

function EmptyJourneys() {
  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{ border: "1.5px dashed #EDE0CC" }}
    >
      <div
        className="px-[28px] py-[44px] flex flex-col items-center text-center"
        style={{ background: "linear-gradient(160deg, #FAF7F2 0%, #F5EAED 100%)" }}
      >
        <div
          className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-[18px]"
          style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 6px 20px rgba(92,24,40,0.22)" }}
        >
          <Plane size={26} style={{ color: "#fff" }} />
        </div>
        <p className="font-display font-semibold text-[26px] text-warm-dark mb-[8px] leading-tight">
          Your next adventure<br/>awaits
        </p>
        <p className="font-body text-[14px] text-warm-mid mb-[24px] max-w-[280px] leading-[1.7]">
          Our travel agents are ready to book your perfect trip - flights, hotels, everything.
        </p>
        <div className="flex flex-col sm:flex-row gap-[10px] w-full max-w-[320px]">
          <a
            href="/flights"
            className="flex-1 inline-flex items-center justify-center gap-[7px] font-body font-semibold text-[13px] text-white py-[11px] rounded-[11px] transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 14px rgba(92,24,40,0.28)" }}
          >
            <Plane size={13} /> Search flights
          </a>
          <a
            href="tel:1-800-963-4330"
            className="flex-1 inline-flex items-center justify-center gap-[7px] font-body font-semibold text-[13px] py-[11px] rounded-[11px] transition-all hover:opacity-80"
            style={{ background: "#fff", color: "#5C1828", border: "1.5px solid rgba(92,24,40,0.14)" }}
          >
            <Phone size={13} /> Call an agent
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Profile card ──────────────────────────────────────────────────────────────

function ProfileCard({ user }: { user: TripileSession["user"] }) {
  const initials = getInitials(user.name);

  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{ background: "#fff", border: "1px solid #EDE0CC", boxShadow: "0 2px 16px rgba(26,15,13,0.06)" }}
    >
      {/* Banner + Avatar */}
      <div
        className="h-[72px] relative"
        style={{ background: "linear-gradient(135deg, #1A0F0D 0%, #3a1320 100%)" }}
      >
        <div
          className="absolute -bottom-[28px] left-[20px] w-[56px] h-[56px] rounded-full flex items-center justify-center font-body font-bold text-[18px]"
          style={{
            background: "linear-gradient(135deg, #5C1828, #8B2A3F)",
            color: "#fff",
            border: "3px solid #fff",
            boxShadow: "0 2px 12px rgba(92,24,40,0.30)",
          }}
        >
          {initials}
        </div>
      </div>

      {/* Name / role */}
      <div className="px-[20px] pt-[38px] pb-[16px]" style={{ borderBottom: "1px solid #EDE0CC" }}>
        <p className="font-body font-semibold text-[16px]" style={{ color: "#1A0F0D" }}>{user.name}</p>
        <p className="font-body text-[12px] mt-[2px]" style={{ color: "#A89282" }}>
          Member since {fmtMemberSince(user.createdAt)}
        </p>
      </div>

      {/* Fields */}
      <div className="divide-y" style={{ borderColor: "#EDE0CC" }}>
        {[
          { icon: Mail,  label: "Email",  value: user.email  ?? "Not set" },
          { icon: Phone, label: "Phone",  value: user.phone  ?? "Not added" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-[12px] px-[20px] py-[12px]">
            <div
              className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center shrink-0"
              style={{ background: "#F5EAED" }}
            >
              <Icon size={13} style={{ color: "#5C1828" }} />
            </div>
            <div className="min-w-0">
              <p className="font-body text-[10px] uppercase tracking-[0.08em]" style={{ color: "#A89282" }}>{label}</p>
              <p className="font-body text-[13px] font-medium truncate" style={{ color: "#1A0F0D" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon features */}
      <div className="px-[20px] py-[14px]" style={{ borderTop: "1px solid #EDE0CC" }}>
        <p className="font-body text-[10px] uppercase tracking-[0.10em] mb-[10px]" style={{ color: "#A89282" }}>Coming soon</p>
        <div className="flex flex-col gap-[6px]">
          {[
            { icon: CreditCard, label: "Payment methods"   },
            { icon: MapPin,     label: "Saved destinations" },
            { icon: Settings,   label: "Travel preferences" },
            { icon: Star,       label: "Loyalty rewards"    },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-[10px] opacity-35">
              <Icon size={13} style={{ color: "#5C1828" }} />
              <span className="font-body text-[12px] flex-1" style={{ color: "#1A0F0D" }}>{label}</span>
              <ChevronRight size={12} style={{ color: "#A89282" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Call card ─────────────────────────────────────────────────────────────────

function CallCard() {
  return (
    <div
      className="rounded-[20px] px-[22px] py-[22px] relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A0F0D 0%, #3a1320 100%)", boxShadow: "0 4px 20px rgba(26,15,13,0.20)" }}
    >
      <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full" style={{ background: "rgba(201,168,76,0.08)" }} />
      <div className="absolute bottom-[-20px] left-[20px] w-[60px] h-[60px] rounded-full" style={{ background: "rgba(92,24,40,0.30)" }} />

      <div className="relative">
        <div
          className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center mb-[12px]"
          style={{ background: "rgba(201,168,76,0.15)" }}
        >
          <Phone size={18} style={{ color: "#C9A84C" }} />
        </div>
        <p className="font-display font-semibold text-[22px] text-white leading-tight mb-[4px]">
          Talk to an agent
        </p>
        <p className="font-body text-[12px] mb-[16px]" style={{ color: "rgba(255,255,255,0.45)" }}>
          Real humans, available 24/7 to book your perfect trip
        </p>
        <a
          href="tel:1-800-963-4330"
          className="flex items-center justify-between w-full font-body font-semibold text-[14px] px-[16px] py-[12px] rounded-[12px] transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", color: "#fff" }}
        >
          <span>1-800-963-4330</span>
          <Phone size={15} />
        </a>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="flex flex-col items-center gap-[16px]">
          <div
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)" }}
          >
            <Plane size={22} style={{ color: "#fff" }} className="animate-pulse" />
          </div>
          <p className="font-body text-[15px]" style={{ color: "#A89282" }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const s = session as TripileSession;
  const { user } = s;

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* ── Sticky nav ── */}
      <div
        className="sticky top-0 z-40 border-b px-6 md:px-10 h-[60px] flex items-center justify-between"
        style={{ background: "rgba(250,247,242,0.96)", backdropFilter: "blur(16px)", borderColor: "#EDE0CC" }}
      >
        <a href="/" className="font-display font-semibold text-[22px]" style={{ color: "#1A0F0D" }}>Tripile</a>
        <div className="flex items-center gap-[10px]">
          <a
            href="tel:1-800-963-4330"
            className="hidden sm:inline-flex items-center gap-[6px] font-body text-[13px] font-medium px-[14px] py-[7px] rounded-full transition-colors hover:opacity-80"
            style={{ background: "#F5EAED", color: "#5C1828", border: "1px solid rgba(92,24,40,0.12)" }}
          >
            <Phone size={13} /> 1-800-963-4330
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-[6px] font-body text-[13px] text-warm-mid hover:text-warm-dark transition-colors px-[10px] py-[7px] rounded-full hover:bg-[#F5EAED]"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden px-6 md:px-10 pt-[48px] pb-[52px]"
        style={{ background: "linear-gradient(155deg, #0F0806 0%, #1A0F0D 40%, #2e0f19 100%)" }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(92,24,40,0.35) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-40px] left-[15%] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />

        <div className="max-w-[1100px] mx-auto relative">
          {/* Greeting row */}
          <div className="flex items-center gap-[6px] mb-[6px]">
            <Sparkles size={13} style={{ color: "#C9A84C" }} />
            <span className="font-body text-[11px] uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.38)" }}>
              Welcome back
            </span>
          </div>
          <h1
            className="font-display font-semibold leading-[1.02] mb-[32px]"
            style={{ fontSize: "clamp(34px, 5vw, 56px)", color: "#fff" }}
          >
            Hello, {firstName(user.name)}
          </h1>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-[40px] gap-y-[18px]">
            <HeroStat value="0" label="Trips booked" />
            <div className="w-px h-[32px] hidden sm:block" style={{ background: "rgba(255,255,255,0.10)" }} />
            <HeroStat value="0" label="Upcoming" />
            <div className="w-px h-[32px] hidden sm:block" style={{ background: "rgba(255,255,255,0.10)" }} />
            <HeroStat value="0" label="Saved places" />
            <div className="w-px h-[32px] hidden sm:block" style={{ background: "rgba(255,255,255,0.10)" }} />
            <HeroStat value="0 pts" label="Loyalty points" />
          </div>

          {/* Gold tag */}
          <div
            className="inline-flex items-center gap-[6px] mt-[28px] font-body text-[11px] font-medium px-[12px] py-[5px] rounded-full"
            style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.22)", color: "#C9A84C" }}
          >
            <Star size={10} />
            Tripile member since {fmtMemberSince(user.createdAt)}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-[36px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[28px]">

          {/* ── Left ── */}
          <div className="flex flex-col gap-[32px]">

            {/* Book section */}
            <div>
              <div className="flex items-center gap-[10px] mb-[16px]">
                <h2 className="font-display font-semibold text-[24px] text-warm-dark">Start planning</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px]">
                <BookCard
                  icon={Plane}
                  title="Flights"
                  tagline="Hundreds of airlines, live fares"
                  href="/flights"
                  bg="linear-gradient(145deg, #5C1828 0%, #8B2A3F 100%)"
                  iconColor="#fff"
                />
                <BookCard
                  icon={Hotel}
                  title="Hotels"
                  tagline="Curated stays worldwide"
                  href="/hotels"
                  bg="linear-gradient(145deg, #1A0F0D 0%, #3a1320 100%)"
                  iconColor="#C9A84C"
                />
                <BookCard
                  icon={Tag}
                  title="Deals"
                  tagline="Live prices, lowest fares"
                  href="/deals"
                  bg="linear-gradient(145deg, #7a6020 0%, #C9A84C 100%)"
                  iconColor="#fff"
                  badge="Live"
                />
              </div>
            </div>

            {/* Trips section */}
            <div>
              <div className="flex items-center justify-between mb-[16px]">
                <h2 className="font-display font-semibold text-[24px] text-warm-dark">My journeys</h2>
                <div className="flex items-center gap-[6px]">
                  <Calendar size={12} style={{ color: "#A89282" }} />
                  <span className="font-body text-[12px]" style={{ color: "#A89282" }}>Upcoming & past</span>
                </div>
              </div>
              <EmptyJourneys />
            </div>

            {/* History placeholder */}
            <div
              className="rounded-[20px] px-[24px] py-[28px] flex items-center gap-[18px]"
              style={{ background: "#fff", border: "1px solid #EDE0CC" }}
            >
              <div
                className="w-[44px] h-[44px] rounded-[13px] flex items-center justify-center shrink-0"
                style={{ background: "#F5EAED" }}
              >
                <Clock size={19} style={{ color: "#5C1828" }} />
              </div>
              <div>
                <p className="font-body font-semibold text-[15px]" style={{ color: "#1A0F0D" }}>Trip history</p>
                <p className="font-body text-[13px] mt-[2px]" style={{ color: "#A89282" }}>
                  All your past bookings will appear here once you travel with Tripile.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-[20px]">
            <ProfileCard user={user} />
            <CallCard />
          </div>
        </div>
      </div>
    </div>
  );
}
