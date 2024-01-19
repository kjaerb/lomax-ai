import { Login } from "@/components/auth/login";
import { AuthCard } from "@/components/cards/auth-card";

interface AuthProps {}

export default function Auth({}: AuthProps) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 to-red-700">
      <AuthCard>
        <Login className="pb-4" />
      </AuthCard>
    </div>
  );
}
