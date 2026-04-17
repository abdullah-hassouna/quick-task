import { Check, Plus } from "lucide-react";
import { useCart } from "../context/cart-context";
import type ProductType from "../types/ProductType";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";

export default function ProductCard(ProductData: ProductType) {
  const { addToCart, foundInCart } = useCart();

  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700 pt-0">
      <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={ProductData.ImageURL}
          alt={ProductData.Name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
          In stock
        </span>
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-3">
        <CardTitle className="text-base font-medium leading-snug text-neutral-900 dark:text-neutral-100">
          {ProductData.Name}
        </CardTitle>
        <p className="flex-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {ProductData.Description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-neutral-100 px-4 py-3 dark:border-neutral-800">
        <p className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          <span className="text-sm font-normal text-neutral-400 mr-0.5">$</span>
          {ProductData.Price.toFixed(2)}
        </p>
        <button
          onClick={(_) =>
            addToCart({
              ID: ProductData.ID,
              Name: ProductData.Name,
              Price: ProductData.Price,
              ImageURL: ProductData.ImageURL,
              Quantity: 1,
            })
          }
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-75 dark:bg-white dark:text-neutral-900"
        >
          <div className="flex gap-2">
            {foundInCart(ProductData.ID) ? (
              <Check className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            Add to cart
          </div>
        </button>
      </CardFooter>
    </Card>
  );
}
