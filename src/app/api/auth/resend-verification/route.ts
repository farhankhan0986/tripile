import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      // Don't reveal whether email exists
      return NextResponse.json({ success: true });
    }
    if (user.emailVerified) {
      return NextResponse.json({ alreadyVerified: true });
    }

    // Generate a fresh token
    const verificationToken       = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken       = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;
    await user.save();

    const baseUrl         = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(user.email, user.name, verificationUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[resend-verification]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
