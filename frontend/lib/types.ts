export type ContactStatus = "NEW" | "CONTACTED" | "CLOSED";

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  featured: boolean;
  order: number;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  coverImage: string;
  tags: string[];
  projectUrl: string | null;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  authorName: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string | null;
  order: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
