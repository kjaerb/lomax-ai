import { type DefaultSession } from "next-auth";
import { USER_ROLE } from "@prisma/client";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: USER_ROLE;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: USER_ROLE;
  }
}
