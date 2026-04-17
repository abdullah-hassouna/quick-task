import CheckoutListItem from "../components/CheckoutListItem";
import CheckoutDataForm from "../components/Forms/CheckoutDataForm";
import { useCart } from "../context/cart-context";

function CheckoutPage() {
  const { cartItems } = useCart();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CheckoutDataForm />
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
