import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Modi Services",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 antialiased" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
