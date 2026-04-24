# Next.js + PostgreSQL Login Starter

This starter includes:

- Next.js (frontend + backend API routes)
- Prisma ORM with PostgreSQL
- Simple login page at `/`
- Login API route at `/api/login`

## 1) Install dependencies

```bash
npm install
```

## 2) Set environment variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Update `DATABASE_URL` if needed.

## 3) Create database table and seed user

Run Prisma schema sync first:

```bash
npm run prisma:generate
npm run prisma:push
```

Then seed a sample user with this SQL (optional but recommended for first login):

```bash
psql "$DATABASE_URL" -c "INSERT INTO users (email, password_hash) VALUES ('admin@example.com', '\$2b\$10\$hWW89sQx6tQylMZd15f6w.Y8YCS6Sx0WwlY86n0DOV9BfM7Q43hHe') ON CONFLICT (email) DO NOTHING;"
```

Seed user credentials:

- Email: `admin@example.com`
- Password: `password123`

## 4) Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/frontend/components/LoginPage.tsx`: Frontend login UI
- `src/frontend/styles/login-page.module.css`: Frontend styling
- `src/backend/lib/prisma.ts`: Backend Prisma client singleton
- `src/backend/services/auth.ts`: Backend auth logic
- `src/app/page.tsx`: Frontend entry route
- `src/app/api/login/route.ts`: Backend API route entry
- `prisma/schema.prisma`: Prisma schema for PostgreSQL
# web--dev-
