"use client";

import { Navbar } from "@/frontend/components/landing/Navbar";
import { Footer } from "@/frontend/components/landing/Footer";

type PageLayoutProps = {
  children: React.ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2ED]">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
