import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { ApiRequestError, getBlogPost } from "@/lib/api";

interface Props {
  params: { slug: string };
}

async function fetchPost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const publishedAt = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-medium text-slate-400">
          {publishedAt} · By {post.authorName}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">{post.title}</h1>
        <div className="prose prose-slate mt-8 whitespace-pre-line text-slate-700">
          {post.content}
        </div>
      </div>
    </Section>
  );
}
