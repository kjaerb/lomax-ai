import { z } from "zod";

export const exportSchema = z.object({
  CompanyAccountNo: z.string(),
  CompanyName: z.string(),
  Rating: z.number().or(z.string()),
  UserComment: z.string(),
  SurveySendTime: z.string(),
  PostiveComment1: z.string().optional(),
  PostiveComment2: z.string().optional(),
  PostiveComment3: z.string().optional(),
  NegativeComment1: z.string().optional(),
  NegativeComment2: z.string().optional(),
  NegativeComment3: z.string().optional(),
});

export type ExportSchema = z.infer<typeof exportSchema>;
