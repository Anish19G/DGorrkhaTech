import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@dgorkhatech.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "DGorkhaTech Admin",
      role: "ADMIN",
    },
  });

  const services = [
    {
      slug: "it-consulting",
      title: "IT Consulting",
      summary: "Strategic technology roadmaps to digitalize your business end-to-end.",
      description:
        "We assess your current systems, identify inefficiencies, and design a pragmatic digital transformation roadmap covering infrastructure, tooling, and process automation.",
      icon: "Lightbulb",
      featured: true,
      order: 1,
    },
    {
      slug: "software-development",
      title: "Software Development",
      summary: "Custom software built around how your business actually operates.",
      description:
        "From internal tools to customer-facing platforms, we design, build, and maintain custom software using modern, maintainable architectures.",
      icon: "Code2",
      featured: true,
      order: 2,
    },
    {
      slug: "web-development",
      title: "Web Development",
      summary: "Fast, accessible, SEO-ready websites and web applications.",
      description:
        "We build marketing sites, web portals, and full-stack web applications using modern frameworks, with performance and accessibility built in from day one.",
      icon: "Globe",
      featured: true,
      order: 3,
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      summary: "Native and cross-platform apps for iOS and Android.",
      description:
        "We design and ship mobile applications that extend your business to your customers' pockets, from MVP to scale.",
      icon: "Smartphone",
      featured: false,
      order: 4,
    },
    {
      slug: "data-analytics",
      title: "Data & Analytics",
      summary: "Turn your business data into decisions, not just dashboards.",
      description:
        "We build data pipelines, warehouses, and reporting layers so your team can make decisions backed by reliable, up-to-date data.",
      icon: "BarChart3",
      featured: true,
      order: 5,
    },
    {
      slug: "cloud-digital-transformation",
      title: "Cloud & Digital Transformation",
      summary: "Migrate, modernize, and scale your infrastructure with confidence.",
      description:
        "We help businesses move legacy systems to the cloud, automate operations, and adopt modern DevOps practices without disrupting day-to-day work.",
      icon: "Cloud",
      featured: false,
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Operations Director",
      company: "Northfield Retail Group",
      quote:
        "DGorkhaTech rebuilt our internal ordering system in under three months. What used to take our team a full day now takes twenty minutes.",
      order: 1,
    },
    {
      name: "Marcus Chen",
      role: "Founder",
      company: "Chen & Co. Logistics",
      quote:
        "They didn't just write code — they actually understood our business first. The roadmap they gave us in month one is still the plan we're executing today.",
      order: 2,
    },
    {
      name: "Priya Adhikari",
      role: "Head of Product",
      company: "Summit Health Analytics",
      quote:
        "Our data was scattered across five spreadsheets. DGorkhaTech gave us a single dashboard the whole team trusts.",
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: testimonial.name, company: testimonial.company },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }

  await prisma.portfolioProject.upsert({
    where: { slug: "northfield-retail-ordering-platform" },
    update: {},
    create: {
      slug: "northfield-retail-ordering-platform",
      title: "Northfield Retail Ordering Platform",
      client: "Northfield Retail Group",
      summary: "A custom B2B ordering platform that replaced a decade of spreadsheet-based ordering.",
      description:
        "Northfield Retail Group managed store-to-warehouse ordering through shared spreadsheets, causing frequent stock errors. We designed and built a web-based ordering platform with real-time inventory sync, role-based approvals, and automated reporting, cutting order processing time by over 90%.",
      coverImage: "/images/portfolio/northfield.svg",
      tags: ["Web Development", "Software Development", "Data & Analytics"],
      projectUrl: null,
      order: 1,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "why-digital-transformation-fails-and-how-to-fix-it" },
    update: {},
    create: {
      slug: "why-digital-transformation-fails-and-how-to-fix-it",
      title: "Why Digital Transformation Fails (And How to Fix It)",
      excerpt:
        "Most digital transformation efforts stall not because of bad technology, but because of unclear ownership and scope creep. Here's how we approach it differently.",
      content:
        "Most digital transformation efforts stall not because of bad technology, but because of unclear ownership and scope creep.\n\nAt DGorkhaTech, we start every engagement with a scoped, two-week discovery phase before writing a single line of code. This lets us map your actual workflows, identify the highest-leverage systems to digitalize first, and agree on measurable outcomes with your team before committing to a build.\n\nThe result: transformation projects that ship in weeks, not years, and that your team actually adopts because they were built around how you already work.",
      coverImage: null,
      authorName: "DGorkhaTech Team",
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${adminEmail} / password: ${adminPassword}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
