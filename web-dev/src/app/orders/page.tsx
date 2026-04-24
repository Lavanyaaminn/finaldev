import { StoreLayout } from "@/frontend/components/ecommerce/StoreLayout";
import { formatCurrency } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

const orders = [
  { id: "AJ-641188", date: "2026-04-18", status: "Delivered", total: 3499 },
  { id: "AJ-641073", date: "2026-04-11", status: "Shipped", total: 4899 },
  { id: "AJ-640987", date: "2026-04-07", status: "Processing", total: 2398 },
];

export default function OrdersPage() {
  return (
    <StoreLayout>
      <section className={styles.section}>
        <h1>My Orders</h1>
        <p className={styles.lead}>Track all your purchases from one dashboard.</p>
      </section>

      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{formatCurrency(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StoreLayout>
  );
}
