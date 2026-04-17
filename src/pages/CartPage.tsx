import CartItemCard from "../components/CartItemCard";
import { useCart } from "../context/cart-context";

function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className="App p-2">
      {cartItems.length == 0 && <p style={{ color: "red" }}>No Items</p>}
      {cartItems.length && (
        <>
          <div
            id="product-list"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {cartItems.map((item) => (
              <CartItemCard key={item.ID} {...item} />
            ))}
          </div>
          <a href="./checkout">Checkout</a>
        </>
      )}
    </div>
  );
}

export default CartPage;
