"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import {
  adminCreatePortfolioProject,
  adminDeletePortfolioProject,
  adminGetPortfolio,
  adminUpdatePortfolioProject,
} from "@/lib/api";
import type { PortfolioProject } from "@/lib/types";

const emptyForm = {
  slug: "",
  title: "",
  client: "",
  summary: "",
  description: "",
  coverImage: "/images/portfolio/placeholder.svg",
  tags: "",
  projectUrl: "",
  order: 0,
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminGetPortfolio()
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (project: PortfolioProject) => {
    setEditingId(project.id);
    setForm({
      slug: project.slug,
      title: project.title,
      client: project.client,
      summary: project.summary,
      description: project.description,
      coverImage: project.coverImage,
      tags: project.tags.join(", "),
      projectUrl: project.projectUrl || "",
      order: project.order,
    });
    setShowForm(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editingId) {
        await adminUpdatePortfolioProject(editingId, payload);
      } else {
        await adminCreatePortfolioProject(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await adminDeletePortfolioProject(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-500">Case studies shown on the public site.</p>
        </div>
        <Button onClick={startCreate}>
          <Plus size={16} /> New project
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
              />
            </Field>
            <Field label="Client">
              <input
                required
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                className="admin-input"
              />
            </Field>
            <Field label="Cover image path">
              <input
                required
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="admin-input"
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
            <Field label="Tags (comma separated)">
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="admin-input"
              />
            </Field>
            <Field label="Project URL (optional)">
              <input
                value={form.projectUrl}
                onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
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
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <Button type="submit">{editingId ? "Save changes" : "Create project"}</Button>
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
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{project.title}</td>
                <td className="px-4 py-3 text-slate-500">{project.client}</td>
                <td className="px-4 py-3 text-slate-500">{project.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => startEdit(project)} className="text-slate-400 hover:text-brand-700">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(project.id)} className="text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && projects.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">No projects yet.</p>
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
