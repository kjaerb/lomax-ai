import { apiClient } from "@/providers/trpc-provider";

export function useAddCompany() {
  const utils = apiClient.useUtils();

  return apiClient.company.createCompany.useMutation({
    onSuccess: () => {
      utils.company.invalidate();
    },
  });
}
