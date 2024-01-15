import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { npsAiSegmentationRouter } from "./routers/ai-segmentation";
import { npsSegmentRouter } from "./routers/nps-segment";
import { npsGroupRouter } from "./routers/nps-groups";

export const appRouter = createTRPCRouter({
  npsAiSegmentation: npsAiSegmentationRouter,
  npsSegment: npsSegmentRouter,
  user: userRouter,
  npsGroup: npsGroupRouter,
});

export type AppRouter = typeof appRouter;
