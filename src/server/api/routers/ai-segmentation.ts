import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const npsAiSegmentationRouter = createTRPCRouter({
  getAISegmentations: protectedProcedure.query(async ({ ctx }) => {
    const aiSegmentations = await ctx.db.nPSAISegmentation.findMany({
      include: { user: true, negativeComments: true, positiveComments: true },
    });

    return aiSegmentations;
  }),
  getNumAISegmentations: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }) => {
      const { amount } = input;

      const aiSegmentations = await ctx.db.nPSAISegmentation.findMany({
        include: { user: true, negativeComments: true, positiveComments: true },
        take: amount,
      });

      return aiSegmentations;
    }),
  getAISegmentationCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.nPSAISegmentation.count();
    return count;
  }),
});
