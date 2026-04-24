"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/frontend/components/PageLayout";
import { formatCurrency } from "@/backend/services/store";
import {
  getCartItemKey,
  getCartTotals,
  readCart,
  removeCartItem,
  type MockCartItem,
  updateCartItemQuantity,
} from "@/frontend/lib/cart";
import styles from "./cart.module.css";

export default function CartPage() {
  const [items, setItems] = useState<MockCartItem[]>(() => readCart());
  const { subtotal, shipping, total } = getCartTotals(items);

  const handleQuantityChange = (item: MockCartItem, nextQuantity: number) => {
    setItems(updateCartItemQuantity(getCartItemKey(item), Math.max(0, Math.min(10, nextQuantity))));
  };

  const handleRemove = (item: MockCartItem) => {
    setItems(removeCartItem(getCartItemKey(item)));
  };

  return (
    <PageLayout>
      <section className={styles.hero}>
        {/* Background video */}
        <video
          className={styles.heroBg}
          src="/Velora_clothing_brand_two.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        {/* Overlay so text remains readable */}
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Checkout</p>
          <h1 className={styles.heroTitle}>Your Cart</h1>
          <p className={styles.heroLead}>
            Review your selected products, adjust quantities, and move to a secure checkout.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.layout}>
          <article className={styles.card}>
            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyEyebrow}>Cart empty</p>
                <h2 className={styles.emptyTitle}>Your mock cart is ready for its first piece.</h2>
                <p className={styles.emptyText}>
                  Add a product from the detail page and it will appear here with the correct mock pricing.
                </p>
              </div>
            ) : (
              <>
                <div className={styles.headRow}>
                  <p>Product</p>
                  <p>Qty</p>
                  <p>Price</p>
                  <p>Total</p>
                </div>

                <div className={styles.rows}>
                  {items.map((item) => (
                    <div key={getCartItemKey(item)} className={styles.item}>
                      <div className={styles.productCell}>
                        <div className={styles.thumb} style={{ backgroundImage: `url(${item.image})` }} />
                        <div>
                          <p className={styles.name}>{item.name}</p>
                          <p className={styles.category}>{item.category}</p>
                          <p className={styles.variant}>{item.color} · {item.size}</p>
                        </div>
                      </div>
                      <div className={styles.qtyWrap}>
                        <button type="button" className={styles.qtyButton} onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                          -
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button type="button" className={styles.qtyButton} onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <p className={styles.muted}>{formatCurrency(item.price)}</p>
                      <div className={styles.totalCell}>
                        <p className={styles.total}>{formatCurrency(item.price * item.quantity)}</p>
                        <button type="button" className={styles.removeButton} onClick={() => handleRemove(item)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className={styles.actions}>
              <Link href="/shop" className={`${styles.btn} ${styles.btnSecondary}`}>
                Continue Shopping
              </Link>
              <Link href="/checkout" className={`${styles.btn} ${styles.btnPrimary}`}>
                Proceed to Checkout
              </Link>
            </div>
          </article>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryList}>
              <div className={styles.summaryLine}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>Estimated Tax</span>
                <span>Included</span>
              </div>
            </div>

            <div className={styles.grand}>
              <p className={styles.grandLabel}>Grand Total</p>
              <p className={styles.grandValue}>{formatCurrency(total)}</p>
            </div>

            <Link href="/checkout" className={`${styles.btn} ${styles.btnPrimary} ${styles.checkout}`}>
              Checkout Securely
            </Link>

            <p className={styles.note}>
              Free shipping above {formatCurrency(5000)}. You are {subtotal > 5000 ? "eligible" : "close"} to free delivery.
            </p>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
