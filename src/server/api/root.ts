import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { aiSegmentationRouter } from "./routers/ai-segmentation";

export const appRouter = createTRPCRouter({
  aiSegmentation: aiSegmentationRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
