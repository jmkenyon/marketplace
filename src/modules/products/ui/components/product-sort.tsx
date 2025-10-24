"use client"

import { Button } from "@/components/ui/button"
import { useProductFilters } from "../../hooks/use-product-filters"
import { cn } from "@/lib/utils"

export const ProductSort = () => {
    const [filters, setFilters] = useProductFilters()

    return (
        <div className="flex items-center gap-2">
            <Button 
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "selecionado" && 
                    "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                variant="secondary"
                onClick={() => setFilters({sort: "selecionado"})}
            >
                Selecionado
            </Button>
            <Button 
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "em alta" && 
                    "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                variant="secondary"
                onClick={() => setFilters({sort: "em alta"})}
            >
                Em alta
            </Button>
            <Button 
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "novo" && 
                    "bg-transparent border-transparent hover:border-border hover:bg-transparent"
                )}
                variant="secondary"
                onClick={() => setFilters({sort: "novo"})}
            >
                Novo
            </Button>

        </div>
    )

}