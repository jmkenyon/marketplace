import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


interface Props {
  activeCategoryName: string | null;
  activeCategory: string;
  activeSubcategoryName: string | null;
}

export const BreadcrumbNavigation = ({
  activeCategoryName,
  activeCategory,
  activeSubcategoryName,
}: Props) => {
    if (!activeCategoryName || activeCategory === "todos") {
      return null;
    }

    return (
        <Breadcrumb>
         <BreadcrumbList>
          {activeSubcategoryName ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-lg font-medium underline text-primary">
                  <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-lg font-medium text-primary">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg font-medium">
                  {activeSubcategoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            <BreadcrumbItem>
            <BreadcrumbPage className="text-lg font-medium">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
          )}
         </BreadcrumbList>
        </Breadcrumb>
    )
};
