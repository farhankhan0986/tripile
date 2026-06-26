import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// Returns the pending verification link for an email address.
// Only available in development — returns 404 in production.
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "email param required." }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "verificationToken emailVerified",
  );

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  if (user.emailVerified) {
    return NextResponse.json({ alreadyVerified: true });
  }
  if (!user.verificationToken) {
    return NextResponse.json({ error: "No pending token found." }, { status: 404 });
  }

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const url     = `${baseUrl}/verify-email?token=${user.verificationToken}`;

  return NextResponse.json({ url });
}
