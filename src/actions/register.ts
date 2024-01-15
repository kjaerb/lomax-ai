"use server";

import bcrypt from "bcryptjs";
import { registerSchema, RegisterSchema } from "@/schemas/auth-schema";
import { createUser, getUserByEmail } from "@/data/user";

const { NODE_ENV } = process.env;

export async function register(values: RegisterSchema) {
  if (NODE_ENV === "production")
    return {
      errors: {
        register: "Registrering er ikke tilladt",
      },
    };

  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error,
    };
  }

  const { password, email } = validatedFields.data;

  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return {
      errors: {
        email: "Email findes allerede",
      },
    };

  await createUser({
    email,
    password: passwordHash,
  });

  return {
    success: "success",
  };
}
