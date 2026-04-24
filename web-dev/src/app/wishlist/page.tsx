"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/frontend/components/PageLayout";
import { formatCurrency } from "@/backend/services/store";
import { addCartItem } from "@/frontend/lib/cart";
import {
  clearWishlist,
  readWishlist,
  removeWishlistItem,
  type MockWishlistItem,
} from "@/frontend/lib/wishlist";

export default function WishlistPage() {
  const [items, setItems] = useState<MockWishlistItem[]>(() => readWishlist());

  const handleRemove = (productId: string) => {
    setItems(removeWishlistItem(productId));
  };

  const handleMoveToCart = (item: MockWishlistItem) => {
    addCartItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description,
      color: "Default",
      size: "M",
      quantity: 1,
    });

    setItems(removeWishlistItem(item.productId));
  };

  const handleClearAll = () => {
    clearWishlist();
    setItems([]);
  };

  return (
    <PageLayout>
      <section className="relative overflow-hidden border-b border-stone-800 bg-stone-900 text-stone-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_42%),radial-gradient(circle_at_85%_0%,rgba(245,158,11,0.2),transparent_36%)]" />
        <div className="relative mx-auto w-[min(1120px,calc(100%-2.5rem))] py-24">
          <p className="text-[11px] uppercase tracking-[0.35em] text-stone-400">Wishlist</p>
          <h1 className="mt-4 font-heading text-5xl uppercase leading-none sm:text-6xl">Saved Pieces</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
            Curate your Velora picks in one place. Move items to cart anytime and check out when you are ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-400">
            <span>{items.length} items saved</span>
            <span className="h-1 w-1 rounded-full bg-stone-500" />
            <span>Synced in this browser</span>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F2EC] py-14 sm:py-16">
        <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
          {items.length === 0 ? (
            <div className="rounded-[28px] border border-stone-200 bg-white px-7 py-14 text-center shadow-[0_24px_70px_-45px_rgba(28,25,23,0.45)] sm:px-12">
              <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400">No Saved Products</p>
              <h2 className="mt-4 text-3xl font-semibold text-stone-900">Your wishlist is empty</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
                Tap the heart icon on any product to save it here. Your selections stay saved across refresh.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Your Favorites</p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="rounded-full border border-stone-300 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-700 transition-colors hover:border-stone-500 hover:text-stone-900"
                >
                  Clear All
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <article
                    key={item.productId}
                    className="overflow-hidden rounded-[26px] border border-stone-200 bg-white shadow-[0_25px_80px_-50px_rgba(28,25,23,0.45)]"
                  >
                    <div className="relative aspect-[4/5] bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemove(item.productId)}
                        className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 text-stone-900 backdrop-blur-sm transition-colors hover:bg-stone-900 hover:text-white"
                        aria-label="Remove from wishlist"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">{item.category}</p>
                      <h3 className="mt-2 text-lg font-semibold text-stone-900">{item.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">{item.description}</p>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="text-lg font-semibold text-stone-900">{formatCurrency(item.price)}</p>
                        <button
                          type="button"
                          onClick={() => handleMoveToCart(item)}
                          className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-stone-700"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
