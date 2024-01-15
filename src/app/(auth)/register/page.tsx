import { Register } from "@/components/auth/register";
import { AuthCard } from "@/components/cards/auth-card";

interface RegisterPageProps {}

export default async function RegisterPage({}: RegisterPageProps) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 to-red-700">
      <AuthCard>
        {process.env.NODE_ENV === "development" ? (
          <Register className="pb-4" />
        ) : (
          <></>
        )}
      </AuthCard>
    </div>
  );
}
