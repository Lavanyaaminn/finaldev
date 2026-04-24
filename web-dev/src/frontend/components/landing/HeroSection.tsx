"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({ container: undefined });
  const imageY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#F5F2ED]"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <motion.video
          src="/Velora_fashion_advertisement_202604241402.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="h-full w-full object-cover object-center"
          aria-label="Velora fashion campaign video"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-[22vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
          className="w-full flex justify-center"
        >
        </motion.div>
      </div>
    </section>
  );
}
