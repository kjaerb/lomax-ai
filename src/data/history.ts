import { db } from "@/server/db";
import { UserReponse } from "@prisma/client";

export async function getHistory(): Promise<UserReponse[]> {
  return await db.userReponse.findMany();
}
