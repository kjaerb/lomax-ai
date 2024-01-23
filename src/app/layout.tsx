export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "@/providers/trpc-provider";
import { cookies } from "next/headers";
import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "@/providers/next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lomax - NPS Dashboard",
  description: "An internal AI tool for Lomax",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <NextAuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Toaster richColors />
            {children}
          </TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
