"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Icons } from "@/components/ui/icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

type OAuthProvider = {
  name: string;
  logo: JSX.Element;
  provider: string;
  callbackUrl?: string;
};

const OAuthProviders: OAuthProvider[] = [
  {
    name: "Microsoft",
    logo: <Icons.Microsoft height={24} width={24} />,
    provider: "azure-ad",
  },
];

export function OAuths() {
  const [isPending, startTransition] = useTransition();

  async function handleSignIn(provider: string) {
    startTransition(
      () =>
        new Promise(() =>
          signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          }),
        ),
    );
  }

  return (
    <div className="flex justify-center items-center w-full gap-2">
      {OAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          variant={"secondary"}
          disabled={isPending}
          onClick={() => handleSignIn(provider.provider)}
          className="flex items-center justify-center w-full gap-2 hover:border-gray-500 hover:border"
        >
          {provider.logo}
          <span>{provider.name}</span>
        </Button>
      ))}
    </div>
  );
}
