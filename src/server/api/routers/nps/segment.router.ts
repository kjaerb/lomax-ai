import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { getNPSGroupByName } from "@/server/api/controllers/nps/groups.controller";
import { getSegmentsByName } from "@/server/api/controllers/nps/segment.controller";

export const npsSegmentRouter = createTRPCRouter({
  getNPSSegmentsByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const { name } = input;

      return await getSegmentsByName(name);
    }),
  getNPSSegmentByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const { name } = input;

      return await getSegmentsByName(name);
    }),
  getSegmentGroupCountByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const { name } = input;

      return await getNPSGroupByName(name);
    }),
});
