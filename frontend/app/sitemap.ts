import type { MetadataRoute } from "next";
import { getBlogPosts, getPortfolio, getServices } from "@/lib/api";

const BASE_URL = "https://www.dgorkhatech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/services", "/portfolio", "/blog", "/about", "/contact"].map(
    (path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const [services, projects, posts] = await Promise.all([
    getServices().catch(() => []),
    getPortfolio().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...services.map((s) => ({ url: `${BASE_URL}/services/${s.slug}`, lastModified: new Date() })),
    ...projects.map((p) => ({ url: `${BASE_URL}/portfolio/${p.slug}`, lastModified: new Date() })),
    ...posts.map((p) => ({ url: `${BASE_URL}/blog/${p.slug}`, lastModified: new Date() })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
