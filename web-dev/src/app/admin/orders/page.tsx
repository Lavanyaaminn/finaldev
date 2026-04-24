import { StoreLayout } from "@/frontend/components/ecommerce/StoreLayout";
import { formatCurrency, getAdminSnapshot } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

export default function AdminOrdersPage() {
  const { latestOrders } = getAdminSnapshot();

  return (
    <StoreLayout>
      <section className={styles.section}>
        <h1>Admin: Orders</h1>
        <p className={styles.lead}>
          Process new orders, monitor shipment status, and prioritize dispatch.
        </p>
      </section>

      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{formatCurrency(order.total)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StoreLayout>
  );
}
