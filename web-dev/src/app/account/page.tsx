import Link from "next/link";
import { PageLayout } from "@/frontend/components/PageLayout";

export default function AccountPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_42%),radial-gradient(circle_at_82%_4%,rgba(245,158,11,0.2),transparent_36%)]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-28">
          <p className="text-[10px] tracking-[0.38em] uppercase text-stone-300">Your Space</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold uppercase leading-[0.92]">My Account</h1>
          <p className="mt-6 text-stone-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            Manage your profile, shipping preferences, saved payments, and recent orders from one polished dashboard.
          </p>
        </div>
      </section>

      <section className="bg-[#F8F6F1] py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6 lg:gap-7">
          <article className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 lg:p-9 shadow-[0_20px_70px_-40px_rgba(28,25,23,0.45)]">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-[30px] font-semibold text-stone-900">Profile Overview</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-900 text-white text-[10px] tracking-[0.2em] uppercase">
                Gold Member
              </span>
            </div>

            <div className="mt-7 grid sm:grid-cols-2 gap-x-7 gap-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">Name</p>
                <p className="mt-1.5 text-lg text-stone-900 font-medium">Akshay Jain</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">Email</p>
                <p className="mt-1.5 text-lg text-stone-900 font-medium">akshay@example.com</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">Default Address</p>
                <p className="mt-1.5 text-lg text-stone-900 font-medium">22 Lakeview Road, Pune</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">Saved Payments</p>
                <p className="mt-1.5 text-lg text-stone-900 font-medium">2 Cards</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">Preferred Fit</p>
                <p className="mt-1.5 text-lg text-stone-900 font-medium">L</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">Recent Activity</p>
                <p className="mt-1.5 text-lg text-stone-900 font-medium">3 Orders This Month</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Orders</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">12</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Wishlist</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">8</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Returns</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">1</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Points</p>
                <p className="mt-2 text-2xl font-semibold text-stone-900">2480</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/orders"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 text-white px-6 py-3 text-sm font-medium hover:bg-stone-700 transition-colors"
              >
                View Orders
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white text-stone-900 px-6 py-3 text-sm font-medium hover:bg-stone-100 transition-colors"
              >
                Open Wishlist
              </Link>
            </div>
          </article>

          <aside className="rounded-3xl border border-stone-200 bg-gradient-to-b from-white to-amber-50 p-6 sm:p-7 shadow-[0_20px_70px_-40px_rgba(28,25,23,0.45)]">
            <h3 className="text-xl font-semibold text-stone-900">Quick Actions</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Keep your account updated with these shortcuts.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-800 hover:border-stone-400 transition-colors"
              >
                <span>Update Delivery Preferences</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-800 hover:border-stone-400 transition-colors"
              >
                <span>Contact Support Team</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/shop"
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-800 hover:border-stone-400 transition-colors"
              >
                <span>Continue Shopping</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-6 rounded-2xl bg-stone-900 text-stone-200 p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Loyalty Points</p>
              <p className="mt-2 text-4xl font-semibold text-white">2,480</p>
              <p className="mt-2 text-xs">520 points to unlock Platinum status.</p>
            </div>
          </aside>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-[0_20px_70px_-40px_rgba(28,25,23,0.45)]">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-stone-900">Recent Orders</h3>
              <Link href="/orders" className="text-sm text-stone-700 hover:text-stone-900 underline underline-offset-4">
                View Full History
              </Link>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-stone-50 border border-stone-200 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Order #AJ-1028</p>
                <p className="mt-2 text-sm text-stone-900 font-medium">Minimal Zip Hoodie</p>
                <p className="mt-1 text-xs text-stone-600">Delivered on Apr 16</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Order #AJ-1011</p>
                <p className="mt-2 text-sm text-stone-900 font-medium">Structured Overshirt</p>
                <p className="mt-1 text-xs text-stone-600">In transit</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Order #AJ-0993</p>
                <p className="mt-2 text-sm text-stone-900 font-medium">Tailored Chino</p>
                <p className="mt-1 text-xs text-stone-600">Delivered on Mar 30</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
