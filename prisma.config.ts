import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
    // Adicione `shadowDatabaseUrl: env(\"SHADOW_DATABASE_URL\")` aqui
    // se futuramente precisar de um shadow database dedicado.
  },
});
