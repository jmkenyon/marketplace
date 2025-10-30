import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { ProductList, ProudctListSkeleton } from "../components/product-list";
import { Suspense } from "react";

export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/" className="flex items-center gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text font-medium">Continuar comprando</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] p-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
          <h1 className="text-[40px] font-medium">Biblioteca</h1>
          <p className="font-medium">Suas compras e avaliações</p>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
        <Suspense fallback={<ProudctListSkeleton/>}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
};
