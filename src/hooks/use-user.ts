import { useSession } from "next-auth/react";

export function useCurrentRole() {
  const session = useSession();

  return session.data?.user.role;
}

export function useUserId() {
  const session = useSession();

  return session.data?.user.id;
}
