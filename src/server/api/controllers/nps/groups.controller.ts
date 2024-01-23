import { db } from "@/server/db";

export async function getNPSGroups() {
  return await db.nPSGroup.findMany();
}

export async function getNPSGroupByName(name: string) {
  return await db.nPSGroup.findFirst({
    where: {
      name,
    },
  });
}

export async function getNPSGroupsByNames(name: string[]) {
  return await db.nPSGroup.findMany({
    where: {
      name: {
        in: name,
      },
    },
  });
}

export async function getNPSGroupCountByName(name: string) {
  return await db.nPSGroup.findFirst({
    where: {
      name,
    },
    select: {
      count: true,
    },
  });
}
