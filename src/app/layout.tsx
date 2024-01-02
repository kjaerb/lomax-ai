import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "@/providers/trpc-provider";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lomax - NPS Dashboard",
  description: "An internal tool for Lomax to analyse user segments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <AuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Toaster richColors />
            {children}
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}