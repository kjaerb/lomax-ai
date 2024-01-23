import { z } from "zod";

export const companySchema = z.object({
  companyAccountNumber: z.string(),
  companyAccountName: z.string(),
});

export type Company = z.infer<typeof companySchema>;
