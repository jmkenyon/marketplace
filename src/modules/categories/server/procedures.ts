

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categorierRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ctx}) => {
        

          const data = await ctx.payload.find({
            collection: "categories",
            depth: 1, // Populate categories
            pagination: false,
            where: {
              parent: {
                exists: false,
              },
            },
            sort: "name",
          });

            const formattedData = data.docs
            .map((doc) => ({
              ...doc,
              subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
                ...(sub as Category),
                subcategories: undefined,
              })),
            }))
            .sort((a, b) => {
              if (a.name.toLowerCase() === "todos") return -1;      // "Todos" first
              if (b.name.toLowerCase() === "todos") return 1;
              if (a.name.toLowerCase() === "outros") return 1;      // "Outros" last
              if (b.name.toLowerCase() === "outros") return -1;
              return a.name.localeCompare(b.name);                  // alphabetical in-between
            });
        
        return formattedData;
    }
    ),
});