import Link from "next/link";
import styles from "@/frontend/styles/storefront.module.css";

type StoreLayoutProps = {
  children: React.ReactNode;
};

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
  { href: "/admin", label: "Admin" },
];

export function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className={styles.appShell}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.brand}>
          AJ THREADS
        </Link>

        <nav className={styles.nav}>
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <p>Built for velocity, designed for comfort, styled to win.</p>
        <div className={styles.footerLinks}>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </footer>
    </div>
  );
}
