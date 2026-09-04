import bcrypt from "bcrypt";
import { Router } from "express";
import { env } from "../lib/env";
import { prisma } from "../lib/prisma";
import { AUTH_COOKIE_NAME, requireAdmin, signAuthToken } from "../middleware/auth";
import { ApiError } from "../middleware/errorHandler";
import { loginLimiter } from "../middleware/rateLimit";
import { loginSchema } from "../schemas/auth";

export const authRouter = Router();

authRouter.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) throw new ApiError(401, "Invalid email or password");

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) throw new ApiError(401, "Invalid email or password");

    const token = signAuthToken({ sub: admin.id, email: admin.email, role: admin.role });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.status(204).send();
});

authRouter.get("/me", requireAdmin, async (req, res, next) => {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { id: req.admin!.sub } });
    if (!admin) throw new ApiError(401, "Not authenticated");
    res.json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
  } catch (err) {
    next(err);
  }
});
