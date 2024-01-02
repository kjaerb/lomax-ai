import { auth } from "@/auth";
import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { OAuths } from "./oauths";

interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export async function Login({ ...props }: LoginProps) {
  const session = await auth();

  if (session) return null;

  return (
    <div {...props} className="space-y-2">
      <LoginForm />
      <p className="text-center w-full text-sm text-gray-600">
        Har du ikke en bruger?{" "}
        <Link href={"/register"} className="underline underline-offset-4">
          Opret en her
        </Link>
      </p>

      <div className="border-b pt-2 border-gray-400"></div>
      <OAuths />
    </div>
  );
}
