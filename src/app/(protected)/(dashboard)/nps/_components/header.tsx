import { User } from "@/components/auth/user";

export function Header() {
  return (
    <div className="py-6 px-4 border-b flex justify-between items-center">
      <h1 className="font-bold text-2xl">NPS segmenter</h1>
      <User />
    </div>
  );
}
