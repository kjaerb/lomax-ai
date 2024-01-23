import { db } from "@/server/db";

export async function getSegmentsByName(name: string) {
  return await db.nPSSegment.findMany({
    where: {
      name,
    },
    include: {
      npsAISegmentation: true,
      npsGroup: true,
    },
  });
}
