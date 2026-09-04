import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { contactStatusUpdateSchema } from "../schemas/contact";

export const adminContactsRouter = Router();

adminContactsRouter.use(requireAdmin);

adminContactsRouter.get("/", async (_req, res, next) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
});

adminContactsRouter.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = contactStatusUpdateSchema.parse(req.body);
    const existing = await prisma.contactSubmission.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new ApiError(404, "Submission not found");

    const updated = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
