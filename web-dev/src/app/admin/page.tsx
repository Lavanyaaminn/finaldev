import Link from "next/link";
import { StoreLayout } from "@/frontend/components/ecommerce/StoreLayout";
import { formatCurrency, getAdminSnapshot } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

export default function AdminDashboardPage() {
  const { metrics, inventoryAlerts, latestOrders } = getAdminSnapshot();

  return (
    <StoreLayout>
      <section className={styles.section}>
        <span className={styles.eyebrow}>Admin Panel</span>
        <h1>Store Operations Dashboard</h1>
      </section>

      <section className={styles.kpiGrid}>
        <article className={styles.kpiCard}>
          <p>Revenue Today</p>
          <strong>{formatCurrency(metrics.revenueToday)}</strong>
        </article>
        <article className={styles.kpiCard}>
          <p>Orders Today</p>
          <strong>{metrics.ordersToday}</strong>
        </article>
        <article className={styles.kpiCard}>
          <p>Avg Order Value</p>
          <strong>{formatCurrency(metrics.avgOrderValue)}</strong>
        </article>
        <article className={styles.kpiCard}>
          <p>Active Customers</p>
          <strong>{metrics.activeCustomers}</strong>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel} style={{ gridColumn: "span 6" }}>
          <h2>Inventory Alerts</h2>
          <div className={styles.list}>
            {inventoryAlerts.map((item) => (
              <div key={item.productId} className={styles.listItem}>
                <span>{item.productName}</span>
                <strong>{item.stockLeft} left</strong>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel} style={{ gridColumn: "span 6" }}>
          <h2>Latest Orders</h2>
          <div className={styles.list}>
            {latestOrders.map((order) => (
              <div key={order.orderId} className={styles.listItem}>
                <span>{order.orderId} - {order.customerName}</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className={styles.buttonRow}>
        <Link href="/admin/products" className={styles.primaryButton}>
          Manage Products
        </Link>
        <Link href="/admin/orders" className={styles.secondaryButton}>
          Manage Orders
        </Link>
      </div>
    </StoreLayout>
  );
}
