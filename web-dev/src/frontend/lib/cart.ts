export type MockCartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  color: string;
  size: string;
  quantity: number;
};

export type MockOrderCustomer = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

export type MockOrder = {
  id: string;
  placedAt: string;
  status: "Processing";
  customer: MockOrderCustomer;
  items: MockCartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const CART_STORAGE_KEY = "velora.mock.cart";
const ORDER_STORAGE_KEY = "velora.mock.orders";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStorageValue<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorageValue<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function getItemKey(item: Pick<MockCartItem, "productId" | "color" | "size">) {
  return `${item.productId}::${item.color}::${item.size}`;
}

export function parsePrice(value: string): number {
  const normalized = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(normalized) ? normalized : 0;
}

export function readCart(): MockCartItem[] {
  return readStorageValue<MockCartItem[]>(CART_STORAGE_KEY, []);
}

export function writeCart(items: MockCartItem[]) {
  writeStorageValue(CART_STORAGE_KEY, items);
}

export function addCartItem(item: MockCartItem) {
  const currentItems = readCart();
  const nextItems = [...currentItems];
  const existingIndex = nextItems.findIndex((entry) => getItemKey(entry) === getItemKey(item));

  if (existingIndex >= 0) {
    const existingItem = nextItems[existingIndex];
    nextItems[existingIndex] = {
      ...existingItem,
      quantity: Math.min(10, existingItem.quantity + item.quantity),
    };
  } else {
    nextItems.push(item);
  }

  writeCart(nextItems);
  return nextItems;
}

export function buyNow(item: MockCartItem) {
  const nextItems = [{ ...item, quantity: Math.max(1, item.quantity) }];
  writeCart(nextItems);
  return nextItems;
}

export function updateCartItemQuantity(itemKey: string, quantity: number) {
  const nextItems = readCart()
    .map((item) => (getItemKey(item) === itemKey ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  writeCart(nextItems);
  return nextItems;
}

export function removeCartItem(itemKey: string) {
  const nextItems = readCart().filter((item) => getItemKey(item) !== itemKey);
  writeCart(nextItems);
  return nextItems;
}

export function clearCart() {
  writeCart([]);
}

export function readOrders(): MockOrder[] {
  return readStorageValue<MockOrder[]>(ORDER_STORAGE_KEY, []);
}

export function getCartTotals(items: MockCartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

export function getCartItemCount(items: MockCartItem[] = readCart()) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function placeMockOrder(customer: MockOrderCustomer) {
  const items = readCart();
  if (items.length === 0) {
    return null;
  }

  const { subtotal, shipping, total } = getCartTotals(items);
  const order: MockOrder = {
    id: `VEL-${Date.now().toString().slice(-6)}`,
    placedAt: new Date().toISOString(),
    status: "Processing",
    customer,
    items,
    subtotal,
    shipping,
    total,
  };

  const nextOrders = [order, ...readOrders()];
  writeStorageValue(ORDER_STORAGE_KEY, nextOrders);
  clearCart();

  return order;
}

export function getCartItemKey(item: Pick<MockCartItem, "productId" | "color" | "size">) {
  return getItemKey(item);
}
