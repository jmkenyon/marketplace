import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean
}

export const CartButton = ({ tenantSlug, productId, isPurchased}: Props) => {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button
      variant="elevated"
      asChild
      className="flex-1 bg-green-400 font-medium"
    >
      <Link prefetch href={`library/${productId}}`}>
      Ver na biblioteca
      </Link>
   
    </Button>
    );
  }

  return (
    <Button 
        variant="elevated"
        className={cn("flex-1 bg-green-400", cart.isProductInCart(productId) && "bg-pink-400")}
        onClick={() => cart.toggleProduct(productId)}
    >
    {cart.isProductInCart(productId) ? "Remover do carrinho" : "Adicionar ao carrinho"}
  
    </Button>
  );
};
