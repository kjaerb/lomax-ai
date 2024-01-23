import { User } from "@/components/auth/user";
import { ApplicationSelect } from "@/components/selects/application-select";

export function Header() {
  return (
    <div className="py-6 px-4 border-b flex justify-between items-center">
      <ApplicationSelect />
      <User />
    </div>
  );
}
