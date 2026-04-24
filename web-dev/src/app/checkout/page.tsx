"use client";

import { FormEvent, useState } from "react";
import { StoreLayout } from "@/frontend/components/ecommerce/StoreLayout";
import { getFeaturedProducts } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

export default function CheckoutPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const cartItems = getFeaturedProducts().slice(0, 2).map((product) => ({
    productId: product.id,
    quantity: 1,
  }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: form.get("fullName"),
            email: form.get("email"),
            address: form.get("address"),
            city: form.get("city"),
            zipCode: form.get("zipCode"),
            country: form.get("country"),
          },
          items: cartItems,
        }),
      });

      const data = (await response.json()) as { message?: string; orderId?: string };
      if (!response.ok) {
        setMessage(data.message ?? "Checkout failed.");
        return;
      }

      setMessage(data.message ?? `Order placed: ${data.orderId}`);
      event.currentTarget.reset();
    } catch {
      setMessage("Unable to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StoreLayout>
      <section className={styles.section}>
        <h1>Checkout</h1>
        <p className={styles.lead}>Complete your purchase in a few quick steps.</p>
      </section>

      <form className={styles.formPanel} onSubmit={handleSubmit}>
        <div className={styles.inputGrid}>
          <input className={styles.input} type="text" name="fullName" placeholder="Full name" required />
          <input className={styles.input} type="email" name="email" placeholder="Email" required />
          <input className={styles.input} type="text" name="address" placeholder="Address" required />
          <input className={styles.input} type="text" name="city" placeholder="City" required />
          <input className={styles.input} type="text" name="zipCode" placeholder="Zip code" required />
          <input className={styles.input} type="text" name="country" placeholder="Country" required />
        </div>
        <button style={{ marginTop: 12 }} className={styles.primaryButton} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
        {message ? <p style={{ marginTop: 10 }}>{message}</p> : null}
      </form>
    </StoreLayout>
  );
}
