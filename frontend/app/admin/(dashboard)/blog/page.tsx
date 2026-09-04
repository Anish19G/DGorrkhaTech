"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import {
  adminCreateBlogPost,
  adminDeleteBlogPost,
  adminGetBlogPosts,
  adminUpdateBlogPost,
} from "@/lib/api";
import type { BlogPost } from "@/lib/types";

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  authorName: "DGorkhaTech Team",
  published: false,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    adminGetBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      authorName: post.authorName,
      published: post.published,
    });
    setShowForm(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await adminUpdateBlogPost(editingId, form);
      } else {
        await adminCreateBlogPost(form);
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await adminDeleteBlogPost(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
          <p className="mt-1 text-sm text-slate-500">Insights posts shown on the public site.</p>
        </div>
        <Button onClick={startCreate}>
          <Plus size={16} /> New post
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
          </div>
          <Field label="Excerpt">
            <input
              required
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="admin-input"
            />
          </Field>
          <Field label="Content">
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="admin-input"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Author">
              <input
                required
                value={form.authorName}
                onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                className="admin-input"
              />
            </Field>
            <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <Button type="submit">{editingId ? "Save changes" : "Create post"}</Button>
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
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                <td className="px-4 py-3 text-slate-500">{post.slug}</td>
                <td className="px-4 py-3 text-slate-500">{post.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => startEdit(post)} className="text-slate-400 hover:text-brand-700">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(post.id)} className="text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && posts.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">No posts yet.</p>
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
