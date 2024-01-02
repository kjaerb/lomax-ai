"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useTransition } from "react";

type OAuthProvider = {
  name: string;
  logo: JSX.Element;
  provider: string;
};

const OAuthProviders: OAuthProvider[] = [
  {
    name: "Github",
    logo: <Github />,
    provider: "github",
  },
  {
    name: "Microsoft",
    logo: <></>,
    provider: "microsoft",
  },
];

export function OAuths() {
  const [isPending, startTransition] = useTransition();

  async function handleSignIn(provider: string) {
    startTransition(() => new Promise(() => signIn(provider)));
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {OAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          variant={"secondary"}
          disabled={isPending}
          onClick={() => handleSignIn(provider.provider)}
          className="flex items-center justify-center gap-2 hover:border-gray-500 hover:border"
        >
          {provider.logo}
          <span>{provider.name}</span>
        </Button>
      ))}
    </div>
  );
}
