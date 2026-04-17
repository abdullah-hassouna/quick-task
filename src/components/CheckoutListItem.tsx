import { Card, CardContent, CardFooter } from "./ui/card";
import type CartItemType from "../types/CartItemType";

export default function CheckoutListItem(CartItemData: CartItemType) {
  return (
    <Card className="flex flex-row items-center gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3">
      {/* Thumbnail */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <img
          src={CartItemData.ImageURL}
          alt={CartItemData.Name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name + Quantity */}
      <CardContent className="flex flex-1 flex-col gap-0.5 p-0">
        <p className="text-sm font-medium leading-snug text-neutral-900 dark:text-neutral-100">
          {CartItemData.Name}
        </p>
        <p className="text-xs text-neutral-400">Qty: {CartItemData.Quantity}</p>
      </CardContent>

      {/* Price */}
      <CardFooter className="p-0 shrink-0">
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="text-xs font-normal text-neutral-400 mr-0.5">$</span>
          {(CartItemData.Price * CartItemData.Quantity).toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
