import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch live summary stats
  const [total, newCount, contacted, inProgress, closed] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count({ where: { status: "CONTACTED" } }),
    prisma.enquiry.count({ where: { status: "IN_PROGRESS" } }),
    prisma.enquiry.count({ where: { status: "CLOSED" } }),
  ]);

  const stats = { total, new: newCount, contacted, inProgress, closed };

  return (
    <AdminDashboard
      stats={stats}
      adminName={session.user?.name || "Admin"}
    />
  );
}
