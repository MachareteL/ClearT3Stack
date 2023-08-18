import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";
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
          category: z.string(),
          price: z.coerce.number(),
          description: z.string(),
          imageUrl: z.string(),
          volume: z.coerce.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input: { product } }) => {
      if (!product) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      if (ctx.session.user.email != env.adminEmail) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const newProduct = await ctx.prisma.product.create({
        data: product,
      });
      return newProduct;
    }),
  getAll: publicProcedure
    .input(
      z.array(
        z.object({
          filter: z.object({
            key: z.string(),
            value: z.string(),
            checked: z.boolean(),
          }),
        })
      )
    )
    .query(async ({ ctx, input }) => {
      let params = {};
      input.map(({ filter: { key, value } }) => {
        params = {
          ...params,
          [key]: !isNaN(parseFloat(value)) ? parseFloat(value) : value,
        };
        console.log(params);
      });
      const products = await ctx.prisma.product.findMany({
        where: params,
      });
      // console.log(products);
      return products;
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const product = await ctx.prisma.product.findUnique({
        where: {
          id,
        },
      });
      return product;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      const product = ctx.prisma.product.delete({
        where: {
          id,
        },
      });
      // console.log(product);

      return "sucess";
    }),
});
