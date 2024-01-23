import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { npsAiSegmentationRouter } from "@/server/api/routers/nps/ai-segmentation.router";
import { npsSegmentRouter } from "@/server/api/routers/nps/segment.router";
import { npsGroupRouter } from "@/server/api/routers/nps/groups.router";
import { companyRouter } from "@/server/api/routers/company";

export const appRouter = createTRPCRouter({
  npsAiSegmentation: npsAiSegmentationRouter,
  npsSegment: npsSegmentRouter,
  user: userRouter,
  npsGroup: npsGroupRouter,
  company: companyRouter,
});

export type AppRouter = typeof appRouter;
