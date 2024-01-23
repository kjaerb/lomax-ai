import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/server/db";
import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";

const { AZURE_AD_CLIENT_SECRET, AZURE_AD_CLIENT_ID, AZURE_AD_TENANT_ID } =
  process.env;

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;
