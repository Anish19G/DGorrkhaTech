import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ApiRequestError, getService } from "@/lib/api";

interface Props {
  params: { slug: string };
}

async function fetchService(slug: string) {
  try {
    return await getService(slug);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchService(params.slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await fetchService(params.slug);
  if (!service) notFound();

  return (
    <Section className="pt-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <ServiceIcon name={service.icon} className="h-7 w-7" />
      </div>
      <h1 className="mt-6 text-4xl font-bold text-slate-900">{service.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">{service.summary}</p>
      <div className="prose prose-slate mt-8 max-w-2xl whitespace-pre-line text-slate-700">
        {service.description}
      </div>
      <div className="mt-10">
        <LinkButton href="/contact">
          Discuss this service <ArrowRight size={16} />
        </LinkButton>
      </div>
    </Section>
  );
}
