import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../../context/cart-context";
import React from "react";
import DEFAULT_ADDRESS_DATA from "../../data-sample/address-data";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  addressId: z.coerce
    .number({ invalid_type_error: "Please select an address" })
    .min(1, "Please select an address"),
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
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      addressId: undefined,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const selectedId = watch("addressId");
  const selectedAddress = DEFAULT_ADDRESS_DATA.find((a) => a.id === selectedId);

  const total = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0,
  );

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Order submitted:", { data, cartItems, total });
      clearCart();
    } catch (err) {
      console.error("Order failed:", err);
    }
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" error={errors.firstName?.message}>
              <input
                className="bg-transparent w-full outline-none"
                {...register("firstName")}
                placeholder="John"
              />
            </Field>
            <Field label="Last Name" error={errors.lastName?.message}>
              <input
                className="bg-transparent w-full outline-none"
                {...register("lastName")}
                placeholder="Doe"
              />
            </Field>
          </div>
          <Field label="Email" error={errors.email?.message}>
            <input
              className="bg-transparent w-full outline-none"
              {...register("email")}
              type="email"
              placeholder="john@example.com"
            />
          </Field>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
          <Field label="Address" error={errors.addressId?.message}>
            <select
              {...register("addressId")}
              className="w-full bg-transparent outline-none text-neutral-900 dark:text-neutral-100"
            >
              <option value="">— Select an address —</option>
              {DEFAULT_ADDRESS_DATA.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.city} — {addr.street}
                </option>
              ))}
            </select>
          </Field>

          {selectedAddress && (
            <div
              dir="rtl"
              className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 space-y-1 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <p>{selectedAddress.fullName}</p>
              <p>{selectedAddress.street}</p>
              <p>{selectedAddress.district}</p>
              <p>{selectedAddress.zipCode}</p>
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
          <Field label="Card Number" error={errors.cardNumber?.message}>
            <input
              className="bg-transparent w-full outline-none"
              {...register("cardNumber")}
              placeholder="1234567812345678"
              maxLength={16}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry Date" error={errors.expiryDate?.message}>
              <input
                className="bg-transparent w-full outline-none"
                {...register("expiryDate")}
                placeholder="MM/YY"
                maxLength={5}
              />
            </Field>
            <Field label="CVV" error={errors.cvv?.message}>
              <input
                className="bg-transparent w-full outline-none"
                {...register("cvv")}
                placeholder="123"
                maxLength={4}
              />
            </Field>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4">
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
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        {label}
      </label>
      <div
        className={`w-full border rounded-lg px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-blue-500 ${
          error
            ? "border-red-500"
            : "border-neutral-300 dark:border-neutral-600"
        }`}
      >
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
