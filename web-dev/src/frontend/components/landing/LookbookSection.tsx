"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type LookbookItem = {
  id: number;
  title: string;
  sub: string;
  cta: string;
  href: string;
  image: string;
  video?: string;
};

const LOOKBOOK: LookbookItem[] = [
  {
    id: 1,
    title: "Autumn / Winter",
    sub: "2025 Lookbook",
    cta: "Explore",
    href: "/collections",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90",
    video: "/Velora_clothing_brand_two.mp4",
  },
];

function LookbookCard({ item }: { item: LookbookItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        {item.video ? (
          <video
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-14 left-10 lg:left-20"
      >
        <p className="text-[11px] tracking-[0.4em] uppercase text-stone-300 mb-3">{item.sub}</p>
        <h3 className="font-heading text-5xl lg:text-8xl uppercase text-white leading-none mb-8">
          {item.title}
        </h3>
        <Link
          href={item.href}
          className="group inline-flex items-center gap-3 border border-white/60 text-white text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-white hover:text-stone-900 transition-all duration-300"
        >
          {item.cta}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

export function LookbookSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-stone-900">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex items-end justify-between"
      >
        <div>
          <span className="text-[11px] tracking-[0.35em] uppercase text-stone-500 block mb-3">Trending</span>
          <h2 className="font-heading text-5xl lg:text-7xl uppercase text-white leading-none">Lookbook</h2>
        </div>
        <Link
          href="/collections"
          className="hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-white transition-colors border-b border-stone-600 hover:border-white pb-px"
        >
          All Looks
        </Link>
      </motion.div>

      {/* Full-width lookbook cards */}
      <div className="flex flex-col gap-0">
        {LOOKBOOK.map((item) => (
          <LookbookCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
