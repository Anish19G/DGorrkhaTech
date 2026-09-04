import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "./Card";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="flex flex-col">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{service.summary}</p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        Learn more <ArrowRight size={16} />
      </Link>
    </Card>
  );
}
