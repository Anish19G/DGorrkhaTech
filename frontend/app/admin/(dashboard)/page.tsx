"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { adminGetContacts, adminUpdateContactStatus } from "@/lib/api";
import type { ContactStatus, ContactSubmission } from "@/lib/types";

const statusStyles: Record<ContactStatus, string> = {
  NEW: "bg-amber-100 text-amber-800",
  CONTACTED: "bg-blue-100 text-blue-800",
  CLOSED: "bg-slate-100 text-slate-600",
};

export default function AdminLeadsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminGetContacts()
      .then(setSubmissions)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onStatusChange = async (id: string, status: ContactStatus) => {
    const updated = await adminUpdateContactStatus(id, status);
    setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
      <p className="mt-1 text-sm text-slate-500">Contact form submissions from the public site.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Interested in</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {submissions.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {s.name}
                  {s.company && <div className="text-xs font-normal text-slate-400">{s.company}</div>}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <div>{s.email}</div>
                  {s.phone && <div className="text-xs text-slate-400">{s.phone}</div>}
                </td>
                <td className="px-4 py-3 text-slate-600">{s.serviceInterest || "—"}</td>
                <td className="px-4 py-3 max-w-xs text-slate-600">
                  <p className="line-clamp-2">{s.message}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={s.status}
                    onChange={(e) => onStatusChange(s.id, e.target.value as ContactStatus)}
                    className={clsx(
                      "rounded-full border-0 px-3 py-1 text-xs font-semibold focus:ring-1 focus:ring-brand-500",
                      statusStyles[s.status]
                    )}
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && submissions.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">No submissions yet.</p>
        )}
        {loading && <p className="p-6 text-center text-sm text-slate-500">Loading…</p>}
      </div>
    </div>
  );
}
