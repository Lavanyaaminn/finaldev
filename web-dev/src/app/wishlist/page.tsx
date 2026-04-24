import { StoreLayout } from "@/frontend/components/ecommerce/StoreLayout";
import { ProductCard } from "@/frontend/components/ecommerce/ProductCard";
import { getAllProducts } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

export default function WishlistPage() {
  const products = getAllProducts().slice(2, 6);

  return (
    <StoreLayout>
      <section className={styles.section}>
        <h1>Your Wishlist</h1>
        <p className={styles.lead}>
          Save products you love and review them before your next purchase.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </StoreLayout>
  );
}
