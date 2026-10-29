import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { clientIp } from "@/lib/client-ip";
import { checkLimit, recordEvent, rateLimitedResponse } from "@/lib/rate-limit";
import { apiError } from "@/lib/api-errors";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // Honeypot: real visitors never see this field, so any value means a bot.
    // We answer "success" so the bot learns nothing, and send nothing.
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const { name, email, phone, service, message } = body ?? {};

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: "Your message is too long." }, { status: 400 });
    }

    // At most 5 messages per hour from one address
    const bucket = `contact:ip:${clientIp(request)}`;
    const limit = await checkLimit(bucket, 5, 60 * 60);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSeconds);
    await recordEvent(bucket);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const cleanName = oneLine(name);
    const cleanService = typeof service === "string" ? oneLine(service) : "";

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVING_EMAIL,
      replyTo: email.trim(),
      subject: `New enquiry from ${cleanName}${cleanService ? ` - ${cleanService}` : ""}`,
      text: `
Name: ${cleanName}
Email: ${email.trim()}
Phone: ${typeof phone === "string" && phone.trim() ? phone.trim() : "Not provided"}
Service of interest: ${cleanService || "Not specified"}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Contact form");
  }
}