import { PrismaClient } from "@prisma/client";
import { seedNPS } from "./seed/nps";

export const prisma = new PrismaClient();

async function main() {
  await seedNPS();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
