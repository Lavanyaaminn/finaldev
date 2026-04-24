"use client";

import { PageLayout } from "@/frontend/components/PageLayout";
import { motion } from "framer-motion";
import styles from "./about.module.css";

const STATS = [
  { num: "12+", label: "Countries Served" },
  { num: "52K", label: "Orders Delivered" },
  { num: "68%", label: "Repeat Customers" },
  { num: "4.8", label: "Average Rating" },
];

const VALUES = [
  {
    title: "Craftsmanship",
    desc: "Every piece is constructed with precision, using ethically sourced materials that hold up through seasons.",
  },
  {
    title: "Intention",
    desc: "We design for people who move through the world with purpose — clothing that matches your ambition.",
  },
  {
    title: "Timelessness",
    desc: "We reject fast fashion. Our collections are built to outlast trends and become wardrobe staples.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <section className={styles.hero}>
        <video
          src="/Velora_fashion_three_transformation_202604241444.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        />
      </section>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {STATS.map(({ num, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={styles.statCard}
              >
                <p className={styles.statNum}>{num}</p>
                <p className={styles.statLabel}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.eyebrow}
          >
            What We Stand For
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.valuesTitle}
          >
            Our Values
          </motion.h2>
          <div className={styles.valuesGrid}>
            {VALUES.map(({ title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={styles.valueCard}
              >
                <div className={styles.valueLine} />
                <h3 className={styles.valueTitle}>{title}</h3>
                <p className={styles.valueDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
