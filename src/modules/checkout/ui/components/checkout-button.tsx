import { useCart } from "../../hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

interface checkoutButtonProps {
  className?: string;
  tenantSlug: string;
  hideIfEmpty?: boolean;
}

export const CheckoutButton = ({
  className,
  tenantSlug,
  hideIfEmpty,
}: checkoutButtonProps) => {
    const { totalItems } = useCart(tenantSlug);

    if (hideIfEmpty && totalItems === 0) {
      return null;
    }

    return (
        <Button variant="elevated" asChild className={cn("bg-white", className)}>
            <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
            <ShoppingCartIcon /> {totalItems >  0 ? totalItems : ''}
            </Link>

        </Button>
    )

};
