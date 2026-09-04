import { Router } from "express";
import { prisma } from "../lib/prisma";

export const testimonialsRouter = Router();

testimonialsRouter.get("/", async (_req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
});
