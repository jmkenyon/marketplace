import { id } from "date-fns/locale";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface TenantId {
  productIds: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantId>;
  addProduct: (tenantId: string, productId: string) => void;
  removeProduct: (tenantId: string, productId: string) => void;
  clearCart: (tenantId: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantId: string) => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [
                ...(state.tenantCarts[tenantSlug]?.productIds || []),
                productId,
              ],
            },
          },
        })),
      removeProduct: (tenantSlug, productId) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds:
                state.tenantCarts[tenantSlug]?.productIds.filter(
                  (id) => id !== productId
                ) || [],
            },
          },
        })),
      clearCart: (tenantSlug) =>
        set((state) => ({
          tenantCarts: {
            ...state.tenantCarts,
            [tenantSlug]: {
              productIds: [],
            },
          },
        })),
      clearAllCarts: () => set({ tenantCarts: {} }),
      getCartByTenant: (tenantSlug) =>
        get().tenantCarts[tenantSlug]?.productIds || [],
    }),
    {
      name: "learnly-card",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
