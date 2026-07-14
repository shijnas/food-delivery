"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, FoodItem, Restaurant } from "@/types";

interface CartStore {
  items: CartItem[];
  restaurantId: string | null;
  addItem: (
    foodItem: FoodItem,
    restaurant: Pick<Restaurant, "id" | "name" | "image" | "deliveryFee">,
    quantity?: number,
    customizations?: string[]
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: (discount?: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (foodItem, restaurant, quantity = 1, customizations = []) => {
        const { items, restaurantId } = get();

        // If adding from a different restaurant, clear cart first
        if (restaurantId && restaurantId !== restaurant.id) {
          set({ items: [], restaurantId: null });
        }

        const existingItem = items.find(
          (item) =>
            item.foodItem.id === foodItem.id &&
            JSON.stringify(item.customizations) ===
              JSON.stringify(customizations)
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    totalPrice: (item.quantity + quantity) * foodItem.price,
                  }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: `${foodItem.id}-${Date.now()}`,
            foodItem,
            restaurant,
            quantity,
            customizations,
            totalPrice: quantity * foodItem.price,
          };
          set({
            items: [...items, newItem],
            restaurantId: restaurant.id,
          });
        }
      },

      removeItem: (itemId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== itemId);
        set({
          items: newItems,
          restaurantId: newItems.length === 0 ? null : get().restaurantId,
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId
              ? { ...item, quantity, totalPrice: quantity * item.foodItem.price }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [], restaurantId: null }),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((total, item) => total + item.totalPrice, 0),

      getDeliveryFee: () => {
        const { items } = get();
        if (items.length === 0) return 0;
        return items[0].restaurant.deliveryFee;
      },

      getTotal: (discount = 0) => {
        const subtotal = get().getSubtotal();
        const deliveryFee = get().getDeliveryFee();
        return Math.max(0, subtotal + deliveryFee - discount);
      },
    }),
    {
      name: "kayikk-cart",
    }
  )
);
