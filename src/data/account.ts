import { db } from "@/server/db";

export async function getAccountByUserId(userId: string) {
  try {
    return await db.account.findFirst({
      where: { userId },
    });
  } catch {
    return null;
  }
}
