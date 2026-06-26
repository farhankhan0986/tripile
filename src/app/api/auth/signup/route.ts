import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone } = await req.json();

    // ── Validation ────────────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json({ error: "Password must contain at least one uppercase letter." }, { status: 400 });
    }
    if (!/[0-9]/.test(password)) {
      return NextResponse.json({ error: "Password must contain at least one number." }, { status: 400 });
    }

    // ── Create user ───────────────────────────────────────────────────────────
    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }

    const passwordHash            = await bcrypt.hash(password, 12);
    const verificationToken       = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 h

    await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      phone: phone?.trim() || undefined,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry,
    });

    // ── Send verification email (console log in dev) ──────────────────────────
    const baseUrl         = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email.trim(), name.trim(), verificationUrl);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
