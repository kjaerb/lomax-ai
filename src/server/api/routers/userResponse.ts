import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userResponseRouter = createTRPCRouter({
  getNumResponses: protectedProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      const userResponses = ctx.db.userReponse.findFirst({
        take: input,
      });

      return userResponses;
    }),
});
