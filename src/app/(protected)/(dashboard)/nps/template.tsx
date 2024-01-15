import { RoleGate } from "@/components/auth/role-gate";

interface RoleGateTemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: RoleGateTemplateProps) {
  return <RoleGate allowedRole="USER">{children}</RoleGate>;
}
