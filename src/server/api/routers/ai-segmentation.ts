import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const aiSegmentationRouter = createTRPCRouter({
  getAISegmentations: publicProcedure.query(async ({ ctx }) => {
    const aiSegmentations = await ctx.db.aISegmentation.findMany({
      include: { user: true },
    });

    return aiSegmentations;
  }),
  getNumAISegmentations: publicProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const { amount } = input;

      const aiSegmentations = await ctx.db.aISegmentation.findMany({
        include: { user: true },
        take: amount,
      });

      return aiSegmentations;
    }),
  getAISegmentationCount: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.aISegmentation.count();
    return count;
  }),
});
