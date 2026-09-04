import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { ApiRequestError, getPortfolioProject } from "@/lib/api";

interface Props {
  params: { slug: string };
}

async function fetchProject(slug: string) {
  try {
    return await getPortfolioProject(slug);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await fetchProject(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const project = await fetchProject(params.slug);
  if (!project) notFound();

  return (
    <Section className="pt-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        {project.client}
      </p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">{project.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">{project.summary}</p>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="prose prose-slate mt-8 max-w-2xl whitespace-pre-line text-slate-700">
        {project.description}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <LinkButton href="/contact">
          Start a similar project <ArrowRight size={16} />
        </LinkButton>
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Visit project <ExternalLink size={16} />
          </a>
        )}
      </div>
    </Section>
  );
}
