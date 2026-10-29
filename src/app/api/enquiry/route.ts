import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validations";

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait before submitting again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Server-side validation
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { fullName, mobileNumber, email, serviceInterested, preferredContactMethod, message, consentGiven } =
      parsed.data;

    // Sanitize inputs before storage
    const enquiry = await prisma.enquiry.create({
      data: {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email?.trim() || null,
        serviceInterested,
        preferredContactMethod,
        message: message?.trim() || null,
        consentGiven,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry received successfully.",
        id: enquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/enquiry] Error:", error);

    // Don't expose internal error details to client
    return NextResponse.json(
      {
        success: false,
        error:
          "We encountered an error saving your enquiry. Please try again or contact us directly via phone or WhatsApp.",
      },
      { status: 500 }
    );
  }
}
