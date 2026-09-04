import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { portfolioProjectSchema } from "../schemas/content";

export const adminPortfolioRouter = Router();

adminPortfolioRouter.use(requireAdmin);

adminPortfolioRouter.get("/", async (_req, res, next) => {
  try {
    const projects = await prisma.portfolioProject.findMany({ orderBy: { order: "asc" } });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

adminPortfolioRouter.post("/", async (req, res, next) => {
  try {
    const data = portfolioProjectSchema.parse(req.body);
    const project = await prisma.portfolioProject.create({
      data: { ...data, projectUrl: data.projectUrl || null },
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

adminPortfolioRouter.put("/:id", async (req, res, next) => {
  try {
    const data = portfolioProjectSchema.parse(req.body);
    const existing = await prisma.portfolioProject.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Project not found");

    const project = await prisma.portfolioProject.update({
      where: { id: req.params.id },
      data: { ...data, projectUrl: data.projectUrl || null },
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

adminPortfolioRouter.delete("/:id", async (req, res, next) => {
  try {
    const existing = await prisma.portfolioProject.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Project not found");

    await prisma.portfolioProject.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
