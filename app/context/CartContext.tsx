'use client'
import { createContext, useContext, useState, ReactNode } from "react";
import { Product, Variant } from "../components/ProductCard";

interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: Variant) => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: Variant) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.variantId === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        { productId: product.id, variantId: variant.id, quantity: 1 },
      ];
    });
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
