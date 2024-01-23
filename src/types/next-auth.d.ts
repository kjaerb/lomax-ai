import { type DefaultSession } from "next-auth";
import { USER_ROLE, APPLICATION_ACCESS } from "@prisma/client";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: USER_ROLE;
  applications: APPLICATION_ACCESS;
  isOAuth: boolean;
  id: string;
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
