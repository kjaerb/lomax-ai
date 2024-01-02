"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDicebear } from "@/lib/dicebear";
import { useSession } from "next-auth/react";

export function UserAvatar() {
  const session = useSession();

  if (!session.data) return null;

  if (!session?.data.user.image)
    return (
      <Avatar>
        <AvatarImage
          src={getDicebear(session.data.user.email || "")}
          alt="user image"
        />
        <AvatarFallback className="truncate">
          {session.data.user.email}
        </AvatarFallback>
      </Avatar>
    );

  return (
    <Avatar>
      <AvatarImage src={session.data.user.image} alt="user image" />
      <AvatarFallback>{session.data.user.name}</AvatarFallback>
    </Avatar>
  );
}
