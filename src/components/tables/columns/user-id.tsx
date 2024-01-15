import { User } from "@prisma/client";

interface UserIDProps {
  user: User | null;
}

export function UserID({ user }: UserIDProps) {
  if (!user) return <span>Ukendt bruger</span>;

  if (!user.name) return <span>{user.email}</span>;

  return <span>{user.name}</span>;
}
