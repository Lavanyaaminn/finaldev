"use client";

import { PageLayout } from "@/frontend/components/PageLayout";
import { motion } from "framer-motion";
import Image from "next/image";

const ARRIVALS = [
  {
    id: 1,
    name: "Sand Linen Blazer",
    price: "$285",
    category: "Jackets",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 2,
    name: "Wool Ribbed Sweater",
    price: "$175",
    category: "Knitwear",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    price: "$155",
    category: "Bottoms",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
  },
  {
    id: 4,
    name: "Monochrome Tee Set",
    price: "$98",
    category: "Sets",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
  },
];

export default function NewArrivalsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-[#F5F2ED] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.45em] uppercase text-stone-400 block mb-4"
          >
            Drop 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-6xl lg:text-8xl uppercase text-stone-900 leading-none mb-6"
          >
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone-500 text-base max-w-md font-light leading-relaxed"
          >
            Fresh silhouettes, limited quantities, and bold colorways crafted for this season.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ARRIVALS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
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
