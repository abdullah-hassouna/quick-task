import CheckoutListItem from "../components/CheckoutListItem";
import CheckoutDataForm from "../components/Forms/CheckoutDataForm";
import { useCart } from "../context/cart-context";

function CheckoutPage() {
  const { cartItems } = useCart();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        Your Cart ({cartItems.length})
      </h2>

      <CheckoutDataForm/>

      {cartItems.length === 0 ? (
        <p className="text-sm text-red-500">No items in cart.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cartItems.map((item) => (
            <CheckoutListItem key={item.ID} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
