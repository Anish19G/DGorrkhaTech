import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { getServices, getTestimonials } from "@/lib/api";

const stats = [
  { label: "Businesses digitalized", value: "60+" },
  { label: "Years of combined experience", value: "12+" },
  { label: "Average project timeline", value: "8 weeks" },
  { label: "Client retention", value: "94%" },
];

const whyUs = [
  "One accountable team across strategy, design, and engineering",
  "Fixed-scope discovery before any build begins",
  "Modern, maintainable systems — not throwaway prototypes",
  "Transparent pricing and weekly progress check-ins",
];

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([getServices(), getTestimonials()]);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            IT Consulting &amp; Digital Transformation
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            We digitalize businesses, end to end.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-100">
            DGorkhaTech is the IT consulting office behind the systems your business runs on —
            strategy, software, websites, and data, delivered by one team you can actually reach.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/contact" variant="inverse">
              Start a project <ArrowRight size={16} />
            </LinkButton>
            <LinkButton href="/services" variant="ghost" className="text-white hover:bg-white/10">
              Explore services
            </LinkButton>
          </div>
        </div>
      </section>

      <Section className="border-b border-slate-100">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-brand-700">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900">What we do</h2>
          <p className="mt-3 text-slate-600">
            A full-stack IT consulting practice — we take businesses from spreadsheets and manual
            processes to reliable, modern systems.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Why businesses choose DGorkhaTech</h2>
            <p className="mt-3 text-slate-600">
              We work like an in-house team, not a vendor — embedded in your goals, accountable for
              outcomes.
            </p>
            <ul className="mt-8 space-y-4">
              {whyUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">How an engagement starts</h3>
            <ol className="mt-6 space-y-6">
              {[
                ["1", "Discovery call", "We learn about your business and current systems."],
                ["2", "Scoped roadmap", "A clear plan with timeline and pricing, no surprises."],
                ["3", "Build & ship", "Weekly check-ins until it's live and your team is trained."],
              ].map(([num, title, desc]) => (
                <li key={num} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                    {num}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900">{title}</div>
                    <div className="text-sm text-slate-600">{desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section>
          <TestimonialCarousel testimonials={testimonials} />
        </Section>
      )}

      <Section className="bg-brand-700">
        <div className="flex flex-col items-center gap-6 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to digitalize your business?</h2>
          <p className="max-w-xl text-brand-100">
            Tell us where you are today — we&apos;ll tell you exactly how we&apos;d get you where you
            want to be.
          </p>
          <LinkButton href="/contact" variant="inverse">
            Get in touch <ArrowRight size={16} />
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
