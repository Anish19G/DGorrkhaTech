import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../middleware/errorHandler";

export const blogRouter = Router();

blogRouter.get("/", async (_req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:slug", async (req, res, next) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
    if (!post || !post.published) throw new ApiError(404, "Post not found");
    res.json(post);
  } catch (err) {
    next(err);
  }
});
