import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs
          .map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
              ...(sub as Category),
              subcategories: undefined,
            })),
          }))
          .sort((a, b) => {
            if (a.name.toLowerCase() === "todos") return -1; // "Todos" first
            if (b.name.toLowerCase() === "todos") return 1;
            if (a.name.toLowerCase() === "outros") return 1; // "Outros" last
            if (b.name.toLowerCase() === "outros") return -1;
            return a.name.localeCompare(b.name); // alphabetical in-between
          });

        const subcategoriesSlugs = [];

        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map((sub) => sub.slug)
          );
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs]
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
      });

      return data;
    }),
});
