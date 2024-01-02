"use client";

import { Logo } from "@/components/ui/logo";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/constants/navigation";
import { ActiveLinks } from "@/components/navigation/active-links";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  const navigationLinksLocal = useMemo(() => {
    return navigationLinks;
  }, [pathname]);

  return (
    <aside className="h-full flex-col shadow-lg border-r p-2 hidden sm:flex min-w-[200px] max-w-[200px]">
      <Logo className="py-2" />
      <div className="flex flex-col justify-between h-full mt-5">
        <ActiveLinks
          title={"Overview"}
          links={navigationLinksLocal}
          activeLink={{
            active: "default",
          }}
        />
      </div>
    </aside>
  );
}
