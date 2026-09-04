import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../middleware/errorHandler";

export const portfolioRouter = Router();

portfolioRouter.get("/", async (_req, res, next) => {
  try {
    const projects = await prisma.portfolioProject.findMany({ orderBy: { order: "asc" } });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

portfolioRouter.get("/:slug", async (req, res, next) => {
  try {
    const project = await prisma.portfolioProject.findUnique({ where: { slug: req.params.slug } });
    if (!project) throw new ApiError(404, "Project not found");
    res.json(project);
  } catch (err) {
    next(err);
  }
});
