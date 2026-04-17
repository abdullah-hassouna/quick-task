import React, { createContext, useContext, useState } from "react";
import type CartItemType from "../types/CartItemType";
import { callCartData, updateCartData } from "../libs/callCart";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  foundInCart: (itemId: number) => CartItemType | undefined;
  removeFromCart: (itemId: number) => void;
  reduceFromCart: (itemId: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItemType[]>(callCartData());

  const addToCart = (item: CartItemType) => {
    if (foundInCart(item.ID)) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.ID === item.ID
            ? { ...cartItem, Quantity: cartItem.Quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems((prev) => [...prev, item]);
    }
    updateCartData(cartItems);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.ID !== itemId));
    updateCartData(cartItems);
  };

  const reduceFromCart = (itemId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.ID === itemId ? { ...item, Quantity: item.Quantity - 1 } : item,
      ),
    );
    updateCartData(cartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    updateCartData(cartItems);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.Quantity, 0);
  };

  const foundInCart = (itemId: number) => {
    return cartItems.find((item) => item.ID === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        foundInCart,
        reduceFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
