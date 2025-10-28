import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { cn } from "@/lib/utils";

interface Props {
  tenantSlug: string;
  productId: string;
}

export const CartButton = ({ tenantSlug, productId}: Props) => {
  const cart = useCart(tenantSlug);

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
