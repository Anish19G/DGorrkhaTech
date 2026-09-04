"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import {
  adminCreateService,
  adminDeleteService,
  adminGetServices,
  adminUpdateService,
} from "@/lib/api";
import type { Service } from "@/lib/types";

const emptyForm = {
  slug: "",
  title: "",
  summary: "",
  description: "",
  icon: "Code2",
  featured: false,
  order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminGetServices()
      .then(setServices)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      slug: service.slug,
      title: service.title,
      summary: service.summary,
      description: service.description,
      icon: service.icon,
      featured: service.featured,
      order: service.order,
    });
    setShowForm(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await adminUpdateService(editingId, form);
      } else {
        await adminCreateService(form);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await adminDeleteService(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the services shown on the public site.</p>
        </div>
        <Button onClick={startCreate}>
          <Plus size={16} /> New service
        </Button>
      </div>

      {showForm && (
        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="admin-input"
              />
            </Field>
            <Field label="Slug">
              <input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="admin-input"
                placeholder="web-development"
              />
            </Field>
          </div>
          <Field label="Summary">
            <input
              required
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="admin-input"
            />
          </Field>
          <Field label="Description">
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="admin-input"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Icon (lucide name)">
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="admin-input"
              />
            </Field>
            <Field label="Order">
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="admin-input"
              />
            </Field>
            <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <Button type="submit">{editingId ? "Save changes" : "Create service"}</Button>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{service.title}</td>
                <td className="px-4 py-3 text-slate-500">{service.slug}</td>
                <td className="px-4 py-3 text-slate-500">{service.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-slate-500">{service.order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => startEdit(service)} className="text-slate-400 hover:text-brand-700">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(service.id)} className="text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && services.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">No services yet.</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
