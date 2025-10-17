import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categorierRouter } from "@/modules/categories/server/procedures";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categorierRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
