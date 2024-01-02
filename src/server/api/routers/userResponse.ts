import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userResponseRouter = createTRPCRouter({
  getUserRespones: publicProcedure.query(async ({ ctx }) => {
    const userResponses = await ctx.db.userReponse.findMany({
      include: { user: true },
    });

    return userResponses;
  }),
  getNumUserRespones: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const { amount } = input;

      const userResponses = await ctx.db.userReponse.findMany({
        include: { user: true },
        take: amount,
      });

      return userResponses;
    }),
});
