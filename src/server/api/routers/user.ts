import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const user = await ctx.db.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    }),
});
