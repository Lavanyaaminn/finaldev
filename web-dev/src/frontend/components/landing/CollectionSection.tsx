"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Linen Tee",
    price: "$89",
    tag: "New",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
  },
  {
    id: 2,
    name: "Minimal Zip Hoodie",
    price: "$145",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
  },
  {
    id: 3,
    name: "Cargo Trouser",
    price: "$129",
    tag: "",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80",
  },
  {
    id: 4,
    name: "Structured Overshirt",
    price: "$165",
    tag: "Limited",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
  },
];

export function CollectionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <span className="text-[11px] tracking-[0.35em] uppercase text-stone-400 block mb-3">Exclusive</span>
            <h2 className="font-heading text-5xl lg:text-7xl uppercase text-stone-900 leading-none">
              New Collection
            </h2>
          </div>
          <Link
            href="/shop"
            id="collection-view-all"
            className="hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-current pb-px"
          >
            View All
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.13 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-stone-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-stone-900 text-white text-[9px] tracking-[0.25em] uppercase px-3 py-1.5">
                    {product.tag}
                  </span>
                )}

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 py-3.5 bg-white/95 backdrop-blur-sm text-center translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-stone-900 font-medium">
                    Quick Add +
                  </span>
                </div>

                {/* Wishlist */}
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-900 hover:text-white"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-stone-800 font-medium leading-snug mb-1">{product.name}</p>
                  <p className="text-[11px] text-stone-400 tracking-wider">Premium Collection</p>
                </div>
                <p className="text-sm font-semibold text-stone-900 ml-2 shrink-0">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
