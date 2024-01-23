import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/server/db";
import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";
import {
  getAccountByUserId,
  getUserById,
} from "@/server/api/controllers/user.controller";
import { USER_ROLE } from "@prisma/client";

const {
  AZURE_AD_CLIENT_SECRET,
  AZURE_AD_CLIENT_ID,
  AZURE_AD_TENANT_ID,
  NEXTAUTH_SECRET,
} = process.env;

export const authConfig = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    AzureADProvider({
      id: "azure-ad",
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
  ],
  // callbacks: {
  //   async session({ token, session }) {
  //     if (token.sub && session.user) {
  //       session.user.id = token.sub;
  //     }

  //     if (token.role && session.user) {
  //       session.user.role = token.role as USER_ROLE;
  //     }

  //     if (session.user) {
  //       session.user.name = token.name;
  //       session.user.email = token.email;
  //       session.user.isOAuth = token.isOAuth as boolean;
  //     }

  //     return session;
  //   },
  //   async jwt({ token }) {
  //     if (!token.sub) return token;

  //     const existingUser = await getUserById(token.sub);

  //     if (!existingUser) return token;

  //     const existingAccount = await getAccountByUserId(existingUser.id);

  //     token.isOAuth = !!existingAccount;
  //     token.name = existingUser.name;
  //     token.email = existingUser.email;
  //     token.role = existingUser.role;

  //     return token;
  //   },
  // },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;
