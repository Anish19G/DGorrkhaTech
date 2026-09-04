import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { serviceSchema } from "../schemas/content";

export const adminServicesRouter = Router();

adminServicesRouter.use(requireAdmin);

adminServicesRouter.get("/", async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    res.json(services);
  } catch (err) {
    next(err);
  }
});

adminServicesRouter.post("/", async (req, res, next) => {
  try {
    const data = serviceSchema.parse(req.body);
    const service = await prisma.service.create({ data });
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
});

adminServicesRouter.put("/:id", async (req, res, next) => {
  try {
    const data = serviceSchema.parse(req.body);
    const existing = await prisma.service.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Service not found");

    const service = await prisma.service.update({ where: { id: req.params.id }, data });
    res.json(service);
  } catch (err) {
    next(err);
  }
});

adminServicesRouter.delete("/:id", async (req, res, next) => {
  try {
    const existing = await prisma.service.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Service not found");

    await prisma.service.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});
