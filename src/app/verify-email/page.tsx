"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CheckCircle2, XCircle, Loader2, Mail, ArrowRight,
  Terminal, Copy, Check, RefreshCw,
} from "lucide-react";

const IS_DEV = process.env.NODE_ENV !== "production";

// ── Dev panel — shows the clickable verification link ─────────────────────────

function DevPanel({ email }: { email?: string | null }) {
  const [link, setLink]         = useState<string | null>(null);
  const [copied, setCopied]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [resending, setResending] = useState(false);
  const [msg, setMsg]           = useState("");

  async function fetchLink() {
    if (!email) { setMsg("Sign in so we know which account to look up."); return; }
    setLoading(true);
    setMsg("");
    setLink(null);
    try {
      const res  = await fetch(`/api/auth/dev/verification-link?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.alreadyVerified) { setMsg("This account is already verified."); }
      else if (data.url)        { setLink(data.url); }
      else                      { setMsg(data.error ?? "Could not fetch link."); }
    } catch {
      setMsg("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function regenerate() {
    if (!email) return;
    setResending(true);
    setMsg("");
    try {
      const res  = await fetch("/api/auth/resend-verification", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.alreadyVerified) { setMsg("Already verified — no new token needed."); }
      else if (data.success)    { await fetchLink(); }
      else                      { setMsg(data.error ?? "Failed to generate link."); }
    } catch {
      setMsg("Network error.");
    } finally {
      setResending(false);
    }
  }

  useEffect(() => { if (IS_DEV && email) fetchLink(); }, [email]); // eslint-disable-line react-hooks/exhaustive-deps

  async function copy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const noToken = !loading && !link && msg.toLowerCase().includes("token");

  return (
    <div
      className="w-full rounded-[14px] overflow-hidden"
      style={{ border: "1.5px dashed rgba(201,168,76,0.40)", background: "rgba(201,168,76,0.05)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-[8px] px-[16px] py-[10px]"
        style={{ background: "rgba(201,168,76,0.10)", borderBottom: "1px solid rgba(201,168,76,0.20)" }}
      >
        <Terminal size={13} style={{ color: "#C9A84C" }} />
        <span className="font-body font-semibold text-[11px] uppercase tracking-[0.10em]" style={{ color: "#C9A84C" }}>
          Dev mode — verification link
        </span>
        <button
          type="button"
          onClick={fetchLink}
          disabled={loading || resending}
          className="ml-auto transition-opacity hover:opacity-70"
          title="Refresh"
        >
          <RefreshCw size={12} style={{ color: "#C9A84C" }} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="px-[16px] py-[14px] flex flex-col gap-[10px]">
        {(loading || resending) && (
          <div className="flex items-center gap-[8px]">
            <Loader2 size={13} className="animate-spin" style={{ color: "#C9A84C" }} />
            <span className="font-body text-[12px]" style={{ color: "#A89282" }}>
              {resending ? "Generating new token..." : "Fetching link from database..."}
            </span>
          </div>
        )}

        {!loading && !resending && msg && (
          <p className="font-body text-[12px]" style={{ color: "#A89282" }}>{msg}</p>
        )}

        {/* No token in DB — offer to generate one */}
        {noToken && (
          <button
            type="button"
            onClick={regenerate}
            disabled={resending}
            className="inline-flex items-center justify-center gap-[7px] w-full font-body font-semibold text-[13px] py-[10px] rounded-[9px] transition-all hover:opacity-90"
            style={{ background: "#C9A84C", color: "#1A0F0D" }}
          >
            {resending
              ? <><Loader2 size={13} className="animate-spin" /> Generating...</>
              : <>Generate verification link</>}
          </button>
        )}

        {!loading && !resending && link && (
          <div className="flex flex-col gap-[10px]">
            <p className="font-body text-[11px]" style={{ color: "#A89282" }}>
              Click the link below — this simulates clicking the link from your email:
            </p>
            <div
              className="flex items-center gap-[8px] rounded-[8px] px-[12px] py-[9px]"
              style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(201,168,76,0.20)" }}
            >
              <a
                href={link}
                className="font-body text-[12px] flex-1 min-w-0 truncate hover:underline"
                style={{ color: "#5C1828" }}
              >
                {link}
              </a>
              <button
                type="button"
                onClick={copy}
                className="shrink-0 transition-opacity hover:opacity-70"
                title="Copy"
              >
                {copied
                  ? <Check size={13} style={{ color: "#2D6A4F" }} />
                  : <Copy size={13} style={{ color: "#A89282" }} />}
              </button>
            </div>
            <a
              href={link}
              className="inline-flex items-center justify-center gap-[7px] w-full font-body font-semibold text-[13px] py-[10px] rounded-[9px] transition-all hover:opacity-90"
              style={{ background: "#C9A84C", color: "#1A0F0D" }}
            >
              Verify my email now <ArrowRight size={13} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Token confirmation (reads ?token= from URL) ───────────────────────────────

function VerifyTokenFlow() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const { data: session, update } = useSession();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    token ? "loading" : "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/verify-email", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then(async (data) => {
        if (data.success) {
          await update();
          setStatus("success");
        } else {
          setErrorMsg(data.error ?? "Verification failed.");
          setStatus("error");
        }
      })
      .catch(() => {
        setErrorMsg("Network error. Please try again.");
        setStatus("error");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ── No token: "check your email" landing ──────────────────────────────────
  if (!token || status === "idle") {
    const userEmail = (session?.user as { email?: string } | undefined)?.email;

    return (
      <div className="flex flex-col items-center text-center w-full max-w-[480px] mx-auto px-6 gap-[20px]">
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.22)" }}
        >
          <Mail size={30} style={{ color: "#C9A84C" }} />
        </div>

        <div>
          <h1 className="font-display font-semibold text-[38px] sm:text-[44px] text-warm-dark leading-[1.05] mb-[10px]">
            Check your inbox
          </h1>
          <p className="font-body text-[16px] text-warm-mid leading-[1.75]">
            We sent a verification link
            {userEmail ? <> to <strong>{userEmail}</strong></> : " to your email"}.
            Click it to verify your account. The link expires in 24 hours.
          </p>
        </div>

        {/* Dev mode panel */}
        {IS_DEV && <DevPanel email={userEmail} />}

        {/* Production hint */}
        {!IS_DEV && (
          <div
            className="w-full rounded-[14px] px-[20px] py-[16px] text-left"
            style={{ background: "#F5EAED", border: "1px solid rgba(92,24,40,0.12)" }}
          >
            <p className="font-body text-[13px] text-warm-mid leading-[1.7]">
              Did not receive it? Check your spam folder, or{" "}
              <a href="/login" className="text-burg-deep font-medium hover:underline">sign in</a>{" "}
              and we will resend it from your dashboard.
            </p>
          </div>
        )}

        <a
          href="/dashboard"
          className="inline-flex items-center gap-[8px] font-body font-semibold text-[15px] text-white px-[24px] py-[13px] rounded-[12px] transition-all duration-200 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 16px rgba(92,24,40,0.28)" }}
        >
          Continue to dashboard <ArrowRight size={15} />
        </a>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-[16px] text-center">
        <Loader2 size={36} className="animate-spin" style={{ color: "#5C1828" }} />
        <p className="font-body text-[16px] text-warm-mid">Verifying your email...</p>
      </div>
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center max-w-[440px] mx-auto px-6 gap-[20px]">
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{ background: "rgba(92,24,40,0.08)", border: "1px solid rgba(92,24,40,0.15)" }}
        >
          <CheckCircle2 size={34} style={{ color: "#5C1828" }} />
        </div>
        <div>
          <h1 className="font-display font-semibold text-[38px] sm:text-[44px] text-warm-dark leading-[1.05] mb-[10px]">
            Email verified!
          </h1>
          <p className="font-body text-[16px] text-warm-mid leading-[1.75]">
            Your account is fully verified. You can now access all Tripile features and book through our agents.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-[8px] font-body font-semibold text-[15px] text-white px-[28px] py-[14px] rounded-[12px] transition-all duration-200 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)", boxShadow: "0 4px 16px rgba(92,24,40,0.28)" }}
        >
          Go to dashboard <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center text-center max-w-[440px] mx-auto px-6 gap-[20px]">
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
        style={{ background: "#F5EAED", border: "1px solid rgba(92,24,40,0.15)" }}
      >
        <XCircle size={34} style={{ color: "#8B2A3F" }} />
      </div>
      <div>
        <h1 className="font-display font-semibold text-[38px] text-warm-dark leading-[1.05] mb-[10px]">
          Link expired
        </h1>
        <p className="font-body text-[16px] text-warm-mid leading-[1.75]">{errorMsg}</p>
      </div>
      <a
        href="/dashboard"
        className="inline-flex items-center gap-[8px] font-body font-semibold text-[15px] text-white px-[24px] py-[13px] rounded-[12px] transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #5C1828, #8B2A3F)" }}
      >
        Back to dashboard <ArrowRight size={15} />
      </a>
    </div>
  );
}

// ── Page wrapper ──────────────────────────────────────────────────────────────

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2" }}>
      <div className="px-6 py-[24px]">
        <a href="/" className="font-display font-semibold text-[26px] text-warm-dark">Tripile</a>
      </div>
      <div className="flex-1 flex items-center justify-center py-[40px]">
        <Suspense
          fallback={
            <div className="flex items-center gap-[12px]">
              <Loader2 size={20} className="animate-spin" style={{ color: "#5C1828" }} />
              <span className="font-body text-[15px] text-warm-mid">Loading...</span>
            </div>
          }
        >
          <VerifyTokenFlow />
        </Suspense>
      </div>
    </div>
  );
}
