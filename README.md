# DGorkhaTech

Website for **DGorkhaTech**, an IT consulting office that digitalizes businesses — IT strategy,
custom software, web and mobile development, and data services.

## Stack

- **Frontend**: Next.js 14 (App Router, TypeScript), Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, managed with Prisma (schema + versioned migrations)
- **Auth**: JWT stored in an httpOnly cookie for the admin dashboard

## Project structure

```
dgorkhatech/
  backend/    Express API + Prisma schema/migrations
  frontend/   Next.js site (public pages + /admin dashboard)
  docker-compose.yml   Local PostgreSQL for development
```

## Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- Docker Desktop (for local Postgres) — or an existing PostgreSQL 14+ instance

## 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres on `localhost:5433` (mapped to avoid clashing with any Postgres you may
already have on the default 5432) with database `dgorkhatech`, user `dgorkhatech`, password
`dgorkhatech`. If you already have Postgres running locally, skip this and set `DATABASE_URL` in
`backend/.env` to point at it instead.

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env        # adjust values if needed
npm run migrate:dev          # creates the database schema (Prisma Migrate)
npm run db:seed              # seeds services, a sample blog post/case study, and an admin user
npm run dev                  # starts the API on http://localhost:4000
```

The seed script prints the admin login credentials it created (from `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` in `.env`, defaulting to `admin@dgorkhatech.com` / `ChangeMe123!`).

Useful scripts:
- `npm run migrate:dev` — create/apply a new migration in development
- `npm run migrate:deploy` — apply existing migrations (production)
- `npm run studio` — open Prisma Studio to browse the database
- `npm run build && npm start` — production build/run

## 3. Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL should point at the backend
npm run dev                         # starts the site on http://localhost:3000
```

## Using the site

- Public site: `http://localhost:3000` — home, services, portfolio, blog, about, contact
- Admin dashboard: `http://localhost:3000/admin/login` — log in with the seeded admin
  credentials to view contact form leads and manage services/portfolio/blog content

## Security notes

- Passwords are hashed with bcrypt; sessions use short-lived JWTs in httpOnly, sameSite cookies
  (never stored in localStorage)
- All mutating API requests are validated with Zod
- `helmet`, scoped CORS, and rate limiting are applied on the API (especially the contact form and
  login endpoints)
- Change `JWT_SECRET` and the seeded admin password before deploying anywhere public
