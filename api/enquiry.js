// Vercel serverless function: POST /api/enquiry
// Receives the Enquiry form submission and emails it via Resend (https://resend.com).
//
// Setup required (one-time, done by the site owner, not by this code):
//   1. Create a free Resend account at https://resend.com and verify the email
//      address that should receive enquiries (e.g. yalinggan911@gmail.com) —
//      or verify a real domain if you have one, for a nicer "from" address.
//   2. Create an API key in the Resend dashboard.
//   3. In the Vercel project: Settings -> Environment Variables, add
//      RESEND_API_KEY = <the key>, then redeploy (or just push a new commit).
//   4. Optionally set ENQUIRY_TO_EMAIL if the receiving address should differ
//      from the default below.
//
// Without RESEND_API_KEY configured, this function returns a 500 so the
// frontend shows a clear error instead of silently pretending to succeed.

const TO_EMAIL = process.env.ENQUIRY_TO_EMAIL || "yalinggan911@gmail.com";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ ok: false, error: "Email service is not configured (missing RESEND_API_KEY)." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const { name, email, dates, travelers, message, website } = body;

  // Honeypot: a hidden field real visitors never fill in. Bots that fill
  // every field will trip this and get a fake-success response.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email) {
    return res.status(400).json({ ok: false, error: "Name and email are required." });
  }

  const subject = `New enquiry from ${name} — Hidden Trails Zhangjiajie`;
  const html = `
    <h2>New enquiry — Hidden Trails Zhangjiajie</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Preferred travel dates:</strong> ${escapeHtml(dates) || "(not provided)"}</p>
    <p><strong>Number of travelers:</strong> ${escapeHtml(travelers) || "(not provided)"}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>") || "(none)"}</p>
  `;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hidden Trails Enquiry <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", resendRes.status, errText);
      return res.status(502).json({ ok: false, error: "Failed to send enquiry email." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Enquiry send error:", err);
    return res.status(500).json({ ok: false, error: "Unexpected error sending enquiry." });
  }
}
