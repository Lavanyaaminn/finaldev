"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/frontend/components/PageLayout";
import { formatCurrency } from "@/backend/services/store";
import { getCartItemKey, getCartTotals, placeMockOrder, readCart, type MockCartItem } from "@/frontend/lib/cart";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<MockCartItem[]>(() => readCart());
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");
  const { subtotal, shipping, total } = getCartTotals(orderItems);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (orderItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const order = placeMockOrder({
        fullName: String(form.get("fullName") ?? ""),
        email: String(form.get("email") ?? ""),
        address: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""),
        zipCode: String(form.get("zipCode") ?? ""),
        country: String(form.get("country") ?? ""),
      });

      if (!order) {
        setMessage("Unable to place order.");
        return;
      }

      setMessage(`Order placed: ${order.id}`);
      setOrderItems([]);
      event.currentTarget.reset();
      router.push("/orders");
    } catch {
      setMessage("Unable to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Velora Checkout</p>
          <h1 className={styles.title}>A refined finish for your order.</h1>
          <p className={styles.lead}>
            Confirm your delivery details, review your curated picks, and place your order in one secure flow.
          </p>
        </div>

        <div className={styles.heroMeta}>
          <div>
            <span className={styles.metaLabel}>Items</span>
            <strong>{orderItems.length.toString().padStart(2, "0")}</strong>
          </div>
          <div>
            <span className={styles.metaLabel}>Delivery</span>
            <strong>{shipping === 0 ? "Complimentary" : "Priority"}</strong>
          </div>
          <div>
            <span className={styles.metaLabel}>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.kicker}>Shipping details</p>
                <h2>Where should we send it?</h2>
              </div>
              <span className={styles.securityBadge}>Encrypted checkout</span>
            </div>

            <div className={styles.inputGrid}>
              <label className={styles.field}>
                <span>Full name</span>
                <input className={styles.input} type="text" name="fullName" placeholder="Aarav Malhotra" required />
              </label>
              <label className={styles.field}>
                <span>Email address</span>
                <input className={styles.input} type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Street address</span>
                <input className={styles.input} type="text" name="address" placeholder="Apartment, suite, or house number" required />
              </label>
              <label className={styles.field}>
                <span>City</span>
                <input className={styles.input} type="text" name="city" placeholder="Mumbai" required />
              </label>
              <label className={styles.field}>
                <span>Postal code</span>
                <input className={styles.input} type="text" name="zipCode" placeholder="400001" required />
              </label>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Country / Region</span>
                <input className={styles.input} type="text" name="country" placeholder="India" required />
              </label>
            </div>

            {/* Payment Method */}
            <div className={styles.paymentSection}>
              <div className={styles.cardHeader} style={{ marginBottom: 0 }}>
                <div>
                  <p className={styles.kicker}>Payment</p>
                  <h2>How would you like to pay?</h2>
                </div>
              </div>

              <div className={styles.paymentOptions}>
                {([
                  {
                    id: "card" as const,
                    label: "Credit / Debit Card",
                    sub: "Visa, Mastercard, RuPay",
                    icon: (
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="3" />
                        <path d="M2 10h20" />
                      </svg>
                    ),
                  },
                  {
                    id: "upi" as const,
                    label: "UPI",
                    sub: "GPay, PhonePe, Paytm",
                    icon: (
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    ),
                  },
                  {
                    id: "cod" as const,
                    label: "Cash on Delivery",
                    sub: "Pay when your order arrives",
                    icon: (
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                        <line x1="12" y1="12" x2="12" y2="16" />
                        <line x1="10" y1="14" x2="14" y2="14" />
                      </svg>
                    ),
                  },
                ] as const).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`${styles.paymentOption} ${paymentMethod === opt.id ? styles.paymentOptionActive : ""}`}
                  >
                    <span className={styles.paymentIcon}>{opt.icon}</span>
                    <span className={styles.paymentText}>
                      <span className={styles.paymentLabel}>{opt.label}</span>
                      <span className={styles.paymentSub}>{opt.sub}</span>
                    </span>
                    <span className={`${styles.paymentCheck} ${paymentMethod === opt.id ? styles.paymentCheckActive : ""}`}>
                      {paymentMethod === opt.id && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fbf6ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className={styles.cardFields}>
                  <label className={`${styles.field} ${styles.fullWidth}`}>
                    <span>Card number</span>
                    <input className={styles.input} type="text" name="cardNumber" placeholder="4242 4242 4242 4242" maxLength={19} />
                  </label>
                  <label className={styles.field}>
                    <span>Expiry date</span>
                    <input className={styles.input} type="text" name="cardExpiry" placeholder="MM / YY" maxLength={7} />
                  </label>
                  <label className={styles.field}>
                    <span>CVV</span>
                    <input className={styles.input} type="text" name="cardCvv" placeholder="•••" maxLength={4} />
                  </label>
                  <label className={`${styles.field} ${styles.fullWidth}`}>
                    <span>Name on card</span>
                    <input className={styles.input} type="text" name="cardName" placeholder="As printed on your card" />
                  </label>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className={styles.cardFields}>
                  <label className={`${styles.field} ${styles.fullWidth}`}>
                    <span>UPI ID</span>
                    <input className={styles.input} type="text" name="upiId" placeholder="yourname@upi" />
                  </label>
                </div>
              )}

              {paymentMethod === "cod" && (
                <p className={styles.codNote}>
                  You will pay {formatCurrency(total)} in cash when your order is delivered. No advance payment needed.
                </p>
              )}
            </div>

            <div className={styles.benefits}>
              <div>
                <p className={styles.benefitLabel}>Complimentary tailoring feel</p>
                <p className={styles.benefitText}>Thoughtful packaging and delivery updates from dispatch to doorstep.</p>
              </div>
              <div>
                <p className={styles.benefitLabel}>Flexible support</p>
                <p className={styles.benefitText}>Easy returns and live help if sizing or shipping needs change.</p>
              </div>
            </div>

            <button className={styles.submitButton} disabled={loading || orderItems.length === 0}>
              {loading ? "Placing order..." : `Place order • ${formatCurrency(total)}`}
            </button>

            {message ? (
              <p className={`${styles.message} ${message.toLowerCase().includes("order") ? styles.messageSuccess : styles.messageError}`}>
                {message}
              </p>
            ) : null}
          </form>

          <aside className={styles.summaryCard}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.kicker}>Order summary</p>
                <h2>Your selection</h2>
              </div>
              <span className={styles.securityBadge}>Velora edit</span>
            </div>

            {orderItems.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Your cart is empty. Add a product first to continue checkout.</p>
                <Link href="/shop" className={styles.inlineLink}>Return to shop</Link>
              </div>
            ) : (
              <div className={styles.items}>
                {orderItems.map((item) => (
                  <article key={getCartItemKey(item)} className={styles.itemRow}>
                    <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image})` }} />
                    <div className={styles.itemContent}>
                      <div className={styles.itemTopRow}>
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                        </div>
                        <strong>{formatCurrency(item.price * item.quantity)}</strong>
                      </div>

                      <div className={styles.itemMeta}>
                        <span>{item.category}</span>
                        <span>Qty {item.quantity}</span>
                        <span>{item.color}</span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className={styles.totals}>
              <div className={styles.totalLine}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className={styles.totalLine}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <div className={styles.totalLine}>
                <span>Taxes</span>
                <span>Included</span>
              </div>
              <div className={`${styles.totalLine} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className={styles.summaryFooter}>
              <p>Free shipping unlocks automatically on orders above {formatCurrency(5000)}.</p>
              <p>Secure card processing and delivery confirmation included.</p>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
