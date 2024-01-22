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
  deleteAISegmentation: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.db.$transaction(async (tx) => {
        const npsAISegment = await tx.nPSAISegmentation.delete({
          where: { id },
          include: {
            negativeComments: true,
            positiveComments: true,
          },
        });

        const comments = [
          ...npsAISegment.negativeComments,
          ...npsAISegment.positiveComments,
        ];

        await Promise.all(
          comments
            .filter((comment) => comment.npsGroupId)
            .map(async (comment) => {
              await tx.nPSGroup.update({
                where: {
                  id: comment.npsGroupId,
                },
                data: {
                  count: {
                    decrement: 1,
                  },
                },
              });
            })
        );
      });
    }),
});
