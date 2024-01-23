import { db } from "@/server/db";

export async function getUserById(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getAccountByUserId(userId: string) {
  try {
    return await db.account.findFirst({
      where: { userId },
    });
  } catch {
    return null;
  }
}
