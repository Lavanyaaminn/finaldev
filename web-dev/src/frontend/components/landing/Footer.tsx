"use client";

import Link from "next/link";

const LINKS = {
  Shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "T-Shirts", href: "/shop" },
    { label: "Hoodies", href: "/shop" },
    { label: "Jackets", href: "/shop" },
    { label: "Accessories", href: "/shop" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Press", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/contact" },
    { label: "Shipping", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "Size Guide", href: "/shop" },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 pb-16 border-b border-stone-800">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-heading text-3xl tracking-[0.2em] uppercase text-white hover:text-stone-300 transition-colors"
            >
              Velora<span className="text-stone-600">.</span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mt-5 max-w-xs font-light">
              Luxury fashion for those who move through the world with intention.
              Quality, craftsmanship, timeless style.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.25em] uppercase text-stone-500 mb-3">
                Stay in the loop
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-stone-800 border border-stone-700 text-stone-200 placeholder-stone-600 text-sm px-4 py-3 outline-none focus:border-stone-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-stone-900 text-[10px] tracking-widest uppercase px-5 py-3 hover:bg-stone-200 transition-colors font-medium"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([col, links]) => (
            <div key={col}>
              <p className="text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-6">{col}</p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-[11px] text-stone-600 tracking-wider">
            © {new Date().getFullYear()} Velora. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-stone-500 hover:text-white transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <Link
                key={t}
                href="#"
                className="text-[11px] text-stone-600 hover:text-stone-300 transition-colors tracking-wider"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
