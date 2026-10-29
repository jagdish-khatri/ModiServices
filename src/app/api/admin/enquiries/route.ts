import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
}

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED", "all"]).optional(),
  service: z.string().optional(),
  search: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const params = querySchema.safeParse(Object.fromEntries(url.searchParams));
    if (!params.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const { page, limit, status, service, search, from, to } = params.data;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (service) where.serviceInterested = service;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { mobileNumber: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          mobileNumber: true,
          email: true,
          serviceInterested: true,
          preferredContactMethod: true,
          message: true,
          status: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.enquiry.count({ where }),
    ]);

    return NextResponse.json({
      enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[GET /api/admin/enquiries] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
