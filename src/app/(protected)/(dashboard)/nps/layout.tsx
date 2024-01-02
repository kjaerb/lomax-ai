import { ReactNode } from "react";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { RoleGate } from "@/components/auth/role-gate";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <RoleGate allowedRole="USER">
      <div className=" h-screen flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="p-4 overflow-x-scroll">{children}</main>
        </div>
      </div>
    </RoleGate>
  );
}
