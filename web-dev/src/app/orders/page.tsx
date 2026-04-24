"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/frontend/components/PageLayout";
import { formatCurrency } from "@/backend/services/store";
import { readOrders, type MockOrder } from "@/frontend/lib/cart";

export default function OrdersPage() {
  const [orders] = useState<MockOrder[]>(() => readOrders());

  return (
    <PageLayout>
      <section className="bg-stone-900 text-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-stone-500">Order archive</p>
          <h1 className="mt-4 font-heading text-5xl sm:text-6xl uppercase leading-none">My Orders</h1>
          <p className="mt-5 max-w-2xl text-stone-400">
            Your placed mock orders stay here after refresh, including the checkout details you entered.
          </p>
        </div>
      </section>

      <section className="bg-[#F8F6F1] py-12 min-h-[50vh]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {orders.length === 0 ? (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-10 shadow-[0_30px_80px_-48px_rgba(28,25,23,0.5)]">
              <p className="text-[11px] tracking-[0.3em] uppercase text-stone-400">No orders yet</p>
              <h2 className="mt-4 text-3xl text-stone-900">Place a mock order to see it saved here.</h2>
              <Link href="/shop" className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-white">
                Explore products
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <article key={order.id} className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8 shadow-[0_30px_80px_-48px_rgba(28,25,23,0.5)]">
                  <div className="flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[11px] tracking-[0.3em] uppercase text-stone-400">{order.id}</p>
                      <h2 className="mt-3 text-2xl text-stone-900">{order.customer.fullName}</h2>
                      <p className="mt-2 text-sm text-stone-500">
                        {new Date(order.placedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                    <div className="grid gap-2 text-sm text-stone-600">
                      <p>Status: <span className="font-medium text-stone-900">{order.status}</span></p>
                      <p>Total: <span className="font-medium text-stone-900">{formatCurrency(order.total)}</span></p>
                      <p>{order.customer.address}, {order.customer.city}, {order.customer.country}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {order.items.map((item) => (
                      <div key={`${order.id}-${item.productId}-${item.color}-${item.size}`} className="flex flex-col gap-3 rounded-[1.5rem] bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg text-stone-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-stone-500">{item.color} · {item.size} · Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-stone-900">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
