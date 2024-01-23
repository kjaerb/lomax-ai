import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { SignOut } from "@/components/auth/sign-out";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

interface AuthCardProps {
  children: React.ReactNode;
}

export async function AuthCard({ children }: AuthCardProps) {
  const session = await getServerSession(authConfig);

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
            <Link href="/nps/segment">
              <Button variant={"secondary"} className="w-full">
                Gå til NPS
              </Button>
            </Link>
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
