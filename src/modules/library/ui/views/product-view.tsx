"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ReviewSidebar } from "../components/review-sidebar";

interface Props {
  productId: string;
}

export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/biblioteca" className="flex items-center gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text font-medium">Voltar para a biblioteca</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] p-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md border gap-4">
              <ReviewSidebar productId={productId}/> 
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="font-medium italic text-muted-foreground">
              Sem conteúdo especial
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
