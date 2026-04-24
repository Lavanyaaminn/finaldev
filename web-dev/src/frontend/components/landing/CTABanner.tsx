"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-[#F5F2ED]"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,115,85,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-stone-200" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-stone-200" />
      <div className="absolute top-12 left-12 w-16 h-16 border border-stone-300 opacity-50 hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-16 h-16 border border-stone-300 opacity-50 hidden lg:block" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.45em] uppercase text-stone-400 block mb-6"
        >
          Elevate Your Wardrobe
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading uppercase text-stone-900 leading-[0.9] mb-8"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          Discover
          <br />
          Your Style
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-stone-500 text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-12 font-light"
        >
          Every piece is curated for those who understand that true luxury
          lives in the details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/shop"
            id="cta-shop-now"
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-stone-900 text-white text-[11px] tracking-[0.3em] uppercase overflow-hidden animate-glow hover:scale-[1.03] transition-transform duration-300"
          >
            <span className="relative z-10">Shop Now</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-stone-700 to-stone-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>

          <Link
            href="/new-arrivals"
            className="text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-400 hover:border-stone-900 pb-px"
          >
            New Arrivals
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
