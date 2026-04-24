"use client";

import { useState } from "react";
import { PageLayout } from "@/frontend/components/PageLayout";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/frontend/data/products";
import { addCartItem, parsePrice } from "@/frontend/lib/cart";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function ShopPage() {
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const products = ALL_PRODUCTS.slice(0, 18);

  const handleAddToCart = (product: (typeof ALL_PRODUCTS)[number]) => {
    addCartItem({
      productId: String(product.id),
      name: product.name,
      price: parsePrice(product.price),
      image: product.image,
      category: product.category,
      description: product.description,
      color: product.colors[0] ?? "Default",
      size: product.sizes[0] ?? "One Size",
      quantity: 1,
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId((current) => (current === product.id ? null : current)), 1500);
  };

  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="py-20 bg-stone-900 text-white text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.45em] uppercase text-stone-400 block mb-4"
        >
          Browse the Catalog
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading text-6xl lg:text-8xl uppercase leading-none"
        >
          Shop All
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-stone-400 mt-6 text-base max-w-md mx-auto font-light leading-relaxed"
        >
          Every piece is curated for those who move through the world with intention.
        </motion.p>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-stone-900 text-white text-[9px] tracking-[0.25em] uppercase px-3 py-1.5">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-stone-200/70 bg-white/95 p-2 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-900"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-stone-700"
                      >
                        {addedProductId === product.id ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-stone-800 font-medium leading-snug mb-1">{product.name}</p>
                    <p className="text-[11px] text-stone-400 tracking-wider uppercase">{product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-900 ml-2 shrink-0">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
