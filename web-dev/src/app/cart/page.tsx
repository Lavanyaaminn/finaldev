import Link from "next/link";
import { PageLayout } from "@/frontend/components/PageLayout";
import { formatCurrency, getFeaturedProducts } from "@/backend/services/store";
import styles from "./cart.module.css";

export default function CartPage() {
  const items = getFeaturedProducts().slice(0, 2).map((product) => ({
    product,
    quantity: 1,
  }));

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  return (
    <PageLayout>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
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
            <div className={styles.headRow}>
              <p>Product</p>
              <p>Qty</p>
              <p>Price</p>
              <p>Total</p>
            </div>

            <div className={styles.rows}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.item}>
                  <div>
                    <p className={styles.name}>{item.product.name}</p>
                    <p className={styles.category}>{item.product.category}</p>
                  </div>
                  <div className={styles.metaInline}>
                    <p className={styles.muted}>Qty: {item.quantity}</p>
                    <p className={styles.muted}>Price: {formatCurrency(item.product.price)}</p>
                  </div>
                  <p className={styles.muted}>{item.quantity}</p>
                  <p className={styles.muted}>{formatCurrency(item.product.price)}</p>
                  <p className={styles.total}>
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

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
