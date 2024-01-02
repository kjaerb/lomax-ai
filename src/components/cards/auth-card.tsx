import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { SignOut } from "../auth/sign-out";
import Link from "next/link";
import { Button } from "../ui/button";

interface AuthCardProps {
  children: React.ReactNode;
}

export async function AuthCard({ children }: AuthCardProps) {
  const session = await auth();

  return (
    <Card className="max-w-screen w-[24rem] text-center">
      <CardContent className="space-y-2">
        <CardHeader className="flex flex-col justify-center items-center">
          <Logo />
        </CardHeader>
        {session ? (
          <div className="space-y-2 flex flex-col">
            <CardDescription className="flex items-center justify-center">
              Du er allerede logget ind som {session.user.email}. Hvis du vil
              logge ind som en anden bruger, skal du først logge ud.
            </CardDescription>
            <Button variant={"secondary"}>
              <Link href="/nps/dashboard">Gå til NPS</Link>
            </Button>
            <SignOut />
          </div>
        ) : (
          <>
            <CardDescription className="flex items-center justify-center">
              Velkommen tilbage
            </CardDescription>
            {children}
          </>
        )}
      </CardContent>
    </Card>
  );
}
