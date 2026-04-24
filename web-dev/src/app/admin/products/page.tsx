import { StoreLayout } from "@/frontend/components/ecommerce/StoreLayout";
import { formatCurrency, getAllProducts } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

export default function AdminProductsPage() {
  const products = getAllProducts();

  return (
    <StoreLayout>
      <section className={styles.section}>
        <h1>Admin: Products</h1>
        <p className={styles.lead}>Monitor pricing, category, and assortment at scale.</p>
      </section>

      <section className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.rating}</td>
                <td>{product.newArrival ? "New" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StoreLayout>
  );
}
