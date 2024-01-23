import { db } from "@/server/db";
import { NPSAISegmentation, NPSGroup } from "@prisma/client";

export async function getHistory(): Promise<NPSAISegmentation[]> {
  return await db.nPSAISegmentation.findMany();
}

export async function getNPSGroups(): Promise<NPSGroup[]> {
  return await db.nPSGroup.findMany();
}
