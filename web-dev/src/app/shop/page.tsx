"use client";

import { PageLayout } from "@/frontend/components/PageLayout";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Linen Tee",
    price: "$89",
    category: "T-Shirts",
    tag: "New",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  },
  {
    id: 2,
    name: "Minimal Zip Hoodie",
    price: "$145",
    category: "Hoodies",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
  {
    id: 3,
    name: "Cargo Trouser",
    price: "$129",
    category: "Bottoms",
    tag: "",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    id: 4,
    name: "Structured Overshirt",
    price: "$165",
    category: "Jackets",
    tag: "Limited",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  },
  {
    id: 5,
    name: "Tailored Chino",
    price: "$119",
    category: "Bottoms",
    tag: "",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
  },
  {
    id: 6,
    name: "Cashmere Knit",
    price: "$210",
    category: "Knitwear",
    tag: "Exclusive",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function ShopPage() {
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
            {PRODUCTS.map((product, i) => (
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
                  <div className="absolute bottom-0 left-0 right-0 py-3.5 bg-white/95 backdrop-blur-sm text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-stone-900 font-medium">
                      Quick Add +
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-stone-800 font-medium leading-snug mb-1">{product.name}</p>
                    <p className="text-[11px] text-stone-400 tracking-wider">{product.category}</p>
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
