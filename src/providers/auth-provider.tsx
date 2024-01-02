import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export async function AuthProvider({ children }: AuthProviderProps) {
  const session = await auth();

  if (session?.user) {
    // @ts-expect-error TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
