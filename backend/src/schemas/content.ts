import { z } from "zod";

const slug = z
  .string()
  .trim()
  .min(2)
  .max(150)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, and hyphen-separated");

export const serviceSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(150),
  summary: z.string().trim().min(2).max(300),
  description: z.string().trim().min(2),
  icon: z.string().trim().min(1).max(100),
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});

export const portfolioProjectSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(150),
  client: z.string().trim().min(1).max(150),
  summary: z.string().trim().min(2).max(300),
  description: z.string().trim().min(2),
  coverImage: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).default([]),
  projectUrl: z.string().trim().url().optional().or(z.literal("")),
  order: z.number().int().optional().default(0),
});

export const blogPostSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(200),
  excerpt: z.string().trim().min(2).max(400),
  content: z.string().trim().min(2),
  coverImage: z.string().trim().optional().or(z.literal("")),
  authorName: z.string().trim().min(1).max(150),
  published: z.boolean().optional().default(false),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(1).max(150),
  role: z.string().trim().min(1).max(150),
  company: z.string().trim().min(1).max(150),
  quote: z.string().trim().min(2).max(1000),
  avatarUrl: z.string().trim().optional().or(z.literal("")),
  order: z.number().int().optional().default(0),
});
