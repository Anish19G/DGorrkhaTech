import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { getBlogPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on digital transformation, software, and data from the DGorkhaTech team.",
};

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Section className="pt-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Insights</h1>
        <p className="mt-3 text-slate-600">
          Practical notes on digital transformation, software delivery, and data — from projects
          we&apos;ve shipped.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full">
              <p className="text-xs font-medium text-slate-400">{formatDate(post.publishedAt)}</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              <p className="mt-4 text-xs font-semibold text-slate-500">By {post.authorName}</p>
            </Card>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-slate-500">No posts published yet — check back soon.</p>
        )}
      </div>
    </Section>
  );
}
