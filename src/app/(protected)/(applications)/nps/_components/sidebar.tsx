import { Logo } from "@/components/ui/logo";
import { navigationLinks } from "@/lib/constants/navigation";
import { ActiveLinks } from "@/components/navigation/active-links";
import { SignOut } from "@/components/auth/sign-out";
import { LogOut } from "lucide-react";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  return (
    <aside className="h-screen max-h-screen flex-col shadow-lg border-r hidden sm:flex min-w-[200px] max-w-[200px]">
      <Logo className="p-2" />
      <div className="flex flex-col justify-between h-full mt-5">
        <ActiveLinks
          title={"Overview"}
          links={navigationLinks}
          activeLink={{
            active: "default",
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <SignOut variant={"link"} />
        <LogOut />
      </div>
    </aside>
  );
}
