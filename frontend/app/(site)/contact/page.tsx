import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell DGorkhaTech about your project and we'll get back to you within one business day.",
};

const info = [
  { icon: Mail, label: "hello@dgorkhatech.com" },
  { icon: Phone, label: "+1 (555) 010-2030" },
  { icon: MapPin, label: "Remote-first, serving clients worldwide" },
];

export default function ContactPage() {
  return (
    <Section className="pt-16">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-slate-900">Let&apos;s talk</h1>
          <p className="mt-4 text-slate-600">
            Tell us a little about your business and what you&apos;re trying to solve. We reply to
            every message within one business day.
          </p>
          <ul className="mt-8 space-y-4">
            {info.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-slate-700">
                <Icon className="h-5 w-5 text-brand-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
