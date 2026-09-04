import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  serviceInterest: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
});

export const contactStatusUpdateSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CLOSED"]),
});
