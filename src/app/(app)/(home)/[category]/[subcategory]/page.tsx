import {
  ProductList,
  ProudctListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    subcategory: string;
  }>;
}
const Page = async ({ params }: PageProps) => {
  const { subcategory } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProudctListSkeleton />}></Suspense>
      <ProductList category={subcategory}/>
    </HydrationBoundary>
  );
};

export default Page;
