import { updateSegmentSchema } from "@/schemas/segment-schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { PrismaMandatoryFields } from "@/types/prisma";
import { NPSAISegmentation } from "@prisma/client";
import { z } from "zod";
import {
  createAISegmentationWithSegments,
  deleteAISegmentation,
  getAISegmentationCount,
  getAISegmentations,
  getNumAISegmentations,
  updateSegmentationSegments,
} from "@/server/api/controllers/nps/ai-segmentation.controller";

export const npsAiSegmentationRouter = createTRPCRouter({
  addAISegmentation: protectedProcedure
    .input(
      z.object({
        data: z.custom<PrismaMandatoryFields<NPSAISegmentation>>(),
        positiveComments: z.string().array(),
        negativeComments: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, positiveComments, negativeComments } = input;

      return await createAISegmentationWithSegments({
        data,
        positiveComments,
        negativeComments,
      });
    }),
  getAISegmentations: protectedProcedure.query(async () => {
    return await getAISegmentations();
  }),
  getNumAISegmentations: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ input }) => {
      const { amount } = input;

      return await getNumAISegmentations(amount);
    }),
  getAISegmentationCount: protectedProcedure.query(async () => {
    return await getAISegmentationCount();
  }),
  deleteAISegmentation: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      return await deleteAISegmentation(id);
    }),
  updateAISegmentation: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        updateSegmentSchema,
      })
    )
    .mutation(async ({ input }) => {
      const {
        id,
        updateSegmentSchema: { negativeComments, positiveComments },
      } = input;

      return await updateSegmentationSegments({
        aiSegmentationId: id,
        positiveComments: positiveComments.map((comment) => comment.name),
        negativeComments: negativeComments.map((comment) => comment.name),
      });
    }),
});
