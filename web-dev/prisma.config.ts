import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Use a single local env file for Prisma CLI configuration.
loadEnv({ path: ".env.local" });

const databaseUrl = process.env["DATABASE_URL"] ?? process.env["DIRECT_URL"];

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
