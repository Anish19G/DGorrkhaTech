import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./lib/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { adminBlogRouter } from "./routes/adminBlog";
import { adminContactsRouter } from "./routes/adminContacts";
import { adminPortfolioRouter } from "./routes/adminPortfolio";
import { adminServicesRouter } from "./routes/adminServices";
import { authRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";
import { contactRouter } from "./routes/contact";
import { portfolioRouter } from "./routes/portfolio";
import { servicesRouter } from "./routes/services";
import { testimonialsRouter } from "./routes/testimonials";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/contact", contactRouter);
app.use("/api/services", servicesRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/blog", blogRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/auth", authRouter);

app.use("/api/admin/contacts", adminContactsRouter);
app.use("/api/admin/services", adminServicesRouter);
app.use("/api/admin/portfolio", adminPortfolioRouter);
app.use("/api/admin/blog", adminBlogRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`DGorkhaTech API listening on http://localhost:${env.PORT}`);
});
