import { auth } from "@/auth";
import { db } from "@/server/db";

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error(err);
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
  const session = await auth();

  return session?.user.role;
}
