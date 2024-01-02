import { createTRPCRouter } from "@/server/api/trpc";
import { userResponseRouter } from "./routers/userResponse";

export const appRouter = createTRPCRouter({
  userResponses: userResponseRouter,
});

export type AppRouter = typeof appRouter;
