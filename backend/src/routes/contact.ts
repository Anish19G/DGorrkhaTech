import { Router } from "express";
import { prisma } from "../lib/prisma";
import { contactFormLimiter } from "../middleware/rateLimit";
import { contactSubmissionSchema } from "../schemas/contact";

export const contactRouter = Router();

contactRouter.post("/", contactFormLimiter, async (req, res, next) => {
  try {
    const data = contactSubmissionSchema.parse(req.body);

    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        serviceInterest: data.serviceInterest || null,
        message: data.message,
      },
    });

    res.status(201).json({ id: submission.id, message: "Thanks — we'll be in touch soon." });
  } catch (err) {
    next(err);
  }
});
