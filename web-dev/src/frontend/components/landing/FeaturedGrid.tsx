"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    label: "T-Shirts",
    slug: "tshirts",
    sub: "Clean cuts, premium cotton",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
    colSpan: "",
    rowSpan: "row-span-2",
  },
  {
    label: "Hoodies",
    slug: "hoodies",
    sub: "Relaxed streetwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    colSpan: "",
    rowSpan: "",
  },
  {
    label: "Jackets",
    slug: "jackets",
    sub: "Structured outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    colSpan: "",
    rowSpan: "",
  },
  {
    label: "Trousers",
    slug: "trousers",
    sub: "Tailored silhouettes",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    colSpan: "col-span-2 lg:col-span-1",
    rowSpan: "",
  },
  {
    label: "Accessories",
    slug: "accessories",
    sub: "The finishing touch",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    colSpan: "",
    rowSpan: "",
  },
];

export function FeaturedGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <span className="text-[11px] tracking-[0.35em] uppercase text-stone-400 block mb-3">
              Browse by Category
            </span>
            <h2 className="font-heading text-5xl lg:text-7xl uppercase text-stone-900 leading-none whitespace-nowrap flex overflow-hidden">
              {"SHOP BY STYLE".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: "easeOut" }}
                  className={char === " " ? "inline-block w-[0.3em]" : "inline-block"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </div>
          <Link
            href="/shop"
            id="featured-view-all"
            className="hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-current pb-px"
          >
            View All
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-[260px] lg:auto-rows-[310px]">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.label}
              href={`/category/${cat.slug}`}
              className={`group relative overflow-hidden cursor-pointer block ${cat.rowSpan} ${cat.colSpan}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="w-full h-full relative"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/45 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 p-5">
                  <div className="bg-white/92 backdrop-blur-md px-5 py-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1">{cat.sub}</p>
                    <p className="font-heading text-2xl text-stone-900 uppercase">{cat.label}</p>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="bg-white/90 backdrop-blur-sm text-stone-900 text-[10px] tracking-widest uppercase px-4 py-2">
                    {cat.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
