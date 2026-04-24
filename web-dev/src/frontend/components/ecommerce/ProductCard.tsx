import Link from "next/link";
import type { Product } from "@/backend/data/catalog";
import { formatCurrency } from "@/backend/services/store";
import styles from "@/frontend/styles/storefront.module.css";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productBody}>
        <p className={styles.productCategory}>{product.category}</p>
        <h3>{product.name}</h3>
        <p className={styles.productText}>{product.shortDescription}</p>
        <div className={styles.priceRow}>
          <strong>{formatCurrency(product.price)}</strong>
          {product.compareAtPrice ? (
            <span>{formatCurrency(product.compareAtPrice)}</span>
          ) : null}
        </div>
        <Link href={`/product/${product.slug}`} className={styles.actionLink}>
          View Product
        </Link>
      </div>
    </article>
  );
}
