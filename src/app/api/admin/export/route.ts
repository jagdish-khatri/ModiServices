import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Build query from search params
    const url = new URL(request.url);
    const params = new URLSearchParams({
      page: "1",
      limit: "1000", // large batch for full export
    });
    const statusParam = url.searchParams.get("status");
    const searchParam = url.searchParams.get("search");
    if (statusParam && statusParam !== "all") params.append("status", statusParam);
    if (searchParam) params.append("search", searchParam);

    // Reuse the enquiries endpoint logic
    const { prisma } = await import("@/lib/prisma");
    const where: Record<string, unknown> = {};
    if (statusParam && statusParam !== "all") where.status = statusParam;
    if (searchParam) {
      where.OR = [
        { fullName: { contains: searchParam, mode: "insensitive" } },
        { mobileNumber: { contains: searchParam } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 5000,
    });

    const headers = [
      "ID", "Full Name", "Mobile Number", "Email", "Service Interested",
      "Preferred Contact", "Status", "Message", "Notes", "Created At", "Updated At",
    ];
    const esc = (s: string | null | undefined) => `"${(s || "").replace(/"/g, '""')}"`;
    const rows = enquiries.map((e) =>
      [
        e.id, esc(e.fullName), e.mobileNumber, esc(e.email),
        esc(e.serviceInterested), e.preferredContactMethod, e.status,
        esc(e.message), esc(e.notes),
        e.createdAt.toISOString(), e.updatedAt.toISOString(),
      ].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[GET /api/admin/export] Error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
