"use client";

import { PageLayout } from "@/frontend/components/PageLayout";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-80px)] py-16 lg:py-24 flex items-center bg-[#F8F6F1]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-6 font-semibold">
                Get In Touch
              </p>

              <h1 className="font-heading text-5xl lg:text-7xl uppercase text-stone-900 leading-[1.1] mb-8">
                Contact Us
              </h1>

              <p className="text-stone-600 text-sm lg:text-base leading-relaxed mb-12 max-w-md">
                Need help with sizing, shipping, or returns? Drop us a line.
                Our team responds within 24 hours.
              </p>

              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                {[
                  { label: "Email", value: "support@velora.com" },
                  { label: "Phone", value: "+1 (800) 555-0199" },
                  { label: "Hours", value: "Mon – Fri, 9am – 6pm" },
                  { label: "Location", value: "Paris, Milan, NY" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-stone-500 mb-2 font-semibold">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-stone-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white border border-stone-200 rounded-xl shadow-sm p-8 lg:p-12 w-full max-w-[540px] mx-auto"
            >
              {submitted ? (
                <div className="text-center py-20 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading uppercase text-stone-900 mt-2">
                    Message Sent
                  </h3>
                  <p className="text-stone-500 text-sm max-w-[250px]">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <h2 className="text-2xl font-heading uppercase text-stone-900 mb-2">
                    Send a Message
                  </h2>
                  <p className="text-stone-500 text-sm mb-8">
                    Fill out the form below and we'll get back to you shortly.
                  </p>

                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] tracking-[0.1em] uppercase text-stone-600 font-semibold">Full Name</label>
                        <input required type="text" placeholder="Jane Doe" className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 text-stone-900 placeholder-stone-400 text-sm px-4 py-3.5 rounded-md outline-none transition-colors" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] tracking-[0.1em] uppercase text-stone-600 font-semibold">Email Address</label>
                        <input required type="email" placeholder="jane@example.com" className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 text-stone-900 placeholder-stone-400 text-sm px-4 py-3.5 rounded-md outline-none transition-colors" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] tracking-[0.1em] uppercase text-stone-600 font-semibold">Subject</label>
                      <input required type="text" placeholder="How can we help?" className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 text-stone-900 placeholder-stone-400 text-sm px-4 py-3.5 rounded-md outline-none transition-colors" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] tracking-[0.1em] uppercase text-stone-600 font-semibold">Message</label>
                      <textarea required rows={4} placeholder="Write your message here..." className="w-full bg-stone-50 border border-stone-200 focus:border-stone-400 text-stone-900 placeholder-stone-400 text-sm px-4 py-3.5 rounded-md outline-none transition-colors resize-none" />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full bg-stone-900 text-white text-[12px] tracking-[0.15em] uppercase font-semibold py-4 rounded-md hover:bg-stone-800 transition-colors shadow-sm"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}