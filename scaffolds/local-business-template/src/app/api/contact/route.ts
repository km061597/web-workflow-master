import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Failed to send email. Configure RESEND_API_KEY in .env.local." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, message } = body;

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.BUSINESS_EMAIL || "hello@example.com",
      subject: `New contact from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email. Configure RESEND_API_KEY in .env.local." },
      { status: 500 }
    );
  }
}
