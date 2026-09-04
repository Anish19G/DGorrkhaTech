import { Router } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../middleware/errorHandler";

export const servicesRouter = Router();

servicesRouter.get("/", async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    res.json(services);
  } catch (err) {
    next(err);
  }
});

servicesRouter.get("/:slug", async (req, res, next) => {
  try {
    const service = await prisma.service.findUnique({ where: { slug: req.params.slug } });
    if (!service) throw new ApiError(404, "Service not found");
    res.json(service);
  } catch (err) {
    next(err);
  }
});
