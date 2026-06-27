import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? process.env.EMAIL_FROM?.match(/<(.+)>/)?.[1] ?? "farhankhan080304@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, groupType, destination, departureDate, returnDate, travelers, notes } = body;

    if (!name || !email || !phone || !groupType || !travelers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send notification email via Resend if available
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const FROM = process.env.EMAIL_FROM ?? "Tripile <onboarding@resend.dev>";
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FAF7F2;">
          <h2 style="color:#5C1828;font-size:22px;margin-bottom:8px;">New Group Travel Quote Request</h2>
          <p style="color:#6B5244;font-size:14px;margin-bottom:24px;">Received ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>
          <table style="width:100%;border-collapse:collapse;">
            ${[
              ["Name", name],
              ["Email", email],
              ["Phone", phone],
              ["Group Type", groupType],
              ["Destination", destination || "Not specified"],
              ["Departure Date", departureDate || "Not specified"],
              ["Return Date", returnDate || "Not specified"],
              ["Number of Travelers", travelers],
              ["Additional Notes", notes || "None"],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 12px;background:#fff;border:1px solid #EDE0CC;font-weight:600;font-size:13px;color:#1A0F0D;width:35%;">${label}</td>
                <td style="padding:10px 12px;background:#fff;border:1px solid #EDE0CC;font-size:13px;color:#6B5244;">${value}</td>
              </tr>
            `).join("")}
          </table>
          <p style="margin-top:24px;color:#6B5244;font-size:13px;">Reply to this email or call ${phone} to follow up within 1 business hour.</p>
        </div>
      `;

      try {
        const { Resend } = await import("resend");
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: FROM,
          to:   NOTIFY_EMAIL,
          replyTo: email,
          subject: `Group Quote Request: ${groupType} - ${travelers} travelers${destination ? ` to ${destination}` : ""}`,
          html,
        });
      } catch (emailErr) {
        console.error("Group quote email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Group quote route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
