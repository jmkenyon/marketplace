import { createTRPCRouter } from '../init';
import { categorierRouter } from '@/modules/categories/server/procedures';
export const appRouter = createTRPCRouter({
 categories: categorierRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;