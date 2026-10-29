import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

const updateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"]).optional(),
  notes: z.string().max(2000).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: params.id },
    });
    if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ enquiry });
  } catch (error) {
    console.error("[GET /api/admin/enquiries/[id]] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.update({
      where: { id: params.id },
      data: parsed.data,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_ENQUIRY",
        entityType: "Enquiry",
        entityId: params.id,
        details: JSON.stringify(parsed.data),
        adminId: (session.user as any)?.id || "unknown",
      },
    });

    return NextResponse.json({ enquiry });
  } catch (error) {
    console.error("[PATCH /api/admin/enquiries/[id]] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
