import { NextResponse } from "next/server";

const RECEIVER = process.env.CONTACT_RECEIVER_EMAIL;
const FROM = process.env.EMAIL_FROM || "onbrd@resend.dev";
const API_KEY = process.env.EMAIL_API_KEY;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const subject = typeof b.subject === "string" ? b.subject.trim().slice(0, 200) : "";
  const company = typeof b.company === "string" ? b.company.trim().slice(0, 200) : "";
  const budget = typeof b.budget === "string" ? b.budget.trim().slice(0, 200) : "";
  const description = typeof b.description === "string" ? b.description.trim().slice(0, 5000) : "";

  const errors: Record<string, string> = {};
  if (!name || name.length > 200) errors.name = "Please enter your name.";
  if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
  if (!description) errors.description = "Please describe your project.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 400 });
  }

  if (!RECEIVER || !API_KEY) {
    console.error("Contact email not configured: CONTACT_RECEIVER_EMAIL / EMAIL_API_KEY missing.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const sentAt = new Date().toISOString();
  const mailSubject = subject ? `New contact inquiry: ${subject}` : `New contact inquiry from ${name}`;
  const text = [
    "New contact form submission on apexautosoft.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject || "(not provided)"}`,
    `Company: ${company || "(not provided)"}`,
    `Budget: ${budget || "(not provided)"}`,
    "",
    "Message:",
    description,
    "",
    `Sent: ${sentAt} (UTC)`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECEIVER],
        reply_to: email,
        subject: mailSubject,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Email API error:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "Email delivery failed." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ error: "Email delivery failed." }, { status: 500 });
  }
}