import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/cart-context";

export default function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <a href="./" className="text-xl font-bold tracking-tight">
            Abdullah Store
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute bg-white -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-black font-bold">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}
