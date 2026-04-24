export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "hoodies" | "tees" | "jackets" | "pants";
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  image: string;
  shortDescription: string;
  description: string;
  featured?: boolean;
  newArrival?: boolean;
};

export const categories = ["all", "hoodies", "tees", "jackets", "pants"] as const;

export const products: Product[] = [
  {
    id: "P-1001",
    slug: "velocity-oversized-hoodie",
    name: "Velocity Oversized Hoodie",
    category: "hoodies",
    price: 3499,
    compareAtPrice: 4299,
    rating: 4.8,
    reviews: 218,
    colors: ["Midnight Black", "Steel Gray"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Heavyweight cotton hoodie designed for daily grind.",
    description:
      "A premium oversized hoodie with brushed fleece interior, dropped shoulders, and durable ribbing for long-term shape retention.",
    featured: true,
    newArrival: true,
  },
  {
    id: "P-1002",
    slug: "atlas-performance-tee",
    name: "Atlas Performance Tee",
    category: "tees",
    price: 1699,
    rating: 4.6,
    reviews: 142,
    colors: ["Off White", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Breathable stretch tee for training and travel.",
    description:
      "Built with a lightweight cotton blend and moisture control weave. Soft against skin and engineered for all-day movement.",
    featured: true,
  },
  {
    id: "P-1003",
    slug: "district-cargo-jacket",
    name: "District Cargo Jacket",
    category: "jackets",
    price: 4999,
    compareAtPrice: 5799,
    rating: 4.7,
    reviews: 76,
    colors: ["Sand", "Charcoal"],
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1559582930-bb01987cf4dd?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Street utility jacket with weather resistance.",
    description:
      "A structured cargo jacket featuring flap pockets, water-repellent shell, and matte hardware accents made for urban wear.",
    featured: true,
  },
  {
    id: "P-1004",
    slug: "summit-tapered-joggers",
    name: "Summit Tapered Joggers",
    category: "pants",
    price: 2799,
    rating: 4.5,
    reviews: 199,
    colors: ["Stone", "Jet Black"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Athleisure joggers with clean tapered silhouette.",
    description:
      "Tailored taper fit with stretch waistband, zip pockets, and reinforced seams. Ideal for commute, gym, and downtime.",
    newArrival: true,
  },
  {
    id: "P-1005",
    slug: "nova-essential-tee",
    name: "Nova Essential Tee",
    category: "tees",
    price: 1399,
    rating: 4.4,
    reviews: 254,
    colors: ["Cloud", "Ink Blue", "Moss"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Everyday premium basic with rich hand feel.",
    description:
      "A high-rotation staple crafted from combed cotton yarn. Holds shape well and layers cleanly under shirts and jackets.",
  },
  {
    id: "P-1006",
    slug: "urban-shield-windbreaker",
    name: "Urban Shield Windbreaker",
    category: "jackets",
    price: 4199,
    compareAtPrice: 4699,
    rating: 4.9,
    reviews: 63,
    colors: ["Signal Orange", "Black"],
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Ultra-light shell with bold visual identity.",
    description:
      "Packable windbreaker with contrast piping and adjustable hem. Designed to be a statement outer layer in changing weather.",
    newArrival: true,
  },
];
