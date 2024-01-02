import { auth } from "@/auth";
import { RegisterForm } from "@/components/forms/register-form";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface RegisterProps extends HTMLAttributes<HTMLDivElement> {}

export async function Register({ ...props }: RegisterProps) {
  const session = await auth();

  if (session) return null;

  return (
    <div {...props}>
      <RegisterForm />
      <p className="text-center w-full text-sm text-gray-600 mt-2">
        Har du allerede en bruger?{" "}
        <Link href={"/"} className="underline underline-offset-4">
          Log ind her
        </Link>
      </p>
    </div>
  );
}
