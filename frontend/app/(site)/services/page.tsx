import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/api";

export const metadata: Metadata = {
  title: "Services",
  description:
    "IT consulting, software development, web and mobile development, data analytics, and cloud services from DGorkhaTech.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Section className="pt-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Services</h1>
        <p className="mt-3 text-slate-600">
          Everything a growing business needs to run on modern technology — under one roof.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </Section>
  );
}
