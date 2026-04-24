"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/frontend/data/products";
import { PageLayout } from "@/frontend/components/PageLayout";

const CATEGORY_LABELS: Record<string, string> = {
  tshirts: "T-Shirts",
  hoodies: "Hoodies",
  jackets: "Jackets",
  trousers: "Trousers",
  accessories: "Accessories",
};

export default function CategoryPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";
  const products = getProductsByCategory(slug);
  const label = CATEGORY_LABELS[slug] ?? slug;

  return (
    <PageLayout>
      {/* Thin Top Bar */}
      <div className="bg-[#1C1A19] text-stone-400 text-center py-2 text-[11px] tracking-wide">
        {products.length} curated pieces
      </div>

      {/* Grid */}
      <section className="py-10 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {products.length === 0 ? (
            <p className="text-center text-stone-400 py-20">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
                >
                  <Link href={`/product/${product.id}`} className="group block cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-stone-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {product.tag && (
                        <span className="absolute top-3 left-3 bg-stone-900 text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                          {product.tag}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 py-3 bg-white/95 backdrop-blur-sm text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-stone-900 font-medium">
                          View Product →
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex items-start justify-between px-1">
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm text-stone-800 font-medium leading-snug mb-0.5 truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-stone-400 tracking-wider uppercase">
                          {label}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-stone-900">{product.price}</p>
                        <p className="text-[10px] text-stone-400 line-through">{product.mrp}</p>
                      </div>
                    </div>

                    {/* Discount badge */}
                    <p className="mt-1 px-1 text-[10px] text-emerald-600 font-medium tracking-wide">
                      {product.discount} off
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
