import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../../context/cart-context";
import React from "react";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().regex(/^\d{4,10}$/, "Invalid zip code"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3-4 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutDataForm() {
  const { cartItems, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0,
  );

  const onSubmit = async (data: CheckoutFormData) => {
    // 🔌 Replace with your actual API call
    console.log("Order submitted:", { data, cartItems, total });
    clearCart();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-green-600">Order Placed! 🎉</h2>
        <p className="text-gray-500 mt-2">
          Thanks {getValues("firstName")}, your order is on its way.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {" "}
        <section>
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName?.message}>
              <input {...register("firstName")} placeholder="John" />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
              <input {...register("lastName")} placeholder="Doe" />
            </Field>
          </div>
          <Field label="Email" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
            />
          </Field>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
          <Field label="Address" error={errors.address?.message}>
            <input {...register("address")} placeholder="123 Main St" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" error={errors.city?.message}>
              <input {...register("city")} placeholder="New York" />
            </Field>
            <Field label="Zip Code" error={errors.zipCode?.message}>
              <input {...register("zipCode")} placeholder="10001" />
            </Field>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
          <Field label="Card Number" error={errors.cardNumber?.message}>
            <input
              {...register("cardNumber")}
              placeholder="1234567812345678"
              maxLength={16}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry Date" error={errors.expiryDate?.message}>
              <input
                {...register("expiryDate")}
                placeholder="MM/YY"
                maxLength={5}
              />
            </Field>
            <Field label="CVV" error={errors.cvv?.message}>
              <input {...register("cvv")} placeholder="123" maxLength={4} />
            </Field>
          </div>
        </section>
        <section className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.ID} className="flex justify-between text-sm py-1">
              <span>
                {item.Name} × {item.Quantity}
              </span>
              <span>${(item.Price * item.Quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </section>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Placing Order..."
            : `Place Order — $${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactElement;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div
        className={`w-full border rounded-lg px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500 ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
      >
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
