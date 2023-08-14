import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        product: z.object({
          name: z.string(),
          category: z.string(),
          price: z.string(),
          description: z.string(),
          imageURL: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input: { product } }) => {
      if (!product) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      console.log(product.imageURL.length);
      console.log('\n\n\npreço: ',product.price);

      const newProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          imageUrl: product.imageURL,
          category: product.category,
        },
      });
      return newProduct;
    }),
});
