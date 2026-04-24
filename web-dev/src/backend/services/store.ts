import { categories, products, type Product } from "@/backend/data/catalog";

export type CartItemInput = {
  productId: string;
  quantity: number;
};

export type CheckoutCustomer = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((item) => item.featured).slice(0, 4);
}

export function getNewArrivals(): Product[] {
  return products.filter((item) => item.newArrival).slice(0, 4);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export function searchProducts(query?: string, category?: string): Product[] {
  const normalizedQuery = query?.trim().toLowerCase();
  const normalizedCategory = category?.trim().toLowerCase();

  return products.filter((item) => {
    const categoryMatch =
      !normalizedCategory || normalizedCategory === "all"
        ? true
        : item.category.toLowerCase() === normalizedCategory;

    const queryMatch = !normalizedQuery
      ? true
      : item.name.toLowerCase().includes(normalizedQuery) ||
        item.shortDescription.toLowerCase().includes(normalizedQuery);

    return categoryMatch && queryMatch;
  });
}

export function getShopMeta() {
  return {
    categories,
    totalProducts: products.length,
  };
}

export function createOrder(items: CartItemInput[], customer: CheckoutCustomer) {
  const orderLines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product || item.quantity <= 0) {
        return null;
      }

      return {
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  if (orderLines.length === 0) {
    return {
      ok: false,
      message: "No valid cart items were provided.",
      status: 400,
    } as const;
  }

  const subtotal = orderLines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  return {
    ok: true,
    status: 201,
    order: {
      orderId: `AJ-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      customer,
      lines: orderLines,
      subtotal,
      shipping,
      total,
      paymentStatus: "pending",
      fulfillmentStatus: "processing",
    },
  } as const;
}

export function getAdminSnapshot() {
  return {
    metrics: {
      revenueToday: 128400,
      ordersToday: 47,
      avgOrderValue: 2730,
      activeCustomers: 1328,
    },
    inventoryAlerts: products
      .slice(0, 3)
      .map((item, index) => ({
        productId: item.id,
        productName: item.name,
        stockLeft: 12 - index * 3,
      })),
    latestOrders: [
      {
        orderId: "AJ-641229",
        customerName: "Riya Sen",
        total: 4899,
        status: "processing",
      },
      {
        orderId: "AJ-641201",
        customerName: "Karan Sharma",
        total: 2398,
        status: "shipped",
      },
      {
        orderId: "AJ-641188",
        customerName: "Aman Verma",
        total: 3499,
        status: "pending",
      },
    ],
  };
}
