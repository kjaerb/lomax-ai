import { HTMLAttributes } from "react";
import { OAuths } from "./oauths";

interface LoginProps extends HTMLAttributes<HTMLDivElement> {}

export async function Login({ ...props }: LoginProps) {
  return (
    <div {...props} className="space-y-2 text-left">
      <div className="border-b pt-2 border-gray-400"></div>
      <OAuths />
    </div>
  );
}
