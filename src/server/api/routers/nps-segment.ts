import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const npsSegmentRouter = createTRPCRouter({
  getNPSSegmentByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { name } = input;

      return await ctx.db.nPSSegment.findMany({
        where: {
          name,
        },
        include: {
          npsAiSegmentationNegative: true,
          npsAiSegmentationPositive: true,
          npsGroup: true,
        },
      });
    }),
  getSegmentGroupCountByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { name } = input;

      const npsSegment = await ctx.db.nPSGroup.findFirst({
        where: {
          name,
        },
      });

      return npsSegment;
    }),
});
