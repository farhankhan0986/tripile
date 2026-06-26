import { Resend } from "resend";

// FROM address: use your verified Resend domain once set up.
// Until then "onboarding@resend.dev" works for any recipient in test mode.
const FROM = process.env.EMAIL_FROM ?? "Tripile <onboarding@resend.dev>";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// ── HTML template ─────────────────────────────────────────────────────────────

function verificationHtml(name: string, url: string): string {
  const firstName = name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your Tripile email</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo bar -->
          <tr>
            <td style="padding:0 0 28px 0;text-align:center;">
              <span style="font-family:Georgia,serif;font-size:28px;font-weight:600;color:#5C1828;letter-spacing:-0.01em;">
                Tripile
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;border:1px solid #EDE0CC;overflow:hidden;">

              <!-- Dark header -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#1A0F0D 0%,#3a1320 100%);padding:36px 40px 32px;">
                    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.45);">
                      Almost there
                    </p>
                    <h1 style="margin:0;font-family:Georgia,serif;font-size:34px;font-weight:600;color:#ffffff;line-height:1.08;letter-spacing:-0.01em;">
                      Verify your<br/>email address
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 40px 28px;">
                    <p style="margin:0 0 20px;font-size:16px;color:#6B5244;line-height:1.7;">
                      Hi ${firstName}, welcome to Tripile! Click the button below to verify your email address and activate your account.
                    </p>

                    <!-- CTA button -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                      <tr>
                        <td style="border-radius:12px;background:linear-gradient(135deg,#5C1828,#8B2A3F);box-shadow:0 4px 16px rgba(92,24,40,0.30);">
                          <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:12px;letter-spacing:0.01em;">
                            Verify my email &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 8px;font-size:13px;color:#A89282;line-height:1.65;">
                      This link expires in <strong>24 hours</strong>. If you did not create a Tripile account, you can safely ignore this email.
                    </p>

                    <!-- Fallback URL -->
                    <p style="margin:20px 0 0;font-size:12px;color:#A89282;">
                      Button not working? Copy and paste this link:
                    </p>
                    <p style="margin:4px 0 0;font-size:12px;word-break:break-all;">
                      <a href="${url}" style="color:#5C1828;">${url}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 40px;">
                    <div style="height:1px;background:#EDE0CC;"></div>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 40px 28px;">
                    <p style="margin:0;font-size:12px;color:#A89282;line-height:1.65;">
                      Questions? Call us at <strong style="color:#5C1828;">1-800-963-4330</strong> or reply to this email.
                      Our agents are available Mon&ndash;Sat, 8am&ndash;9pm ET.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Sub-footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#A89282;">
                &copy; ${new Date().getFullYear()} Tripile &middot; All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Send functions ────────────────────────────────────────────────────────────

export async function sendVerificationEmail(
  toEmail: string,
  toName: string,
  verificationUrl: string,
): Promise<void> {
  // Always log to console (helpful even in production for debugging)
  console.log(`[email] Sending verification to ${toEmail} → ${verificationUrl}`);

  const resend = getResend();
  const { error } = await resend.emails.send({
    from:    FROM,
    to:      toEmail,
    subject: "Verify your Tripile email address",
    html:    verificationHtml(toName, verificationUrl),
  });

  if (error) {
    console.error("[email] Resend error:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}
