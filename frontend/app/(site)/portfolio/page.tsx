import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { getPortfolio } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Case studies of businesses DGorkhaTech has helped digitalize.",
};

export default async function PortfolioPage() {
  const projects = await getPortfolio();

  return (
    <Section className="pt-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Our Work</h1>
        <p className="mt-3 text-slate-600">
          A selection of projects where we helped businesses replace manual processes with modern
          systems.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.id} href={`/portfolio/${project.slug}`}>
            <Card className="h-full">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
                {project.client}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">{project.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
