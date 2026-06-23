"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Star, CheckCircle2 } from "lucide-react";

const perks = [
  "Manage all your bookings in one place",
  "Get exclusive member-only rates",
  "Priority access to our agents",
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res  = await fetch("/api/auth/signup", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    router.push("/");
  }

  function inputProps(opts: { onFocus?: () => void; onBlur?: () => void } = {}) {
    return {
      className: "font-body text-[15px] text-warm-dark bg-white rounded-[10px] px-[16px] py-[13px] outline-none transition-all duration-200 w-full",
      style: { border: "1.5px solid #EDE0CC" },
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "#5C1828"; },
      onBlur:  (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = "#EDE0CC"; },
    };
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* ── Left  image panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden shrink-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
          alt="Scenic road trip"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(15,6,4,0.40) 0%, rgba(26,15,13,0.55) 50%, rgba(15,6,4,0.88) 100%)" }}
        />

        {/* Brand mark */}
        <div className="absolute top-[40px] left-[48px] z-10">
          <a href="/" className="font-display font-semibold text-[28px] text-white leading-none hover:text-gold-accent transition-colors duration-200">
            Tripile
          </a>
        </div>

        {/* Center copy */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-[48px] z-10">
          <p className="font-body text-[11px] uppercase tracking-[0.12em] text-white/50 mb-[16px]">
            Join Tripile
          </p>
          <h2 className="font-display font-semibold text-[52px] italic text-white leading-[1.02] mb-[20px]">
            Travel more.<br />Worry less.
          </h2>
          <p className="font-body text-[16px] text-white/65 leading-[1.7] max-w-[360px] mb-[36px]">
            Create your free account and get access to exclusive rates, personal agents, and a lifetime of better travel.
          </p>

          {/* Perks list */}
          <div className="flex flex-col gap-[12px]">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-[10px]">
                <CheckCircle2 size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
                <p className="font-body text-[14px] text-white/80">{perk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats strip */}
        <div
          className="absolute bottom-[40px] left-[48px] right-[48px] z-10 rounded-[18px] px-[28px] py-[20px] grid grid-cols-3 gap-[0]"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
          }}
        >
          {[
            { value: "48k+", label: "Happy travelers" },
            { value: "4.97", label: "Average rating" },
            { value: "22yrs", label: "In business" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center gap-[2px]"
              style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}
            >
              <p className="font-display font-semibold text-[22px] text-white leading-none">{value}</p>
              <p className="font-body text-[11px] text-white/55 uppercase tracking-[0.06em]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right  form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-[60px] lg:px-[64px]">

        {/* Mobile brand */}
        <div className="lg:hidden mb-[36px]">
          <a href="/" className="font-display font-semibold text-[28px] text-warm-dark">Tripile</a>
        </div>

        <div className="w-full max-w-[400px]">

          <h1 className="font-display font-semibold text-[44px] text-warm-dark leading-[1.02] mb-[8px]">
            Create account
          </h1>
          <p className="font-body text-[15px] text-warm-mid mb-[32px]">
            Already have an account?{" "}
            <a href="/login" className="text-burg-deep font-medium hover:underline underline-offset-2">
              Sign in
            </a>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">

            {/* Full name */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">Full Name</label>
              <input
                type="text" required autoComplete="name"
                placeholder="Margaret Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                {...inputProps()}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-[6px]">
              <label className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">Email address</label>
              <input
                type="email" required autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                {...inputProps()}
              />
            </div>

            {/* Phone + Password side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
              <div className="flex flex-col gap-[6px]">
                <label className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">Phone <span className="normal-case tracking-normal text-warm-light">(opt.)</span></label>
                <input
                  type="tel" autoComplete="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  {...inputProps()}
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <label className="font-body text-[11px] uppercase tracking-[0.10em] text-warm-mid">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"} required minLength={8}
                    autoComplete="new-password"
                    placeholder="8+ characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-body text-[15px] text-warm-dark bg-white rounded-[10px] px-[16px] py-[13px] pr-[44px] outline-none transition-all duration-200 w-full"
                    style={{ border: "1.5px solid #EDE0CC" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#5C1828"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#EDE0CC"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-warm-light hover:text-warm-mid transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-[10px] px-[14px] py-[12px] font-body text-[13px]"
                style={{ background: "#F5EAED", color: "#5C1828", border: "1px solid rgba(92,24,40,0.15)" }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-body font-semibold text-[15px] text-white px-[24px] py-[14px] rounded-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-[4px]"
              style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 16px rgba(92,24,40,0.28)" }}
            >
              {loading ? "Creating account…" : "Create my account →"}
            </button>

          </form>

          {/* Rating strip */}
          <div className="flex items-center justify-center gap-[6px] mt-[28px]">
            <div className="flex gap-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className="text-gold-accent" fill="currentColor" />
              ))}
            </div>
            <p className="font-body text-[12px] text-warm-mid">Rated 4.97 by 2,400+ travelers</p>
          </div>

        </div>
      </div>

    </div>
  );
}
