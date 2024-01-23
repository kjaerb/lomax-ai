import { authConfig } from "@/lib/auth";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";

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

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface CreateUserProps {
  email: string;
  password: string;
}

export async function createUser({ email, password }: CreateUserProps) {
  return await db.user.create({
    data: {
      email,
      password,
    },
  });
}

export async function getCurrentRole() {
  const session = await getServerSession(authConfig);

  return session?.user.role;
}
