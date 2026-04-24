"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/frontend/data/products";
import { PageLayout } from "@/frontend/components/PageLayout";
import { addCartItem, buyNow, parsePrice } from "@/frontend/lib/cart";

const STARS = [1, 2, 3, 4, 5];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(Array.isArray(params.slug) ? params.slug[0] : params.slug);
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-stone-400 text-sm mb-4">Product not found.</p>
          <Link href="/shop" className="text-stone-900 underline text-sm">← Back to Shop</Link>
        </div>
      </PageLayout>
    );
  }

  const resolvedProduct = product;
  const fullStars = Math.floor(resolvedProduct.rating);
  const resolvedColor = selectedColor || resolvedProduct.colors[0] || "Default";
  const resolvedSize = selectedSize || resolvedProduct.sizes[0] || "One Size";

  function createCartItem() {
    return {
      productId: String(resolvedProduct.id),
      name: resolvedProduct.name,
      price: parsePrice(resolvedProduct.price),
      image: resolvedProduct.image,
      category: resolvedProduct.category,
      description: resolvedProduct.description,
      color: resolvedColor,
      size: resolvedSize,
      quantity: qty,
    };
  }

  const handleAddToCart = () => {
    addCartItem(createCartItem());
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    buyNow(createCartItem());
    router.push("/checkout");
  };

  return (
    <PageLayout>
      <section className="bg-[#F8F6F1] min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-10"
          >
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${product.category}`} className="hover:text-stone-900 transition-colors capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            {product.name}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[3/4] bg-stone-100 overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.tag && (
                <span className="absolute top-5 left-5 bg-stone-900 text-white text-[10px] tracking-[0.2em] uppercase px-4 py-2">
                  {product.tag}
                </span>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col justify-start pt-2"
            >
              {/* Category */}
              <p className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-3 capitalize">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="font-heading text-4xl lg:text-5xl uppercase text-stone-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {STARS.map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= fullStars ? "#78350f" : "none"} stroke="#78350f" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-stone-500">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-stone-900">{product.price}</span>
                <span className="text-base text-stone-400 line-through">{product.mrp}</span>
                <span className="text-sm font-semibold text-emerald-600">{product.discount} off</span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed mb-8 border-t border-stone-200 pt-6">
                {product.description}
              </p>

              {/* Color */}
              <div className="mb-6">
                <p className="text-[11px] tracking-[0.25em] uppercase text-stone-500 mb-3">
                  Colour: <span className="text-stone-900 font-medium">{selectedColor || resolvedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-[11px] tracking-wider uppercase border transition-all duration-200 ${
                        selectedColor === color
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-300 text-stone-700 hover:border-stone-900"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <p className="text-[11px] tracking-[0.25em] uppercase text-stone-500 mb-3">
                  Size: <span className="text-stone-900 font-medium">{selectedSize || resolvedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 text-[11px] tracking-wider uppercase border transition-all duration-200 ${
                        selectedSize === size
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-300 text-stone-700 hover:border-stone-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + Buttons */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-stone-300">
                  <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-11 text-lg text-stone-600 hover:bg-stone-100 transition-colors">−</button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button type="button" onClick={() => setQty(Math.min(5, qty + 1))} className="w-10 h-11 text-lg text-stone-600 hover:bg-stone-100 transition-colors">+</button>
                </div>
                <button
                  id="add-to-cart-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-11 bg-stone-900 text-white text-[11px] tracking-[0.3em] uppercase hover:bg-stone-700 transition-colors duration-300"
                >
                  {added ? "✓ Added" : "Add to Cart"}
                </button>
              </div>

              <Link
                href="/checkout"
                id="buy-now-btn"
                onClick={(event) => {
                  event.preventDefault();
                  handleBuyNow();
                }}
                className="block w-full h-11 border border-stone-900 text-stone-900 text-[11px] tracking-[0.3em] uppercase text-center leading-[44px] hover:bg-stone-900 hover:text-white transition-all duration-300"
              >
                Buy Now
              </Link>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: "↩", label: "10 Day Returns" },
                  { icon: "🚚", label: "Free Delivery" },
                  { icon: "🔒", label: "Secure Payment" },
                ].map((badge) => (
                  <div key={badge.label}>
                    <p className="text-xl mb-1">{badge.icon}</p>
                    <p className="text-[10px] tracking-wider uppercase text-stone-500">{badge.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
