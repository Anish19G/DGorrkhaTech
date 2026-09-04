import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description: "DGorkhaTech is an IT consulting office helping businesses digitalize end-to-end.",
};

const values = [
  {
    title: "Business first, technology second",
    description:
      "We start every engagement by understanding how your business actually works, not by pitching a stack.",
  },
  {
    title: "Accountable delivery",
    description:
      "One team owns your project from strategy through launch — no hand-offs, no lost context.",
  },
  {
    title: "Built to last",
    description:
      "We use maintainable, well-documented, modern architectures so your systems keep working long after we ship.",
  },
];

export default function AboutPage() {
  return (
    <Section className="pt-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">About DGorkhaTech</h1>
        <p className="mt-4 text-lg text-slate-600">
          DGorkhaTech is an IT consulting office built for businesses that are ready to move off
          spreadsheets, disconnected tools, and manual processes — and onto systems that scale with
          them.
        </p>
        <p className="mt-4 text-slate-600">
          We work across IT strategy, custom software, websites, mobile apps, and data — as one
          accountable team, so you never have to coordinate between five different vendors to get
          one project done.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.title}>
            <h2 className="text-lg font-semibold text-slate-900">{value.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{value.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
