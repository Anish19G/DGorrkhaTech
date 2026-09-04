import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { blogPostSchema } from "../schemas/content";

export const adminBlogRouter = Router();

adminBlogRouter.use(requireAdmin);

adminBlogRouter.get("/", async (_req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.post("/", async (req, res, next) => {
  try {
    const data = blogPostSchema.parse(req.body);
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        coverImage: data.coverImage || null,
        publishedAt: data.published ? new Date() : null,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.put("/:id", async (req, res, next) => {
  try {
    const data = blogPostSchema.parse(req.body);
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Post not found");

    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        ...data,
        coverImage: data.coverImage || null,
        publishedAt: data.published ? existing.publishedAt ?? new Date() : null,
      },
    });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.delete("/:id", async (req, res, next) => {
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Post not found");

    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
