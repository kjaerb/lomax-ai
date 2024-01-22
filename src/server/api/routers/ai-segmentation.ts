import { updateSegmentSchema } from "@/schemas/segment-schema";
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
  updateAISegmentation: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updateSegmentSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        updateSegmentSchema: { negativeComments, positiveComments },
      } = input;

      return await ctx.db.$transaction(async (tx) => {
        const npsAISegment = await tx.nPSAISegmentation.findUnique({
          where: {
            id,
          },
          include: {
            negativeComments: true,
            positiveComments: true,
          },
        });

        if (!npsAISegment) {
          return null;
        }

        const comments = [
          ...npsAISegment.negativeComments,
          ...npsAISegment.positiveComments,
        ];

        // delete all comments from the nps group
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

        await tx.nPSAISegmentation.update({
          where: {
            id,
          },
          data: {
            negativeComments: {
              deleteMany: {},
            },
            positiveComments: {
              deleteMany: {},
            },
          },
        });

        const positive = await Promise.all(
          // create or connect positive nps segment to a nps group
          positiveComments.map(async (comment) => {
            return await tx.nPSSegment.create({
              data: {
                name: comment.name,
                type: "Positive",
                npsGroup: {
                  connectOrCreate: {
                    where: {
                      name: comment.name,
                    },
                    create: {
                      name: comment.name,
                      count: 0,
                      type: "Positive",
                    },
                  },
                },
              },
            });
          })
        );
        const negative = await Promise.all(
          // create or connect negative nps segment to a nps group
          negativeComments.map(async (comment) => {
            return await tx.nPSSegment.create({
              data: {
                name: comment.name,
                type: "Negative",
                npsGroup: {
                  connectOrCreate: {
                    where: {
                      name: comment.name,
                    },
                    create: {
                      name: comment.name,
                      count: 0,
                      type: "Negative",
                    },
                  },
                },
              },
            });
          })
        );
        await tx.nPSGroup.updateMany({
          // updates the count of the nps group
          where: {
            name: {
              in: [
                ...positiveComments.map((c) => c.name),
                ...negativeComments.map((c) => c.name),
              ],
            },
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });

        return await tx.nPSAISegmentation.update({
          where: {
            id,
          },
          data: {
            negativeComments: {
              connect: negative,
            },
            positiveComments: {
              connect: positive,
            },
          },
        });
      });
    }),
});
