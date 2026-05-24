// prisma.config.ts
import { defineConfig } from "prisma/config";

const getCleanDatabaseUrl = (): string => {
  const rawUrl = process.env.DATABASE_URL || "";

  const regex = /DATABASE_URL=["']?(postgresql:\/\/[^\s"']+)["']?/;
  const match = rawUrl.match(regex);

  if (match && match[1]) {
    return match[1].trim();
  }

  return rawUrl.trim();
};

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getCleanDatabaseUrl(),
  },
});
