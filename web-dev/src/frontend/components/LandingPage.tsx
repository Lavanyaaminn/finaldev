"use client";

import { Navbar } from "@/frontend/components/landing/Navbar";
import { HeroSection } from "@/frontend/components/landing/HeroSection";
import { FeaturedGrid } from "@/frontend/components/landing/FeaturedGrid";
import { CollectionSection } from "@/frontend/components/landing/CollectionSection";
import { LookbookSection } from "@/frontend/components/landing/LookbookSection";
import { Footer } from "@/frontend/components/landing/Footer";

export function LandingPage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FeaturedGrid />
      <CollectionSection />
      <LookbookSection />
      <Footer />
    </main>
  );
}