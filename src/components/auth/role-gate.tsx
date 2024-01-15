import { auth } from "@/auth";
import { getCurrentRole } from "@/data/user";
import { USER_ROLE } from "@prisma/client";

interface RoleGateProps {
  allowedRole: USER_ROLE;
  children: React.ReactNode;
}

export async function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = await getCurrentRole();

  if (role === USER_ROLE.ADMIN) {
    return <>{children}</>;
  }

  if (role !== allowedRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        Du har ikke tilladelse til at se dette content
      </div>
    );
  }

  return <>{children}</>;
}
