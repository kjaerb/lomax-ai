"use client";

import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { HTMLAttributes, useTransition } from "react";
import { VariantProps } from "class-variance-authority";
import React from "react";

interface SignOutProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof buttonVariants> {}

export const SignOut = React.forwardRef<HTMLButtonElement, SignOutProps>(
  ({ ...props }, ref) => {
    const [isPending, startTransition] = useTransition();
    const signUserOut = async () => {
      startTransition(async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
      });
    };

    return (
      <Button {...props} ref={ref} onClick={signUserOut} disabled={isPending}>
        Log ud
      </Button>
    );
  }
);

SignOut.displayName = "SignOut";
