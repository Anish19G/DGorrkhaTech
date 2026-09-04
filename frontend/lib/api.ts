import type {
  AdminUser,
  BlogPost,
  ContactSubmission,
  PortfolioProject,
  Service,
  Testimonial,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiRequestError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit & { revalidate?: number } = {}
): Promise<T> {
  const { revalidate, ...init } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    ...(revalidate !== undefined
      ? { next: { revalidate } }
      : init.cache
        ? {}
        : { cache: "no-store" as RequestCache }),
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      message = body.error || message;
    } catch {
      // ignore body parse errors
    }
    throw new ApiRequestError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// Public, server-fetchable content — cached and revalidated for SEO pages.
export const getServices = () => request<Service[]>("/api/services", { revalidate: 300 });
export const getService = (slug: string) =>
  request<Service>(`/api/services/${slug}`, { revalidate: 300 });

export const getPortfolio = () =>
  request<PortfolioProject[]>("/api/portfolio", { revalidate: 300 });
export const getPortfolioProject = (slug: string) =>
  request<PortfolioProject>(`/api/portfolio/${slug}`, { revalidate: 300 });

export const getBlogPosts = () => request<BlogPost[]>("/api/blog", { revalidate: 300 });
export const getBlogPost = (slug: string) =>
  request<BlogPost>(`/api/blog/${slug}`, { revalidate: 300 });

export const getTestimonials = () =>
  request<Testimonial[]>("/api/testimonials", { revalidate: 300 });

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message: string;
}

export const submitContact = (data: ContactFormInput) =>
  request<{ id: string; message: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });

// Auth (client-side, credentialed)
export const adminLogin = (email: string, password: string) =>
  request<AdminUser>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    credentials: "include",
    cache: "no-store",
  });

export const adminLogout = () =>
  request<void>("/api/auth/logout", { method: "POST", credentials: "include", cache: "no-store" });

export const adminMe = () =>
  request<AdminUser>("/api/auth/me", { credentials: "include", cache: "no-store" });

// Admin content management (client-side, credentialed)
export const adminGetContacts = () =>
  request<ContactSubmission[]>("/api/admin/contacts", { credentials: "include", cache: "no-store" });

export const adminUpdateContactStatus = (id: string, status: ContactSubmission["status"]) =>
  request<ContactSubmission>(`/api/admin/contacts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    credentials: "include",
    cache: "no-store",
  });

export const adminGetServices = () =>
  request<Service[]>("/api/admin/services", { credentials: "include", cache: "no-store" });
export const adminCreateService = (data: Omit<Service, "id">) =>
  request<Service>("/api/admin/services", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });
export const adminUpdateService = (id: string, data: Omit<Service, "id">) =>
  request<Service>(`/api/admin/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });
export const adminDeleteService = (id: string) =>
  request<void>(`/api/admin/services/${id}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });

export const adminGetPortfolio = () =>
  request<PortfolioProject[]>("/api/admin/portfolio", { credentials: "include", cache: "no-store" });
export const adminCreatePortfolioProject = (data: Omit<PortfolioProject, "id">) =>
  request<PortfolioProject>("/api/admin/portfolio", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });
export const adminUpdatePortfolioProject = (id: string, data: Omit<PortfolioProject, "id">) =>
  request<PortfolioProject>(`/api/admin/portfolio/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });
export const adminDeletePortfolioProject = (id: string) =>
  request<void>(`/api/admin/portfolio/${id}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });

export const adminGetBlogPosts = () =>
  request<BlogPost[]>("/api/admin/blog", { credentials: "include", cache: "no-store" });
export const adminCreateBlogPost = (
  data: Omit<BlogPost, "id" | "publishedAt" | "createdAt">
) =>
  request<BlogPost>("/api/admin/blog", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });
export const adminUpdateBlogPost = (
  id: string,
  data: Omit<BlogPost, "id" | "publishedAt" | "createdAt">
) =>
  request<BlogPost>(`/api/admin/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
    cache: "no-store",
  });
export const adminDeleteBlogPost = (id: string) =>
  request<void>(`/api/admin/blog/${id}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });

export { ApiRequestError };
