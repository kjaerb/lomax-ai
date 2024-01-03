import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { userResponseRouter } from "./routers/user-response";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  userResponses: userResponseRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
