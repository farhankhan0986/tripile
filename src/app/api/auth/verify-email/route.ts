import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid token." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "This verification link has expired or is invalid. Request a new one." },
        { status: 400 },
      );
    }

    user.emailVerified           = true;
    user.verificationToken       = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Verify email error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
