export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "@/providers/trpc-provider";
import { cookies } from "next/headers";
import { ProgressBarProvider } from "@/providers/progress-bar-provider";

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
        <TRPCReactProvider cookies={cookies().toString()}>
          <AuthProvider>
            <Toaster richColors />
            {children}
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
