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
