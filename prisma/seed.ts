import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL nao configurada. Defina a variavel antes do seed.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("123456", 12);

  const defaultCompany = await prisma.company.upsert({
    where: {
      slug: "empresa-padrao",
    },
    update: {
      name: "Empresa Padrao",
      active: true,
    },
    create: {
      name: "Empresa Padrao",
      slug: "empresa-padrao",
      active: true,
    },
  });

  await prisma.user.upsert({
    where: {
      username: "admin",
    },
    update: {
      name: "Administrador",
      passwordHash,
      role: UserRole.ADMIN,
      active: true,
      companyId: defaultCompany.id,
    },
    create: {
      username: "admin",
      name: "Administrador",
      passwordHash,
      role: UserRole.ADMIN,
      active: true,
      companyId: defaultCompany.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Erro ao executar seed do Prisma:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
