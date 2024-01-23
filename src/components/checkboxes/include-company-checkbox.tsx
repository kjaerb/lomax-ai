"use client";

import { Checkbox } from "@/components/ui/checkbox";
import useUserResponseStore from "@/stores/user-reponse-store";

interface IncludeCompanyCheckboxProps {}

export function IncludeCompanyCheckbox({}: IncludeCompanyCheckboxProps) {
  const { includeCompany, setIncludeCompany } = useUserResponseStore();

  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={includeCompany} onCheckedChange={setIncludeCompany} />
      <div className="grid gap-1.5 leading-none">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Inkluder virksomhed
        </label>
      </div>
    </div>
  );
}
