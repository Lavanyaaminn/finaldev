"use client";

import { useState } from "react";
import { PageLayout } from "@/frontend/components/PageLayout";
import { motion } from "framer-motion";
import Image from "next/image";
import { addCartItem } from "@/frontend/lib/cart";

type ArrivalProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  tag: string;
  image: string;
  description: string;
};

const ARRIVALS: ArrivalProduct[] = [
  {
    id: "NA-001",
    name: "Sand Linen Blazer",
    price: 23999,
    category: "Jackets",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    description: "Relaxed sand linen blazer with a structured shoulder and a breezy summer drape.",
  },
  {
    id: "NA-002",
    name: "Wool Ribbed Sweater",
    price: 14799,
    category: "Knitwear",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    description: "Fine-gauge wool rib sweater — weightless warmth with a minimal silhouette.",
  },
  {
    id: "NA-003",
    name: "Wide-Leg Trousers",
    price: 12999,
    category: "Bottoms",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    description: "High-rise wide-leg trousers cut from fluid crepe. Pairs with everything.",
  },
  {
    id: "NA-004",
    name: "Monochrome Tee Set",
    price: 8299,
    category: "Sets",
    tag: "Just In",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    description: "Matching tee and short set in a single tonal colourway — effortless coordination.",
  },
];

const NEW_COLLECTION: ArrivalProduct[] = [
  {
    id: "NC-001",
    name: "Onyx Cargo Jacket",
    price: 19499,
    category: "Jackets",
    tag: "New Collection",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    description: "Technical cargo jacket with matte-onyx finish and utility pockets throughout.",
  },
  {
    id: "NC-002",
    name: "Cloud Knit Hoodie",
    price: 10999,
    category: "Hoodies",
    tag: "New Collection",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    description: "Oversized cloud-knit hoodie in a brushed fleece — weightlessly soft.",
  },
  {
    id: "NC-003",
    name: "Slate Straight-Leg Denim",
    price: 9799,
    category: "Bottoms",
    tag: "New Collection",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    description: "Classic straight-leg denim in a washed slate. Minimal hardware, clean lines.",
  },
  {
    id: "NC-004",
    name: "Ivory Longline Tee",
    price: 4499,
    category: "Tops",
    tag: "New Collection",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    description: "Longline mercerised cotton tee in ivory. Dropped shoulders, relaxed hem.",
  },
  {
    id: "NC-005",
    name: "Earth Tone Co-ord Set",
    price: 15299,
    category: "Sets",
    tag: "New Collection",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=600&q=80",
    description: "Relaxed co-ord in warm earth tones — shirt and trouser sold as a set.",
  },
  {
    id: "NC-006",
    name: "Charcoal Puffer Vest",
    price: 11299,
    category: "Outerwear",
    tag: "New Collection",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80",
    description: "Lightweight puffer vest with charcoal shell and down-alternative fill.",
  },
];

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function ProductCard({ product, index }: { product: ArrivalProduct; index: number }) {
  const [added, setAdded] = useState(false);

  const handleQuickAdd = () => {
    addCartItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      color: "Default",
      size: "M",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
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
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-0 left-0 right-0 py-3.5 bg-white/95 backdrop-blur-sm text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out cursor-pointer border-0 outline-none"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-stone-900">
            {added ? "✓ Added to Cart" : "Quick Add +"}
          </span>
        </button>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-stone-800 font-medium leading-snug mb-1">{product.name}</p>
          <p className="text-[11px] text-stone-400 tracking-wider">{product.category}</p>
        </div>
        <p className="text-sm font-semibold text-stone-900 ml-2 shrink-0">{formatINR(product.price)}</p>
      </div>
    </motion.div>
  );
}

export default function NewArrivalsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center border-b border-stone-900">
        <video
          src="/Velora_fashion_advertisement_202604241402.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-stone-950/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-28">
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
            className="font-heading text-6xl lg:text-8xl uppercase text-white leading-none mb-6"
          >
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone-300 text-base max-w-md font-light leading-relaxed"
          >
            Fresh silhouettes, limited quantities, and bold colorways crafted for this season.
          </motion.p>
        </div>
      </section>

      {/* Just In grid */}
      <section className="py-20 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-2">Just In</p>
              <h2 className="font-heading text-4xl lg:text-5xl uppercase text-stone-900 leading-none">
                Latest Drops
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ARRIVALS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* New Collection grid */}
      <section className="py-20 bg-[#F0EDE7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-2">Season 2026</p>
              <h2 className="font-heading text-4xl lg:text-5xl uppercase text-stone-900 leading-none">
                New Collection
              </h2>
            </div>
            <p className="hidden lg:block text-sm text-stone-400 max-w-xs text-right leading-relaxed">
              Curated pieces for the season ahead — bold shapes, refined fabrics, limited runs.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {NEW_COLLECTION.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
