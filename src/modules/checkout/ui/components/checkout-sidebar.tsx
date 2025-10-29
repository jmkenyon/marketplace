import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";
import { format } from "path";

interface CheckoutSidebarProps {
  total: number;
  disabled: boolean;
  isCancelled: boolean;
  onPurchase: () => void;
}

export const CheckoutSidebar = ({
  total,
  disabled,
  isCancelled,
  onPurchase,
}: CheckoutSidebarProps) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-medium text-lg">Total</h4>
        <p className="font-medium text-lg">{formatCurrency(total)}</p>
      </div>
      <div className="p-4 flex items-center justify-center">
        <Button
          variant="elevated"
          disabled={disabled}
          onClick={onPurchase}
          size="lg"
          className="text-base w-full text-white bg-primary hover:bg-emerald-400 hover:text-primary"
        >
          Finalizar Compra
        </Button>
      </div>
      {isCancelled && (
        <div className="p-4 flex justify-center items-center border-t">
          <div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
            <div className="flex items-center">
              <CircleXIcon className="fill-red-600 mr-2 size-6 text-red-100" />
              <span>Falha no checkout. Por favor, tente novamente.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
