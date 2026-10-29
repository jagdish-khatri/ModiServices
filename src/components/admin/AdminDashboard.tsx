"use client";

import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import {
  TrendingUp, LogOut, Users, Clock, CheckCircle, AlertCircle,
  Search, Download, X, ChevronLeft, ChevronRight, Loader2,
  MessageCircle, Phone, Mail, FileText,
} from "lucide-react";

type EnquiryStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED";

interface Enquiry {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string | null;
  serviceInterested: string;
  preferredContactMethod: string;
  message?: string | null;
  status: EnquiryStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  closed: number;
}

const STATUS_LABELS: Record<EnquiryStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  IN_PROGRESS: "In Progress",
  CLOSED: "Closed",
};

const STATUS_COLORS: Record<EnquiryStatus, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  CLOSED: "bg-green-100 text-green-700",
};

const CONTACT_ICON: Record<string, typeof Phone> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

export default function AdminDashboard({
  stats,
  adminName,
}: {
  stats: Stats;
  adminName: string;
}) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [updateNotes, setUpdateNotes] = useState("");
  const [updateStatus, setUpdateStatus] = useState<EnquiryStatus>("NEW");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [liveStats, setLiveStats] = useState(stats);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString(), limit: "20" });
    if (statusFilter !== "all") params.append("status", statusFilter);
    if (search) params.append("search", search);

    try {
      const res = await fetch(`/api/admin/enquiries?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEnquiries(data.enquiries);
      setTotalPages(data.pagination.totalPages);
      setTotalResults(data.pagination.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  function selectEnquiry(e: Enquiry) {
    setSelected(e);
    setUpdateStatus(e.status);
    setUpdateNotes(e.notes || "");
    setUpdateError(null);
    setUpdateSuccess(false);
  }

  async function handleUpdate() {
    if (!selected) return;
    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    try {
      const res = await fetch(`/api/admin/enquiries/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updateStatus, notes: updateNotes }),
      });
      if (!res.ok) throw new Error("Update failed");
      const { enquiry } = await res.json();
      setSelected(enquiry);
      setEnquiries((prev) => prev.map((e) => (e.id === enquiry.id ? enquiry : e)));
      setUpdateSuccess(true);
    } catch {
      setUpdateError("Failed to save changes. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleExport() {
    const params = new URLSearchParams({ limit: "1000", page: "1" });
    if (statusFilter !== "all") params.append("status", statusFilter);
    if (search) params.append("search", search);
    const res = await fetch(`/api/admin/enquiries?${params}`);
    const data = await res.json();
    const rows: Enquiry[] = data.enquiries;
    const headers = ["ID", "Full Name", "Mobile", "Email", "Service", "Contact Method", "Status", "Message", "Notes", "Created At"];
    const esc = (s: string) => `"${(s || "").replace(/"/g, '""')}"`;
    const csv = [
      headers.join(","),
      ...rows.map((r) => [
        r.id, esc(r.fullName), r.mobileNumber, r.email || "",
        esc(r.serviceInterested), r.preferredContactMethod, r.status,
        esc(r.message || ""), esc(r.notes || ""), r.createdAt,
      ].join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const statCards = [
    { label: "Total", value: liveStats.total, icon: Users, bg: "bg-slate-100", text: "text-slate-700" },
    { label: "New", value: liveStats.new, icon: AlertCircle, bg: "bg-blue-100", text: "text-blue-700" },
    { label: "Contacted", value: liveStats.contacted, icon: Clock, bg: "bg-yellow-100", text: "text-yellow-700" },
    { label: "In Progress", value: liveStats.inProgress, icon: TrendingUp, bg: "bg-purple-100", text: "text-purple-700" },
    { label: "Closed", value: liveStats.closed, icon: CheckCircle, bg: "bg-green-100", text: "text-green-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sticky header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center"
              style={{ background: "#0d9488" }}
            >
              <TrendingUp className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Modi Services · Admin</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-xs text-gray-500 hidden sm:block">
              Signed in as <strong>{adminName}</strong>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Lead Management</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, bg, text }) => (
            <div key={label} className={`rounded-xl p-4 ${bg}`}>
              <div className={`flex items-center gap-1.5 mb-1 ${text}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold">{label}</span>
              </div>
              <p className={`text-2xl font-bold ${text}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search name or mobile..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              aria-label="Search enquiries by name or mobile"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
            aria-label="Export filtered enquiries to CSV"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Enquiry list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" aria-label="Loading enquiries" />
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
                  <p className="text-sm font-medium">No enquiries found</p>
                  <p className="text-xs mt-1">Try adjusting the filters</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="sr-only">Enquiries list — {totalResults} total</caption>
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["Name / Mobile", "Service", "Status", "Date"].map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {enquiries.map((e) => {
                        const ContactIcon = CONTACT_ICON[e.preferredContactMethod] || Phone;
                        return (
                          <tr
                            key={e.id}
                            onClick={() => selectEnquiry(e)}
                            onKeyDown={(ev) => ev.key === "Enter" && selectEnquiry(e)}
                            className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                              selected?.id === e.id ? "bg-blue-50 ring-1 ring-inset ring-blue-200" : ""
                            }`}
                            tabIndex={0}
                            role="button"
                            aria-pressed={selected?.id === e.id}
                            aria-label={`View enquiry from ${e.fullName}`}
                          >
                            <td className="px-4 py-3">
                              <p className="font-semibold text-gray-900">{e.fullName}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <ContactIcon className="h-3 w-3" aria-hidden="true" />
                                {e.mobileNumber}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600">{e.serviceInterested}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[e.status]}`}>
                                {STATUS_LABELS[e.status]}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                              {new Date(e.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit", month: "short", year: "numeric",
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {totalResults} result{totalResults !== 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs font-medium text-gray-600">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detail / update panel */}
          <div>
            {selected ? (
              <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-bold text-gray-900">{selected.fullName}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">{selected.serviceInterested}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    aria-label="Close detail panel"
                  >
                    <X className="h-4 w-4 text-gray-500" aria-hidden="true" />
                  </button>
                </div>

                {/* Contact info */}
                <dl className="space-y-3 text-sm mb-5">
                  {[
                    { label: "Mobile", value: selected.mobileNumber, href: `tel:${selected.mobileNumber}` },
                    { label: "Email", value: selected.email || "Not provided", href: selected.email ? `mailto:${selected.email}` : undefined },
                    { label: "Preferred Contact", value: selected.preferredContactMethod },
                    { label: "Received", value: new Date(selected.createdAt).toLocaleString("en-IN") },
                  ].map(({ label, value, href }) => (
                    <div key={label}>
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</dt>
                      <dd className="mt-0.5 text-gray-800">
                        {href ? (
                          <a href={href} className="text-blue-600 hover:underline">{value}</a>
                        ) : value}
                      </dd>
                    </div>
                  ))}
                  {selected.message && (
                    <div>
                      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</dt>
                      <dd className="mt-1 text-gray-700 bg-gray-50 rounded-lg p-3 text-xs leading-relaxed">
                        {selected.message}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Update form */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Update Enquiry</h3>

                  {updateError && (
                    <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2" role="alert">
                      {updateError}
                    </p>
                  )}
                  {updateSuccess && (
                    <p className="text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2" role="status">
                      ✓ Changes saved successfully
                    </p>
                  )}

                  <div>
                    <label htmlFor="update-status" className="text-xs font-semibold text-gray-700 block mb-1">
                      Status
                    </label>
                    <select
                      id="update-status"
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value as EnquiryStatus)}
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {Object.entries(STATUS_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="update-notes" className="text-xs font-semibold text-gray-700 block mb-1">
                      Internal Notes
                    </label>
                    <textarea
                      id="update-notes"
                      value={updateNotes}
                      onChange={(e) => setUpdateNotes(e.target.value)}
                      rows={3}
                      maxLength={2000}
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Add follow-up notes..."
                    />
                  </div>

                  <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white py-2.5 transition-colors disabled:opacity-60"
                    style={{ background: "#1d4ed8" }}
                  >
                    {updating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
                <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="text-sm font-medium">Select an enquiry</p>
                <p className="text-xs mt-1">Click any row to view and update details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
