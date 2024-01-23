import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getNPSGroups } from "@/server/api/controllers/nps/groups.controller";

export const npsGroupRouter = createTRPCRouter({
  getGroups: protectedProcedure.query(async () => {
    return await getNPSGroups();
  }),
});
