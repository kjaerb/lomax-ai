import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createCompany } from "@/server/api/controllers/company.controller";

export const companyRouter = createTRPCRouter({
  createCompany: protectedProcedure
    .input(
      z.object({
        number: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { number, name } = input;

      return await createCompany({
        companyName: name,
        companyNumber: number,
      });
    }),
});
