import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const npsGroupRouter = createTRPCRouter({
  getGroups: protectedProcedure.query(async ({ ctx }) => {
    const npsGroups = await ctx.db.nPSGroup.findMany();

    return npsGroups;
  }),
});
