import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
    const router = useRouter();
    const [parentCategories, setParentCategories] = React.useState<CustomCategory[] | null >(null);
    const [selectedCategory, setSelectedCategory] = React.useState<CustomCategory | null>(null);
    // If we have parent categories, show those, otherwise show root categories

    const currentCategories = parentCategories ?? data ?? []

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CustomCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CustomCategory[]);
            setSelectedCategory(category);
        } else {
            if (parentCategories && selectedCategory) {
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                if (category.slug === "todos") {
                    router.push(`/`);
                } else {
                    router.push(`/${category.slug}`);
                }
            }

            handleOpenChange(false);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: backgroundColor}}
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
                        key={category.slug}
                        onClick={() => {handleCategoryClick(category)}}
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
