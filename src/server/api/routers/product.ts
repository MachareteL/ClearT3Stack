import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        product: z.object({
          name: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input: { product } }) => {
      console.log("api funcinando corretamente!");
    }),
});
