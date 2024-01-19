import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { OAuths } from "./oauths";
import { REGISTER_PAGE } from "@/routes";

interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export async function Login({ ...props }: LoginProps) {
  return (
    <div {...props} className="space-y-2 text-left">
      <LoginForm />
      <p className="text-center w-full text-sm text-gray-600">
        Har du ikke en bruger?{" "}
        <Link href={REGISTER_PAGE} className="underline underline-offset-4">
          Opret en her
        </Link>
      </p>

      <div className="border-b pt-2 border-gray-400"></div>
      <OAuths />
    </div>
  );
}
