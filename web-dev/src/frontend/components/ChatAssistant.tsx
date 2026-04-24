"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const SUGGESTED = [
  "What's new this season?",
  "How do I track my order?",
  "What's your return policy?",
  "Help me find a jacket",
];

function getBotReply(input: string): string {
  const q = input.toLowerCase().trim();

  if (/new arrival|new drop|latest|this season|new collection/.test(q))
    return "Our latest drops are live on the New Arrivals page — fresh silhouettes, limited quantities, and bold colourways crafted for this season. Head there to explore!";

  if (/track|order status|where is my order|order/.test(q))
    return "You can find all your placed orders on the Orders page. Each order shows its status, items, and delivery details. Go to Account → Orders.";

  if (/return|refund|exchange/.test(q))
    return "Velora accepts returns within 14 days of delivery. Items must be unworn and in original packaging. Reach us at support@velora.in to initiate a return.";

  if (/shipping|delivery|how long/.test(q))
    return "Standard shipping is ₹199 and takes 4–6 business days. Orders above ₹5,000 ship free. Express delivery (1–2 days) is available at checkout.";

  if (/payment|pay|upi|card|cod|cash/.test(q))
    return "We accept Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), and Cash on Delivery. Select your preferred method at checkout.";

  if (/size|fit|sizing/.test(q))
    return "Our sizing runs true-to-fit. Each product page includes a size guide. If you're between sizes, we generally recommend sizing up for an oversized look.";

  if (/jacket|blazer|outerwear/.test(q))
    return "Check out our Jackets category — we have everything from linen blazers to cargo jackets and puffer vests. You can find them in the Shop or New Arrivals.";

  if (/hoodie|sweatshirt|knitwear|sweater/.test(q))
    return "Our Hoodies & Knitwear range has you covered — cloud-knit hoodies, ribbed sweaters, and more. Browse the Shop page to filter by category.";

  if (/trouser|pant|bottom|denim|jeans/.test(q))
    return "We carry wide-leg trousers, straight-leg denim, joggers, and co-ord sets. All available in the Bottoms section of our Shop.";

  if (/cart|bag|add to cart/.test(q))
    return "Add any item to your cart from its product page using the 'Add to Cart' button. On New Arrivals, use the 'Quick Add +' overlay on hover. Your cart saves across sessions.";

  if (/discount|promo|coupon|sale|offer/.test(q))
    return "We run seasonal promotions — keep an eye on our New Arrivals and homepage banners. Sign up for our newsletter in the footer to get early access to drops and offers.";

  if (/contact|support|help|email/.test(q))
    return "You can reach us at support@velora.in or use the Contact page. We typically respond within 24 hours on business days.";

  if (/hi|hello|hey|hola|namaste/.test(q))
    return "Hey there 👋 I'm the Velora style assistant. Ask me anything about our collection, orders, shipping, or sizing — I'm here to help!";

  if (/thank|thanks|great|awesome|perfect/.test(q))
    return "Always happy to help! Is there anything else you'd like to know about Velora?";

  if (/who are you|what are you|are you ai|are you a bot/.test(q))
    return "I'm the Velora AI style assistant — here to help you find the right pieces, answer questions about your orders, and guide you through the Velora experience.";

  return "I'm not sure about that one, but I'd love to help! Try asking about our collections, sizing, shipping, payments, or returns — or visit the Contact page and our team will get back to you.";
}

let msgCounter = 0;
function nextId() {
  return ++msgCounter;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: nextId(),
    role: "assistant",
    text: "Welcome to Velora 🖤 I'm your personal style assistant. Ask me about collections, orders, shipping, or anything else.",
  },
];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(
      () => {
        const reply = getBotReply(trimmed);
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", text: reply },
        ]);
      },
      700 + Math.random() * 500,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open Velora chat assistant"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-stone-900 text-white shadow-2xl flex items-center justify-center hover:bg-stone-800 active:scale-95 transition-all duration-200 border border-stone-700"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread dot when closed */}
        {!open && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-stone-900" />
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-stone-700 flex flex-col"
            style={{
              background: "#1c1917",
              fontFamily: "var(--font-body)",
              maxHeight: "min(560px, calc(100dvh - 8rem))",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b border-stone-800"
              style={{ background: "#111110" }}
            >
              <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d6d3d1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-100 leading-none mb-0.5">Velora Assistant</p>
                <p className="text-[11px] text-stone-500 tracking-wide">Style · Orders · Support</p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "thin", scrollbarColor: "#44403c transparent" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-stone-100 text-stone-900 rounded-br-sm"
                        : "bg-stone-800 text-stone-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-stone-800 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-stone-400 inline-block"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only when few messages) */}
            {messages.length <= 2 && !typing && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[11px] text-stone-400 border border-stone-700 rounded-full px-3 py-1.5 hover:border-stone-500 hover:text-stone-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-stone-800"
              style={{ background: "#161614" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about styles, orders, shipping…"
                className="flex-1 bg-stone-800 text-stone-200 placeholder-stone-600 text-sm rounded-xl px-4 py-2.5 outline-none border border-transparent focus:border-stone-600 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center shrink-0 disabled:opacity-30 hover:bg-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-[10px] text-stone-600 pb-3 px-4" style={{ background: "#161614" }}>
              Velora AI · Responses are mock & informational
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
