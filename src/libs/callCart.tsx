import type CartItemType from "../types/CartItemType";

export function callCartData() {
  const stored = localStorage.getItem("cart");

  if (stored) {
    return stored ? JSON.parse(stored) : [];
  }
  localStorage.setItem("cart", "[]");
  return [];
}

export function updateCartData(cartItems: CartItemType[]) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
export function emptyCartData() {
  localStorage.setItem("cart", "[]");
}
