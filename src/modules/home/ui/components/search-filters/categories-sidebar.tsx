import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";

import type { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();

  const { data } =  useSuspenseQuery(trpc.categories.getMany.queryOptions())

  const [parentCategories, setParentCategories] =
    React.useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoriesGetManyOutput[number] | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (isOpen: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(isOpen);
  };

  const handleCategoryClick = (
    category: CategoriesGetManyOutput[number]
  ) => {
    if (category.subcategories && category.subcategories.length > 0) {
      // No casting needed — types align perfectly
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      // Navigation
      const slug = category.slug === "todos" ? "/" : `/${category.slug}`;
      router.push(slug);
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    setParentCategories(null);
    setSelectedCategory(null);
  };

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categorias</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Voltar
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center font-medium cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4 ml-2" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};