import { getUserById } from "@/data/user";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  if (!session) redirect("/");

  const user = await getUserById(session.user.id);

  if (!user) redirect("/");

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
