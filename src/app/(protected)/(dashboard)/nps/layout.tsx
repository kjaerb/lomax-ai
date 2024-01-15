import { ReactNode } from "react";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className=" h-screen flex">
      <Sidebar />
      <div className="flex flex-col w-full overflow-y-scroll">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
